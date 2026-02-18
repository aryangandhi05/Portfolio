import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const statsY = useTransform(scrollYProgress, [0, 1], [150, -30]);

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '25+', label: 'Projects Completed' },
    { number: '15+', label: 'Happy Clients' },
    { number: '10+', label: 'Technologies' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-32 lg:py-48">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            style={{ y }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-sm font-medium text-primary mb-6 tracking-widest uppercase"
            >
              About Me
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
            >
              Passionate about{' '}
              <motion.span 
                className="editorial-italic text-gradient inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                building
              </motion.span>{' '}
              the web
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-6"
            >
              I'm a full-stack developer who loves turning ideas into reality through 
              clean, efficient code. I specialize in React, TypeScript, and modern 
              web technologies to create seamless digital experiences.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground"
            >
              My approach combines technical expertise with an eye for design, 
              ensuring every project I build is not only functional but also 
              visually appealing and user-friendly.
            </motion.p>
          </motion.div>

          <motion.div
            style={{ y: statsY }}
            className="grid grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="glass p-8 rounded-2xl text-center"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                custom={index}
              >
                <motion.div 
                  className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
