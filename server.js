import app from "./index.js";
import connectDB from "./util/connectDB.js";

connectDB;
app.listen(3200,()=>{
    console.log("Zomato server is up and running at 3200");
})

