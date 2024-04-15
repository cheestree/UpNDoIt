import {validationResult} from "express-validator";
import {BadRequestError} from "../models/error/Error";
import {RequestHandler} from "express";

export const ValidateInput: RequestHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    console.log(errors)
    throw new BadRequestError("Input is not correct")
}
