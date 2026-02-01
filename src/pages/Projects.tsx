import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Neural Commerce",
    category: "AI Solutions",
    description: "AI-powered e-commerce platform with personalized recommendations, dynamic pricing, and intelligent inventory management. The system uses deep learning to analyze customer behavior and optimize conversions.",
    challenge: "The client needed to increase conversion rates and customer engagement on their e-commerce platform while reducing cart abandonment.",
    solution: "We implemented a neural network-based recommendation engine that analyzes user behavior in real-time, providing personalized product suggestions and dynamic pricing strategies.",
    results: ["45% increase in conversion rate", "30% reduction in cart abandonment", "2x improvement in customer engagement"],
    tech: ["Python", "TensorFlow", "React", "AWS", "PostgreSQL"],
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    id: 2,
    title: "CloudSync Pro",
    category: "Enterprise Software",
    description: "Real-time data synchronization platform for distributed enterprise systems. Enables seamless data flow across multiple cloud providers and on-premise infrastructure.",
    challenge: "A Fortune 500 company struggled with data silos across their global operations, leading to delayed decision-making and inconsistent reporting.",
    solution: "We built a distributed event-driven architecture that synchronizes data in real-time across 50+ systems while maintaining data integrity and compliance.",
    results: ["99.99% uptime achieved", "50ms average sync latency", "80% reduction in data inconsistencies"],
    tech: ["Java", ".NET", "Docker", "Kubernetes", "Apache Kafka"],
    gradient: "from-neon-purple to-neon-cyan",
  },
  {
    id: 3,
    title: "HealthAI Analytics",
    category: "Healthcare",
    description: "Machine learning platform for predictive healthcare analytics and patient outcomes. Helps healthcare providers make data-driven decisions to improve patient care.",
    challenge: "A healthcare network needed to predict patient readmissions and optimize resource allocation across their facilities.",
    solution: "We developed a HIPAA-compliant ML platform that analyzes patient data to predict outcomes, identify at-risk patients, and recommend preventive interventions.",
    results: ["35% reduction in readmissions", "20% improvement in resource utilization", "Saved $2M annually"],
    tech: ["Python", "PyTorch", "PostgreSQL", "GCP", "FHIR"],
    gradient: "from-neon-cyan to-neon-blue",
  },
  {
    id: 4,
    title: "FinFlow Dashboard",
    category: "Fintech",
    description: "Real-time financial analytics dashboard with advanced visualization, automated reporting, and regulatory compliance tracking for financial institutions.",
    challenge: "A financial services firm needed real-time visibility into their portfolio performance while meeting strict regulatory reporting requirements.",
    solution: "We created an interactive dashboard that processes millions of transactions in real-time, generating automated reports and compliance documentation.",
    results: ["90% reduction in reporting time", "Real-time risk monitoring", "100% regulatory compliance"],
    tech: ["React", "Node.js", "MongoDB", "D3.js", "Redis"],
    gradient: "from-neon-blue via-neon-purple to-neon-cyan",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
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
      <div className="glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300">
        {/* Gradient Header */}
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
        
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs text-primary uppercase tracking-wider font-medium">
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-bold mt-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
            <button className="p-2 rounded-lg bg-muted/50 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/20 hover:text-primary">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <p className="text-muted-foreground mb-6">
            {project.description}
          </p>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 mb-6"
            >
              <div>
                <h4 className="font-semibold text-sm mb-2">The Challenge</h4>
                <p className="text-muted-foreground text-sm">{project.challenge}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Our Solution</h4>
                <p className="text-muted-foreground text-sm">{project.solution}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Results</h4>
                <ul className="space-y-1">
                  {project.results.map((result) => (
                    <li key={result} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, isExpanded ? project.tech.length : 3).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
              {!isExpanded && project.tech.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary"
            >
              {isExpanded ? "Show Less" : "Learn More"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-neon-cyan/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of innovative solutions that have transformed 
              businesses across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
