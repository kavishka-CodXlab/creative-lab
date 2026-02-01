import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "05+", label: "Years of Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "20+", label: "Team Members" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center hero-gradient text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-coral/20 opacity-90" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8"
          >
            <span className="text-sm font-medium text-white/90">Strategy • Design • Development</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Your Trusted Partner for{" "}
            <span className="gradient-text">Digital Solutions</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Premium software development, AI solutions, & performance-driven 
            technology for ambitious businesses ready to scale.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/projects">
              <Button 
                size="lg" 
                className="btn-gradient text-white border-0 rounded-full px-8 py-6 text-base font-semibold group hover:opacity-90 transition-opacity"
              >
                View Our Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 text-base font-semibold bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Schedule a Call 👋
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 border-t border-white/10"
      >
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <p className="stat-number mb-2">{stat.value}</p>
                <p className="text-sm text-white/60 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
