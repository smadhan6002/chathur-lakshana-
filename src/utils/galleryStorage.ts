// ─────────────────────────────────────────────────────────────
// DEPRECATED: This file previously used IndexedDB for local storage.
// Media is now managed via Supabase — see src/lib/mediaService.ts
// This file is kept for backward compatibility references only.
// ─────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  imageData: string; // Legacy: base64 or URL
  title: string;
  category: string;
  year: string;
  description: string;
  createdAt: number;
}

// No-op stubs (unused — Supabase handles all persistence now)
export const galleryStorage = {
  async getGalleryItems(): Promise<GalleryItem[]> { return []; },
  async saveGalleryItem(_item: GalleryItem): Promise<void> {},
  async updateGalleryItem(_item: GalleryItem): Promise<void> {},
  async deleteGalleryItem(_id: string): Promise<void> {},
};
