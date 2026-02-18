import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Briefcase, Code, Users, Globe, Database, Brain } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Public Relations Coordinator",
    company: "JIIT",
    duration: "Mar 2022 - 2024",
    description: "Led community management, organized tech & cultural events, secured sponsorships for annual fest.",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/20",
  },
  {
    id: 2,
    role: "CS Subject Matter Expert",
    company: "Chegg",
    duration: "Mar 2023 - Feb 2024",
    description: "Delivered high-quality CS solutions, mentored students, participated in peer reviews.",
    icon: Code,
    color: "from-orange-500 to-red-500",
    shadowColor: "shadow-orange-500/20",
  },
  {
    id: 3,
    role: "Open Source Developer",
    company: "Hacktoberfest",
    duration: "Sep 2023 - Oct 2023",
    description: "Built GitHub Actions CI/CD pipelines, contributed bug fixes and design improvements.",
    icon: Globe,
    color: "from-emerald-500 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    id: 4,
    role: "Developer",
    company: "CodingCatalysts",
    duration: "Mar 2022 - Present",
    description: "Built responsive web apps, ensured cross-browser compatibility, led code reviews.",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/20",
  },
  {
    id: 5,
    role: "Software Developer Intern",
    company: "RNS Solutions",
    duration: "Jun 2024 - Jul 2024",
    description: "Developed MongoDB backend for food delivery app, designed database architecture.",
    icon: Database,
    color: "from-pink-500 to-rose-500",
    shadowColor: "shadow-pink-500/20",
  },
  {
    id: 6,
    role: "Data & AI Engineer",
    company: "Infosys, Bangalore",
    duration: "Present",
    description: "Building data pipelines, developing AI agent workflows and ML model deployments.",
    icon: Brain,
    color: "from-amber-500 to-yellow-500",
    shadowColor: "shadow-amber-500/20",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div style={{ y: headerY }} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Career Journey</span>
          </motion.div>
          
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-cyan-500">Experience</span>
          </motion.h2>
        </motion.div>

        {/* Horizontal Timeline */}
        <div ref={containerRef} className="relative">
          {/* Main Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-purple-500 to-cyan-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Experience Cards - Horizontal Scroll on mobile, Grid on desktop */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-6 lg:overflow-visible lg:gap-4">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  className={`min-w-[280px] lg:min-w-0 snap-center relative flex flex-col ${isEven ? 'lg:flex-col' : 'lg:flex-col-reverse'}`}
                  initial={{ opacity: 0, y: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Card */}
                  <motion.div
                    className={`relative group ${isEven ? 'lg:mb-8' : 'lg:mt-8'}`}
                    whileHover={{ scale: 1.05, y: isEven ? -10 : 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    {/* Card Content */}
                    <div className={`relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-5 h-full overflow-hidden group-hover:border-primary/50 transition-all duration-500 ${exp.shadowColor} shadow-2xl`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: '20px 20px'
                        }} />
                      </div>
                      
                      {/* Icon */}
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exp.color} flex items-center justify-center mb-4 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Number Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${exp.color} opacity-20`}>
                          0{exp.id}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${exp.color} text-white`}>
                          {exp.duration}
                        </span>
                        
                        <h3 className="text-lg font-bold mt-3 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {exp.role}
                        </h3>
                        
                        <p className={`text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${exp.color} mb-3`}>
                          @ {exp.company}
                        </p>
                        
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                          {exp.description}
                        </p>
                      </div>

                      {/* Animated Border */}
                      <motion.div 
                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${exp.color}`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>

                  {/* Timeline Node - Only on desktop */}
                  <div className="hidden lg:flex justify-center items-center py-4">
                    <motion.div
                      className={`relative w-5 h-5 rounded-full bg-gradient-to-r ${exp.color} shadow-lg z-10`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.5 }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.color}`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Experience;
