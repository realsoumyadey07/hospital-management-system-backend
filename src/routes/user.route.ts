import express from 'express';
import { createUser } from '../controllers/user.controller';

const userRouter = express.Router();

//user router
userRouter.post("/create-user", createUser);

export default userRouter;