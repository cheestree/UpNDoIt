import {Router} from "express";
import TaskController from "../controllers/TaskController";
import TaskServices from "../services/TaskServices";
import {ValidateInput} from "../middlewares/ValidateInput";
import { TaskInputModelValidation } from '../models/tasks/input/TaskInputModel'

const taskRouter: Router  = Router()
const taskServices: TaskServices = new TaskServices();
const taskController: TaskController = new TaskController(taskServices);

taskRouter.post('', TaskInputModelValidation, ValidateInput, taskController.createTask);
taskRouter.get('/:taskId', taskController.getTask);

export default taskRouter;
