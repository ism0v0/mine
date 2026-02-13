
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingObjectProps {
  src?: string;
  className?: string;
  duration?: number;
  direction?: 'ltr' | 'rtl';
  startOffset?: number; // 0-1 之间的值，决定初始出现在轨迹的哪个位置
  zIndex?: number;
  onClick?: () => void;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ 
  src, 
  className = "", 
  duration = 40, 
  direction = 'ltr',
  startOffset = 0,
  zIndex = 10,
  onClick
}) => {
  // 轨迹范围：从屏幕外 -40vw 到 140vw
  const startX = direction === 'ltr' ? '-40vw' : '140vw';
  const endX = direction === 'ltr' ? '140vw' : '-40vw';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`absolute cursor-pointer pointer-events-auto select-none ${className}`}
      style={{ 
        zIndex,
        willChange: 'transform',
        transform: 'scale(1.33)' // 基础缩放 1.33
      }}
    >
      <motion.div
        animate={{ x: [startX, endX] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          // 使用负延迟让动画在加载时就处于“进行中”的状态，从而实现即时显示
          delay: -duration * startOffset,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05, zIndex: 100, transition: { duration: 0.3 } }}
          /* 优化阴影：更近、更实 (4px 偏移) */
          className="w-full h-full rounded-none overflow-visible shadow-[-4px_4px_12px_rgba(0,0,0,0.5)] bg-white"
        >
          {src && (
            <img 
              src={src} 
              alt="Portfolio item" 
              className="w-full h-auto block pointer-events-none"
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingObject;
