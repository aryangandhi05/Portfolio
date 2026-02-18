import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import logoElevenlabs from '@/assets/logo-elevenlabs.png';
import logoMake from '@/assets/logo-make.png';

const skills = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#ffffff" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599C" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#ffffff" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", color: "#3ECF8E" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#F24E1E" },
  { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", color: "#ffffff" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
  { name: "PySpark", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg", color: "#E25A1C" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", color: "#FF9900" },
  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", color: "#0078D4" },
  { name: "n8n", logo: "https://n8n.io/favicon.ico", color: "#EA4B71" },
  { name: "Make.com", logo: logoMake, color: "#6D00CC" },
  { name: "ElevenLabs", logo: logoElevenlabs, color: "#000000" },
  { name: "Cursor", logo: "https://cursor.sh/favicon.ico", color: "#000000" },
  { name: "Lovable", logo: "https://lovable.dev/favicon.ico", color: "#FF6B6B" },
  { name: "Replit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/replit/replit-original.svg", color: "#F26207" },
  { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", color: "#10A37F" },
  { name: "Gemini", logo: "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png", color: "#8E75B2" },
];

interface SkillCardProps {
  skill: typeof skills[0];
  index: number;
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
}

const SkillCard = ({ skill, index, mousePosition, containerRef }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const getDistance = () => {
    if (!cardRef.current || !containerRef.current) return 1000;
    
    const cardRect = cardRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardCenterX = cardRect.left + cardRect.width / 2 - containerRect.left;
    const cardCenterY = cardRect.top + cardRect.height / 2 - containerRect.top;
    
    const dx = mousePosition.x - cardCenterX;
    const dy = mousePosition.y - cardCenterY;
    
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const distance = getDistance();
  const maxDistance = 200;
  const visibility = Math.max(0, 1 - distance / maxDistance);
  const scale = 0.6 + visibility * 0.4;
  const opacity = 0.2 + visibility * 0.8;

  return (
    <motion.div
      ref={cardRef}
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: opacity,
        scale: scale,
      }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.02,
      }}
      whileInView={{ opacity: opacity, scale: scale }}
    >
      <motion.div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${skill.color}40, ${skill.color}10)`,
          boxShadow: visibility > 0.5 
            ? `0 0 30px ${skill.color}60, 0 0 60px ${skill.color}30, inset 0 0 20px ${skill.color}20`
            : `0 0 10px ${skill.color}20`,
          border: `2px solid ${skill.color}${Math.round(visibility * 80 + 20).toString(16).padStart(2, '0')}`,
        }}
        whileHover={{ 
          scale: 1.2,
          boxShadow: `0 0 40px ${skill.color}80, 0 0 80px ${skill.color}40, inset 0 0 30px ${skill.color}30`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${skill.color}30, transparent 70%)`,
          }}
        />
        
        {/* Logo */}
        <img 
          src={skill.logo} 
          alt={skill.name}
          className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10 drop-shadow-lg"
          style={{
            filter: visibility > 0.5 ? `drop-shadow(0 0 10px ${skill.color})` : 'none',
          }}
        />
      </motion.div>
      
      {/* Name label */}
      <motion.span 
        className="mt-2 text-xs md:text-sm font-medium text-center"
        style={{
          color: skill.color,
          textShadow: visibility > 0.5 ? `0 0 10px ${skill.color}` : 'none',
          opacity: visibility > 0.3 ? 1 : 0.5,
        }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover around to discover my tech stack
          </p>
        </motion.div>

        {/* Skills Grid with Hover Effect */}
        <div
          ref={containerRef}
          className="relative min-h-[600px] flex items-center justify-center"
          onMouseMove={handleMouseMove}
        >
          {/* Cursor follower glow */}
          <motion.div
            className="absolute pointer-events-none w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
              left: mousePosition.x - 128,
              top: mousePosition.y - 128,
            }}
            animate={{
              left: mousePosition.x - 128,
              top: mousePosition.y - 128,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {/* Skills Grid */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-6 md:gap-8 relative z-10">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                mousePosition={mousePosition}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>

        {/* Instruction hint */}
        <motion.p 
          className="text-center text-muted-foreground/60 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Move your cursor over the skills to reveal them
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
