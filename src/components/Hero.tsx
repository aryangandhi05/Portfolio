import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextScramble from './TextScramble';
import RoleScramble from './RoleScramble';

const ROLES = [
  'AI Automation Engineer',
  'Data and AI Engineer',
  'Prompt Engineer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Wordpress Developer'
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      <motion.div 
        className="container mx-auto px-6 lg:px-12 relative z-10"
        style={{ y, opacity, scale }}
      >
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block text-sm font-medium text-primary mb-6 tracking-widest uppercase">
              <RoleScramble roles={ROLES} interval={3000} scrambleDuration={1000} />
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8"
          >
            <TextScramble text="Hi, I'm Aryan" delay={800} duration={1000} />
            <br />
            <motion.span 
              className="editorial-italic text-primary inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TextScramble text="Gandhi" delay={1200} duration={1000} />
            </motion.span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Floating bubbles for modern performant text */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
                style={{
                  left: `${30 + i * 10}%`,
                  top: '50%',
                }}
                animate={{
                  y: [-5, -25, -5],
                  x: [0, (i % 2 === 0 ? 5 : -5), 0],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              I build{' '}
            </motion.span>
            <motion.span
              className="text-primary font-medium inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: 'inline-block' }}
              >
                modern, performant
              </motion.span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              {' '}web applications with clean code and intuitive user experiences that{' '}
            </motion.span>
            <motion.span
              className="italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.1 }}
            >
              solve real problems.
            </motion.span>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
