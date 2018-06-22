import { Collection, ObjectId } from "mongodb";
import { VaultCollection } from "./collection";
import * as inflector from 'inflection';
import { Related } from "./related";
export interface IVaultField<T> {
	kind:any
	defaults?:T
	unic?:boolean
}
export interface IValultConfiguration {
	[p:string]:IVaultField<any>
}
export class VaultModel  {
	static configuration: IValultConfiguration
	static collectionName?:string
	static schema?:any
	/**
	 * Read Only Please
	 */
	private _id: ObjectId = null
	get id () {
		//@ts-ignore
		return this._id as ObjectId;
	}
	updated: Date
	created: Date
	constructor(information:any={}){
		let Schema = Object.getPrototypeOf(this).schema;
		let ClassName = this.constructor.name.toLowerCase();
		let own_properties = ['_id', 'created', 'updated'].concat(Object.keys(Schema));
		for(const property of own_properties ) {
			if(information[property]) {
				this[property] = information[property];
			} else if(Schema[property] && Schema[property].defaults) {
				this[property] = Schema[property].defaults;
			} else if (Schema[property]) {
				this[property] = undefined;
			}
		}
		for(const property of own_properties) {
			if (Schema[property] && Schema[property].kind instanceof Related) {
				if(this.id)
					this[property] = Schema[property].kind.load(this._id,`${ClassName}Id`);
			}
		}
	}
	protected async loadRelation() {
		for(const key of Object.getOwnPropertyNames(this)) {
			if(this[key] instanceof Related) {
				await this[key].relateds;
			}
		}
	}
	protected toJSON() {
		let Schema = Object.getPrototypeOf(this).schema;
		let own_properties = ['id', 'created', 'updated'].concat(Object.keys(Schema));
		let jsoned = {};
		for(const property of own_properties ) {
			jsoned[property] = this[property];
		}
		return jsoned;
	}
	protected inspect(depth, opts) {
        return `${this.constructor.name} ` + JSON.stringify(this, null, 2);
    }
	async save(){
		if(!this.updated)this.created = new Date();
		this.updated = new Date();
		let collection = (Object.getPrototypeOf(this).collection() as Collection);
		let update_object = {};
		for(const key of Object.keys(this)) {
			if(key === '_id')continue;
			update_object[key] = this[key];
		}
		if(this.id === null) {
			return collection.insertOne(update_object).then((inserted)=>{
				//@ts-ignore
				this._id = inserted.insertedId;
				return true;
			});
		} else {
			return collection.findOneAndUpdate({_id:this.id},update_object).then(({lastErrorObject})=>{
				if(!lastErrorObject.updatedExisting) {
					throw new Error(lastErrorObject);
				}
				return true;
			});
		}
	}
	async delete() {
		let collection = (Object.getPrototypeOf(this).collection() as Collection);
		return collection.deleteOne({_id:this._id}).then(result=>{
			if (result.deletedCount === 1) {
				//@ts-ignore
				this._id = null;
				return true;
			} else {
				throw new Error(JSON.stringify(result, null, 2));
			}
		});
	}
}
