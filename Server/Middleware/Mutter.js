import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../Config/Cloudinary.js';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Set up storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'upload', // Optional folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Accepted file formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional image resize
  },
});


const uploadDir = path.join(__dirname, 'upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// Initialize multer with the Cloudinary storage
const upload = multer({ storage });

export default upload;
