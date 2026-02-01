import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "HealthFirst Platform",
    category: "Healthcare",
    description: "We partnered with a regional healthcare network to create a patient-centered platform that simplified appointment booking, health tracking, and doctor communication.",
    challenge: "Patients were frustrated with a fragmented system — multiple apps, confusing interfaces, and no unified view of their health journey.",
    solution: "We designed and built an intuitive mobile-first platform that brought everything together. The focus was on simplicity and accessibility for users of all ages.",
    results: ["50,000+ active users", "4.8★ app store rating", "60% reduction in missed appointments"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    testimonial: {
      quote: "Creative Lab didn't just build an app — they understood our patients' needs and created something they actually want to use.",
      author: "Dr. Sarah Chen",
      role: "Chief Digital Officer",
    },
  },
  {
    id: 2,
    title: "RetailFlow Inventory",
    category: "Retail & E-commerce",
    description: "A growing retail chain was struggling with inventory management. We helped them build a system that brought clarity and control to their operations.",
    challenge: "Stockouts were costing millions, while other products sat unsold. The team was drowning in spreadsheets with no real-time visibility.",
    solution: "We built an intelligent inventory management system with real-time tracking, predictive restocking, and a dashboard that actually made sense to the team.",
    results: ["40% reduction in stockouts", "$2M annual savings", "Real-time inventory visibility"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    testimonial: {
      quote: "For the first time, our managers can see exactly what's happening across all locations. It's transformed how we operate.",
      author: "Michael Torres",
      role: "VP of Operations",
    },
  },
  {
    id: 3,
    title: "EduConnect Learning",
    category: "Education",
    description: "We worked with an education nonprofit to bring personalized learning to underserved communities through technology.",
    challenge: "Students in rural areas lacked access to quality education resources and personalized support.",
    solution: "We created an adaptive learning platform that works offline, personalizes content to each student's level, and connects them with volunteer tutors.",
    results: ["10,000+ students reached", "35% improvement in test scores", "Works in low-connectivity areas"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    testimonial: {
      quote: "Creative Lab built something that truly makes a difference. They understood our mission and delivered beyond our expectations.",
      author: "Dr. Amara Obi",
      role: "Executive Director",
    },
  },
  {
    id: 4,
    title: "FinFlow Analytics",
    category: "Financial Services",
    description: "A financial services firm needed real-time visibility into their portfolio performance and regulatory compliance.",
    challenge: "Reports took days to generate, compliance was manual, and leadership couldn't get timely insights for decision-making.",
    solution: "We built a real-time analytics dashboard that processes transactions instantly, automates compliance reporting, and surfaces the insights that matter.",
    results: ["90% faster reporting", "100% audit compliance", "Real-time risk monitoring"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    testimonial: {
      quote: "What used to take our team days now happens automatically. The dashboard has become essential to how we operate.",
      author: "Jennifer Park",
      role: "Chief Risk Officer",
    },
  },
];

const Projects = () => {
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
            <p className="text-coral font-semibold mb-3">Our portfolio</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Stories of <span className="gradient-text">partnership and impact</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every project is a collaboration. Here are some of the stories of 
              working alongside our clients to solve real problems and create lasting value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects List */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {/* Image */}
                <div className="rounded-2xl overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-coral/10 text-coral mb-4">
                      {project.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display font-bold mb-2 text-foreground">The Challenge</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-display font-bold mb-2 text-foreground">Our Approach</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Results */}
                    <div className="modern-card p-6">
                      <h3 className="font-display font-bold mb-4 text-foreground">Results</h3>
                      <ul className="space-y-3">
                        {project.results.map((result) => (
                          <li key={result} className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-coral" />
                            <span className="text-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Testimonial */}
                    <div className="modern-card p-6 bg-secondary/50">
                      <p className="text-foreground italic mb-4 text-sm leading-relaxed">
                        "{project.testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{project.testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{project.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {index < projects.length - 1 && (
                  <div className="border-b border-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
