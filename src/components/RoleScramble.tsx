import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoleScrambleProps {
  roles: string[];
  className?: string;
  interval?: number;
  scrambleDuration?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const RoleScramble = ({ 
  roles, 
  className = '', 
  interval = 3000, 
  scrambleDuration = 1000 
}: RoleScrambleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);

  const scrambleToText = useCallback((targetText: string) => {
    const iterations = scrambleDuration / 50;
    let currentIteration = 0;

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            const progress = currentIteration / iterations;
            const charProgress = index / targetText.length;
            
            if (progress > charProgress) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      currentIteration++;

      if (currentIteration >= iterations) {
        clearInterval(scrambleInterval);
        setDisplayText(targetText);
      }
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [scrambleDuration]);

  useEffect(() => {
    // Initial scramble
    scrambleToText(roles[0]);
    
    const cycleInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % roles.length;
        scrambleToText(roles[nextIndex]);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(cycleInterval);
  }, [roles, interval, scrambleToText]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};

export default RoleScramble;
