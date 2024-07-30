import mongoose from "mongoose";

const connectDB = mongoose.connect(process.env.MONGO_URL,{
    dbName : "Zomato",
    appName : "ZomatoClone"
});
console.log("Database connected successfully!");

export default connectDB;