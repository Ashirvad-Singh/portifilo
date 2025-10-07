import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface RollingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const RollingText = ({ text, className = '', delay = 0 }: RollingTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.03,
        delayChildren: delay,
        staggerDirection: 1
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
  <motion.div
  ref={ref}
  className={`inline-block ${className}`}
  style={{ perspective: "1000px" }}
  variants={container}
  initial="hidden"
  animate={isInView ? "visible" : "visible"} // ✅ Always visible
>

      <div className="inline-flex flex-wrap gap-x-2">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={child}
                className="inline-block"
                style={{ transformOrigin: "center bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default RollingText;
