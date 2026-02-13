
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  color: string;
  img: string;
}

const WORKS: WorkItem[] = [
  {
    id: "01",
    title: "CMCI Winter Festival",
    subtitle: "Visual Identity",
    meta: "2024",
    color: "#ff3e3e", 
    img: "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_2698.JPG?raw=true"
  },
  {
    id: "02",
    title: "Colèchi",
    subtitle: "Digital Experience",
    meta: "2024",
    color: "#ff96c8",
    img: "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/IMG_0747.jpg?raw=true"
  }
];

// CMCI Detail Image Groups
const CMCI_GROUPS = {
  group1: [
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/IMG_0767.jpg?raw=true",
    "https://github.com/ism0v0/000000/blob/c92bbed32769e2b32ec2de036822230774d0e79f/IMG_0754.jpg?raw=true",
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/IMG_0768.jpg?raw=true",
    "https://github.com/ism0v0/000000/blob/c92bbed32769e2b32ec2de036822230774d0e79f/IMG_1779.jpg?raw=true"
  ],
  group2: [
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/5d2726342ef9fc1c16eb9b9a99407851%202.jpg?raw=true",
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/a14018e9b2d672149b58c9ca281ef0c1%202.jpg?raw=true",
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/IMG_2684%202.jpg?raw=true"
  ],
  group3: [
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/IMG_0772.jpg?raw=true",
    "https://github.com/ism0v0/000000/blob/7508e31e5d9ee3609105f017d3584bae0009392c/IMG_0755%202.jpg?raw=true",
    "https://github.com/ism0v0/000000/blob/55e4ca9dd3c6f0d5c872889dc0be0c06c50c2ce6/IMG_0753.jpg?raw=true"
  ],
  group4: [
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/IMG_2699%202.JPG?raw=true",
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/IMG_2698%202.JPG?raw=true",
    "https://github.com/ism0v0/000000/blob/43528e78183f255b21fa4bcd0da70c6f73b8cc27/IMG_2700%202.JPG?raw=true"
  ]
};

// Colechi Detail Images (18 total for 3x6 grid)
const COLECHI_IMAGES = [
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0746%202.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0747%202.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0748%202.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0757.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0760%202.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0762%202.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0764%202.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0765%202.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0776.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0777.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0781.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0782.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0783.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0784.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0785.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0786.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0787.jpg?raw=true",
  "https://github.com/ism0v0/jll/blob/4ceccb5eace124feffa19dab14409a1fbfb10d5d/IMG_0788.jpg?raw=true"
];

