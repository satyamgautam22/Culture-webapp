import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'satyamgautam22105@gmail.com',         // Your Gmail address
    pass: 'hvam kurl voru fwev',       // App password (NOT your Gmail password)
  },
});

export default transporter;