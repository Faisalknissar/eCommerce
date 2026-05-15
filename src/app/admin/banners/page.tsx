"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { getBanners, createBanner, updateBanner, deleteBanner } from "@/actions/banners";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    link: "",
    buttonText: "Shop Now",
    position: 0,
  });

  const fetchBanners = async () => {
    setLoading(true);
    const data = await getBanners();
    setBanners(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEdit = (banner: any) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      imageUrl: banner.imageUrl,
      link: banner.link || "",
      buttonText: banner.buttonText || "Shop Now",
      position: banner.position || 0,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    const res = await deleteBanner(id);
    if (res.success) {
      toast.success("Banner deleted");
      fetchBanners();
    } else {
      toast.error("Failed to delete banner");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = editingBanner 
      ? await updateBanner(editingBanner.id, formData)
      : await createBanner(formData);

    if (res.success) {
      toast.success(editingBanner ? "Banner updated" : "Banner created");
      setShowModal(false);
      setEditingBanner(null);
      setFormData({ title: "", subtitle: "", imageUrl: "", link: "", buttonText: "Shop Now", position: 0 });
      fetchBanners();
    } else {
      toast.error(res.error || "Operation failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>Website Banners</h1>
          <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>Manage homepage hero sliders</p>
        </motion.div>
        <motion.button
          className="btn-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingBanner(null);
            setFormData({ title: "", subtitle: "", imageUrl: "", link: "", buttonText: "Shop Now", position: banners.length });
            setShowModal(true);
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Banner
          </span>
        </motion.button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {banners.map((banner, i) => (
            <motion.div
              key={banner.id}
              className="glass-card group overflow-hidden p-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="relative h-40 w-full bg-surface-muted">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title || "Banner"}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                  <h3 className="text-white font-bold truncate">{banner.title || "Untitled Banner"}</h3>
                  <p className="text-white/70 text-xs truncate">{banner.subtitle}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button 
                    onClick={() => handleEdit(banner)}
                    className="p-1.5 rounded-lg bg-black/50 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(banner.id)}
                    className="p-1.5 rounded-lg bg-black/50 text-white backdrop-blur-md hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-surface-elevated text-text-secondary">Pos: {banner.position}</span>
                  <span className={`h-2 w-2 rounded-full ${banner.isActive ? "bg-green-500" : "bg-gray-500"}`} />
                  <span className="text-xs text-text-muted">{banner.isActive ? "Active" : "Inactive"}</span>
                </div>
                {banner.link && (
                  <Link href={banner.link} target="_blank" className="text-text-muted hover:text-accent-primary">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && banners.length === 0 && (
          <div className="col-span-full py-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent-primary" />
          </div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              className="glass-strong relative w-full max-w-lg rounded-2xl p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <h2 className="text-xl font-bold mb-6">{editingBanner ? "Edit Banner" : "New Banner"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">Title</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="E.g. The Future of Audio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">Subtitle</label>
                  <textarea 
                    className="input-field min-h-[80px]" 
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    placeholder="Short description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">Image URL</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="/images/banners/tech-1.png"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-text-secondary">Link</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                      placeholder="/products/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-text-secondary">Button Text</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={formData.buttonText}
                      onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">Position</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary flex-1"
                  >
                    {editingBanner ? "Update Banner" : "Create Banner"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
