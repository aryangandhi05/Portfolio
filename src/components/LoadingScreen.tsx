import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const greetings = [
  { text: 'नमस्ते', language: 'Hindi', color: '#FF6B35' },
  { text: 'السلام علیکم', language: 'Urdu', color: '#2EC4B6' },
  { text: 'Bonjour', language: 'French', color: '#E71D36' },
  { text: 'こんにちは', language: 'Japanese', color: '#FF9F1C' },
  { text: 'Welcome', language: 'English', color: '#7B2CBF' },
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 400);
          }, 300);
          return prev;
        }
        return prev + 1;
      });
    }, 800); // Increased from 500ms to 800ms (slower)

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Image with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')`,
        }}
      />
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(135deg, ${greetings[currentIndex].color}90 0%, hsl(var(--background)) 50%, ${greetings[currentIndex].color}40 100%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: 100 + Math.random() * 200,
              height: 100 + Math.random() * 200,
              background: greetings[currentIndex].color,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center z-10">
        {/* Greeting text with enhanced animation */}
        <div className="h-40 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="text-center"
              initial={{ opacity: 0, y: 80, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, y: -80, scale: 0.5, rotateY: 90 }}
              transition={{ 
                duration: 0.15, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <motion.span
                className="block text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tight"
                style={{ 
                  color: greetings[currentIndex].color,
                  textShadow: `0 4px 30px ${greetings[currentIndex].color}80`,
                  WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                }}
              >
                {greetings[currentIndex].text}
              </motion.span>
              <motion.span
                className="block text-lg md:text-xl font-medium mt-4 tracking-[0.3em] uppercase"
                style={{ color: greetings[currentIndex].color }}
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 0.8, letterSpacing: '0.3em' }}
                transition={{ delay: 0.05, duration: 0.1 }}
              >
                {greetings[currentIndex].language}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated line instead of dots */}
        <motion.div
          className="mt-8 w-48 h-1 rounded-full overflow-hidden bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: greetings[currentIndex].color }}
            animate={{
              width: `${((currentIndex + 1) / greetings.length) * 100}%`,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </motion.div>
      </div>

      {/* Corner decorations with color */}
      <motion.div
        className="absolute top-8 left-8 w-20 h-20"
        style={{ borderLeft: `3px solid ${greetings[currentIndex].color}`, borderTop: `3px solid ${greetings[currentIndex].color}` }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-20 h-20"
        style={{ borderRight: `3px solid ${greetings[currentIndex].color}`, borderBottom: `3px solid ${greetings[currentIndex].color}` }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
