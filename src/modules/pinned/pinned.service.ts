import { PinnedRepository } from "./pinned.repository.js";
import { CreatePinnedWebsiteDTO, UpdatePinnedWebsiteDTO } from "./pinned.types.js";

export class PinnedService {
  private pinnedRepository: PinnedRepository;

  constructor() {
    this.pinnedRepository = new PinnedRepository();
  }

  getPinnedWebsites(userId: number) {
    return this.pinnedRepository.findAllByUserId(userId);
  }

  createPinnedWebsite(userId: number, data: CreatePinnedWebsiteDTO) {
    const id = this.pinnedRepository.create(userId, data);
    return { id, ...data, user_id: userId };
  }

  updatePinnedWebsite(userId: number, id: number, data: UpdatePinnedWebsiteDTO) {
    const pinned = this.pinnedRepository.findById(id);
    if (!pinned || pinned.user_id !== userId) {
      throw new Error("Pinned website not found");
    }
    this.pinnedRepository.update(id, data);
    return { ...pinned, ...data };
  }

  deletePinnedWebsite(userId: number, id: number) {
    const pinned = this.pinnedRepository.findById(id);
    if (!pinned || pinned.user_id !== userId) {
      throw new Error("Pinned website not found");
    }
    this.pinnedRepository.delete(id);
    return { success: true };
  }
}
