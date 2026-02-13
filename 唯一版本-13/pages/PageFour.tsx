
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 辅助函数：判断是否包含中文字符
const hasChinese = (text: string) => /[\u4e00-\u9fa5]/.test(text);

// 文本渲染组件：根据内容自动切换字体
const SmartText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`${hasChinese(text) ? 'font-song' : ''} ${className}`}>
      {text}
    </span>
  );
};

const SectionHeader = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2 mb-3 opacity-30 px-1">
    <span className="text-[9px] font-black tracking-[0.2em]">
      / <SmartText text={text} />
    </span>
  </div>
);

// 画廊图片数据
const GA_IMAGES = [
  "https://github.com/ism0v0/000000/blob/4f68a33e3ef12e492cfab0990ad8ad963752d7ac/%E6%88%AA%E5%B1%8F2026-02-05%2017.20.04.png?raw=true"
];

const SkillItem = ({ 
  title, 
  subtitle, 
  active, 
  onClick 
}: { 
  title: string; 
  subtitle?: string; 
  active?: boolean; 
  onClick?: () => void 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -1.5, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`bg-white/40 backdrop-blur-md p-4 mb-2 flex justify-between items-center shadow-sm group ${onClick ? 'cursor-pointer active:scale-95' : 'cursor-default'} transition-all`}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className={`text-[12px] md:text-[13px] font-black tracking-tighter leading-none mb-0.5 ${onClick ? 'group-hover:text-blue-600' : ''} transition-colors`}>
            <SmartText text={title} />
          </h3>
          {subtitle && (
            <p className="text-[8px] font-bold opacity-30 tracking-widest">
              <SmartText text={subtitle} />
            </p>
          )}
        </div>
        <div className={`w-1 h-1 rounded-full ${active ? 'bg-blue-600' : 'bg-black/10'}`} />
      </div>
    </motion.div>
  );
};

const PageFour: React.FC = () => {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const closeGallery = () => setGalleryIndex(null);

  return (
    <div className="relative w-full h-full bg-[#fdfdfd] overflow-hidden flex flex-col justify-start items-center px-4 md:px-6 pt-[12vh] md:pt-[15vh]">
      <div className="w-full max-w-5xl z-10 flex-1 overflow-y-auto hide-scrollbar pb-10">
        <header className="mb-6 md:mb-8 flex items-end justify-between border-b border-black/30 pb-4 px-1">
          <div>
            <h1 className="text-xl md:text-4xl font-black tracking-tighter leading-none">
              <span className="text-black font-song">语言 & </span>
              <span className="text-blue-600 font-song">技能</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start px-1">
          <div>
            <SectionHeader text="语言" />
            <div className="flex flex-col">
              <SkillItem title="英语" subtitle="IELTS 7.0" active />
              <SkillItem title="法语" subtitle="熟练" active />
              <SkillItem title="西班牙语" subtitle="熟练" active />
            </div>
          </div>

          <div>
            <SectionHeader text="数据分析" />
            <div className="flex flex-col">
              <SkillItem title="Tableau" subtitle="熟练" active />
              <SkillItem 
                title="Google Analytics" 
                subtitle="点击查看证书" 
                active 
                onClick={() => setGalleryIndex(0)}
              />
              <SkillItem title="Excel" subtitle="熟练" active />
            </div>
          </div>

          <div>
            <SectionHeader text="创意设计" />
            <div className="flex flex-col">
              <SkillItem title="After Effects" subtitle="熟练" active />
              <SkillItem title="Photoshop" subtitle="熟练" active />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Gallery Overlay */}
      <AnimatePresence>
        {galleryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl cursor-zoom-out p-4 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="w-full h-full relative overflow-hidden bg-white/5 flex items-center justify-center">
                <motion.img
                  key={galleryIndex}
                  src={GA_IMAGES[galleryIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-full max-h-full object-contain p-2 md:p-4 select-none"
                  alt="Skill preview"
                />
              </div>

              {/* Close Button Icon */}
              <button 
                onClick={closeGallery}
                className="absolute -top-10 right-0 md:-top-12 md:-right-12 text-white/40 hover:text-white transition-all hover:rotate-90 duration-300"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageFour;
