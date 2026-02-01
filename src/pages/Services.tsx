import { motion } from "framer-motion";
import { Code2, Brain, FlaskConical, Cog, BarChart3, Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "software",
    icon: Code2,
    title: "Software Development",
    description: "We craft custom software that fits your business like a glove — intuitive, scalable, and built to last.",
    features: [
      "Full-stack web applications",
      "Mobile app development",
      "API development & integration",
      "Cloud-native solutions",
      "Legacy system modernization",
      "Ongoing support & maintenance",
    ],
    color: "bg-primary/10 text-primary",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent systems that augment human capabilities — making your team smarter, not replacing them.",
    features: [
      "Machine learning models",
      "Natural language processing",
      "Predictive analytics",
      "Process automation",
      "AI strategy consulting",
      "Ethical AI practices",
    ],
    color: "bg-warm-coral/10 text-warm-coral",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
  },
  {
    id: "research",
    icon: FlaskConical,
    title: "Research & Development",
    description: "We explore what's next, turning emerging technologies into practical solutions for today's challenges.",
    features: [
      "Technology feasibility studies",
      "Prototype development",
      "Innovation workshops",
      "Proof of concept builds",
      "Technology roadmapping",
      "Patent research",
    ],
    color: "bg-warm-sage/10 text-warm-sage",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
  },
  {
    id: "product",
    icon: Cog,
    title: "Product Engineering",
    description: "From napkin sketch to market launch — we bring your product vision to life with care and precision.",
    features: [
      "Product discovery & strategy",
      "UX/UI design",
      "Agile development",
      "Quality assurance",
      "DevOps & CI/CD",
      "Launch & growth support",
    ],
    color: "bg-warm-amber/10 text-warm-amber",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "bi",
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Turn your data into stories that drive decisions — dashboards and insights that actually get used.",
    features: [
      "Data strategy consulting",
      "Dashboard development",
      "Report automation",
      "Real-time analytics",
      "Data visualization",
      "Training & enablement",
    ],
    color: "bg-primary/10 text-primary",
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
            <p className="text-primary font-medium mb-3">Our services</p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-foreground">
              How we can help you
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
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-warm-sage/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-warm-sage" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="rounded-full" variant="outline">
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
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl font-semibold mb-4 text-foreground">
              Not sure what you need?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              That's okay! Let's have a conversation about your goals and figure out 
              the best path forward together. No pressure, no hard sell.
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-8">
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
