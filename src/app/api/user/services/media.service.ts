import { BullService } from "../../../common/bull.service";
import cloudinaryService from "../../../common/cloudinary.service";
import mediaRepository from "../../../repository/media.repository";
class MediaService extends BullService {
  constructor() {
    super("media-upload");
    this.start();
  }

  async processJob(imagePath: string, userId: string) {
    console.log("Image upload job started");
    const result: any = await cloudinaryService.uploadImage(imagePath);
    const mediaData = {
      image: result.secure_url,
      userId: userId,
      publicId: result.public_id,
    };
    if (!result) {
      throw new Error("Image upload failed");
    }
    await mediaRepository.createMedia(mediaData);
    console.log("Image upload job completed");
  }

  async processMedia(imagePath: string, userId: number) {
    this.addToQueue({ imagePath, userId });
  }
}

export default new MediaService();
