import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';

interface UseParallaxOptions {
  offset?: [string, string];
  yRange?: [number, number];
  opacityRange?: [number, number];
  scaleRange?: [number, number];
}

interface ParallaxResult {
  ref: RefObject<HTMLDivElement>;
  scrollYProgress: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export const useParallax = (options: UseParallaxOptions = {}): ParallaxResult => {
  const {
    offset = ['start end', 'end start'],
    yRange = [100, -100],
    opacityRange = [0, 1],
    scaleRange = [0.95, 1],
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [opacityRange[0], 1, 1, opacityRange[0]]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[0]]);

  return { ref, scrollYProgress, y, opacity, scale };
};

export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return { ref, opacity, y, scale };
};
