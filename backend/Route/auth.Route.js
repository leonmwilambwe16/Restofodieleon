import express from "express";
import { Signup,Login,Logout,RefreshToken } from "../Controller/auth.controller.js";

const  authRoute = express.Router();

authRoute.post("/signup", Signup);
authRoute.post("/login", Login);
authRoute.post("/logout", Logout);
authRoute.post("/refresh-token", RefreshToken);


export default authRoute;