import { motion } from "framer-motion";
import { Globe, BarChart2, Handshake, Lightbulb, TrendingUp, Settings } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "Full-Spectrum Digital Expertise",
    description: "From web development to AI solutions — we deliver comprehensive digital services under one roof.",
  },
  {
    icon: BarChart2,
    title: "Data-Driven Approach",
    description: "We don't guess. Every solution is powered by real data, analytics, and performance insights.",
  },
  {
    icon: Handshake,
    title: "Transparent Communication",
    description: "You're always in the loop. Clear reporting, regular updates, and honest advice come standard.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions for your business.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description: "Built to grow with you. Our solutions scale seamlessly as your business expands.",
  },
  {
    icon: Settings,
    title: "Dedicated Support",
    description: "24/7 support and maintenance to ensure your systems run smoothly at all times.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 section-dark">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Leading Brands{" "}
            <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            We help your business grow with proven, data-led strategies.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-navy-light/50 border border-white/10 rounded-2xl p-8 hover:border-coral/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <reason.icon className="w-7 h-7 text-white/80" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
