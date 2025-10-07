import { Home, User, Code, FolderOpen, BookOpen, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { icon: Home, label: 'Home', href: '/', section: '#home' },
    { icon: User, label: 'About', href: '/', section: '#about' },
    { icon: Code, label: 'Skills', href: '/', section: '#skills' },
    { icon: FolderOpen, label: 'Projects', href: '/', section: '#projects' },
    { icon: BookOpen, label: 'Blog', href: '/blog' },
    { icon: Mail, label: 'Contact', href: '/', section: '#contact' },
  ];

  const handleNavClick = (index: number, href: string, section?: string) => {
    setActiveIndex(index);
    
    if (href === '/blog') {
      navigate('/blog');
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          if (section) {
            document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        if (section) {
          document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="relative mx-4 mb-4">
        {/* Glass background */}
        <div className="glass backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-around px-2 py-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(index, item.href, item.section)}
                  className="relative flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 group"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl glow-primary" />
                  )}
                  
                  {/* Icon */}
                  <div className="relative">
                    <Icon 
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive 
                          ? 'text-primary scale-110' 
                          : 'text-muted-foreground group-hover:text-primary group-hover:scale-105'
                      }`} 
                    />
                  </div>
                  
                  {/* Label */}
                  <span 
                    className={`text-xs font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground group-hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
