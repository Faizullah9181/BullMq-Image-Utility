import Media from "../models/image.models";

class MediaRepository {
  async createMedia(data: any) {
    return await Media.create(data);
  }
}

export default new MediaRepository();
