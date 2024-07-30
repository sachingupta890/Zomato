import { Router } from "express";
import RestaurantController from "../controllers/restaurantController.js";
import auth from "../middlewares/auth.js";

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.get("/all", auth, (req, res) => restaurantController.getAll(req, res));
restaurantRouter.post("/add", auth, (req, res) => restaurantController.addResto(req, res));
restaurantRouter.put("/updateMenu", auth, (req, res) => restaurantController.updateMenu(req, res));
restaurantRouter.get("/get/:id", auth, (req, res) => restaurantController.getById(req, res));

export default restaurantRouter;
