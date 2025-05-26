import express from "express";
import multer from "multer";
import path from "path";
import { uploads, getImages } from "../Controllers/authController.js";
import  upload  from "../Middleware/Mutter.js"; 
const ImageRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadimg = multer({ storage });

ImageRoutes.post("/uploads", uploadimg.single('image'), uploads);
ImageRoutes.get("/getImages", getImages);

export default ImageRoutes;
