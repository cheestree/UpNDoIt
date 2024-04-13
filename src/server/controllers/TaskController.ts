import {RequestHandler} from "express";
import TaskServices from "../services/TaskServices";
import {TaskInputModel} from "../models/tasks/input/TaskInputModel";
import {Unauthorized} from "../models/error/Error";

class TaskController {
    private services: TaskServices;
    constructor(services: TaskServices) {
        this.services = services
    }
    createTask: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.header('user') ? req.header('user') : null;
            if(!userId) throw new Unauthorized("Invalid user id");
            const taskInput: TaskInputModel = req.body;
            const taskId = await this.services.createTask(parseInt(userId), taskInput);
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
    getTasks: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.header('user') ? req.header('user') : null;
            if(!userId) throw new Unauthorized("Invalid user id");
            const tasks = await this.services.getTasks(parseInt(userId));
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }
    deleteTask: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.header('user') ? req.header('user') : null;
            if(!userId) throw new Unauthorized("Invalid user id");
            const isDeleted = await this.services.deleteTask(parseInt(userId), parseInt(req.params.taskId));
            res.status(200).json({isDeleted});
        } catch (error) {
            next(error);
        }
    }
}

export default TaskController;
