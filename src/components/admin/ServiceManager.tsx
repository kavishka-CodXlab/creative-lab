import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { uploadToSupabase } from "@/utils/uploadMedia";

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    image_url: string | null;
    features: string[];
    display_order: number;
    is_active: boolean;
}

export const ServiceManager = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "",
        image_url: "",
        features: [""],
        is_active: true,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            setServices(data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
            toast({
                title: "Error",
                description: "Failed to load services",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setIsUploading(true);

        try {
            const url = await uploadToSupabase(file);
            setFormData({ ...formData, image_url: url });
            toast({ title: "Success", description: "Image uploaded successfully" });
        } catch (error) {
            console.error("Error uploading image:", error);
            toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const serviceData: any = {
                title: formData.title,
                description: formData.description,
                icon: formData.icon,
                features: formData.features.filter((f) => f.trim() !== ""),
                is_active: formData.is_active,
                display_order: editingService?.display_order ?? services.length + 1,
            };

            // Only add image_url if it exists
            if (formData.image_url) {
                serviceData.image_url = formData.image_url;
            }

            if (editingService) {
                const { error } = await supabase
                    .from("services")
                    .update(serviceData)
                    .eq("id", editingService.id);

                if (error) throw error;
                toast({ title: "Success", description: "Service updated successfully" });
            } else {
                const { error } = await supabase.from("services").insert(serviceData);

                if (error) throw error;
                toast({ title: "Success", description: "Service created successfully" });
            }

            setIsDialogOpen(false);
            resetForm();
            fetchServices();
        } catch (error) {
            console.error("Error saving service:", error);
            toast({
                title: "Error",
                description: "Failed to save service",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            const { error } = await supabase.from("services").delete().eq("id", id);

            if (error) throw error;
            toast({ title: "Success", description: "Service deleted successfully" });
            fetchServices();
        } catch (error) {
            console.error("Error deleting service:", error);
            toast({
                title: "Error",
                description: "Failed to delete service",
                variant: "destructive",
            });
        }
    };

    const toggleActive = async (service: Service) => {
        try {
            const { error } = await supabase
                .from("services")
                .update({ is_active: !service.is_active })
                .eq("id", service.id);

            if (error) throw error;
            fetchServices();
        } catch (error) {
            console.error("Error toggling service:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            icon: "",
            image_url: "",
            features: [""],
            is_active: true,
        });
        setImageFile(null);
        setEditingService(null);
    };

    const openEditDialog = (service: Service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon,
            image_url: service.image_url || "",
            features: service.features.length > 0 ? service.features : [""],
            is_active: service.is_active,
        });
        setIsDialogOpen(true);
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const removeFeature = (index: number) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index),
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Service Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingService ? "Edit Service" : "Add New Service"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Service Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    required
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="icon">
                                    Icon Name (Lucide React icon, e.g., "Code", "Palette")
                                </Label>
                                <Input
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) =>
                                        setFormData({ ...formData, icon: e.target.value })
                                    }
                                    placeholder="Code"
                                    required
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Visit{" "}
                                    <a
                                        href="https://lucide.dev/icons"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary underline"
                                    >
                                        lucide.dev/icons
                                    </a>{" "}
                                    for icon names
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="image">Service Image (Optional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={isUploading}
                                />
                                {isUploading && (
                                    <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
                                )}
                                {formData.image_url && (
                                    <div className="mt-2">
                                        <img
                                            src={formData.image_url}
                                            alt="Service preview"
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label>Features</Label>
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder="Feature description"
                                        />
                                        {formData.features.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFeature(index)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addFeature} className="mt-2">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Feature
                                </Button>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="flex-1">
                                    {editingService ? "Update Service" : "Create Service"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <p>Loading services...</p>
            ) : (
                <div className="grid gap-4">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="cursor-move">
                                        <GripVertical className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex gap-4 items-start">
                                                {service.image_url && (
                                                    <img
                                                        src={service.image_url}
                                                        alt={service.title}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div>
                                                    <h3 className="text-lg font-bold">{service.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Icon: {service.icon}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleActive(service)}
                                                >
                                                    {service.is_active ? (
                                                        <Eye className="w-4 h-4" />
                                                    ) : (
                                                        <EyeOff className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(service)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-sm mb-3">{service.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {service.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-secondary px-2 py-1 rounded"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
