
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmissionManager } from "@/components/admin/SubmissionManager";
import { ProjectManager } from "@/components/admin/ProjectManager";
import { ServiceManager } from "@/components/admin/ServiceManager";
import { IndustryManager } from "@/components/admin/IndustryManager";

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth is done loading
    if (!authLoading) {
      if (!user) {
        console.log("Admin: No user found, redirecting to auth");
        navigate("/auth");
        return;
      }

      // If we already know the user is an admin, stop loading immediately
      if (isAdmin) {
        console.log("Admin: Admin status confirmed");
        setLoading(false);
      } else {
        // Wait up to 2 seconds for the admin role check to complete
        console.log("Admin: Waiting for role check...");
        const timeout = setTimeout(() => {
          console.log("Admin: Role check timeout reached");
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-sky opacity-20" />
            <Shield className="w-8 h-8 text-sky absolute inset-0 m-auto animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-xl text-foreground">Verifying Access</h2>
            {user && (
              <p className="text-sm text-sky/60 font-medium">
                Logged in as: <span className="text-sky">{user.email}</span>
              </p>
            )}
            <p className="text-muted-foreground max-w-xs mx-auto">
              Please wait while we secure your connection and verify your administrative privileges...
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {!authLoading && loading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-xs text-sky/60 hover:text-sky"
              >
                Taking too long? Click to refresh
              </Button>
            )}
            <Button
              variant="link"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate("/auth");
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Sign out and try another account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <section className="py-24 pt-32 min-h-screen">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-4 text-foreground">
                Access Denied
              </h1>
              <p className="text-muted-foreground mb-6">
                You don't have permission to access this page. Only administrators can view this dashboard.
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate("/")} className="rounded-full">
                  Return Home
                </Button>
                <Button
                  variant="link"
                  onClick={async () => {
                    await signOut();
                    navigate("/auth");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign out and try another account
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="py-24 pt-32 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="icon-ring shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-sky border-sky/30 bg-sky/5 font-black uppercase text-[10px] tracking-widest px-3 py-1">
                  Security Level: Admin
                </Badge>
              </div>

              {/* Profile Icon with Dropdown */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-sm font-semibold text-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky to-star flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await signOut();
                    navigate('/');
                  }}
                  className="rounded-full"
                >
                  Sign Out
                </Button>
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Manage your projects, media, and incoming messages.
            </p>
          </motion.div>

          <Tabs defaultValue="projects" className="space-y-8">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="industries">Industries</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectManager />
            </TabsContent>

            <TabsContent value="services">
              <ServiceManager />
            </TabsContent>

            <TabsContent value="industries">
              <IndustryManager />
            </TabsContent>

            <TabsContent value="messages">
              <SubmissionManager />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Admin;
