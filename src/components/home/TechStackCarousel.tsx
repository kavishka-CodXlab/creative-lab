import { motion } from "framer-motion";

const techStack = [
  { name: "Java", icon: "☕" },
  { name: "Python", icon: "🐍" },
  { name: "C++", icon: "⚡" },
  { name: ".NET", icon: "🔷" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Jenkins", icon: "🔧" },
  { name: "CI/CD", icon: "🔄" },
  { name: "Firebase", icon: "🔥" },
  { name: "Kotlin", icon: "🎯" },
  { name: "Flask", icon: "🌶️" },
  { name: "GitHub", icon: "🐙" },
];

// Duplicate for seamless infinite scroll
const duplicatedTech = [...techStack, ...techStack];

export function TechStackCarousel() {
  return (
    <section className="py-16 border-y border-border/50 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm uppercase tracking-widest"
        >
          Technologies We Master
        </motion.p>
      </div>

      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -50 * techStack.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-8"
        >
          {duplicatedTech.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 glass-card rounded-xl px-6 py-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="font-medium text-foreground whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
