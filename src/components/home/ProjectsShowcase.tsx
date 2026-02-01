import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Neural Commerce",
    category: "AI Solutions",
    description: "AI-powered e-commerce platform with personalized recommendations and dynamic pricing.",
    tech: ["Python", "TensorFlow", "React", "AWS"],
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    id: 2,
    title: "CloudSync Pro",
    category: "Enterprise Software",
    description: "Real-time data synchronization platform for distributed enterprise systems.",
    tech: ["Java", ".NET", "Docker", "Kubernetes"],
    gradient: "from-neon-purple to-neon-cyan",
  },
  {
    id: 3,
    title: "HealthAI Analytics",
    category: "Healthcare",
    description: "Machine learning platform for predictive healthcare analytics and patient outcomes.",
    tech: ["Python", "PyTorch", "PostgreSQL", "GCP"],
    gradient: "from-neon-cyan to-neon-blue",
  },
  {
    id: 4,
    title: "FinFlow Dashboard",
    category: "Fintech",
    description: "Real-time financial analytics dashboard with advanced visualization and reporting.",
    tech: ["React", "Node.js", "MongoDB", "D3.js"],
    gradient: "from-neon-blue via-neon-purple to-neon-cyan",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="glass-card rounded-xl overflow-hidden h-full hover:border-primary/30 transition-all duration-300">
        {/* Gradient Header */}
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="font-display text-xl font-semibold mt-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
            <button className="p-2 rounded-lg bg-muted/50 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/20 hover:text-primary">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsShowcase() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions that have transformed businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
