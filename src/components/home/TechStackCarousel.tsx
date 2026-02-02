import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "React.svg" },
  { name: "Node.js", icon: "Node.js.svg" },
  { name: "TypeScript", icon: "TypeScript.svg" },
  { name: "Python", icon: "Python.svg" },
  { name: "AWS", icon: "AWS.svg" },
  { name: "Azure", icon: "Azure.svg" },
  { name: "Docker", icon: "Docker.svg" },
  { name: "Kubernetes", icon: "Kubernetes.svg" },
  { name: "PostgreSQL", icon: "PostgresSQL.svg" },
  { name: "MongoDB", icon: "MongoDB.svg" },
  { name: "TensorFlow", icon: "TensorFlow.svg" },
  { name: "Tailwind CSS", icon: "Tailwind CSS.svg" },
  { name: "GitHub", icon: "GitHub.svg" },
  { name: "Figma", icon: "Figma.svg" },
  { name: "Flutter", icon: "Flutter.svg" },
  { name: "MySQL", icon: "MySQL.svg" },
];

export function TechStackCarousel() {
  // Double the array for seamless loop
  const doubledTech = [...technologies, ...technologies];

  return (
    <section className="w-full py-12 bg-secondary/50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-6">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Technologies We Work With
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-8 py-4 items-center"
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
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 px-6 py-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
              title={tech.name}
            >
              <img
                src={`/Tech icons/${tech.icon}`}
                alt={tech.name}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
