import { useState } from 'react';
import { ExternalLink, Github, Eye, Code, Database, Palette, ShoppingCart, GraduationCap, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RollingText from './RollingText';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Learning Management System",
      description: "Full-stack LMS with course creation, material uploads, task assignments, and progress tracking. Built with MERN stack featuring JWT authentication and responsive design.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
      category: "Full Stack",
      icon: GraduationCap,
      tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
      links: {
        github: "https://github.com/Ashirvad-Singh/-Singh",
        demo: "#"
      },
      features: [
        "Course Management System",
        "User Authentication & Authorization",
        "Progress Tracking Dashboard",
        "Material Upload & Download",
        "Task Assignment System"
      ]
    },
    {
      id: 2,
      title: "AI Portal Website",
      description: "Custom WordPress theme for an AI portal with sleek, responsive UI. Optimized for performance with dynamic content rendering using PHP and Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      category: "WordPress",
      icon: Code,
      tech: ["WordPress", "PHP", "Tailwind CSS", "MySQL"],
      links: {
        demo: "#"
      },
      features: [
        "Custom WordPress Theme",
        "AI-focused Design",
        "Performance Optimized",
        "SEO Friendly",
        "Mobile Responsive"
      ]
    },
    {
      id: 3,
      title: "Pokedex App",
      description: "Interactive Pokedex application using React, Redux, and Pokémon API. Features search functionality, filtering, and dynamic Pokémon details fetching.",
      image: "https://images.unsplash.com/photo-1542779283-429940ce8336?w=800&q=80",
      category: "React App",
      icon: Gamepad2,
      tech: ["React", "Redux", "API", "Tailwind CSS"],
      links: {
        demo: "#",
        github: "https://github.com/Ashirvad-Singh/-Singh"
      },
      features: [
        "Search & Filter Pokémon",
        "Dynamic API Integration",
        "Redux State Management",
        "Responsive Design",
        "Interactive UI/UX"
      ]
    },
    {
      id: 4,
      title: "Custom WordPress Theme",
      description: "Fully customizable WordPress theme for blogging platforms. Includes custom post types, widgets, and advanced theme options with responsive layouts.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      category: "WordPress",
      icon: Palette,
      tech: ["WordPress", "PHP", "Tailwind CSS", "JavaScript"],
      links: {
        demo: "#",
        github: "https://github.com/Ashirvad-Singh/-Singh"
      },
      features: [
        "Custom Post Types",
        "Advanced Theme Options",
        "Widget System",
        "SEO Optimized",
        "Cross-device Compatibility"
      ]
    },
    {
      id: 5,
      title: "E-commerce Solutions",
      description: "Custom WooCommerce implementations for various clients, featuring tailored shopping experiences, payment integrations, and inventory management.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      category: "E-commerce",
      icon: ShoppingCart,
      tech: ["WooCommerce", "WordPress", "PHP", "MySQL"],
      links: {
        demo: "#"
      },
      features: [
        "Custom WooCommerce Setup",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Tracking System",
        "Mobile-first Design"
      ]
    },
    {
      id: 6,
      title: "Database Management System",
      description: "Comprehensive database solutions with optimized queries, data visualization, and reporting features for business intelligence applications.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "Backend",
      icon: Database,
      tech: ["MySQL", "PHP", "JavaScript", "Chart.js"],
      links: {
        github: "https://github.com/Ashirvad-Singh/-Singh"
      },
      features: [
        "Query Optimization",
        "Data Visualization",
        "Report Generation",
        "User Access Control",
        "Performance Monitoring"
      ]
    }
  ];

  const categories = ["All", "Full Stack", "WordPress", "React App", "E-commerce", "Backend"];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="heading-lg mb-6">
            <RollingText text="Featured Projects" className="text-gradient" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <RollingText 
              text="A showcase of my latest work, demonstrating expertise in full-stack development, WordPress customization, and modern web technologies." 
              delay={0.3}
            />
          </p>
        </div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Button
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`${
                  activeCategory === category 
                    ? "btn-primary" 
                    : "glass glass-hover"
                } transition-all duration-300`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Hover Expand Gallery */}
        <div className="relative flex flex-col md:flex-row gap-4 h-auto md:h-[600px] mb-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isExpanded = hoveredIndex === index;
              const isOthersHovered = hoveredIndex !== null && hoveredIndex !== index;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    flex: isExpanded ? 3 : (isOthersHovered ? 0.5 : 1)
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group min-h-[400px] md:min-h-0"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Gradient Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
                    animate={{
                      opacity: isExpanded ? 0.95 : 0.7
                    }}
                  />

                  {/* Content Container */}
                  <div className="relative h-full flex flex-col justify-between p-6">
                    {/* Top Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="glass border-primary/30 text-primary backdrop-blur-md">
                        {project.category}
                      </Badge>
                    </motion.div>

                    {/* Bottom Content */}
                    <div className="space-y-4">
                      {/* Icon */}
                      <motion.div
                        animate={{
                          scale: isExpanded ? 1.2 : 1,
                          opacity: isExpanded ? 1 : 0.8
                        }}
                        className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center glow-primary"
                      >
                        <project.icon className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Title */}
                      <motion.h3 
                        className="text-2xl font-bold text-gradient"
                        animate={{
                          fontSize: isExpanded ? '2rem' : '1.5rem'
                        }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 overflow-hidden"
                          >
                            {/* Description */}
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="px-3 py-1 text-xs glass rounded-lg text-foreground border border-white/10"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>

                            {/* Features */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-foreground">Key Features:</h4>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {project.features.slice(0, 3).map((feature, i) => (
                                  <motion.li 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full glow-primary" />
                                    {feature}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                              {project.links.demo && (
                                <Button size="sm" className="btn-primary group">
                                  <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                  View Demo
                                </Button>
                              )}
                              {project.links.github && (
                                <Button size="sm" variant="outline" className="glass glass-hover">
                                  <Github className="w-4 h-4 mr-2" />
                                  Source
                                </Button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Collapsed State Hint */}
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Hover to explore
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View All Projects Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button className="btn-accent group" asChild>
            <a href="https://github.com/Ashirvad-Singh/-Singh" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
