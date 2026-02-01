import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Healthcare Platform",
    category: "Web Development",
    description: "Modern patient management system with telehealth integration",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
  },
  {
    title: "E-commerce Solution",
    category: "Full Stack",
    description: "Scalable online retail platform with AI-powered recommendations",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    title: "FinTech Dashboard",
    category: "UI/UX Design",
    description: "Real-time financial analytics and reporting dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "AI Analytics Tool",
    category: "AI/ML",
    description: "Machine learning powered business intelligence platform",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
  },
];

export function ProjectsShowcase() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Recent{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See how we've helped businesses transform their digital presence
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="rounded-full"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-coral/10 text-coral mb-2">
                {project.category}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/projects">
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            >
              Explore More Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
