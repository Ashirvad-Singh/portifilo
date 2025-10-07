import { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RollingText from './RollingText';

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "E-commerce Manager",
      company: "TechStart Solutions",
      rating: 5,
      text: "Ashirvad delivered an exceptional WordPress e-commerce solution that exceeded our expectations. The custom WooCommerce integration boosted our sales by 40% within the first month.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Startup Founder",
      company: "EduTech Innovations",
      rating: 5,
      text: "The Learning Management System Ashirvad built for us is incredible. The MERN stack implementation is robust, scalable, and user-friendly. Our student engagement increased by 25% since launch.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency Co.",
      rating: 5,
      text: "Working with Ashirvad was a pleasure. He created a stunning WordPress theme that perfectly captured our brand identity. The site is fast, responsive, and ranks well on search engines.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Business Owner",
      company: "Local Services LLC",
      rating: 5,
      text: "Ashirvad transformed our outdated website into a modern, professional platform. The new WordPress site is easy to manage and has significantly improved our online presence.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Product Manager",
      company: "AI Solutions Inc.",
      rating: 5,
      text: "The AI portal website Ashirvad developed is exactly what we needed. Clean design, optimal performance, and seamless integration with our existing systems.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa"
    }
  ];

  return (
    <section ref={testimonialsRef} id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            <RollingText text="Meet Our Team" className="text-gradient" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <RollingText 
              text="Talented professionals who bring ideas to life with creativity and expertise" 
              delay={0.3}
            />
          </p>
        </div>

        {/* Team Grid with Hover Effects */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="relative group cursor-pointer"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Profile Image Container */}
              <motion.div
                className="aspect-square rounded-2xl overflow-hidden glass relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Name with Creative Text Animation */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        {member.name.split('').map((char, i) => (
                          <motion.span
                            key={i}
                            className="inline-block text-2xl font-bold text-gradient"
                            initial={{ opacity: 0, y: 20, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: -20, rotateX: 90 }}
                            transition={{
                              duration: 0.3,
                              delay: i * 0.03,
                              ease: "backOut"
                            }}
                            style={{ 
                              transformOrigin: 'center bottom',
                              display: char === ' ' ? 'inline' : 'inline-block'
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))}
                        <motion.p
                          className="text-sm text-muted-foreground mt-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {member.role}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Name Label Below */}
              <motion.div
                className="mt-3 text-center"
                animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
              >
                <h4 className="font-semibold text-foreground text-sm">{member.name}</h4>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">What They Say</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.slice(0, 3).map((member, index) => (
              <motion.div
                key={member.id}
                className="card-glass group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 glow-primary group-hover:scale-110 transition-transform">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-sm leading-relaxed text-foreground mb-4 line-clamp-4">
                  "{member.text}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(member.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{member.name}</h4>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-primary font-medium">{member.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
