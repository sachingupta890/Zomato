import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    }
});
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    rating: {
        type: String,
    },
    address: {
        type: String,
    },
    menu: [menuSchema] 
});

export default mongoose.model("Restaurant", restaurantSchema, "restaurants");
