import FluidCanvas from '@/components/FluidCanvas';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Process from '@/components/Process';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import PageTransition from '@/components/PageTransition';
import LoadingScreen from '@/components/LoadingScreen';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Studio. | Creative Digital Agency';
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageTransition>
              <div className="relative min-h-screen">
                {/* WebGL Fluid Background */}
                <FluidCanvas />

                {/* Noise Overlay */}
                <div className="noise-overlay" />

                {/* Content Layer */}
                <div className="relative z-10">
                  <Navigation />
                  <Hero />
                  <About />
                  <Process />
                  <Experience />
                  <Skills />
                  <Work />
                  <Contact />
                </div>
              </div>
            </PageTransition>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
