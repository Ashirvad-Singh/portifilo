import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RollingText from '@/components/RollingText';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline();
      
      // Animate background elements
      gsap.set('.floating-element', { scale: 0, opacity: 0 });
      gsap.to('.floating-element', {
        scale: 1,
        opacity: 1,
        duration: 2,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.8)'
      });

      // Main content animation
      tl.current
        .from('.hero-greeting', { 
          y: 50, 
          opacity: 0, 
          duration: 0.8,
          ease: 'power3.out'
        })
        .from('.hero-title', { 
          y: 80, 
          opacity: 0, 
          duration: 1,
          ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-subtitle', { 
          y: 60, 
          opacity: 0, 
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-description', { 
          y: 40, 
          opacity: 0, 
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-buttons', { 
          y: 40, 
          opacity: 0, 
          duration: 0.6,
          ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-stats .card-glass', { 
          y: 30, 
          opacity: 0, 
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.2')
        .from('.hero-scroll', { 
          y: 20, 
          opacity: 0, 
          duration: 0.5,
          ease: 'power3.out'
        }, '-=0.1');

      // Continuous floating animation
      gsap.to('.floating-element-1', {
        y: -20,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });

      gsap.to('.floating-element-2', {
        y: -15,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
 <section
  ref={heroRef}
  id="home"
  className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-20 pb-10"
>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Floating Elements */}
      <div className="floating-element floating-element-1 absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="floating-element floating-element-2 absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="hero-greeting mb-6">
            <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium">
              👋 Hello, I'm
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title heading-xl mb-6 text-foreground">
            Ashirvad Singh
          </h1>

          {/* Subtitle */}
          <div className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8">
            <RollingText 
              text="WordPress Developer & Full-Stack Engineer" 
              className="block mb-2" 
              delay={0.6}
            />
            <RollingText 
              text="Building Dynamic Digital Experiences" 
              className="text-gradient font-medium" 
              delay={0.9}
            />
          </div>

          {/* Description */}
          <p className="hero-description text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Specialized in WordPress development, custom themes, and MERN stack applications. 
            Passionate about creating SEO-friendly, responsive solutions that drive results for clients across various industries.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button className="btn-primary group">
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button variant="outline" className="glass glass-hover group">
              <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16">
            <div className="card-glass text-center">
              <div className="text-2xl font-bold text-gradient">6+</div>
              <div className="text-sm text-muted-foreground">WordPress Sites</div>
            </div>
            <div className="card-glass text-center">
              <div className="text-2xl font-bold text-gradient">25%</div>
              <div className="text-sm text-muted-foreground">Client Engagement</div>
            </div>
            <div className="card-glass text-center">
              <div className="text-2xl font-bold text-gradient">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="card-glass text-center">
              <div className="text-2xl font-bold text-gradient">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={scrollToNext}
            className="hero-scroll hover:text-primary transition-colors duration-300"
          >
            <ArrowDown className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;