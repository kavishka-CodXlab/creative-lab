import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "HealthFirst Platform",
    category: "Healthcare",
    description: "A patient-centered healthcare platform that simplified appointment booking and health tracking for 50,000+ users.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    results: "50,000+ active users",
  },
  {
    id: 2,
    title: "RetailFlow",
    category: "E-commerce",
    description: "An intuitive inventory management system that helped retailers reduce stockouts by 40%.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    results: "40% fewer stockouts",
  },
  {
    id: 3,
    title: "EduConnect",
    category: "Education",
    description: "A learning platform that brought personalized education to underserved communities.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    results: "10,000+ students helped",
  },
];

export function ProjectsShowcase() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="text-primary font-medium mb-3">Our work</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Stories of impact and innovation
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium group"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to="/projects">
                <div className="warm-card overflow-hidden hover-lift">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                    <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-sm font-medium text-warm-sage">{project.results}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
