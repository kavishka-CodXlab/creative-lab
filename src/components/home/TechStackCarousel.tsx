import { motion } from "framer-motion";

const clients = [
  "Acme Corp",
  "TechFlow",
  "Innovate Inc",
  "DataDrive",
  "CloudBase",
  "NextGen",
  "SmartSys",
  "CoreLogic",
];

export function TechStackCarousel() {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground text-sm">
            Trusted by teams who value quality and collaboration
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="text-muted-foreground/60 font-semibold text-lg hover:text-foreground transition-colors cursor-default"
            >
              {client}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
