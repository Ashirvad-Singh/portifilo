import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const greetings = [
    "Hello",      // English
    "Bonjour",    // French
    "Hola",       // Spanish
    "Ciao",       // Italian
    "Hallo",      // German
    "Olá",        // Portuguese
    "Привет",     // Russian
    "こんにちは",    // Japanese
    "안녕하세요",     // Korean
    "你好",        // Chinese
    "नमस्ते",      // Hindi
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev === greetings.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1000);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="relative">
            {/* Curved path animation */}
            <svg
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-32 opacity-20"
              viewBox="0 0 400 100"
            >
              <motion.path
                d="M 0,50 Q 100,0 200,50 T 400,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
                className="text-primary"
              />
            </svg>

            {/* Animated words */}
            <div className="relative h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentWordIndex}
                  initial={{ 
                    opacity: 0, 
                    y: 40,
                    rotateX: -90,
                    scale: 0.8
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -40,
                    rotateX: 90,
                    scale: 0.8
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                  className="text-6xl md:text-8xl font-bold text-gradient"
                  style={{ perspective: "1000px" }}
                >
                  {greetings[currentWordIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Loading dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-3 h-3 rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;