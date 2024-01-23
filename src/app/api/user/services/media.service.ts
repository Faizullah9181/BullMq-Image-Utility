import { BullService } from "../../../common/bull.service";
import cloudinaryService from "../../../common/cloudinary.service";
import mediaRepository from "../../../repository/media.repository";
import { IMediaData } from "./interface";

class MediaService extends BullService<IMediaData> {
  constructor() {
    super("media-upload");
    this.start();
  }

  async processJob(data: IMediaData) {
    const { imagePath, userId } = data;
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

    await this.stop();
  }

  async processMedia(imagePath: string, userId: number) {
    this.addToQueue({ imagePath, userId }, 3);
  }
}

export default new MediaService();
