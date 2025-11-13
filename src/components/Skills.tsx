import { Code, Database, Palette, Settings, Zap, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Sticky card stack animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const scaleValue = 1 - (cardsRef.current.length - index) * 0.05;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top 20%',
          end: 'bottom 20%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const rotation = progress * 5 * (index % 2 === 0 ? 1 : -1);
            const scale = 1 - progress * 0.1;
            
            gsap.to(card, {
              rotation: rotation,
              scale: Math.max(scale, scaleValue),
              y: -progress * 50,
              duration: 0.3,
              ease: 'none'
            });
          }
        });
      });
    }, skillsRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);
  const skillCategories = [
    {
      title: "Languages & Core",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
         { name: "Php", level: 75 },
        { name: "Python", level: 65 }      ]
    },
    {
      title: "Frameworks & Libraries",
      icon: Zap,
      color: "from-emerald-500 to-teal-500",
      skills: [
        { name: "React", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Bootstrap", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 70 },
        {}
      ]
    },

    {
      title: "Tools & Database",
      icon: Database,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Git/GitHub", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 70 },
        { name: "RESTful APIs", level: 80 },
        { name: "Mailchimp", level: 70 },
      ]
    },
    {
      title: "Design & UX",
      icon: Palette,
      color: "from-violet-500 to-purple-500",
      skills: [
        { name: "Responsive Design", level: 95 },
        { name: "SEO Optimization", level: 90 },
        { name: "UI/UX Principles", level: 80 },
        { name: "Performance Optimization", level: 85 },
      ]
    },
    {
      title: "Soft Skills",
      icon: Users,
      color: "from-pink-500 to-rose-500",
      skills: [
        { name: "Communication", level: 95 },
        { name: "Client Collaboration", level: 90 },
        { name: "Problem-Solving", level: 85 },
        { name: "Leadership", level: 80 },
      ]
    }
  ];

  return (
    <section ref={skillsRef} id="skills" className="py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sticky top-20 z-10 bg-background/80 backdrop-blur-sm py-6">
          <h2 className="heading-lg mb-6 text-gradient">Technical Skills</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive sticky card stack showcasing expertise
          </p>
        </div>

        {/* Sticky Card Stack */}
        <div className="max-w-4xl mx-auto space-y-8 pb-48">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              ref={(el) => {
                if (el) cardsRef.current[categoryIndex] = el;
              }}
              className="sticky top-32 card-glass p-8"
              style={{
                zIndex: skillCategories.length - categoryIndex,
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gradient">{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground text-lg">{skill.name}</span>
                      <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out shadow-glow`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Footer */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{category.skills.length} Skills</span>
                  <span className="text-gradient font-bold text-xl">
                    Avg: {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;