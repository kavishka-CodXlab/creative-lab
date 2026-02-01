import { motion } from "framer-motion";
import { Code2, Brain, FlaskConical, Cog, BarChart3, Check, ArrowRight, Smartphone, Globe, Cloud } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "software",
    icon: Code2,
    title: "Custom Software Development",
    description: "We craft custom software that fits your business like a glove — intuitive, scalable, and built to last.",
    features: [
      "Full-stack web applications",
      "Enterprise software solutions",
      "API development & integration",
      "Legacy system modernization",
      "Performance optimization",
      "Ongoing support & maintenance",
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent systems that augment human capabilities — making your team smarter, not replacing them.",
    features: [
      "Machine learning models",
      "Natural language processing",
      "Computer vision solutions",
      "Predictive analytics",
      "AI strategy consulting",
      "Model training & deployment",
    ],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    features: [
      "iOS & Android development",
      "Cross-platform solutions",
      "Mobile-first design",
      "App store optimization",
      "Push notifications",
      "Offline functionality",
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description: "Fast, responsive, and beautifully designed websites that convert visitors into customers.",
    features: [
      "Responsive web design",
      "E-commerce platforms",
      "Content management systems",
      "Progressive web apps",
      "SEO optimization",
      "Performance tuning",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Modern infrastructure that scales with your business and keeps your systems running smoothly.",
    features: [
      "Cloud migration",
      "AWS, Azure, GCP expertise",
      "CI/CD pipelines",
      "Infrastructure as code",
      "Monitoring & alerting",
      "Security best practices",
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  },
  {
    id: "bi",
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Turn your data into insights that drive decisions — dashboards and analytics that actually get used.",
    features: [
      "Data strategy consulting",
      "Dashboard development",
      "Report automation",
      "Real-time analytics",
      "Data visualization",
      "Business intelligence",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-coral font-semibold mb-3">Our services</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How we can <span className="gradient-text">help you</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We offer a range of services designed to meet you where you are 
              and help you get where you want to go. No cookie-cutter solutions — 
              just thoughtful work tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="icon-ring mb-6">
                    <service.icon className="w-7 h-7 text-coral" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-coral" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="rounded-full btn-gradient border-0 text-white" variant="default">
                      Discuss your project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold mb-4 text-white">
              Not sure what you need?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              That's okay! Let's have a conversation about your goals and figure out 
              the best path forward together. No pressure, no hard sell.
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90 font-semibold">
                Let's talk
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
