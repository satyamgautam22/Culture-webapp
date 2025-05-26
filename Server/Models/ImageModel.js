import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const ImageModel = mongoose.model("Image", ImageSchema);

export default ImageModel;
