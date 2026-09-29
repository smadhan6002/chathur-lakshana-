import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_CATEGORIES } from './config';
import {
  fetchAllMedia,
  insertMedia,
  updateMedia,
  deleteMedia,
  isValidImageUrl,
  detectReelUrlType,
  getYouTubeEmbedUrl,
  getInstagramEmbedUrl,
  isValidUrl,
} from '../lib/mediaService';
import type { MediaItem } from '../lib/mediaService';

// ─── Tab / View States ────────────────────────────────────────
type TabState = 'gallery_manage' | 'gallery_add' | 'reels_manage' | 'reels_add';

// ─── Shared style tokens ──────────────────────────────────────
const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em',
  textTransform: 'uppercase', cursor: 'pointer',
  padding: '12px 24px', border: 'none', transition: 'all 0.2s ease',
};

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--color-bg-primary)',
  border: '1px solid var(--color-border)',
  padding: '12px 16px', fontFamily: "var(--font-body)",
  fontSize: '16px', color: 'var(--color-text-primary)', outline: 'none',
  marginBottom: '20px', boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: '12px',
  letterSpacing: '0.15em', fontWeight: 600, color: 'var(--color-accent)',
  textTransform: 'uppercase', display: 'block', marginBottom: '8px',
};

// ─── Reel Preview Component ───────────────────────────────────
function ReelPreview({ url }: { url: string }) {
  const type = detectReelUrlType(url);

  if (type === 'youtube' || type === 'youtube_short') {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (!embedUrl) return <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', padding: '12px 0' }}>Invalid YouTube URL</div>;
    return (
      <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '16px', background: '#000' }}>
        <iframe
          src={embedUrl}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube preview"
        />
      </div>
    );
  }

  if (type === 'instagram') {
    const embedUrl = getInstagramEmbedUrl(url);
    if (!embedUrl) return null;
    return (
      <div style={{ marginBottom: '16px' }}>
        <iframe
          src={embedUrl}
          style={{ width: '100%', height: '500px', border: 'none', maxWidth: '320px' }}
          scrolling="no"
          allowTransparency
          title="Instagram reel preview"
        />
      </div>
    );
  }

  if (type === 'direct_video') {
    return (
      <video
        src={url}
        controls
        style={{ width: '100%', maxHeight: '300px', marginBottom: '16px', background: '#000' }}
      />
    );
  }

  return null;
}

