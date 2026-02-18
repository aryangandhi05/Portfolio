import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ContactModal from './ContactModal';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const decorativeTexts = ['lpxsmwndl', 'avexkehaa', 'tesywowgt', 'evvapwoee', 'raqdpndpr', 'apwdxyvqa'];

  return (
    <>
      <section id="contact" ref={sectionRef} className="relative py-32 lg:py-48">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            style={{ y }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* CTA Section */}
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <motion.div
                className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-8 font-display relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Floating bubbles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/30"
                    style={{
                      left: `${15 + i * 15}%`,
                      bottom: '-10px',
                    }}
                    animate={{
                      y: [-10, -40, -10],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  don't be shy to have a{' '}
                </motion.span>
                <motion.span
                  className="text-primary italic"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    y: [0, -3, 0],
                  }}
                  style={{ display: 'inline-block' }}
                >
                  chit-chat
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {' '}with us!
                </motion.span>
              </motion.div>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="group relative px-12 py-6 bg-foreground text-background font-display font-bold text-lg tracking-wide overflow-hidden rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">let's discuss!</span>
                <motion.div 
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground mb-16"
            >
              <motion.a
                href="mailto:aryangandhi598@gmail.com"
                className="hover:text-foreground link-underline transition-colors"
                whileHover={{ y: -2 }}
              >
                aryangandhi598@gmail.com
              </motion.a>
              <span className="hidden md:inline">|</span>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-foreground link-underline transition-colors"
                whileHover={{ y: -2 }}
              >
                let's discuss!
              </motion.button>
              <span className="hidden md:inline">|</span>
              <motion.a
                href="tel:+919755399524"
                className="hover:text-foreground link-underline transition-colors"
                whileHover={{ y: -2 }}
              >
                +91 9755399524
              </motion.a>
            </motion.div>

            {/* Decorative Text */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 text-xs text-muted/40 font-mono mb-16"
            >
              {decorativeTexts.map((text, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  {text}
                </motion.span>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="pt-12 border-t border-muted/20"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <motion.div 
                  className="font-display text-xl font-bold tracking-tight"
                  whileHover={{ scale: 1.05 }}
                >
                  Aryan Gandhi
                </motion.div>

                <div className="flex items-center gap-8">
                  {[
                    { name: 'GitHub', url: 'https://github.com/aryangandhi05' },
                    { name: 'Twitter', url: 'https://x.com/aryangandhi597' },
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aryan-gandhi-740872225/' }
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground link-underline"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  © 2025 Aryan Gandhi. All rights reserved.
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Contact;
