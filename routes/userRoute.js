import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", (req, res) => userController.registerUser(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));

export default userRouter;
