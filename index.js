import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import restaurantRouter from './routes/restaurantRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
dotenv.config();

app.use(json());
app.use(cors());
app.use("/api/user",userRouter);
app.use("/api/restaurant",restaurantRouter);
app.use("/api/order",orderRouter);

export default app;