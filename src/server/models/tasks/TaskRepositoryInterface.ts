import {Task} from "./Task";
import {TaskInputModel} from "./input/TaskInputModel";

export interface TaskRepositoryInterface {
    getTaskById: (id: number) => Promise<Task | null>,
    createTask: (user: number, created_at_time: string, task: TaskInputModel) => Promise<number | null>
}
