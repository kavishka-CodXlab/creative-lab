import { Mail, Headphones, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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

export function ContactSidebar({ trigger }: ContactSidebarProps) {
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
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mail className="w-5 h-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-background border-l border-border p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Contact Information</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full py-12 px-8">
          {/* Contact Info Cards */}
          <div className="flex-1 flex flex-col justify-center space-y-0">
            {contactInfo.map((item, index) => (
              <div key={item.title}>
                <a
                  href={item.href}
                  className="group block py-8 text-center transition-colors"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-coral group-hover:bg-coral/5 transition-all">
                    <item.icon className="w-8 h-8 text-navy group-hover:text-coral transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-coral transition-colors">
                    {item.value}
                  </p>
                </a>
                {index < contactInfo.length - 1 && (
                  <Separator className="my-0" />
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="pt-8 border-t border-border">
            <h4 className="font-display text-lg font-semibold text-center mb-6">
              Stay Connected
            </h4>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border-2 border-navy/20 flex items-center justify-center hover:border-coral hover:bg-coral hover:text-white transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
