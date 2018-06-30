import { Collection, VaultORM, collection, RelationMode, DatabaseDriver } from '../../src/adapters/mysql-x';
import { Rigth } from './rigth';
import { Rol } from './rol';
import { User } from './user';
import { Post } from './post';
VaultORM.RelationsMode = RelationMode.id;
class TestContext extends VaultORM {

	@collection(Rigth) rigths: Collection<Rigth>
	// @ts-ignore
	@collection(Rol) rols: Collection<Rol>
	// @ts-ignore
	@collection(User) users: Collection<User>
	// @ts-ignore
	@collection(Post) posts: Collection<Post>
}
const Context =  new TestContext({
	driver: DatabaseDriver.mysqlX,
    database: 'test_vault_orm',
    port: 33060,
	host: 'localhost',
	user: 'root',
	password: '5s%83kg78Op34%b5X@$!',
	ssl:false
});
export { Context, Context as TestContext };
