import UserController from "../controllers/UserController";
import UserServices from "../services/UserServices";
import {Router} from "express";

const userRouter: Router  = Router()
const userController: UserController = new UserController(UserServices);

userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', userController.register);

export default userRouter;
