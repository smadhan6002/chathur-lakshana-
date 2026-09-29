// ─────────────────────────────────────────────────────────────
// DEPRECATED: This file previously used IndexedDB for local storage.
// Reels are now managed via Supabase — see src/lib/mediaService.ts
// This file is kept for backward compatibility references only.
// ─────────────────────────────────────────────────────────────

export interface InstagramReel {
  id: string;
  name: string;
  url: string;
  description: string;
  createdAt: number;
}

// No-op stubs (unused — Supabase handles all persistence now)
export const instagramStorage = {
  async getReels(): Promise<InstagramReel[]> { return []; },
  async saveReel(_item: InstagramReel): Promise<void> {},
  async deleteReel(_id: string): Promise<void> {},
};
