import {RequestHandler} from "express";
import UserServices from "../services/UserServices";

class UserController {
    private services: UserServices;
    constructor(services: UserServices) {
        this.services = services
    }
    login: RequestHandler = ((req, res, next) => {

    })
    logout: RequestHandler = ((req, res, next) => {

    })
    register: RequestHandler = ((req, res, next) => {

    })
}

export default UserController;
