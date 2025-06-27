  import express from 'express';
import dotenv from "dotenv";
import authRoute from "./Route/auth.Route.js";
import productRoute from './Route/product.Route.js';
import cartRoute from './Route/cart.Route.js';
import paymentRoute from './Route/payment.Route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

connectDB();
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4005;

const __dirname = path.resolve()

app.use(cors({
   origin: 'http://localhost:5174', 
  credentials: true,
}));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment", paymentRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"/frontend/dist")));

  
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  })

};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});