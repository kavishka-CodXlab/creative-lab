import { motion } from "framer-motion";
import { Code2, Brain, FlaskConical, Cog, BarChart3, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom applications built with care, designed to grow with your business.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent systems that enhance human capabilities, not replace them.",
    color: "bg-warm-coral/10 text-warm-coral",
  },
  {
    icon: FlaskConical,
    title: "Research & Development",
    description: "Exploring tomorrow's possibilities to solve today's challenges.",
    color: "bg-warm-sage/10 text-warm-sage",
  },
  {
    icon: Cog,
    title: "Product Engineering",
    description: "From concept to launch, we bring your product vision to life.",
    color: "bg-warm-amber/10 text-warm-amber",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Data insights that tell a story and drive real decisions.",
    color: "bg-primary/10 text-primary",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-medium mb-3">What we do</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-foreground">
              Services designed around your needs
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We don't just deliver projects — we partner with you to understand your goals 
              and create solutions that make a real difference.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to="/services" className="block group">
                <div className="warm-card p-6 h-full hover-lift">
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
