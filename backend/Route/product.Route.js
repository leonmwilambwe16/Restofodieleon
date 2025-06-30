import express from "express";

import { getAllProducts,getPopularProducts,createProducts,deleteProducts } from "../Controller/product.controller.js";
import { protectRoute,adminRoute } from "../midelware/auth.midleware.js";
import multer from 'multer'


const productRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg and .png image files are allowed"));
    }
  }
});



productRoute.get("/",protectRoute,getAllProducts);
productRoute.get("/popular",getPopularProducts);
productRoute.post("/",protectRoute,adminRoute,upload.single("image"), createProducts);
productRoute.delete("/:id",protectRoute,adminRoute,deleteProducts);

export default productRoute;  


