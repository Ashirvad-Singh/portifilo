import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import RollingText from "@/components/RollingText";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline();

      // Animate floating background elements
      gsap.set(".floating-element", { scale: 0, opacity: 0 });
      gsap.to(".floating-element", {
        scale: 1,
        opacity: 1,
        duration: 1.8,
        stagger: 0.25,
        ease: "elastic.out(1, 0.8)",
      });

      // Animate main content
      tl.current
        .from(".hero-greeting", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".hero-title",
          { y: 60, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.3",
        )
        .from(
          ".hero-subtitle",
          { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          ".hero-description",
          { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          ".hero-buttons",
          { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .from(
          ".hero-stats .card-glass",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".hero-scroll",
          { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2",
        );

      // Continuous floating animation
      gsap.to(".floating-element-1", {
        y: -20,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".floating-element-2", {
        y: -15,
        duration: 3.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      {/* Floating Elements */}
      <div className="floating-element floating-element-1 absolute top-16 left-6 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="floating-element floating-element-2 absolute bottom-16 right-6 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="hero-greeting mt-36">
            <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium">
              👋 Hello, I'm
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-title heading-xl mb-6 text-foreground">
            Ashirvad Singh
          </h1>

          {/* Dynamic Subtitle */}
          <div className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8">
            <RollingText
              text="WordPress Developer & Full-Stack Engineer"
              className="block mb-2"
              delay={0.6}
            />
            <RollingText
              text="Crafting Dynamic, High-Performance Digital Experiences"
              className="text-gradient font-medium"
              delay={0.9}
            />
          </div>

          {/* Description */}
          <p className="hero-description text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            I specialize in WordPress development, custom themes, and MERN stack
            applications, with deep expertise in React, Node.js, and Next.js. I
            build SEO-friendly, responsive, and scalable solutions that deliver
            measurable results across industries. Currently exploring Generative
            AI to integrate intelligent, future-ready features into modern web
            experiences.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              as="a"
              href="https://drive.google.com/file/d/1cVbU_7KmRI5U2NWWJmOy_sD2DR8dJh1t/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button as="a" href="#contact" className="btn-secondary group">
              <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Contact Me
            </Button>
          </div>

          {/* Stats */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-24 mb-16">
            <div className="card-glass text-center p-4 rounded-lg shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-gradient">
                6+
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">
                WordPress Sites
              </div>
            </div>
            <div className="card-glass text-center p-4 rounded-lg shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-gradient">
                25%
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">
                Client Engagement
              </div>
            </div>
            <div className="card-glass text-center p-4 rounded-lg shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-gradient">
                3+
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">
                Years Experience
              </div>
            </div>
            <div className="card-glass text-center p-4 rounded-lg shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-gradient">
                100%
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">
                Client Satisfaction
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToNext}
            className="hero-scroll hover:text-primary transition-colors duration-300"
          >
            <ArrowDown className="w-6 h-6 mx-auto animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