// ─── Image Preview Component ──────────────────────────────────
function ImagePreview({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [url]);

  if (!url) return null;

  return (
    <div style={{ marginBottom: '16px', border: '1px solid var(--color-border)', overflow: 'hidden', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-secondary)' }}>
      {!loaded && !error && (
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', padding: '20px' }}>Loading preview...</div>
      )}
      {error && (
        <div style={{ color: '#e57373', fontSize: '13px', padding: '20px', textAlign: 'center' }}>
          ⚠ Could not load image.<br/>Check the URL and try again.
        </div>
      )}
      <img
        src={url}
        alt="Preview"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────
export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<TabState>('gallery_manage');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // All media items from DB
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);

  // ── Gallery form state ──────────────────────────────────────
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imgTitle, setImgTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgCategory, setImgCategory] = useState(GALLERY_CATEGORIES[1] || 'PERFORMANCES');
  const [imgDescription, setImgDescription] = useState('');
  const [imgUrlError, setImgUrlError] = useState('');

  // ── Reel form state ─────────────────────────────────────────
  const [reelEditingId, setReelEditingId] = useState<string | null>(null);
  const [reelTitle, setReelTitle] = useState('');
  const [reelUrl, setReelUrl] = useState('');
  const [reelDescription, setReelDescription] = useState('');
  const [reelUrlError, setReelUrlError] = useState('');

  // ─── Data loading ─────────────────────────────────────────
  const loadMedia = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchAllMedia();
    setAllMedia(data);
    setIsLoading(false);
  }, []);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  const images = allMedia.filter(m => m.media_type === 'image');
  const reels = allMedia.filter(m => m.media_type === 'reel');

  // ─── Toast helper ─────────────────────────────────────────
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4500);
  };

  // ─── Gallery form helpers ─────────────────────────────────
  const resetImgForm = () => {
    setEditingId(null);
    setImgTitle('');
    setImgUrl('');
    setImgCategory(GALLERY_CATEGORIES[1] || 'PERFORMANCES');
    setImgDescription('');
    setImgUrlError('');
  };

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setImgUrlError('');

    if (!imgTitle.trim()) { showToast('Please enter an image title.', 'error'); return; }
    if (!imgUrl.trim()) { setImgUrlError('Please enter a valid image URL.'); return; }
    if (!isValidImageUrl(imgUrl)) { setImgUrlError('Please enter a valid URL.'); return; }

    setIsSaving(true);
    try {
      if (editingId) {
        const { error } = await updateMedia(editingId, {
          title: imgTitle,
          description: imgDescription,
          media_url: imgUrl,
          category: imgCategory,
        });
        if (error) { showToast('Failed to update image. Please try again.', 'error'); return; }
        showToast('Image updated successfully.');
      } else {
        const { error } = await insertMedia({
          title: imgTitle,
          description: imgDescription,
          media_type: 'image',
          media_url: imgUrl,
          category: imgCategory,
        });
        if (error) { showToast('Failed to save image. Please try again.', 'error'); return; }
        showToast('Image added to gallery successfully.');
        resetImgForm();
      }
      await loadMedia();
      setView('gallery_manage');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditImage = (item: MediaItem) => {
    setEditingId(item.id);
    setImgTitle(item.title);
    setImgUrl(item.media_url);
    setImgCategory(item.category || GALLERY_CATEGORIES[1]);
    setImgDescription(item.description || '');
    setImgUrlError('');
    setView('gallery_add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteImage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    const { error } = await deleteMedia(id);
    if (error) { showToast('Failed to delete image. Please try again.', 'error'); return; }
    showToast('Image deleted successfully.');
    await loadMedia();
  };

  const handleToggleImageActive = async (item: MediaItem) => {
    await updateMedia(item.id, { is_active: !item.is_active });
    await loadMedia();
  };

  // ─── Reel form helpers ────────────────────────────────────
  const resetReelForm = () => {
    setReelEditingId(null);
    setReelTitle('');
    setReelUrl('');
    setReelDescription('');
    setReelUrlError('');
  };

  const validateReelUrl = (url: string): string => {
    if (!url.trim()) return 'Please enter a reel URL.';
    if (!isValidUrl(url)) return 'Please enter a valid URL.';
    const type = detectReelUrlType(url);
    if (type === 'unsupported') {
      return 'Unsupported URL format. Use YouTube, YouTube Shorts, Instagram Reel, or direct MP4 links.';
    }
    return '';
  };

  const handleSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    const urlErr = validateReelUrl(reelUrl);
    setReelUrlError(urlErr);
    if (urlErr) return;
    if (!reelTitle.trim()) { showToast('Please enter a reel title.', 'error'); return; }

    setIsSaving(true);
    try {
      if (reelEditingId) {
        const { error } = await updateMedia(reelEditingId, {
          title: reelTitle,
          description: reelDescription,
          media_url: reelUrl,
        });
        if (error) { showToast('Failed to update reel. Please try again.', 'error'); return; }
        showToast('Reel updated successfully.');
      } else {
        const { error } = await insertMedia({
          title: reelTitle,
          description: reelDescription,
          media_type: 'reel',
          media_url: reelUrl,
        });
        if (error) { showToast('Failed to save reel. Please try again.', 'error'); return; }
        showToast('Reel saved successfully.');
        resetReelForm();
      }
      await loadMedia();
      setView('reels_manage');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditReel = (item: MediaItem) => {
    setReelEditingId(item.id);
    setReelTitle(item.title);
    setReelUrl(item.media_url);
    setReelDescription(item.description || '');
    setReelUrlError('');
    setView('reels_add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReel = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reel?')) return;
    const { error } = await deleteMedia(id);
    if (error) { showToast('Failed to delete reel. Please try again.', 'error'); return; }
    showToast('Reel deleted successfully.');
    await loadMedia();
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-alternate)',
      color: 'var(--color-text-primary)',
      paddingBottom: '100px',
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-primary)',
        padding: '20px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: '0 4px 20px rgba(59, 41, 34, 0.05)',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-body)", fontSize: '12px',
            letterSpacing: '0.2em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '4px'
          }}>Chathur Lakshana</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(18px, 3vw, 24px)', color: 'var(--color-text-heading)' }}>
            ADMIN DASHBOARD
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Welcome, Admin
          </div>
          <button
            onClick={onLogout}
            style={{ ...btnStyle, background: 'transparent', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(184, 138, 50, 0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            LOGOUT
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 16px' }}>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', borderRight: '2px solid var(--color-border)', paddingRight: '16px', flexWrap: 'wrap' }}>
            <button
              className={view === 'gallery_manage' ? "btn-primary" : ""}
              onClick={() => { setView('gallery_manage'); resetImgForm(); }}
              style={{
                ...btnStyle, fontSize: '11px',
                background: view === 'gallery_manage' ? undefined : 'transparent',
                color: view === 'gallery_manage' ? undefined : 'var(--color-text-heading)',
                border: view === 'gallery_manage' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              GALLERY ({images.length})
            </button>
            <button
              className={view === 'gallery_add' ? "btn-primary" : ""}
              onClick={() => { resetImgForm(); setView('gallery_add'); }}
              style={{
                ...btnStyle, fontSize: '11px',
                background: view === 'gallery_add' ? undefined : 'transparent',
                color: view === 'gallery_add' ? undefined : 'var(--color-text-heading)',
                border: view === 'gallery_add' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              + ADD IMAGE
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className={view === 'reels_manage' ? "btn-primary" : ""}
              onClick={() => { setView('reels_manage'); resetReelForm(); }}
              style={{
                ...btnStyle, fontSize: '11px',
                background: view === 'reels_manage' ? undefined : 'transparent',
                color: view === 'reels_manage' ? undefined : 'var(--color-text-heading)',
                border: view === 'reels_manage' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              REELS ({reels.length})
            </button>
            <button
              className={view === 'reels_add' ? "btn-primary" : ""}
              onClick={() => { resetReelForm(); setView('reels_add'); }}
              style={{
                ...btnStyle, fontSize: '11px',
                background: view === 'reels_add' ? undefined : 'transparent',
                color: view === 'reels_add' ? undefined : 'var(--color-text-heading)',
                border: view === 'reels_add' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              + ADD REEL
            </button>
          </div>
        </div>

        {/* Toast Message */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                backgroundColor: toast.type === 'error' ? 'rgba(229, 115, 115, 0.1)' : 'rgba(184, 138, 50, 0.1)',
                border: `1px solid ${toast.type === 'error' ? 'rgba(229,115,115,0.4)' : 'var(--color-border)'}`,
                color: toast.type === 'error' ? '#e57373' : 'var(--color-accent)',
                padding: '16px', fontFamily: "var(--font-body)",
                fontSize: '14px', marginBottom: '24px', borderRadius: '4px',
              }}
            >
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-secondary)', fontFamily: "var(--font-body)" }}>
            Loading media...
          </div>
        )}

        {/* ─── ADD / EDIT IMAGE ─── */}
        {!isLoading && view === 'gallery_add' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', padding: 'clamp(20px, 4vw, 40px)' }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--color-accent)', marginBottom: '28px' }}>
              {editingId ? 'Edit Gallery Image' : 'Add Gallery Image'}
            </h2>
            <form onSubmit={handleSaveImage} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Image Title *</label>
              <input
                type="text" required style={inputStyle}
                value={imgTitle} onChange={e => setImgTitle(e.target.value)}
                placeholder="e.g. Annual Day Performance 2025"
              />

              <label style={labelStyle}>Category</label>
              <select
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                value={imgCategory} onChange={e => setImgCategory(e.target.value)}
              >
                {GALLERY_CATEGORIES.filter(c => c !== 'ALL').map(cat => (
                  <option key={cat} value={cat} style={{ background: 'var(--color-bg-primary)' }}>{cat}</option>
                ))}
              </select>

              <label style={labelStyle}>Image URL *</label>
              <input
                type="url" required style={{ ...inputStyle, marginBottom: imgUrlError ? '4px' : '20px' }}
                value={imgUrl} onChange={e => { setImgUrl(e.target.value); setImgUrlError(''); }}
                placeholder="https://example.com/image.jpg"
              />
              {imgUrlError && (
                <div style={{ color: '#e57373', fontSize: '13px', fontFamily: "var(--font-body)", marginBottom: '16px' }}>
                  {imgUrlError}
                </div>
              )}

              {/* Live preview */}
              {imgUrl && isValidUrl(imgUrl) && <ImagePreview url={imgUrl} />}

              <label style={labelStyle}>Description (Optional)</label>
              <textarea
                style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                value={imgDescription} onChange={e => setImgDescription(e.target.value)}
                placeholder="Brief description of the image..."
              />

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <button
                  type="submit" disabled={isSaving} className="btn-primary"
                  style={{ ...btnStyle, flex: '1 1 200px', opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'wait' : 'pointer' }}
                >
                  {isSaving ? 'SAVING...' : editingId ? 'UPDATE IMAGE' : 'SAVE IMAGE'}
                </button>
                <button
                  type="button"
                  onClick={() => { setView('gallery_manage'); resetImgForm(); }}
                  style={{ ...btnStyle, flex: '1 1 120px', background: 'transparent', color: 'var(--color-text-heading)', border: '1px solid var(--color-border)' }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── MANAGE IMAGES ─── */}
        {!isLoading && view === 'gallery_manage' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--color-accent)', marginBottom: '24px' }}>
              Manage Gallery Images
            </h2>
            {images.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: "var(--font-body)" }}>
                No images added yet. Click <strong>+ ADD IMAGE</strong> to get started.
              </div>
            ) : (
              <div className="admin-media-grid">
                {images.map(item => (
                  <div key={item.id} style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    {/* Image Preview */}
                    <div style={{ height: '180px', overflow: 'hidden', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <img
                        src={item.media_url}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--color-text-secondary)', fontSize: '13px', fontFamily: "var(--font-body)", textAlign: 'center', padding: '8px' }}>
                        ⚠ Image failed to load
                      </div>
                      {!item.is_active && (
                        <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#e57373', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', letterSpacing: '0.1em' }}>
                          HIDDEN
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {item.category}
                      </div>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: '18px', color: 'var(--color-text-heading)', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h4>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                        {item.media_url}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button onClick={() => handleEditImage(item)}
                          style={{ ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: '1 1 60px', background: 'rgba(184, 138, 50, 0.1)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                          EDIT
                        </button>
                        <button onClick={() => handleToggleImageActive(item)}
                          style={{ ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: '1 1 60px', background: item.is_active ? 'rgba(100,100,100,0.1)' : 'rgba(100,200,100,0.1)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                          {item.is_active ? 'HIDE' : 'SHOW'}
                        </button>
                        <button onClick={() => handleDeleteImage(item.id)}
                          style={{ ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: '1 1 60px', background: 'rgba(229, 115, 115, 0.1)', color: '#e57373', border: '1px solid rgba(229, 115, 115, 0.3)' }}>
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ─── ADD / EDIT REEL ─── */}
        {!isLoading && view === 'reels_add' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', padding: 'clamp(20px, 4vw, 40px)' }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--color-accent)', marginBottom: '28px' }}>
              {reelEditingId ? 'Edit Reel / Video' : 'Add Reel / Video'}
            </h2>

            <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'rgba(184,138,50,0.07)', border: '1px solid var(--color-border)', fontFamily: "var(--font-body)", fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-accent)' }}>Supported formats:</strong> YouTube, YouTube Shorts, Instagram Reels, direct MP4/WebM video URLs
            </div>

            <form onSubmit={handleSaveReel} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Reel / Video Title *</label>
              <input
                type="text" required style={inputStyle}
                value={reelTitle} onChange={e => setReelTitle(e.target.value)}
                placeholder="e.g. Annual Day Reel 2025"
              />

              <label style={labelStyle}>Video / Reel URL *</label>
              <input
                type="url" required style={{ ...inputStyle, marginBottom: reelUrlError ? '4px' : '20px' }}
                value={reelUrl} onChange={e => { setReelUrl(e.target.value); setReelUrlError(''); }}
                placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
              />
              {reelUrlError && (
                <div style={{ color: '#e57373', fontSize: '13px', fontFamily: "var(--font-body)", marginBottom: '16px' }}>
                  ⚠ {reelUrlError}
                </div>
              )}

              {/* Live preview */}
              {reelUrl && isValidUrl(reelUrl) && detectReelUrlType(reelUrl) !== 'unsupported' && (
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ ...labelStyle, marginBottom: '12px' }}>Preview</label>
                  <ReelPreview url={reelUrl} />
                </div>
              )}

              <label style={labelStyle}>Description (Optional)</label>
              <textarea
                style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                value={reelDescription} onChange={e => setReelDescription(e.target.value)}
                placeholder="Brief description of the reel..."
              />

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <button
                  type="submit" disabled={isSaving} className="btn-primary"
                  style={{ ...btnStyle, flex: '1 1 200px', opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'wait' : 'pointer' }}
                >
                  {isSaving ? 'SAVING...' : reelEditingId ? 'UPDATE REEL' : 'SAVE REEL'}
                </button>
                <button
                  type="button"
                  onClick={() => { setView('reels_manage'); resetReelForm(); }}
                  style={{ ...btnStyle, flex: '1 1 120px', background: 'transparent', color: 'var(--color-text-heading)', border: '1px solid var(--color-border)' }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── MANAGE REELS ─── */}
        {!isLoading && view === 'reels_manage' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--color-accent)', marginBottom: '24px' }}>
              Manage Reels / Videos
            </h2>
            {reels.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: "var(--font-body)" }}>
                No reels added yet. Click <strong>+ ADD REEL</strong> to get started.
              </div>
            ) : (
              <div className="admin-media-grid">
                {reels.map(item => {
                  const urlType = detectReelUrlType(item.media_url);
                  return (
                    <div key={item.id} style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                      {/* Reel Embed Preview */}
                      <div style={{ position: 'relative' }}>
                        {(urlType === 'youtube' || urlType === 'youtube_short') && (() => {
                          const embedUrl = getYouTubeEmbedUrl(item.media_url);
                          return embedUrl ? (
                            <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                              <iframe
                                src={embedUrl}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={item.title}
                              />
                            </div>
                          ) : null;
                        })()}
                        {urlType === 'instagram' && (
                          <div style={{ padding: '20px', background: 'var(--color-bg-secondary)', textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
                            <div style={{ fontFamily: "var(--font-body)", fontSize: '13px', color: 'var(--color-text-secondary)' }}>Instagram Reel</div>
                          </div>
                        )}
                        {urlType === 'direct_video' && (
                          <video src={item.media_url} controls style={{ width: '100%', maxHeight: '200px', display: 'block', background: '#000' }} />
                        )}
                        {urlType === 'unsupported' && (
                          <div style={{ padding: '20px', background: 'var(--color-bg-secondary)', textAlign: 'center' }}>
                            <div style={{ fontFamily: "var(--font-body)", fontSize: '13px', color: '#e57373' }}>⚠ Unsupported URL format</div>
                          </div>
                        )}
                        {!item.is_active && (
                          <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#e57373', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', letterSpacing: '0.1em' }}>
                            HIDDEN
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '16px' }}>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
                          {urlType.replace('_', ' ')}
                        </div>
                        <h4 style={{ fontFamily: "var(--font-display)", fontSize: '18px', color: 'var(--color-text-heading)', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h4>
                        {item.description && (
                          <p style={{ fontFamily: "var(--font-body)", fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                            {item.description}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button onClick={() => handleEditReel(item)}
                            style={{ ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: '1 1 60px', background: 'rgba(184, 138, 50, 0.1)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                            EDIT
                          </button>
                          <button onClick={() => handleDeleteReel(item.id)}
                            style={{ ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: '1 1 60px', background: 'rgba(229, 115, 115, 0.1)', color: '#e57373', border: '1px solid rgba(229, 115, 115, 0.3)' }}>
                            DELETE
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Responsive styles */}
      <style>{`
        .admin-media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        @media (max-width: 480px) {
          .admin-media-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
