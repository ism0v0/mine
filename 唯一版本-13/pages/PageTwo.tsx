
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: 'data' | 'visual';
  accentColor: string;
  stats: { label: string; value: string; trend: number[] }[];
  description: string;
  images?: string[];
  skills?: { url: string; label: string }[];
  jobTitle?: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: "01",
    company: "Collov AI",
    jobTitle: "增长营销分析实习生",
    role: "growth",
    period: "2025.09- 2025.12",
    type: 'data',
    accentColor: "#3b82f6",
    description: "", 
    stats: [
      { label: "转化率", value: "+15%", trend: [2, 5, 8, 12, 14, 15, 15] },
      { label: "ROAS", value: "107%", trend: [80, 85, 90, 95, 102, 105, 107] }
    ],
    skills: [
      { url: "https://github.com/ism0v0/000000/blob/d5ca22df0770a5c47ef908fbd2ec782055bad3a6/Google-Analytics-Symbol.png?raw=true", label: "Google analytics" },
      { url: "https://github.com/ism0v0/000000/blob/d5ca22df0770a5c47ef908fbd2ec782055bad3a6/microsoft-excel-mobile-apps-logo-free-png.png?raw=true", label: "Excel" },
      { url: "https://github.com/ism0v0/000000/blob/391adb62e5c65fcd1c39966cd7a44fa46ad2ac3b/%E6%88%AA%E5%B1%8F2026-02-12%2014.34.03.png?raw=true", label: "Vibe coding" }
    ]
  },
  {
    id: "02",
    company: "游卡",
    jobTitle: "内容运营实习生",
    role: "content",
    period: "2024.6-2024.9",
    type: 'data',
    accentColor: "#ef4444",
    description: "", 
    stats: [
      { label: "播放量", value: "4.2M", trend: [0, 50, 150, 800, 2100, 3500, 4200] },
      { label: "完播率", value: "+45%", trend: [20, 25, 22, 35, 40, 42, 45] }
    ],
    skills: [
      { url: "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/Gemini_Generated_Image_c5c8w6c5c8w6c5c8.png?raw=true", label: "After effects" },
      { url: "https://github.com/ism0v0/000000/blob/ee741b9618625db069d3ff640e580e635d31490d/Adobe-Photoshop-Logo-2.png?raw=true", label: "Photoshop" }
    ] 
  },
  {
    id: "03",
    company: "Colèchi",
    jobTitle: "品牌策划实习生",
    role: "design",
    period: "2023.11-2024.5",
    type: 'visual',
    accentColor: "#8b5cf6",
    description: "", 
    images: [
      "https://github.com/ism0v0/000000/blob/7aa3a7ba6e7dfc66edd3b533fefc77fbb07546c9/IMG_0765.jpg?raw=true",
      "https://github.com/ism0v0/000000/blob/7aa3a7ba6e7dfc66edd3b533fefc77fbb07546c9/IMG_0764.jpg?raw=true",
      "https://github.com/ism0v0/000000/blob/7aa3a7ba6e7dfc66edd3b533fefc77fbb07546c9/IMG_0762.jpg?raw=true",
      "https://github.com/ism0v0/000000/blob/7aa3a7ba6e7dfc66edd3b533fefc77fbb07546c9/IMG_0760.jpg?raw=true"
    ],
    skills: [
      { url: "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/Gemini_Generated_Image_c5c8w6c5c8w6c5c8.png?raw=true", label: "After effects" },
      { url: "https://github.com/ism0v0/000000/blob/ee741b9618625db069d3ff640e580e635d31490d/Adobe-Photoshop-Logo-2.png?raw=true", label: "Photoshop" }
    ],
    stats: []
  }
];

const AnimatedLine = ({ data, color }: { data: number[], color: string }) => {
  const width = 90;
  const height = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((d - min) / (max - min || 1)) * height
  }));
  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
  );
};

const SkillIcon: React.FC<{ 
  skill: { url: string; label: string }; 
  delay: number;
}> = ({ skill, delay }) => {
  const isAIGenerated = skill.url.includes('Gemini_Generated_Image');
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        damping: 15, 
        stiffness: 250, 
        delay: delay 
      }}
      className="flex flex-col items-center space-y-2 will-change-transform"
    >
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0], transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center cursor-pointer relative z-10"
        >
          <img 
            src={skill.url} 
            loading="eager"
            className={`w-full h-full object-contain transition-all duration-300 ${isAIGenerated ? '' : 'mix-blend-multiply brightness-110 contrast-125'}`} 
            alt={skill.label} 
          />
        </motion.div>
      </div>
      <span className="text-[8px] md:text-[10px] font-bold tracking-tight text-center max-w-[80px] md:max-w-[100px] leading-tight text-black opacity-60">
        {skill.label}
      </span>
    </motion.div>
  );
};

