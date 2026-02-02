import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string | null;
  features: string[];
  display_order: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Code;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-sky font-bold text-xs uppercase tracking-widest mb-3">What We Do</p>
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
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No services available yet.</p>
            </div>
          ) : (
            <div className="space-y-32">
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon);

                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "" : "lg:flex-row-reverse"
                      }`}
                  >
                    <div className={index % 2 === 1 ? "" : "lg:order-2"}>
                      <div className="icon-ring mb-8 scale-110">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-foreground">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm group/feature">
                            <div className="w-5 h-5 rounded-full bg-sky/10 flex items-center justify-center shrink-0 group-hover/feature:bg-sky group-hover/feature:text-white transition-colors">
                              <LucideIcons.Check className="w-3 h-3" />
                            </div>
                            <span className="text-foreground font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact">
                        <Button size="lg" className="rounded-full px-8 btn-gradient border-0 text-white shadow-xl shadow-sky/20 hover:scale-105 transition-all" variant="default">
                          Discuss your project
                          <LucideIcons.ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? "" : "lg:order-1"}>
                      <div className="rounded-3xl overflow-hidden shadow-2xl bg-muted/20">
                        {service.image_url ? (
                          <img
                            src={service.image_url}
                            alt={service.title}
                            className="w-full h-full object-cover aspect-[4/3] transform hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-primary/10 to-sky/10">
                            <IconComponent className="w-24 h-24 text-primary/20" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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
                <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
