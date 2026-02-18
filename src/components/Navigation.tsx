import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'PROCESS', id: 'process' },
    { label: 'PROJECTS', id: 'work' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="bg-black rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">AG</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollToSection('contact')}
          className="hidden md:flex items-center space-x-2 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          <span>LET'S DISCUSS!</span>
          <span className="text-lg">💬</span>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-black rounded-3xl px-6 py-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="text-white/70 hover:text-white text-sm transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors mt-2"
            >
              LET'S DISCUSS! 💬
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
