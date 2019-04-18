import { Sorting } from '../..';
import { FilterQuery, Projection } from '../../query';
import { uuidv4 } from '../uuid';
import { MySQLXCollection } from './collection';
import { Model } from './model';
export class Repository extends Model {
	static findOne<T extends Model>(this:new()=>T): Promise<T>
	static findOne<T extends Model>(this:new()=>T,Id: uuidv4): Promise<T>
	/**
	 * String that respresnents an uuidv4
	 */
	static findOne<T extends Model>(this:new()=>T,StringId: string): Promise<T>
	static findOne<T extends Model>(this:new()=>T, query: FilterQuery<T>): Promise<T>
	/**@alias firstOrDefault */
	static findOne<T extends Model>(this:new()=>T,queryOrId?: any) {
		return (this as any).objects.findOne(queryOrId);
	}
	static firstOrDefault<T extends Model>(this:new()=>T): Promise<T>
	static firstOrDefault<T extends Model>(this:new()=>T,Id: uuidv4): Promise<T>
	/**
	 * String that respresnents an uuidv4
	 */
	static firstOrDefault<T extends Model>(this:new()=>T,StringId: string): Promise<T>
	static firstOrDefault<T extends Model>(this:new()=>T,query: FilterQuery<T>): Promise<T>
	static firstOrDefault<T extends Model>(this:new()=>T, queryOrId?: any) {
		return (this as any).objects.firstOrDefault(queryOrId);
	}
	static findOrCreate<T extends Model>(this:new()=>T, query: FilterQuery<T>, keys: Partial<T> = {}):Promise<T> {
		return (this as any).objects.findOrCreate(query, keys);
	}
	static find<T extends Model>(this:new()=>T) :Promise<T> {
		return (this as any).objects.find();
	}
	static findAll<T extends Model>(this:new()=>T):Promise<T[]> {
		return (this as any).objects.findAll();
	}
	static remove<T extends Model>(this:new()=>T, query: FilterQuery<T>):Promise<boolean> {
		return (this as any).objects.remove(query);
	}
	static update<T extends Model>(this:new()=>T, query: FilterQuery<T>, keys?: Partial<T>) : Promise<boolean> {
		return (this as any).objects.update(query, keys);
	}
	static count(applySkipLimit: boolean = false) : Promise<number> {
		return (this as any).objects.count(applySkipLimit);

	}
	static fields<T extends Model>(this:new()=>T, query: Projection<T>) : MySQLXCollection<T> {
		return (this as any).objects.fields(query);
	}
	static where<T extends Model>(this:new()=>T,query: FilterQuery<T> = {}) : MySQLXCollection<T> {
		return (this as any).objects.where(query);
	}
	static orWhere<T extends Model>(this:new()=>T, query: FilterQuery<T>) : MySQLXCollection<T> {
		return (this as any).objects.orWhere();
	}
	static limit<T extends Model>(this:new()=>T,n: number) : MySQLXCollection<T> {
		return (this as any).objects.limit(n);
	}
	static take<T extends Model>(this:new()=>T, n: number) : MySQLXCollection<T> {
		return (this as any).objects.limit(n);
	}
	static sort<T extends Model>(this:new()=>T, key: string, order: Sorting = Sorting.asc) : MySQLXCollection<T> {
		return (this as any).objects.sort(key, order);
	}
	static skip<T extends Model>(this:new()=>T, n: number) : MySQLXCollection<T> {
		return (this as any).objects.skip(n);
	}

	static toId(id: any): uuidv4 {
		return (this as any).objects.toId(id);
	}
	static explain() {
		return (this as any).objects.explain();
	}
}
