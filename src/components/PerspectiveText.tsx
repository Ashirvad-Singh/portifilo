import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PerspectiveTextProps {
  text: string;
  className?: string;
}

const PerspectiveText = ({ text, className = '' }: PerspectiveTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`perspective-container py-12 ${className}`}>
      <div 
        className="flex flex-wrap justify-center gap-4 md:gap-6"
        style={{ perspective: "1000px" }}
      >
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;

          return (
            <Word 
              key={index} 
              word={word} 
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}
      </div>
    </div>
  );
};

interface WordProps {
  word: string;
  scrollYProgress: any;
  start: number;
  end: number;
}

const Word = ({ word, scrollYProgress, start, end }: WordProps) => {
  const rotateX = useTransform(scrollYProgress, [start, end], [45, -45]);
  const translateZ = useTransform(scrollYProgress, [start, end], [0, 100]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);

  return (
    <motion.span
      style={{
        rotateX,
        translateZ,
        opacity,
        transformStyle: "preserve-3d"
      }}
      className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient inline-block"
    >
      {word}
    </motion.span>
  );
};

export default PerspectiveText;