const CMCI_DetailView: React.FC<{ onClose: () => void, onImageZoom: (src: string) => void }> = ({ onClose, onImageZoom }) => {
  const brandColor = "#7fb2dd"; 

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      className="fixed inset-0 z-[150] bg-[#2282c6] overflow-y-auto hide-scrollbar touch-auto"
    >
      <div className="max-w-6xl mx-auto py-16 md:py-24 px-4 md:px-8 relative">
        <button 
          onClick={onClose}
          className="fixed top-4 md:top-8 right-4 md:right-8 z-[160] w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-all backdrop-blur-md"
        >
           <svg width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
             <path d="M18 6L6 18M6 6l12 12" />
           </svg>
        </button>

        <header className="mb-12 md:mb-20 text-white flex flex-col items-center text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="text-2xl md:text-7xl font-black tracking-tighter leading-none mb-4 md:mb-6">
              CMCI Winter Festival
            </h1>
            <a 
              href="https://www.instagram.com/transformed_cmci?igsh=bXJkYnl1ZHY5bm00" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 text-[10px] md:text-sm font-bold tracking-widest hover:underline transition-all"
              style={{ color: brandColor }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@transformed_cmci</span>
            </a>
          </motion.div>
        </header>

        <div className="space-y-12 md:space-y-32">
          <section className="w-full">
            <div className="grid grid-cols-3 gap-0">
              {CMCI_GROUPS.group4.map((src, i) => (
                <motion.div key={i} whileHover={{ zIndex: 10, scale: 1.02 }} className="cursor-zoom-in" onClick={() => onImageZoom(src)}>
                  <img src={src} className="w-full h-auto block" alt="detail" />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="w-full">
            <div className="max-w-xl mx-auto px-4">
              <motion.div whileHover={{ zIndex: 10, scale: 1.01 }} className="cursor-zoom-in w-full shadow-2xl" onClick={() => onImageZoom(CMCI_GROUPS.group1[3])}>
                <img src={CMCI_GROUPS.group1[3]} className="w-full h-auto block" alt="detail" />
              </motion.div>
            </div>
          </section>

          <section className="w-full">
            <div className="grid grid-cols-3 gap-0">
              {CMCI_GROUPS.group3.map((src, i) => (
                <motion.div key={i} whileHover={{ zIndex: 10, scale: 1.02 }} className="cursor-zoom-in" onClick={() => onImageZoom(src)}>
                  <img src={src} className="w-full h-auto block" alt="detail" />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="w-full">
            <div className="grid grid-cols-3 gap-0">
              {CMCI_GROUPS.group1.slice(0, 3).map((src, i) => (
                <motion.div key={i} whileHover={{ zIndex: 10, scale: 1.02 }} className="cursor-zoom-in" onClick={() => onImageZoom(src)}>
                  <img src={src} className="w-full h-auto block" alt="detail" />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto w-full px-2">
            <div className="flex flex-col gap-0">
              {CMCI_GROUPS.group2.map((src, i) => (
                <motion.div key={i} whileHover={{ zIndex: 10, scale: 1.02 }} className="cursor-zoom-in" onClick={() => onImageZoom(src)}>
                  <img src={src} className="w-full h-auto block" alt="detail" />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
        <div className="h-20 md:h-40" />
      </div>
    </motion.div>
  );
};

const Colechi_DetailView: React.FC<{ onClose: () => void, onImageZoom: (src: string) => void }> = ({ onClose, onImageZoom }) => {
  const brandColor = "#7fb2dd"; 

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      className="fixed inset-0 z-[150] bg-[#2282c6] overflow-y-auto hide-scrollbar touch-auto"
    >
      <div className="max-w-6xl mx-auto py-16 md:py-24 px-4 md:px-8 relative">
        <button 
          onClick={onClose}
          className="fixed top-4 md:top-8 right-4 md:right-8 z-[160] w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-all backdrop-blur-md"
        >
           <svg width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
             <path d="M18 6L6 18M6 6l12 12" />
           </svg>
        </button>

        <header className="mb-12 md:mb-20 text-white flex flex-col items-center text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="text-3xl md:text-7xl font-black tracking-tighter leading-none mb-4 md:mb-6">Colèchi</h1>
            <a 
              href="https://www.instagram.com/_colechi?igsh=MTh5ZHZyYjRwaGR4Ng==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 text-[10px] md:text-sm font-bold tracking-widest hover:underline transition-all"
              style={{ color: brandColor }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@_colechi</span>
            </a>
          </motion.div>
        </header>

        {/* 3x6 Grid Layout - Seamless & Square Ratios */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-3 gap-0">
            {COLECHI_IMAGES.map((src, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ zIndex: 10, scale: 1.02 }}
                className="cursor-zoom-in aspect-square overflow-hidden bg-white/5" 
                onClick={() => onImageZoom(src)}
              >
                <img src={src} className="w-full h-full object-cover block" alt={`Colechi ${i}`} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-20 md:h-40" />
      </div>
    </motion.div>
  );
};

const WorkCard: React.FC<{ work: WorkItem; index: number; onClick: () => void }> = ({ work, index, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center w-full cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square max-w-[120px] md:max-w-[180px] flex items-center justify-center mb-2">
        {/* Record Disc Animation */}
        <motion.div 
          className="absolute w-[55%] aspect-square rounded-full z-0 translate-x-4 group-hover:translate-x-12 transition-transform duration-700 shadow-[-4px_4px_10px_rgba(0,0,0,0.3)]"
          style={{ 
            backgroundColor: work.color,
            backgroundImage: `repeating-radial-gradient(circle, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 2px, transparent 4px, transparent 6px)`
          }}
        >
          <div className="absolute inset-0 m-auto w-1/4 h-1/4 rounded-full bg-black/10 border border-white/20 flex items-center justify-center overflow-hidden">
            <img src={work.img} className="w-full h-full object-contain opacity-40" alt="" />
          </div>
        </motion.div>

        {/* Cover Art */}
        <div className="relative z-10 w-[72%] h-[72%] bg-transparent border border-black/20 shadow-[-6px_8px_15px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col -translate-x-2 md:-translate-x-4 transition-all duration-500 group-hover:-translate-y-2">
           <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img src={work.img} className="w-full h-auto max-h-full object-cover" alt={work.title} />
           </div>
        </div>
      </div>

      <div className="text-center px-1">
        <h3 className="text-sm md:text-xl font-black tracking-tighter leading-tight mb-1 text-black transition-all duration-300 group-hover:italic">
          {work.title}
        </h3>
      </div>
    </div>
  );
};

const PageThree: React.FC = () => {
  const brandColor = "#7fb2dd";
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <main 
      className="w-full h-screen bg-[#2282c6] flex flex-col px-4 md:px-16 select-none overflow-hidden relative items-center justify-start pt-[12vh] md:pt-[15vh]"
    >
      <div className="w-full max-w-5xl z-10">
        <header className="mb-4 md:mb-8 flex items-end justify-between border-b pb-4 px-2" style={{ borderBottomColor: brandColor }}>
          <div>
            <h1 className="text-xl md:text-4xl font-black tracking-tighter leading-none">
              <span className="font-song uppercase" style={{ color: brandColor }}>作品</span>
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto w-full grid grid-cols-2 gap-4 md:gap-16 pt-8 px-2">
          <WorkCard key={WORKS[0].id} work={WORKS[0]} index={0} onClick={() => setActiveProject("cmci")} />
          <WorkCard key={WORKS[1].id} work={WORKS[1]} index={1} onClick={() => setActiveProject("colechi")} />
        </div>
      </div>

      <AnimatePresence>
        {activeProject === "cmci" && (
          <CMCI_DetailView onClose={() => setActiveProject(null)} onImageZoom={(src) => setZoomedImage(src)} />
        )}
        {activeProject === "colechi" && (
          <Colechi_DetailView onClose={() => setActiveProject(null)} onImageZoom={(src) => setZoomedImage(src)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 cursor-zoom-out p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={zoomedImage} alt="zoomed" className="max-w-full max-h-[95vh] object-contain shadow-2xl block" />
              <button onClick={() => setZoomedImage(null)} className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PageThree;
