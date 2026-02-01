import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Target, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Heart,
    title: "Human First",
    description: "Technology should serve people, not the other way around. We design for real humans with real needs.",
  },
  {
    icon: Users,
    title: "True Partnership",
    description: "We don't just take orders — we collaborate, challenge assumptions, and invest in your success.",
  },
  {
    icon: Lightbulb,
    title: "Thoughtful Innovation",
    description: "We embrace new technologies, but only when they genuinely solve problems. No buzzwords for buzzwords' sake.",
  },
  {
    icon: Target,
    title: "Deliver What Matters",
    description: "We focus on outcomes, not just outputs. Success means making a real difference for your business.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "15+ years in tech, passionate about using technology for good.",
  },
  {
    name: "Michael Chen",
    role: "Head of Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Former Google engineer, loves building elegant solutions to complex problems.",
  },
  {
    name: "Emily Rodriguez",
    role: "Design Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Award-winning designer focused on creating experiences people love.",
  },
  {
    name: "David Kim",
    role: "Head of AI",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "PhD in ML, believes AI should augment human capabilities, not replace them.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary font-medium mb-3">About us</p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-foreground">
                We're the people behind the pixels
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Creative Lab started with a simple belief: technology should feel human. 
                Too often, we saw companies frustrated by software that didn't understand 
                their needs, built by teams that didn't listen.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                So we built something different — a team that genuinely cares about the 
                people we work with and the problems we solve together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Our team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <p className="text-primary font-medium mb-3">Our values</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-foreground">
              What we believe in
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These aren't just words on a wall — they guide how we work every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="warm-card p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <p className="text-primary font-medium mb-3">Our team</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-foreground">
              Meet the humans behind Creative Lab
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We're a diverse team of builders, thinkers, and problem-solvers who love what we do.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
              Want to work with us?
            </h2>
            <p className="text-primary-foreground/80 mb-8 leading-relaxed">
              Whether you have a project in mind or just want to chat about ideas, 
              we'd love to hear from you.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Get in touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
