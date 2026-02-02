import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Industry {
    id: string;
    name: string;
    image_url: string;
    display_order: number;
    is_active: boolean;
}

export const IndustryManager = () => {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        image_url: "",
    });

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            const { data, error } = await supabase
                .from("industries")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            setIndustries(data || []);
        } catch (error) {
            console.error("Error fetching industries:", error);
            toast({
                title: "Error",
                description: "Failed to load industries",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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

        if (!formData.image_url) {
            toast({
                title: "Error",
                description: "Please upload an image",
                variant: "destructive",
            });
            return;
        }

        try {
            const industryData = {
                name: formData.name,
                image_url: formData.image_url,
                display_order: editingIndustry?.display_order ?? industries.length + 1,
            };

            if (editingIndustry) {
                const { error } = await supabase
                    .from("industries")
                    .update(industryData)
                    .eq("id", editingIndustry.id);

                if (error) throw error;
                toast({ title: "Success", description: "Industry updated successfully" });
            } else {
                const { error } = await supabase.from("industries").insert(industryData);

                if (error) throw error;
                toast({ title: "Success", description: "Industry created successfully" });
            }

            setIsDialogOpen(false);
            resetForm();
            fetchIndustries();
        } catch (error) {
            console.error("Error saving industry:", error);
            toast({
                title: "Error",
                description: "Failed to save industry",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this industry?")) return;

        try {
            const { error } = await supabase.from("industries").delete().eq("id", id);

            if (error) throw error;
            toast({ title: "Success", description: "Industry deleted successfully" });
            fetchIndustries();
        } catch (error) {
            console.error("Error deleting industry:", error);
            toast({
                title: "Error",
                description: "Failed to delete industry",
                variant: "destructive",
            });
        }
    };

    const toggleActive = async (industry: Industry) => {
        try {
            const { error } = await supabase
                .from("industries")
                .update({ is_active: !industry.is_active })
                .eq("id", industry.id);

            if (error) throw error;
            fetchIndustries();
        } catch (error) {
            console.error("Error toggling industry:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            image_url: "",
        });
        setEditingIndustry(null);
    };

    const openEditDialog = (industry: Industry) => {
        setEditingIndustry(industry);
        setFormData({
            name: industry.name,
            image_url: industry.image_url,
        });
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Industry Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Industry
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {editingIndustry ? "Edit Industry" : "Add New Industry"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Industry Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder="e.g., Healthcare, Finance"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="image">Industry Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={isUploading}
                                    required={!editingIndustry}
                                />
                                {isUploading && (
                                    <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
                                )}
                                {formData.image_url && (
                                    <div className="mt-3">
                                        <img
                                            src={formData.image_url}
                                            alt="Industry preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="flex-1" disabled={isUploading}>
                                    {editingIndustry ? "Update Industry" : "Create Industry"}
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
                <p>Loading industries...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((industry) => (
                        <motion.div
                            key={industry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="overflow-hidden">
                                <div className="relative aspect-video">
                                    <img
                                        src={industry.image_url}
                                        alt={industry.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {!industry.is_active && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="text-white font-bold">Hidden</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg">{industry.name}</h3>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => toggleActive(industry)}
                                            >
                                                {industry.is_active ? (
                                                    <Eye className="w-4 h-4" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(industry)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(industry.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
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
