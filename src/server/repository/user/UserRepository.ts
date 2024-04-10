import dotenv from "dotenv";
import {Pool} from "pg";
import {UserRepositoryInterface} from "./UserRepositoryInterface";
import {User} from "../../models/user/User";

class UserRepository implements UserRepositoryInterface {
    private pool;

    constructor() {
        dotenv.config()
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
            const query = 'select * from "user" where username = $1'
            const values = [username];

            const result = await this.pool.query(query, values);

            return result.rows[0] as User;
        } catch (error) {
            console.error('Error fetching task:', error);
            return null;
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const query = 'select * from "user" where id = $1'
            const values = [id];

            const result = await this.pool.query(query, values);

            return result.rows[0] as User;
        } catch (error) {
            console.error('Error fetching task:', error);
            return null;
        }
    }
}

export default UserRepository;
