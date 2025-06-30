import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Module/auth.schema.js";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let accessToken;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }


    if (!accessToken || accessToken.trim() === '') {
      return res.status(401).json({ message: "Unauthorized - No access token provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Access Token expired please Login again" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in protectRoute:", error);
    return res.status(500).json({ message: "Internal server error - Invalid Token protect middleware" });
  }
};


export const adminRoute = (req,res,next)=>{
  if(req.user && req.user.role === "admin"){
    next();
  } else {
    return res.status(403).json({message:"Forbidden - Admins only"});
  }
}