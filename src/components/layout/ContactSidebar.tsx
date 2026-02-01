import { Mail, Headphones, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ContactSidebarProps {
  trigger?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const socialContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

export function ContactSidebar({ trigger }: ContactSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Address",
      value: "hello@creativelab.com",
      href: "mailto:hello@creativelab.com",
    },
    {
      icon: Headphones,
      title: "Phone Number",
      value: "+94 76 330 69 68",
      href: "tel:+94763306968",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "33/9/2, Galle Road, Panadura",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mail className="w-5 h-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[380px] bg-background border-l border-border p-0 overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>Contact Information</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full py-8 px-6">
          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            className="flex-1 flex flex-col justify-center space-y-0"
          >
            {contactInfo.map((item, index) => (
              <motion.div key={item.title} variants={itemVariants}>
                <motion.a
                  href={item.href}
                  className="group block py-6 text-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-coral group-hover:bg-coral/5 transition-all"
                    whileHover={{ 
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <item.icon className="w-6 h-6 text-navy group-hover:text-coral transition-colors" />
                  </motion.div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-coral transition-colors">
                    {item.value}
                  </p>
                </motion.a>
                {index < contactInfo.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  >
                    <Separator className="my-0" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 15 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="pt-6 border-t border-border"
          >
            <h4 className="font-display text-base font-semibold text-center mb-4">
              Stay Connected
            </h4>
            <motion.div 
              variants={socialContainerVariants}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="flex justify-center gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  variants={socialItemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border-2 border-coral/30 flex items-center justify-center text-coral hover:border-coral hover:bg-coral hover:text-white transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}