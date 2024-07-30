import { Router } from "express";
import OrderController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post("/create", auth, (req, res) => orderController.createOrder(req, res));
orderRouter.get("/get/:id", auth, (req, res) => orderController.getOrder(req, res));
orderRouter.put("/updateStatus/:id", auth, (req, res) => orderController.updateOrderStatus(req, res));
orderRouter.get("/user/:userId", auth, (req, res) => orderController.getOrdersByUser(req, res));
orderRouter.get("/restaurant/:restaurantId", auth, (req, res) => orderController.getOrdersByRestaurant(req, res));

export default orderRouter;
