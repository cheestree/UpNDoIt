import {Task} from "../../models/tasks/Task";
import {Pool} from "pg";
import {TaskInputModel} from "../../models/tasks/input/TaskInputModel";
import {TaskRepositoryInterface} from "./TaskRepositoryInterface";

class TaskRepository implements TaskRepositoryInterface {
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
    async getTaskById(id: number): Promise<Task | null> {
        try {
            const query = 'select * from tasks where id = $1';
            const values = [id];
            const result = await this.pool.query(query, values);

            if (result.rows.length === 0) return null;
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching task:', error);
            return null;
        }
    }

    async createTask(user: number, created_at_time: string, task: TaskInputModel): Promise<number | null> {
        try {
            const query = 'insert into tasks(created_by, created_at, title, public, description) values ($1, $2, $3, $4, $5)'
            const values = [user, created_at_time, task.title, task.public, task.description];

            const result = await this.pool.query(query, values);

            return result.rows[0].id;
        } catch (error) {
            console.error('Error fetching task:', error);
            return null;
        }
    }
}

export default TaskRepository;
