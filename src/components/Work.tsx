import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import projectNexus from '@/assets/project-nexus.jpg';
import projectIot from '@/assets/project-iot.jpg';
import projectCollab from '@/assets/project-collab.jpg';
import projectChat from '@/assets/project-chat.jpg';
import projectNews from '@/assets/project-news.jpg';
import projectCoding from '@/assets/project-coding.jpg';

interface Project {
  title: string;
  category: string;
  description: string;
  color: string;
  accentColor: string;
  image: string;
  size: 'large' | 'medium' | 'small';
  position: 'left' | 'right' | 'center';
  link: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });
  
  // Spotlight effect position
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Uniform sizing for all cards
  const cardHeight = 'h-[280px] lg:h-[320px]';

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="group relative cursor-pointer perspective-1000 block"
      initial={{ opacity: 0, y: 80, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
    <motion.div
      className={`relative ${cardHeight} w-full rounded-2xl overflow-hidden`}
      animate={{
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Project image */}
      <img 
        src={project.image} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient overlay on image */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-multiply opacity-40`} />
        {/* Animated gradient spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${spotlightX}% ${spotlightY}%, ${project.accentColor}15, transparent 40%)`,
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 0 1px ${project.accentColor}30`,
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              initial={{ 
                x: `${20 + i * 15}%`, 
                y: '100%',
                opacity: 0 
              }}
              animate={isHovered ? {
                y: '-20%',
                opacity: [0, 1, 0],
                transition: {
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut'
                }
              } : {}}
            />
          ))}
        </div>

        {/* Content overlay gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isHovered ? 0.9 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Main content */}
        <div className={`absolute inset-0 flex flex-col justify-end ${project.size === 'small' ? 'p-4' : 'p-6'}`}>
          {/* Category badge */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20 
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-primary bg-primary/10 rounded-full tracking-widest uppercase border border-primary/20">
              {project.category}
            </span>
          </motion.div>

          {/* Title with split animation */}
          <motion.h3 
            className={`font-display font-bold mb-2 relative ${
              project.size === 'large' ? 'text-2xl lg:text-3xl' : 
              project.size === 'medium' ? 'text-xl lg:text-2xl' : 
              'text-lg'
            }`}
            animate={{ y: isHovered ? -3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">{project.title}</span>
            <motion.span
              className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '60%' : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
          </motion.h3>

          {/* Description with staggered reveal */}
          <motion.p 
            className="text-muted-foreground text-xs max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10 
            }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Corner arrow indicator */}
        <motion.div 
          className={`absolute ${project.size === 'small' ? 'top-3 right-3 w-8 h-8' : 'top-4 right-4 w-10 h-10'} rounded-full border border-foreground/10 flex items-center justify-center backdrop-blur-sm overflow-hidden`}
          animate={{
            borderColor: isHovered ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--foreground) / 0.1)',
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-primary/10"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ borderRadius: '50%' }}
          />
          <motion.svg
            className={`${project.size === 'small' ? 'w-3 h-3' : 'w-4 h-4'} relative z-10`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ 
              rotate: isHovered ? 45 : 0,
              scale: isHovered ? 1.1 : 1 
            }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </motion.svg>
        </motion.div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
            width: '50%',
          }}
        />
      </motion.div>
    </motion.a>
  );
};

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  const projects: Project[] = [
    {
      title: 'AI Finance Manager',
      category: 'Fintech / AI',
      description: 'AI-Powered Finance Management App with intelligent insights and automation.',
      color: 'from-fluid-primary/20 to-fluid-secondary/10',
      accentColor: 'hsl(var(--primary))',
      image: projectNexus,
      size: 'large',
      position: 'left',
      link: 'https://ai-finance-manage-sooty.vercel.app/',
    },
    {
      title: 'IoT Localisation',
      category: 'Machine Learning',
      description: 'Position estimation in wireless sensor networks using LLE & Landmark.',
      color: 'from-fluid-secondary/20 to-fluid-tertiary/10',
      accentColor: 'hsl(var(--accent))',
      image: projectIot,
      size: 'small',
      position: 'right',
      link: 'https://github.com/aryangandhi05/Localisation',
    },
    {
      title: 'CoLabConnect',
      category: 'Collaboration',
      description: 'Hub for finding meaningful collaborations aligned with your interests.',
      color: 'from-purple-500/20 to-pink-500/10',
      accentColor: 'hsl(var(--accent))',
      image: projectCollab,
      size: 'small',
      position: 'right',
      link: 'https://github.com/aryangandhi05/CoLabconnect',
    },
    {
      title: 'Secure ChatApp',
      category: 'Communication',
      description: 'End-to-end encrypted chat with video calls and group messaging.',
      color: 'from-pink-500/20 to-purple-500/10',
      accentColor: 'hsl(var(--primary))',
      image: projectChat,
      size: 'medium',
      position: 'left',
      link: 'https://github.com/aryangandhi05/MERN-ChatApp',
    },
    {
      title: 'News Researcher',
      category: 'AI / Finance',
      description: 'Analyze share articles & balance sheets with AI-powered Q&A.',
      color: 'from-amber-500/20 to-orange-500/10',
      accentColor: 'hsl(var(--accent))',
      image: projectNews,
      size: 'large',
      position: 'center',
      link: 'https://github.com/aryangandhi05/Market_Research_Tool',
    },
    {
      title: 'CodingCatalysts',
      category: 'Web Development',
      description: 'Platform empowering developers with resources and community.',
      color: 'from-fluid-tertiary/20 to-fluid-primary/10',
      accentColor: 'hsl(var(--primary))',
      image: projectCoding,
      size: 'small',
      position: 'center',
      link: 'https://codingcatalysts.com/',
    },
  ];

  return (
    <section id="work" ref={sectionRef} className="relative py-32 lg:py-48">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8"
          style={{ y: headerY }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm font-medium text-primary mb-6 tracking-widest uppercase"
            >
              Selected Work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
            >
              Bespoke digital{' '}
              <motion.span 
                className="editorial-italic text-gradient inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                creations
              </motion.span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Collage-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
