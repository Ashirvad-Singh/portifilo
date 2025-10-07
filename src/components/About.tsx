import { GraduationCap, Briefcase, MapPin, Calendar } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RollingText from '@/components/RollingText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from('.about-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
        }
      });

      // Education timeline animation
      gsap.from('.education-item', {
        x: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.education-section',
          start: 'top 70%',
        }
      });

      // Experience timeline animation
      gsap.from('.experience-item', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-section',
          start: 'top 70%',
        }
      });

      // Timeline line animation
      gsap.from('.timeline-line', {
        scaleY: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-line',
          start: 'top 80%',
        }
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Dr. A.P.J. Abdul Kalam Technical University",
      location: "Lucknow, India",
      period: "2022 - 2024",
      achievement: "Specialized in Advanced Web Technologies"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Lotus Institute of Management",
      location: "Bareilly, India", 
      period: "2018 - 2021",
      achievement: "Batch Topper & 2nd Place in Coding Competitions"
    }
  ];

  const experience = [
    {
      title: "Junior Web Developer",
      company: "Adat Soft Solutions",
      location: "Mohali, Punjab",
      period: "March 2024 - Present",
      achievements: [
        "Built and managed WordPress websites with responsive designs and seamless UX",
        "Developed custom plugins and tailored WooCommerce for e-commerce clients",
        "Collaborated with design team to improve website performance and SEO rankings",
        "Delivered 6+ successful WordPress projects across various industries"
      ]
    }
  ];

  return (
    <section id="about" className="py-12 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 about-title">
          <h2 className="heading-lg mb-6">
            <RollingText text="About Me" className="text-gradient" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <RollingText 
              text="WordPress-focused developer with expertise in building dynamic websites, learning management systems, and e-commerce solutions. Passionate about creating optimized solutions tailored to client needs." 
              delay={0.3}
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-primary">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="heading-md">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="card-glass group">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 glow-primary group-hover:scale-125 transition-transform" />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gradient mb-2">{edu.degree}</h4>
                      <h5 className="font-medium text-foreground mb-2">{edu.institution}</h5>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.period}
                        </div>
                      </div>
                      <p className="text-accent font-medium">{edu.achievement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center glow-accent">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="heading-md">Experience</h3>
            </div>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="card-glass group">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 glow-accent group-hover:scale-125 transition-transform" />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gradient mb-2">{exp.title}</h4>
                      <h5 className="font-medium text-foreground mb-2">{exp.company}</h5>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;