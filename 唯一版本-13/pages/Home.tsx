
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingObject from '../components/FloatingObject';

// 整理后的 15 张唯一图片链接
const IMAGE_URLS = [
  "https://raw.githubusercontent.com/ism0v0/000000/9865a5c6218f7774943dc9a584a9cdaeb9bc6bad/5d2726342ef9fc1c16eb9b9a99407851.jpg",
  "https://raw.githubusercontent.com/ism0v0/000000/85be5fff174513bcaa4af2011a26077e5e53e9c6/IMG_2699.JPG",
  "https://raw.githubusercontent.com/ism0v0/000000/9865a5c6218f7774943dc9a584a9cdaeb9bc6bad/IMG_0746.jpg",
  "https://raw.githubusercontent.com/ism0v0/000000/dc69a65ee248b6139e016ab99988934404863355/IMG_0754.jpg",
  "https://raw.githubusercontent.com/ism0v0/000000/53ed47dacdb1e9b361b1d17a771cc05c05edf342/IMG_2685.jpg",
  "https://raw.githubusercontent.com/ism0v0/000000/dc69a65ee248b6139e016ab99988934404863355/IMG_0755.jpg",
  "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/a14018e9b2d672149b58c9ca281ef0c1.jpg?raw=true",
  "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_2684.jpg?raw=true",
  "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_0762.jpg?raw=true",
  "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_0760.jpg?raw=true",
  "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_0765.jpg?raw=true",
  "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_0747.jpg?raw=true",
  "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_0748.jpg?raw=true",
  "https://raw.githubusercontent.com/ism0v0/000000/85be5fff174513bcaa4af2011a26077e5e53e9c6/IMG_2686.jpg",
  "https://github.com/ism0v0/000000/blob/daadaddb2a8e089686cec02eb4e74a101d529179/IMG_1779.jpg?raw=true"
];

const SPEED = 58;

const ASSETS = [
  { url: IMAGE_URLS[0], pos: "top-[10%]", offset: 0.05, dir: 'ltr' as const },
  { url: IMAGE_URLS[1], pos: "top-[15%]", offset: 0.38, dir: 'ltr' as const },
  { url: IMAGE_URLS[2], pos: "top-[12%]", offset: 0.72, dir: 'ltr' as const },
  { url: IMAGE_URLS[3], pos: "top-[25%]", offset: 0.15, dir: 'ltr' as const },
  { url: IMAGE_URLS[4], pos: "top-[28%]", offset: 0.48, dir: 'ltr' as const },
  { url: IMAGE_URLS[5], pos: "top-[30%]", offset: 0.85, dir: 'ltr' as const },
  { url: IMAGE_URLS[6], pos: "top-[42%]", offset: 0.25, dir: 'ltr' as const },
  { url: IMAGE_URLS[7], pos: "top-[58%]", offset: 0.08, dir: 'rtl' as const },
  { url: IMAGE_URLS[8], pos: "top-[60%]", offset: 0.42, dir: 'rtl' as const },
  { url: IMAGE_URLS[9], pos: "top-[55%]", offset: 0.75, dir: 'rtl' as const },
  { url: IMAGE_URLS[10], pos: "top-[72%]", offset: 0.18, dir: 'rtl' as const },
  { url: IMAGE_URLS[11], pos: "top-[75%]", offset: 0.52, dir: 'rtl' as const },
  { url: IMAGE_URLS[12], pos: "top-[70%]", offset: 0.88, dir: 'rtl' as const },
  { url: IMAGE_URLS[13], pos: "top-[85%]", offset: 0.32, dir: 'rtl' as const },
  { url: IMAGE_URLS[14], pos: "top-[48%]", offset: 0.65, dir: 'ltr' as const },
];

const Home: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 4,
        y: (e.clientY / window.innerHeight - 0.5) * 4,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main 
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#fdfdfd]"
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        {ASSETS.map((asset, i) => (
          <FloatingObject 
            key={i}
            src={asset.url}
            className={`${asset.pos} w-16 md:w-28`}
            direction={asset.dir}
            startOffset={asset.offset}
            duration={SPEED}
            zIndex={20 + i}
            onClick={() => setSelectedImage(asset.url)}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-50 select-none -translate-y-16 md:-translate-y-32"
        style={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', damping: 60, stiffness: 40 }}
      >
        <div className="px-4 flex flex-col items-center">
          <div className="w-full flex justify-start mb-0 -ml-1 md:-ml-12">
            <p className="text-[8px] md:text-xs font-bold tracking-[0.2em] text-black font-song italic">
              你好，我是
            </p>
          </div>
          
          <h1 className="text-[14vw] md:text-[6.5vw] leading-none font-black ink-bleed tracking-[0.3em] md:tracking-[0.45em] text-black font-song pl-[0.3em] md:pl-[0.45em]">
            薛语涵
          </h1>
        </div>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 cursor-zoom-out p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[90vh] object-contain pointer-events-none block"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 -right-4 md:-top-8 md:-right-12 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Home;
