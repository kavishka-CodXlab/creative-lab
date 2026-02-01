import { motion } from "framer-motion";

const technologies = [
  "React", "Node.js", "TypeScript", "Python", "AWS", "Azure", 
  "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "TensorFlow", "Next.js",
  "GraphQL", "Redis", "Firebase", "Figma"
];

export function TechStackCarousel() {
  // Double the array for seamless loop
  const doubledTech = [...technologies, ...technologies];

  return (
    <section className="py-12 bg-secondary/50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-6">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Technologies We Work With
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/50 to-transparent z-10" />
        
        {/* Scrolling container */}
        <motion.div
          className="flex gap-12 py-4"
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {doubledTech.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex-shrink-0 px-6 py-3 rounded-full bg-background border border-border"
            >
              <span className="font-semibold text-foreground whitespace-nowrap">
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
