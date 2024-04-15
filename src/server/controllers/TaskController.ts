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
            const userId = res.get('user');
            if(!userId) throw new Unauthorized("Invalid user id");
            const taskInput: TaskInputModel = req.body;
            const taskId = await this.services.createTask(parseInt(userId), taskInput);
            res.status(201).json({id: taskId});
        } catch (error) {
            console.log("Error creating task: ", error);
            next(error);
        }
    };
    getTask: RequestHandler = async (req, res, next) => {
        try {
            const userId = res.get('user');
            if(!userId) throw new Unauthorized("Invalid user id");
            const task = await this.services.getTask(parseInt(req.params.taskId));
            res.status(200).json(task);
        } catch (error) {
            console.log("Error fetching task: ", error);
            next(error);
        }
    };
    getTasks: RequestHandler = async (req, res, next) => {
        try {
            const userId = res.get('user');
            if(!userId) throw new Unauthorized("Invalid user id");
            const tasks = await this.services.getTasks(parseInt(userId));
            res.status(200).json(tasks);
        } catch (error) {
            console.log("Error fetching tasks: ", error);
            next(error);
        }
    }
    deleteTask: RequestHandler = async (req, res, next) => {
        try {
            const userId = res.get('user');
            if(!userId) throw new Unauthorized("Invalid user id");
            const isDeleted = await this.services.deleteTask(parseInt(userId), parseInt(req.params.taskId));
            res.status(200).json({isDeleted});
        } catch (error) {
            console.log("Error deleting task: ", error);
            next(error);
        }
    }
}

export default TaskController;
