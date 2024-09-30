require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import userRouter from "./routes/user.route";

export const app = express();

app.use(express.json({
     limit: "50mb"
}));
app.use(express.urlencoded({
     extended: true,
     limit : "50mb"
}))
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true
  })
);


//routes
app.use("/api/v1/", userRouter);


app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("Ok tested👍");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);