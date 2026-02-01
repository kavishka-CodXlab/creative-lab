import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-coral via-coral-light to-navy" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Book your free<br />
              Consultation now
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-md leading-relaxed">
              Ready to elevate your brand with cutting-edge solutions? Schedule 
              a call with our experts and take the first step toward success!
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Schedule a Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                {/* Mock calendar UI */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <Calendar className="w-6 h-6 text-coral" />
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-full flex items-center justify-center text-sm ${
                          i === 14 
                            ? "bg-coral text-white font-bold ring-4 ring-coral/20" 
                            : "bg-muted/50"
                        }`}
                      >
                        {i === 14 && (
                          <span className="text-xs font-bold">31</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                  </div>
                </div>
              </div>
              {/* Floating element */}
              <div className="absolute -right-4 top-8 bg-white rounded-xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                    <span className="text-lg">🗓️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Click to Book</p>
                    <p className="text-xs text-muted-foreground">10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
