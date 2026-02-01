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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const socialContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.6,
    },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
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
      <SheetContent side="right" className="w-full sm:max-w-md bg-background border-l border-border p-0 overflow-hidden">
        <SheetHeader className="sr-only">
          <SheetTitle>Contact Information</SheetTitle>
        </SheetHeader>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col h-full py-12 px-8"
            >
              {/* Contact Info Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col justify-center space-y-0"
              >
                {contactInfo.map((item, index) => (
                  <motion.div key={item.title} variants={itemVariants}>
                    <motion.a
                      href={item.href}
                      className="group block py-8 text-center transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-coral group-hover:bg-coral/5 transition-all"
                        whileHover={{ 
                          rotate: [0, -10, 10, -10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <item.icon className="w-8 h-8 text-navy group-hover:text-coral transition-colors" />
                      </motion.div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-coral transition-colors">
                        {item.value}
                      </p>
                    </motion.a>
                    {index < contactInfo.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
                      >
                        <Separator className="my-0" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-8 border-t border-border"
              >
                <motion.h4 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="font-display text-lg font-semibold text-center mb-6"
                >
                  Stay Connected
                </motion.h4>
                <motion.div 
                  variants={socialContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-center gap-4"
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      variants={socialItemVariants}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 360,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full border-2 border-navy/20 flex items-center justify-center hover:border-coral hover:bg-coral hover:text-white transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}