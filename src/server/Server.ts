import express, {Express, Router} from "express";
import UserRoutes from "./routes/UserRoutes";
import TaskRoutes from "./routes/TaskRoutes";
import {ErrorHandler} from "./middlewares/ErrorHandler";
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

const taskRouter: Router = TaskRoutes;
const userRouter: Router = UserRoutes;

const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true
};

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));

app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);
app.use(ErrorHandler)   //  Error handler needs to be after all the routes, not before

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