const ExperienceRow: React.FC<{ 
  exp: Experience; 
  isOpen: boolean; 
  onClick: () => void;
  onImageClick: (url: string) => void;
}> = ({ exp, isOpen, onClick, onImageClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  // 当 isOpen 变为 true 时，自动滚动到视野内
  useEffect(() => {
    if (isOpen && rowRef.current) {
      setTimeout(() => {
        rowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300); // 略微延迟，等待高度动画开始
    }
  }, [isOpen]);

  return (
    <div ref={rowRef} className="w-full relative overflow-hidden will-change-transform scroll-mt-20">
      <div 
        onClick={onClick}
        className="group flex items-center justify-between py-3 md:py-4 px-4 md:px-16 cursor-pointer hover:bg-white/20 transition-colors bg-white/40 backdrop-blur-md w-full"
      >
        <div className="flex items-center space-x-4 md:space-x-12">
          <span className="text-[8px] md:text-[9px] font-black opacity-20 w-4 md:w-6 tracking-tighter" style={{ color: exp.accentColor }}>{exp.id}</span>
          <div className="flex flex-col md:flex-row md:items-baseline md:space-x-3">
            <h2 className={`text-sm md:text-xl font-black tracking-tighter transition-all duration-300 group-hover:italic ${exp.company === '游卡' ? 'font-yahei' : ''}`}>
              {exp.company}
            </h2>
            {exp.jobTitle && (
              <span className="text-[8px] md:text-xs font-medium tracking-tight font-song whitespace-nowrap opacity-40">
                {exp.jobTitle}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full border transition-all duration-300 ${isOpen ? 'scale-110 shadow-sm' : 'bg-transparent border-black/10'}`} 
               style={{ backgroundColor: isOpen ? exp.accentColor : 'transparent', borderColor: isOpen ? exp.accentColor : 'inherit' }} />
          <span className="text-[8px] md:text-[9px] font-bold opacity-30 w-20 md:w-24 text-right tabular-nums">{exp.period}</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-white/30 backdrop-blur-xl w-full will-change-[height,opacity]"
          >
            <div className="px-4 md:px-24 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 w-full">
              <div className="lg:col-span-7 flex flex-col justify-start w-full">
                <div className="flex flex-col relative pt-4 w-full">
                  {exp.skills && exp.skills.length > 0 && (
                    <>
                      <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest font-song absolute -top-6 md:-top-8 left-2 md:left-6 opacity-40">
                        技能应用
                      </span>
                      <div className="flex flex-wrap gap-4 md:gap-10 mt-0 items-start justify-center md:justify-start">
                        {exp.skills.map((skill, i) => (
                          <SkillIcon key={i} skill={skill} delay={0.1 + i * 0.05} />
                        ))}
                      </div>
                    </>
                  )}
                  {exp.description && (
                    <p className="text-[10px] md:text-xs font-medium leading-relaxed text-black/70 mt-6 max-w-sm px-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-start items-center lg:items-end w-full">
                <div className="w-full flex justify-center lg:justify-end">
                  {exp.type === 'data' ? (
                    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                      {exp.stats.map((s, i) => (
                        <div 
                          key={i}
                          className="bg-white/60 p-3 md:p-4 flex flex-col justify-between shadow-sm rounded-sm backdrop-blur-md"
                        >
                          <span className="text-[6px] md:text-[7px] font-black uppercase tracking-widest opacity-40 mb-2 md:mb-3">{s.label}</span>
                          <div className="flex items-end justify-between">
                            <span className="text-sm md:text-lg font-black tracking-tighter">{s.value}</span>
                            <AnimatedLine data={s.trend} color={exp.accentColor} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-0 w-full max-w-[200px] md:max-w-[240px] overflow-hidden">
                      {exp.images?.map((img, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.05, zIndex: 20 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onImageClick(img);
                          }}
                          className="aspect-square overflow-hidden relative cursor-pointer group/img"
                        >
                          <img src={img} alt="Snapshot" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PageTwo: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div 
      className="relative h-screen w-full flex flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("https://github.com/ism0v0/000000/blob/69576dc0d1edafbeec7f8e02ab2c8f8f62154fb7/unnamed.jpg?raw=true")' }}
    >
      <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden hide-scrollbar relative z-10 pt-[10vh] md:pt-[15vh] w-full">
        
        <div className="w-full flex justify-center px-4 md:px-16">
          <div className="w-full max-w-5xl">
            <header className="pb-4 md:pb-6 flex flex-col md:flex-row md:items-end justify-between shrink-0">
              <div>
                <h1 className="font-song text-xl md:text-4xl font-black tracking-tighter leading-none">
                  实习经历
                </h1>
              </div>
            </header>
          </div>
        </div>

        <section className="flex-1 w-full overflow-x-hidden">
          <div className="flex flex-col w-full">
            {EXPERIENCES.map((exp) => (
              <ExperienceRow 
                key={exp.id} 
                exp={exp} 
                isOpen={openId === exp.id}
                onClick={() => setOpenId(openId === exp.id ? null : exp.id)}
                onImageClick={(url) => setSelectedImage(url)}
              />
            ))}
          </div>
          <div className="h-16 md:h-20" />
        </section>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-20 bg-black/60 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full overflow-hidden shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[85vh] object-contain pointer-events-none"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black text-white rounded-full transition-colors duration-300 backdrop-blur-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTwo;
