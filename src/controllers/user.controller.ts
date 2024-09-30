import { NextFunction, Request, Response } from "express";
import { CtachAsyncError } from "../middlewares/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { IUser, User } from "../models/user.model";

//create user

export const createUser = CtachAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const {fullName, email, phoneNumber} = req.body as IUser;
        if([fullName, email, phoneNumber].some((i)=> i==="")){
            return next(new ErrorHandler("All fields are required!", 400));
        }
        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            return next(new ErrorHandler("Email already exist, try with another one!", 400));
        }
        const user: IUser = {
            fullName,
            email,
            phoneNumber
        };
        const newUser = await User.create(user);
        res.status(200).json({message: "User has been created!", success: true, user});
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})