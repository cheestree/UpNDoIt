import {Task} from "./Task";
import {TaskInputModel} from "./input/TaskInputModel";

export interface TaskServicesInterface {
    getTask: (taskId: number) => Promise<Task>
    createTask: (user: number, task: TaskInputModel) => Promise<number>
}
