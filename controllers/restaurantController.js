import restaurantModel from "../models/restaurantModel.js";

class RestaurantController {
    constructor() { }

    async getAll(req, res) {
        try {
            const allResto = await restaurantModel.find();
            return res.status(200).json({ message: "Successfully loaded the restaurants", success: true, data: allResto });
        } catch (err) {
            return res.status(402).json({ message: "Error fetching the data", success: false, data: null });
        }
    }

    async addResto(req, res) {
        try {
            const { name, image, rating, address, menuItems } = req.body;

            const newRestaurant = new restaurantModel({
                name,
                image,
                rating,
                address,
                menu: menuItems
            });

            await newRestaurant.save();

            return res.status(200).json({ message: "Restaurant successfully added", success: true, data: newRestaurant });
        } catch (err) {
            return res.status(402).json({ message: "Unexpected error occurred while adding the restaurant", success: false, error: err });
        }
    }

    async updateMenu(req, res) {
        try {
            const { restaurantId, menuItem } = req.body;

            const restaurant = await restaurantModel.findById(restaurantId);
            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant not found", success: false });
            }

            const menuIndex = restaurant.menu.findIndex(item => item._id.equals(menuItem._id));

            if (menuIndex !== -1) {
                restaurant.menu[menuIndex] = menuItem;
            } else {
                restaurant.menu.push(menuItem);
            }

            await restaurant.save();
            return res.status(200).json({ message: "Menu successfully updated", success: true, data: restaurant });
        } catch (err) {
            return res.status(402).json({ message: "Unexpected error occurred while updating the menu", success: false, error: err });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const restaurant = await restaurantModel.findById(id);

            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant not found", success: false });
            }

            return res.status(200).json({ message: "Restaurant details loaded successfully", success: true, data: restaurant });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected error occurred while fetching the restaurant details", success: false, error: err });
        }
    }
}

export default RestaurantController;
