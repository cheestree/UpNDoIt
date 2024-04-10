import {Router} from "express";
import TaskController from "../controllers/TaskController";
import TaskServices from "../services/TaskServices";
import {taskInputModelValidation} from "../models/tasks/input/TaskInputModel";
import {ValidateInput} from "../middlewares/ValidateInput";

const taskRouter: Router  = Router()
const taskServices: TaskServices = new TaskServices();
const taskController: TaskController = new TaskController(taskServices);

taskRouter.post('', taskInputModelValidation, ValidateInput, taskController.createTask);
taskRouter.get('/:taskId', taskController.getTask);

export default taskRouter;
