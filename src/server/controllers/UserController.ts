import {RequestHandler} from "express";
import UserServices from "../services/UserServices";
import { UserLoginInputModel } from '../models/user/input/UserLoginInputModel'
import { UserRegisterInputModel } from '../models/user/input/UserRegisterInputModel'

class UserController {
    private services: UserServices;
    constructor(services: UserServices) {
        this.services = services
    }
    login: RequestHandler = async (req, res, next) => {
        try {
            const loginCreds: UserLoginInputModel = req.body
            const [token, expire] = await this.services.login(loginCreds)
            res.status(200).cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: expire
            }).json({ token: token });
        } catch (error) {
            next(error);
        }
    }
    logout: RequestHandler = async (req, res, next) => {
        try {
            res.status(200).clearCookie('token')
        } catch (error) {
            next(error);
        }
    }
    register: RequestHandler = async (req, res, next) => {
        try {
            const registerCreds: UserRegisterInputModel = req.body
            const userId = this.services.register(registerCreds)
            res.status(201).json({id: userId})
        } catch (error) {
            next(error);
        }
    }
    checkAuth: RequestHandler = async (req, res, next) => {
        try {
            res.status(200).json()
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
