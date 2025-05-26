import express from "express";
import { register, login, logout, uploads,getImages } from "../Controllers/authController.js";
import UserAuth from "../Middleware/UserAuth.js";


const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.post("/uploads",uploads)
AuthRouter.get("/getImages",getImages);
   
 
export default AuthRouter;
