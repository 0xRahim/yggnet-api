export interface PinnedWebsite {
  id: number;
  user_id: number;
  title: string;
  url: string;
}

export type CreatePinnedWebsiteDTO = Omit<PinnedWebsite, "id" | "user_id">;
export type UpdatePinnedWebsiteDTO = Partial<CreatePinnedWebsiteDTO>;
