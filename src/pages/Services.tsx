import { motion } from "framer-motion";
import { Code2, Brain, FlaskConical, Cog, BarChart3, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const services = [
  {
    id: "software",
    icon: Code2,
    title: "Software Development",
    description: "Custom software solutions built with modern technologies and best practices to drive your business forward.",
    features: [
      "Full-stack web applications",
      "Mobile app development",
      "API development & integration",
      "Cloud-native solutions",
      "Legacy system modernization",
      "Performance optimization",
    ],
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI Solutions & Design",
    description: "Intelligent systems powered by machine learning and neural networks to automate and enhance your operations.",
    features: [
      "Machine learning models",
      "Natural language processing",
      "Computer vision systems",
      "Predictive analytics",
      "AI-powered automation",
      "Recommendation engines",
    ],
    gradient: "from-neon-purple to-neon-cyan",
  },
  {
    id: "research",
    icon: FlaskConical,
    title: "Research & Development",
    description: "Pioneering research to push the boundaries of what's possible and keep you ahead of the competition.",
    features: [
      "Technology feasibility studies",
      "Prototype development",
      "Innovation consulting",
      "Patent research",
      "Emerging tech exploration",
      "Academic partnerships",
    ],
    gradient: "from-neon-cyan to-neon-blue",
  },
  {
    id: "product",
    icon: Cog,
    title: "Product Engineering",
    description: "End-to-end product development from concept to market launch with agile methodologies.",
    features: [
      "Product strategy & roadmap",
      "UX/UI design",
      "Agile development",
      "Quality assurance",
      "DevOps & CI/CD",
      "Post-launch support",
    ],
    gradient: "from-neon-blue via-neon-purple to-neon-cyan",
  },
  {
    id: "bi",
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Data-driven insights to transform your business decisions and unlock hidden opportunities.",
    features: [
      "Data warehousing",
      "Dashboard development",
      "ETL pipelines",
      "Real-time analytics",
      "KPI tracking",
      "Data visualization",
    ],
    gradient: "from-neon-purple to-neon-blue",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Services = () => {
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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We offer comprehensive technology services designed to help businesses 
              innovate, scale, and succeed in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                variants={itemVariants}
                className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-[2px] mb-6`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className={`aspect-square rounded-2xl bg-gradient-to-br ${service.gradient} p-[2px]`}>
                    <div className="w-full h-full rounded-2xl glass-card flex items-center justify-center">
                      <service.icon className="w-32 h-32 text-primary/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
