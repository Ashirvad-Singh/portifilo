import { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RollingText from './RollingText';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // ✅ first open
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

 useEffect(() => {
  const fetchAllStarred = async () => {
    try {
      let allRepos: any[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(
          `https://api.github.com/users/Ashirvad-Singh/starred?per_page=100&page=${page}`
        );
        const data = await res.json();

        if (data.length === 0) {
          hasMore = false;
        } else {
          allRepos = [...allRepos, ...data];
          page++;
        }
      }

      const mapped = allRepos.map((repo: any) => ({
        id: repo.id,
        title: repo.name.replace(/-/g, ' '),
        description: repo.description || 'No description available.',
        image: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        category: repo.language || 'Other',
        tech: repo.language ? [repo.language] : [],
        links: {
          github: repo.html_url,
          demo: repo.homepage || null,
        },
        stars: repo.stargazers_count,
        owner: repo.owner.login,
      }));

      setProjects(mapped);
    } catch (error) {
      console.error('Error fetching starred repos:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllStarred();
}, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground animate-pulse">
        Loading projects...
      </div>
    );
  }

  return (
    <section id="projects" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="heading-lg mb-6">
            <RollingText text="Starred Projects" className="text-gradient" />
          </h2>
          <p className="text-muted-foreground">
            Tap / Hover to explore projects
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
          <AnimatePresence>
            {projects.map((project, index) => {
              const isExpanded = hoveredIndex === index;
              const isOthersHovered =
                hoveredIndex !== null && hoveredIndex !== index;

              return (
                <motion.div
                  key={project.id}
                  layout
                  whileTap={{ scale: 0.97 }} // 🔥 mobile feedback
                  onClick={() => {
                    if (isTouchDevice) {
                      setHoveredIndex(
                        hoveredIndex === index ? null : index
                      );
                    }
                  }}
                  onHoverStart={() => {
                    if (!isTouchDevice) setHoveredIndex(index);
                  }}
                  onHoverEnd={() => {
                    if (!isTouchDevice) setHoveredIndex(null);
                  }}
                  animate={{
                    flex: isExpanded ? 3 : isOthersHovered ? 0.6 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden cursor-pointer min-h-[400px]"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="relative h-full flex flex-col justify-between p-6">

                    {/* Top */}
                    <Badge className="w-fit bg-white/10 text-white border-0">
                      ⭐ Starred
                    </Badge>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {project.title}
                    </h3>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          <p className="text-sm text-white/80">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string, i: number) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-white/10 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            {project.links.demo && (
                              <Button size="sm" asChild>
                                <a
                                  href={project.links.demo}
                                  target="_blank"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Demo
                                </a>
                              </Button>
                            )}
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={project.links.github}
                                target="_blank"
                              >
                                <Github className="w-4 h-4 mr-1" />
                                Code
                              </a>
                            </Button>
                          </div>

                          {/* ⭐ Stars */}
                          <div className="text-xs text-white/70">
                            ⭐ {project.stars}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="text-xs text-white/60">
                        {isTouchDevice ? 'Tap to open' : 'Hover to explore'}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <Button asChild>
            <a
              href="https://github.com/Ashirvad-Singh"
              target="_blank"
            >
              <Github className="w-5 h-5 mr-2" />
              Visit GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
