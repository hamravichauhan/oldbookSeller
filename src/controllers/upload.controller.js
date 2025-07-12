// src/controllers/uploadController.js
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "oldbooks",
      transformation: [{ width: 500, height: 750, crop: "limit" }],
    });

    fs.unlinkSync(req.file.path); // clean up local file

    res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
