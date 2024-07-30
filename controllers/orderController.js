import orderModel from "../models/orderModel.js";

class OrderController {
    constructor() { }

    async createOrder(req, res) {
        try {
            const { user, restaurant, items, totalAmount } = req.body;

            const newOrder = new orderModel({
                user,
                restaurant,
                items,
                totalAmount
            });

            await newOrder.save();

            return res.status(200).json({ message: "Order successfully placed", success: true, data: newOrder });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected error occurred while placing the order", success: false, error: err });
        }
    }

    async getOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await orderModel.findById(id).populate("user restaurant items.menuItem");

            if (!order) {
                return res.status(404).json({ message: "Order not found", success: false });
            }

            return res.status(200).json({ message: "Order details loaded successfully", success: true, data: order });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected error occurred while fetching the order details", success: false, error: err });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { orderStatus } = req.body;

            const order = await orderModel.findById(id);

            if (!order) {
                return res.status(404).json({ message: "Order not found", success: false });
            }

            order.orderStatus = orderStatus;
            await order.save();

            return res.status(200).json({ message: "Order status updated successfully", success: true, data: order });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected error occurred while updating the order status", success: false, error: err });
        }
    }

    async getOrdersByUser(req, res) {
        try {
            const { userId } = req.params;
            const orders = await orderModel.find({ user: userId }).populate("restaurant items.menuItem");

            return res.status(200).json({ message: "User orders loaded successfully", success: true, data: orders });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected error occurred while fetching user orders", success: false, error: err });
        }
    }

    async getOrdersByRestaurant(req, res) {
        try {
            const { restaurantId } = req.params;
            const orders = await orderModel.find({ restaurant: restaurantId }).populate("user items.menuItem");

            return res.status(200).json({ message: "Restaurant orders loaded successfully", success: true, data: orders });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected error occurred while fetching restaurant orders", success: false, error: err });
        }
    }
}

export default OrderController;
