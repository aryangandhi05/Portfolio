import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    message: '',
    service: '',
    sector: '',
    vibe: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Hi Aryan! I'm ${formData.name}.\n\nKnow you from: ${formData.source}\nMessage: ${formData.message}\nProject/Service: ${formData.service}\nBusiness Sector: ${formData.sector}\nPreferred Vibe: ${formData.vibe || 'Not specified'}`;

    const whatsappUrl = `https://wa.me/919535888299?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    setFormData({ name: '', source: '', message: '', service: '', sector: '', vibe: '' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="bg-card rounded-3xl p-8 md:p-12 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-border shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Modal Header */}
            <div className="mb-8">
              <motion.h2 
                className="font-display text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Let's have a chat!
              </motion.h2>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                I'm very happy to hear from you 😁
              </motion.p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Hello Aryan!</label>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">I am</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="flex-1 min-w-[120px] border-b-2 border-muted focus:border-primary outline-none px-2 py-2 transition-all duration-300 bg-transparent hover:border-muted-foreground text-foreground"
                  />
                </div>
              </motion.div>

              {/* Source Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">Know you from</span>
                  <input
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    placeholder="LinkedIn, GitHub, etc."
                    required
                    className="flex-1 min-w-[120px] border-b-2 border-muted focus:border-primary outline-none px-2 py-2 transition-all duration-300 bg-transparent hover:border-muted-foreground text-foreground"
                  />
                </div>
              </motion.div>

              {/* Message Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-muted-foreground pt-2">Through this message I need you to</span>
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="help me with..."
                    required
                    className="flex-1 min-w-[120px] border-b-2 border-muted focus:border-primary outline-none px-2 py-2 transition-all duration-300 bg-transparent hover:border-muted-foreground text-foreground"
                  />
                </div>
              </motion.div>

              {/* Service Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">my</span>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="project / startup / idea"
                    required
                    className="flex-1 min-w-[120px] border-b-2 border-muted focus:border-primary outline-none px-2 py-2 transition-all duration-300 bg-transparent hover:border-muted-foreground text-foreground"
                  />
                </div>
              </motion.div>

              {/* Sector Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">for my business in sector</span>
                  <input
                    type="text"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    placeholder="AI, FinTech, etc."
                    required
                    className="flex-1 min-w-[120px] border-b-2 border-muted focus:border-primary outline-none px-2 py-2 transition-all duration-300 bg-transparent hover:border-muted-foreground text-foreground"
                  />
                </div>
              </motion.div>

              {/* Vibe Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">I want the solution to have vibes</span>
                  <input
                    type="text"
                    name="vibe"
                    value={formData.vibe}
                    onChange={handleChange}
                    placeholder="Modern, Minimal, Bold..."
                    className="flex-1 min-w-[120px] border-b-2 border-muted focus:border-primary outline-none px-2 py-2 transition-all duration-300 bg-transparent hover:border-muted-foreground text-foreground"
                  />
                </div>
              </motion.div>

              <motion.div 
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Thank You!
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-foreground text-background py-4 rounded-full font-display font-semibold hover:bg-primary transition-colors mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Send via WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
