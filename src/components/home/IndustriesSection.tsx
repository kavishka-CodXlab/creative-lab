import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Industry {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
}

export function IndustriesSection() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from("industries")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setIndustries(data || []);
    } catch (error) {
      console.error("Error fetching industries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-muted-foreground">Loading industries...</p>
        </div>
      </section>
    );
  }

  if (industries.length === 0) {
    return null; // Don't show section if no industries
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Customized Solutions{" "}
            <span className="gradient-text">for Every Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We create tailored strategies to help businesses thrive, no matter their industry or challenges.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={industry.image_url}
                alt={industry.name}
                className="w-full aspect-[3/2] object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oxford/90 via-oxford/20 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-xs md:text-sm tracking-wide">
                  {industry.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
