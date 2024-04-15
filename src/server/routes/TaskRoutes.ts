import {Router} from "express";
import TaskController from "../controllers/TaskController";
import TaskServices from "../services/TaskServices";
import {ValidateInput} from "../middlewares/ValidateInput";
import { TaskInputModelValidation } from '../models/tasks/input/TaskInputModel'
import { Authenticator } from '../middlewares/Authenticator'

const taskRouter: Router  = Router()
const taskServices: TaskServices = new TaskServices();
const taskController: TaskController = new TaskController(taskServices);

taskRouter.post('', TaskInputModelValidation, ValidateInput, Authenticator, taskController.createTask);
taskRouter.get('/:taskId', Authenticator, taskController.getTask);
taskRouter.get('/all/search', Authenticator, taskController.getTasks);
taskRouter.delete('/:taskId', Authenticator, taskController.deleteTask);

export default taskRouter;
