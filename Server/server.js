import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './Config/MongoDb.js';
import ImageRoutes from './Routes/ImageRoutes.js'; //
import fs from 'fs'; // 

 // To serve static image files
import multer from 'multer';
import path from 'path';


import AuthRouter from './Routes/AuthRoutes.js';

dotenv.config();
ConnectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    
    credentials: true
}));

app.get('/', (req, res) => 
    res.send("Api is running")
);

app.use('/upload', express.static('upload')); 

app.use('/api/auth', AuthRouter);
app.use('/api/images', ImageRoutes);


const uploadDir = 'upload';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
