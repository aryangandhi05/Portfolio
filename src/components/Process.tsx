import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  const workflowStages = [
    {
      stage: '01',
      title: 'Understanding the Vision',
      description: 'We start by deeply understanding your goals, challenges, and vision. Through detailed discussions, we uncover what success looks like for your project and align our approach with your business objectives.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60'
    },
    {
      stage: '02',
      title: 'Research & Strategy',
      description: 'We dive into market research, competitor analysis, and user insights to develop a data-driven strategy. This foundation ensures every decision we make is informed and purposeful.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
    },
    {
      stage: '03',
      title: 'Design & Prototype',
      description: 'Our creative team transforms strategy into stunning visual designs and interactive prototypes. We iterate rapidly, ensuring the design resonates with your brand and delights users.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60'
    },
    {
      stage: '04',
      title: 'Development & Build',
      description: 'We bring designs to life with clean, scalable code using cutting-edge technologies. Our development process ensures performance, security, and maintainability at every step.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60'
    },
    {
      stage: '05',
      title: 'Launch & Optimize',
      description: 'We deploy your solution with precision and monitor its performance closely. Post-launch, we continuously optimize based on real user data and feedback to ensure lasting success.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60'
    },
  ];

  return (
    <section id="process" ref={sectionRef} className="relative h-[500vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full flex flex-col justify-center">
          {/* Header */}
          <div className="container mx-auto px-6 lg:px-12 py-8">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-sm font-medium text-primary mb-4 tracking-widest uppercase block">
                Our Process
              </span>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
                Here's how we{' '}
                <motion.span 
                  className="editorial-italic text-gradient inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  create
                </motion.span>{' '}
                masterpiece
              </h2>
            </motion.div>
          </div>

          {/* Horizontal scroll container */}
          <div ref={containerRef} className="flex-1 flex items-center overflow-hidden">
            <motion.div 
              className="flex gap-8 pl-[10vw]"
              style={{ x }}
            >
              {workflowStages.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] h-[60vh] rounded-3xl overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${stage.image})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm uppercase tracking-wider text-muted-foreground">
                          Stage
                        </span>
                        <span className="font-display text-6xl md:text-7xl font-bold text-primary/30">
                          {stage.stage}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                        {stage.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="absolute top-8 right-8 flex gap-2">
                    {workflowStages.map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === index ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="container mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.div>
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
