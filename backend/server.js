  import express from 'express';
import dotenv from "dotenv";
import authRoute from "./Route/auth.Route.js";
import productRoute from './Route/product.Route.js';
import cartRoute from './Route/cart.Route.js';
import paymentRoute from './Route/payment.Route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import rateLimit from "express-rate-limit";


connectDB();
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4005;

app.use(compression());
app.use(cors({
   origin: ['http://localhost:5174', 'https://restofodieleon-frontend.onrender.com'], 
  credentials: true,
}));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment", paymentRoute);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})