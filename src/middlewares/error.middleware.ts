import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction)=> {
    err.statusCode = err.status || 500;
    err.message = err.message || "Internal server Error!";
     //wrong mongodb!
     if(err.name === "CastError"){
        const message = `Resource not found, Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
     }
     //duplicate key
     if(err.name === 1100){
        const message = `Duplicate key ${err.keyValue} entered!`;
        err = new ErrorHandler(message, 400);
     }
     //wrong jwt error
     if(err.name === "JsonWebTokenEror"){
        const message = `Json Web Token is expired! try again.`;
        err = new ErrorHandler(message, 400);
     }
     //Jwt token expire error
     if(err.name === "TokenExpireError"){
        const message = `Json Web Token is expired! try again.`;
        err = new ErrorHandler(message, 400);
     }
     res.status(err.statusCode).json({
        success: false,
        message: err.message,
     });
}