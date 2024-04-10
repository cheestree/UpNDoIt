import express, {Express, Router} from "express";
import UserRoutes from "./routes/UserRoutes";
import TaskRoutes from "./routes/TaskRoutes";
import ErrorMiddleware from "./middlewares/ErrorHandler";

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

const taskRouter: Router = TaskRoutes;
const userRouter: Router = UserRoutes;

app.use(express.json())

app.use('/task', taskRouter);
app.use('/user', userRouter);
app.use(ErrorMiddleware.errorHandler)   //  Error handler needs to be after all the routes, not before

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
