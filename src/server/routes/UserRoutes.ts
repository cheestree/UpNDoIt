import UserController from "../controllers/UserController";
import UserServices from "../services/UserServices";
import {Router} from "express";
import { UserRegisterInputModelValidation } from '../models/user/input/UserRegisterInputModel'
import { ValidateInput } from '../middlewares/ValidateInput'
import { UserLoginInputModelValidation } from '../models/user/input/UserLoginInputModel'
import { Authenticator } from '../middlewares/Authenticator'

const userRouter: Router  = Router()
const userServices: UserServices = new UserServices()
const userController: UserController = new UserController(userServices);

userRouter.post('/login', UserLoginInputModelValidation, ValidateInput, userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', UserRegisterInputModelValidation, ValidateInput, userController.register);
userRouter.get('/auth', Authenticator, userController.checkAuth);

export default userRouter;
