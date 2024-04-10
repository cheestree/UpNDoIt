import {TaskControllerInterface} from "../models/tasks/TaskControllerInterface"
import {RequestHandler} from "express";
import TaskServices from "../services/TaskServices";
import {BadRequestError} from "../models/error/Error";
import {validationResult} from "express-validator";
import {TaskInputModel} from "../models/tasks/input/TaskInputModel";

class TaskController implements TaskControllerInterface {
    private services: TaskServices;
    constructor(services: TaskServices) {
        this.services = services
    }
    createTask: RequestHandler = async (req, res, next) => {
        try {
            const result = validationResult(req);
            if(!result.isEmpty()) throw new BadRequestError("Input is wrong")
            const taskInput: TaskInputModel = req.body;
            const taskId = await this.services.createTask(1, taskInput);
            res.status(201).json({id: taskId});
        } catch (error) {
            next(error);
        }
    };
    getTask: RequestHandler = async (req, res, next) => {
        try {
            const task = await this.services.getTask(parseInt(req.params.taskId));
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    };
}

export default TaskController;
