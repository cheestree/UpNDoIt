import {UserServicesInterface} from "../models/user/UserServicesInterface";
import {RequestHandler} from "express";
import {UserControllerInterface} from "../models/user/UserControllerInterface";

class UserController implements UserControllerInterface {
    private services: UserServicesInterface;
    constructor(services: UserServicesInterface) {
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
