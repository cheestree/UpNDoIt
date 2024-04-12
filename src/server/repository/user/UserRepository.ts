import {Pool} from "pg";
import {UserRepositoryInterface} from "./UserRepositoryInterface";
import {User} from "../../models/user/User";

class UserRepository implements UserRepositoryInterface {
    private pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        });
    }

    async getUserByUsername(username: string): Promise<User | null> {
        try {
            const query = 'select * from undi.account where username = $1'
            const values = [username];

            const result = await this.pool.query(query, values);

            return result.rows[0] as User;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async getUserById(id: number): Promise<User | null> {
        try {
            const query = 'select * from undi.account where id = $1'
            const values = [id];

            const result = await this.pool.query(query, values);

            return result.rows[0] as User;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async createUser(username: string, password: string, email: string): Promise<number | null> {
        try {
            const query = 'insert into undi.account(username, email, password) values ($1, $2, $3) returning id'
            const values = [username, email, password];

            const result = await this.pool.query(query, values);

            return result.rows[0].id;
        } catch (e) {
            console.log(e)
            return null;
        }
    }
}

export default UserRepository;
