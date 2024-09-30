import { NextFunction, Request, Response } from "express";

export const CtachAsyncError = (theFunc: any)=> (req: Request, res: Response, next: NextFunction)=> {
    Promise.resolve(theFunc(req, res, next)).catch(next);
}