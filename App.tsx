
import React, { useRef, useEffect, useState } from 'react';
import Home from './pages/Home';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import PageFour from './pages/PageFour';

// 预加载关键资源以消除动画卡顿
const Preloader = () => {
  const assets = [
    "https://github.com/ism0v0/000000/blob/d5ca22df0770a5c47ef908fbd2ec782055bad3a6/Google-Analytics-Symbol.png?raw=true",
    "https://github.com/ism0v0/000000/blob/d5ca22df0770a5c47ef908fbd2ec782055bad3a6/microsoft-excel-mobile-apps-logo-free-png.png?raw=true",
    "https://github.com/ism0v0/000000/blob/391adb62e5c65fcd1c39966cd7a44fa46ad2ac3b/%E6%88%AA%E5%B1%8F2026-02-12%2014.34.03.png?raw=true",
    "https://github.com/ism0v0/000000/blob/5d1fd41331158f62a031ca12a0c8ef1ff33e85dd/Gemini_Generated_Image_c5c8w6c5c8w6c5c8.png?raw=true",
    "https://github.com/ism0v0/000000/blob/ee741b9618625db069d3ff640e580e635d31490d/Adobe-Photoshop-Logo-2.png?raw=true"
  ];

  return (
    <div className="fixed opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
      {assets.map(src => <img key={src} src={src} alt="" />)}
    </div>
  );
};

const Navigation = ({ activeIndex, onNavClick }: { activeIndex: number, onNavClick: (index: number) => void }) => {
  const links = [
    { label: 'Home', isZh: false },
    { label: '经历', isZh: true },
    { label: '作品', isZh: true },
    { label: '技能', isZh: true }
  ];
  
  return (
    <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center px-4 md:px-5 py-2">
      <div className="flex items-center space-x-4 md:space-x-10 px-1">
        {links.map((link, i) => (
          <button
            key={link.label}
            onClick={() => onNavClick(i)}
            className={`flex items-baseline space-x-1 group transition-all outline-none`}
          >
            <span className={`text-[7px] md:text-[8px] font-black transition-all duration-300 ${
              activeIndex === i ? 'text-black opacity-100 italic' : 'text-black opacity-10 group-hover:italic group-hover:opacity-40'
            }`}>
              0{i + 1}
            </span>
            <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 font-bold ${
              link.isZh ? 'font-song' : ''
            } ${
              activeIndex === i 
                ? 'text-black opacity-100 italic' 
                : 'text-black opacity-30 hover:opacity-100 hover:italic'
            }`}>
              {link.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    if (index !== activeIndex && index >= 0 && index < 4) {
      setActiveIndex(index);
    }
  };

  const scrollToSection = (index: number) => {
    containerRef.current?.scrollTo({
      left: index * containerRef.current.offsetWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden selection:bg-black selection:text-white bg-[#fafafa]">
      <Preloader />
      <Navigation activeIndex={activeIndex} onNavClick={scrollToSection} />
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar touch-pan-x"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <section className="min-w-full h-full snap-start relative flex-shrink-0 overflow-hidden">
          <Home />
        </section>
        <section className="min-w-full h-full snap-start relative flex-shrink-0 overflow-hidden">
          <PageTwo />
        </section>
        <section className="min-w-full h-full snap-start relative flex-shrink-0 overflow-hidden">
          <PageThree />
        </section>
        <section className="min-w-full h-full snap-start relative flex-shrink-0 overflow-hidden">
          <PageFour />
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default App;
