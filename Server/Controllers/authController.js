import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import ImageModel from "../Models/ImageModel.js";
import transporter from "../Config/Nodemailer.js";


import UserAuth from "../Middleware/UserAuth.js";
export const register = async (req, res) => {
    const { name, email, password,role } = req.body;
    console.log("Register called with:", req.body);


    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please fill all the fields" });
    }


    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ name, email, password: hashedPassword ,role});
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
       
        res.cookie("token", token, {
            
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

       

    





        return res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

       
    
        return res.json({ success: true, message: "Login successful" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



export const logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      }); 
      return res.json({ success: true, message: "Logout successful" }); 

    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }

}




export const uploads = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.json({ success: false, message: "No file uploaded" });
  }

  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Save new Image document in DB
    const newImage = new Image({
      imageUrl: `/upload/${file.filename}`,  // public URL path
      uploadedBy: user._id,
    });
    await newImage.save();

    return res.json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    return res.json({ success: true, images });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
