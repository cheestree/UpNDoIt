import TaskRepository from "../repository/tasks/TaskRepository";
import {InternalServerError, NotFoundError} from "../models/error/Error";
import moment from 'moment-timezone';
import {TaskInputModel} from "../models/tasks/input/TaskInputModel";
import {Task} from "../models/tasks/Task";

class TaskServices {
    private repo: TaskRepository
    constructor() {
        this.repo = new TaskRepository();
    }
    async getTask(taskId: number): Promise<Task> {
        const task = await this.repo.getTaskById(taskId);
        if(task == null) throw new NotFoundError("Task not found");
        return task
    }
    async createTask(user: number, task: TaskInputModel): Promise<number> {
        const created_at = moment().tz('UTC').format();
        const taskId = await this.repo.createTask(user, created_at, task);
        if(taskId == null) throw new InternalServerError("Task not created");
        return taskId;
    }
}

export default TaskServices;
