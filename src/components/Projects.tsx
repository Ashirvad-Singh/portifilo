import { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RollingText from './RollingText';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchRepos = async () => {
    try {
      const res = await fetch(
        'https://api.github.com/users/Ashirvad-Singh/repos?per_page=100'
      );
      const data = await res.json();

      const mapped = data
        .filter((repo: any) => !repo.fork)
        .map((repo: any) => ({
          id: repo.id,
          title: repo.name.replace(/-/g, ' '),
          description: repo.description || 'No description available.',
          image:
            'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
          category: repo.language || 'Other',
          tech: repo.language ? [repo.language] : [],
          links: {
            github: repo.html_url,
            demo: repo.homepage || null,
          },
        }));

      setProjects(mapped);
    } catch (error) {
      console.error('GitHub fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchRepos();
}, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground animate-pulse">
        Loading your pinned projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No pinned projects found on your GitHub profile.
      </div>
    );
  }

  return (
    <section id="projects" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="heading-lg mb-6">
            <RollingText text="Pinned Projects" className="text-gradient" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <RollingText
              text="My highlighted repositories — a curated list of my best work from GitHub."
              delay={0.3}
            />
          </p>
        </div>

        {/* Project Cards */}
        <div className="relative flex flex-col md:flex-row gap-4 h-auto md:h-[600px] mb-12">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              const isExpanded = hoveredIndex === index;
              const isOthersHovered =
                hoveredIndex !== null && hoveredIndex !== index;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    flex: isExpanded ? 3 : isOthersHovered ? 0.5 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group min-h-[400px]"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
                    animate={{ opacity: isExpanded ? 0.95 : 0.7 }}
                  />

                  <div className="relative h-full flex flex-col justify-between p-6 space-y-4">
                    <Badge
                      variant="outline"
                      className="glass border-primary/30 text-primary"
                    >
                      Pinned
                    </Badge>

                    <motion.h3
                      className="text-2xl font-bold text-gradient"
                      animate={{
                        fontSize: isExpanded ? '2rem' : '1.5rem',
                      }}
                    >
                      {project.title}
                    </motion.h3>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs glass rounded-lg text-foreground border border-white/10"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-3 pt-2">
                            {project.links.demo && (
                              <Button size="sm" className="btn-primary" asChild>
                                <a
                                  href={project.links.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Demo
                                </a>
                              </Button>
                            )}
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4 mr-2" />
                                Source
                              </a>
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <motion.div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ExternalLink className="w-3 h-3" />
                        Hover to explore
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View All */}
        <motion.div className="text-center mt-10 opacity-70 hover:opacity-100 transition">
          <Button asChild>
            <a
              href="https://github.com/Ashirvad-Singh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View GitHub Profile
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
