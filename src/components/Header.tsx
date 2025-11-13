import { useState, useEffect, useRef } from "react";
import { Menu, X, Code2, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from(".header-content", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Header scroll animation
      ScrollTrigger.create({
        trigger: "body",
        start: "top -100",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (self.direction === -1) {
            gsap.to(headerRef.current, { y: 0, duration: 0.3 });
          } else {
            gsap.to(headerRef.current, { y: -100, duration: 0.3 });
          }
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Ashirvad-Singh/" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ashirvad-singh-255491214/",
    },
    { icon: Mail, href: "mailto:ashirvad2912@gmail.com" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 header-content ${
          isScrolled ? "nav-glass backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-primary">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">
                Ashirvad Singh
              </span>
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
            </nav>

            {/* Social Links & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}

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
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
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
    </>
  );
};

export default Header;
