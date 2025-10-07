import { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('.header-content', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Header scroll animation
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top -100',
        end: 'bottom bottom',
        onUpdate: self => {
          if (self.direction === -1) {
            gsap.to(headerRef.current, { y: 0, duration: 0.3 });
          } else {
            gsap.to(headerRef.current, { y: -100, duration: 0.3 });
          }
        }
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ashirvad' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ashirvad' },
    { icon: Mail, href: 'mailto:ashirvad2912@gmail.com' },
  ];

  const cities = [
    { name: "New Delhi", date: "Jan 15, 2024", status: "Completed" },
    { name: "Mumbai", date: "Feb 20, 2024", status: "Completed" },
    { name: "Bangalore", date: "Mar 10, 2024", status: "Upcoming" },
    { name: "Hyderabad", date: "Apr 5, 2024", status: "Upcoming" },
  ];

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 header-content ${
          isScrolled ? 'nav-glass backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-primary">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Ashirvad Singh</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 hover:text-shadow"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => setIsFullscreenMenuOpen(true)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 hover:text-shadow"
              >
                Tour
              </button>
            </nav>

            {/* Social Links & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Desktop Social Links */}
              <div className="hidden md:flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass glass-hover rounded-lg flex items-center justify-center"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 glass glass-hover rounded-lg flex items-center justify-center"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 glass rounded-2xl p-6 animate-slide-in-up">
              <nav className="flex flex-col space-y-4 mb-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300 py-2"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass glass-hover rounded-lg flex items-center justify-center"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Fullscreen Tour Menu */}
      <AnimatePresence>
        {isFullscreenMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-6 h-full flex flex-col">
              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsFullscreenMenuOpen(false)}
                  className="w-12 h-12 glass glass-hover rounded-full flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="max-w-6xl w-full">
                  <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold text-gradient mb-16 text-center"
                  >
                    City Tour Schedule
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {cities.map((city, index) => (
                      <motion.div
                        key={city.name}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="card-glass group hover:scale-105 transition-transform duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-primary" />
                            <h3 className="text-2xl font-bold">{city.name}</h3>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            city.status === 'Completed' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-blue-500/20 text-blue-500'
                          }`}>
                            {city.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{city.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;