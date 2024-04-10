import {RequestHandler} from "express";
import TaskServices from "../services/TaskServices";
import {TaskInputModel} from "../models/tasks/input/TaskInputModel";

class TaskController {
    private services: TaskServices;
    constructor(services: TaskServices) {
        this.services = services
    }
    createTask: RequestHandler = async (req, res, next) => {
        try {
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
