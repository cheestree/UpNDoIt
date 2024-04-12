import { RequestHandler } from 'express'
import UserServices from "../services/UserServices";

export const Authenticator: RequestHandler = async (req, res, next) => {
    const services = new UserServices()
    if (!req.cookies.token) {
        return res.status(401).send("No token!");
    }

    const token: string = req.cookies.token;

    try {
        const credential = await services.checkAuth(token);

        if (credential) {
            res.cookie('token', credential);
            return next();
        }
        return res.send("token invalid");
    } catch (err) {
        console.log(err)
        return res.send(err);
    }
}
