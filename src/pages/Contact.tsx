import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Please enter a subject"),
  message: z.string().min(20, "Please tell us a bit more about your project"),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@creativelab.com",
    description: "We'll respond within 24 hours",
    href: "mailto:hello@creativelab.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm EST",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "San Francisco, CA",
    description: "By appointment only",
    href: "#",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (error) throw error;

      setIsSuccess(true);
      form.reset();
      toast({
        title: "Message sent! 🎉",
        description: "We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <p className="text-primary font-medium mb-3">Contact us</p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-foreground">
              Let's start a conversation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you have a project in mind or just want to explore ideas, 
              we'd love to hear from you. No pressure, no hard sell — just a friendly chat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="font-serif text-2xl font-semibold mb-8 text-foreground">Get in touch</h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                  alt="Our office"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="warm-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Send us a message</h2>
                    <p className="text-sm text-muted-foreground">We typically respond within a few hours</p>
                  </div>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-warm-sage/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-warm-sage" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-2 text-foreground">Thank you!</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="rounded-lg" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" type="email" {...field} className="rounded-lg" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What's this about?" {...field} className="rounded-lg" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project, your challenges, or what you're hoping to achieve..."
                                rows={6}
                                {...field}
                                className="rounded-lg resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full rounded-full"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
