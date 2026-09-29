// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type MediaType = 'image' | 'reel';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  media_type: MediaType;
  media_url: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaInsert {
  title: string;
  description?: string;
  media_type: MediaType;
  media_url: string;
  category?: string;
  display_order?: number;
  is_active?: boolean;
}

// ─────────────────────────────────────────────────────────────
// URL Detection & Validation
// ─────────────────────────────────────────────────────────────

export function isValidUrl(url: string): boolean {
  try {
    new URL(url.trim());
    return true;
  } catch {
    return false;
  }
}

export function isValidImageUrl(url: string): boolean {
  if (!isValidUrl(url)) return false;
  return true;
}

export type ReelUrlType = 'youtube' | 'youtube_short' | 'instagram' | 'direct_video' | 'unsupported';

export function detectReelUrlType(url: string): ReelUrlType {
  if (!isValidUrl(url)) return 'unsupported';
  try {
    const parsed = new URL(url.trim());
    const hostname = parsed.hostname.replace('www.', '');

    if (hostname === 'youtube.com' && parsed.pathname === '/watch') return 'youtube';
    if (hostname === 'youtube.com' && parsed.pathname.startsWith('/embed/')) return 'youtube';
    if (hostname === 'youtu.be') return 'youtube_short';
    if (hostname === 'youtube.com' && parsed.pathname.startsWith('/shorts/')) return 'youtube_short';
    if (hostname === 'instagram.com' && parsed.pathname.startsWith('/reel/')) return 'instagram';

    const path = parsed.pathname.toLowerCase();
    if (path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.ogg')) return 'direct_video';

    return 'unsupported';
  } catch {
    return 'unsupported';
  }
}

export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const hostname = parsed.hostname.replace('www.', '');

    let videoId: string | null = null;

    if (hostname === 'youtu.be') {
      videoId = parsed.pathname.replace('/', '');
    } else if (hostname === 'youtube.com') {
      if (parsed.pathname === '/watch') {
        videoId = parsed.searchParams.get('v');
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.replace('/shorts/', '');
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.replace('/embed/', '');
      }
    }

    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  } catch {
    return null;
  }
}

export function getInstagramEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const match = parsed.pathname.match(/\/reel\/([^/]+)/);
    if (!match) return null;
    return `https://www.instagram.com/reel/${match[1]}/embed/`;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// CRUD Operations (Local Storage based)
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'chathur_lakshana_media';

function getLocalMedia(): MediaItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalMedia(items: MediaItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function fetchActiveMedia(type: MediaType): Promise<MediaItem[]> {
  const items = getLocalMedia();
  return items
    .filter(item => item.media_type === type && item.is_active)
    .sort((a, b) => {
      if (a.display_order !== b.display_order) return a.display_order - b.display_order;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
}

export async function fetchAllMedia(): Promise<MediaItem[]> {
  const items = getLocalMedia();
  return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function insertMedia(item: MediaInsert): Promise<{ data: MediaItem | null; error: string | null }> {
  const items = getLocalMedia();
  const newItem: MediaItem = {
    ...item,
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    description: item.description || '',
    category: item.category || 'GENERAL',
    display_order: item.display_order ?? 0,
    is_active: item.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  items.push(newItem);
  saveLocalMedia(items);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: newItem, error: null };
}

export async function updateMedia(
  id: string,
  updates: Partial<MediaInsert>
): Promise<{ data: MediaItem | null; error: string | null }> {
  const items = getLocalMedia();
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return { data: null, error: 'Item not found' };
  }
  
  const updatedItem = {
    ...items[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  items[index] = updatedItem;
  saveLocalMedia(items);
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: updatedItem, error: null };
}

export async function deleteMedia(id: string): Promise<{ error: string | null }> {
  const items = getLocalMedia();
  const filtered = items.filter(item => item.id !== id);
  saveLocalMedia(filtered);
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return { error: null };
}
