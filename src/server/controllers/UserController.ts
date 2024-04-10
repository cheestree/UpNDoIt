import {RequestHandler} from "express";
import UserServices from "../services/UserServices";
import { UserLoginInputModel } from '../models/user/input/UserLoginInputModel'

class UserController {
    private services: UserServices;
    constructor(services: UserServices) {
        this.services = services
    }
    login: RequestHandler = async (req, res, next) => {
        try {
            const loginCreds: UserLoginInputModel = req.body
            const token = await this.services.login(loginCreds)
            res.status(200).cookie('token', token).json({ token: token });
        } catch (error) {
            next(error);
        }
    }
    logout: RequestHandler = async (req, res, next) => {
        try {
            const a = 'acb';
        } catch (error) {
            next(error);
        }
    }
    register: RequestHandler = async (req, res, next) => {
        try {
            const a = 'acb';
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
