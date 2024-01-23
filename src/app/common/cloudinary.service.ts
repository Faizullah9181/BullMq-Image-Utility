import cloudinary from "cloudinary";
import dotenv from "dotenv";

class CloudinaryService {
  constructor() {
    dotenv.config();
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(image: string) {
    try {
      const result = await cloudinary.v2.uploader.upload(image);
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new CloudinaryService();
