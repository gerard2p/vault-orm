/**
 * @module @gerard2p/vault-orm/adapters/mysql-x
 */
import { basename, dirname } from 'path';
import { DatabaseConfiguration } from '../..';
import { VaultORM as VORM } from '../../index';

export { collection, RelationMode } from '../..';
export { MySQLXCollection as Collection } from './collection';
export { Model } from './model';
export { Repository } from './repository';
export class VaultORM extends VORM {
	public static set RelationsMode (value) {
		VORM.RelationsMode = value;
	}
	public static get RelationsMode () {
		return VORM.RelationsMode;
	}
	driver: string = basename(dirname(__filename)).split('.')[0]
	constructor(configuration: DatabaseConfiguration, driver_options?:any | any) {
		super();
		return this.after_constructor(configuration, driver_options);
	}
}
