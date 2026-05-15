"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBanners } from "@/actions/banners";

interface Banner {
  id: string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string;
  link: string | null;
  buttonText: string | null;
}

const STATIC_BANNERS: Banner[] = [
  {
    id: "1",
    title: "The Future of Audio",
    subtitle: "Experience crystal clear sound with our new Quantum Pro Series. Now with active noise cancellation and 40-hour battery life.",
    imageUrl: "/images/banners/tech-1.png",
    link: "/products/quantum-pro-wireless-headphones",
    buttonText: "Experience Now",
  },
  {
    id: "2",
    title: "Elegance Reimagined",
    subtitle: "Discover our new Spring collection. Premium materials, timeless designs, and unmatched comfort for the modern individual.",
    imageUrl: "/images/banners/fashion-1.png",
    link: "/products?category=fashion",
    buttonText: "Shop Collection",
  },
  {
    id: "3",
    title: "Smart Living, Simplified",
    subtitle: "Transform your home with our integrated smart hub solutions. Seamless control at your fingertips, anytime, anywhere.",
    imageUrl: "/images/banners/lifestyle-1.png",
    link: "/products?category=electronics",
    buttonText: "Explore Smart Home",
  },
];

export function HeroBannerSlider() {
  const [banners, setBanners] = useState<Banner[]>(STATIC_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await getBanners();
      const activeBanners = data.filter(b => b.isActive);
      if (activeBanners.length > 0) {
        setBanners(activeBanners as Banner[]);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setBanners(currentBanners => {
      setCurrentIndex((prev) => (prev + 1) % currentBanners.length);
      return currentBanners;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setBanners(currentBanners => {
      setCurrentIndex((prev) => (prev - 1 + currentBanners.length) % currentBanners.length);
      return currentBanners;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.8 }
          }}
          className="absolute inset-0"
        >
          {/* Banner Image */}
          <div className="relative h-full w-full">
            <Image
              src={banners[currentIndex].imageUrl}
              alt={banners[currentIndex].title || "Banner"}
              fill
              priority
              className="object-cover opacity-80"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container-page">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
                    Featured Collection
                  </span>
                  <h2 className="mb-6 text-5xl font-black leading-tight text-white sm:text-6xl md:text-7xl">
                    {(banners[currentIndex].title || "").split(' ').map((word, i) => (
                      i === 2 ? <span key={i} className="gradient-text">{word} </span> : word + ' '
                    ))}
                  </h2>
                  <p className="mb-10 text-lg text-gray-300 sm:text-xl">
                    {banners[currentIndex].subtitle}
                  </p>
                  {banners[currentIndex].link && (
                    <div className="flex flex-wrap gap-4">
                      <Link href={banners[currentIndex].link || "#"}>
                        <motion.div
                          className="btn-primary flex items-center gap-2 px-8 py-4 text-base shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                          whileHover={{ scale: 1.05, boxShadow: "0_0_30px_rgba(139,92,246,0.5)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingBag className="h-5 w-5" />
                          {banners[currentIndex].buttonText || "Shop Now"}
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 sm:px-8">
        <button
          onClick={prevSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-white/20 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-white/20 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentIndex === i ? "w-10 bg-white" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
