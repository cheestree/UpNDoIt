import {Task} from "../../models/tasks/Task";
import {TaskInputModel} from "../../models/tasks/input/TaskInputModel";

export interface TaskRepositoryInterface {
    getTaskById: (id: number) => Promise<Task | null>,
    createTask: (user: number, created_at_time: string, task: TaskInputModel) => Promise<number | null>
}
