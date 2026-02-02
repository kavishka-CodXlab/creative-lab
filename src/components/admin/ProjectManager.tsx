
import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Edit, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadToSupabase } from "@/utils/uploadMedia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    challenge?: string;
    solution?: string;
    results?: string[];
    is_featured: boolean;
    project_url?: string;
}

export const ProjectManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        challenge: "",
        solution: "",
        results: "",
        is_featured: false,
        project_url: "",
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const toggleFeatured = async (project: Project, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const newValue = !project.is_featured;
            const { error } = await supabase
                .from("projects")
                .update({ is_featured: newValue })
                .eq("id", project.id);

            if (error) throw error;

            setProjects(prev => prev.map(p =>
                p.id === project.id ? { ...p, is_featured: newValue } : p
            ));

            toast({
                title: newValue ? "Added to Recent Projects" : "Removed from Recent Projects",
            });
        } catch (error) {
            toast({
                title: "Error updating status",
                variant: "destructive",
            });
        }
    };

    const openCreateDialog = () => {
        setEditingProject(null);
        setFormData({
            title: "",
            category: "",
            description: "",
            challenge: "",
            solution: "",
            results: "",
            is_featured: false,
            project_url: "",
        });
        setFile(null);
        setIsOpen(true);
    };

    const openEditDialog = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            category: project.category,
            description: project.description,
            challenge: project.challenge || "",
            solution: project.solution || "",
            results: project.results ? project.results.join(", ") : "",
            is_featured: project.is_featured || false,
            project_url: project.project_url || "",
        });
        setFile(null);
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingProject && !file) {
            toast({
                title: "Image required",
                description: "Please select an image or video for the project.",
                variant: "destructive",
            });
            return;
        }

        setIsUploading(true);
        try {
            let imageUrl = editingProject?.image_url || "";

            if (file) {
                imageUrl = await uploadToSupabase(file);
            }

            const resultsArray = formData.results
                .split(",")
                .map((r) => r.trim())
                .filter((r) => r.length > 0);

            const projectData = {
                title: formData.title,
                category: formData.category,
                description: formData.description,
                challenge: formData.challenge,
                solution: formData.solution,
                results: resultsArray,
                image_url: imageUrl,
                is_featured: formData.is_featured,
                project_url: formData.project_url || null,
            };

            let error;

            if (editingProject) {
                const { error: updateError } = await supabase
                    .from("projects")
                    .update(projectData)
                    .eq("id", editingProject.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from("projects")
                    .insert(projectData);
                error = insertError;
            }

            if (error) throw error;

            toast({
                title: "Success",
                description: `Project ${editingProject ? "updated" : "created"} successfully`,
            });
            setIsOpen(false);
            setEditingProject(null);
            fetchProjects();
        } catch (error) {
            console.error("Error saving project:", error);
            toast({
                title: "Error",
                description: "Failed to save project. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;
            setProjects((prev) => prev.filter((p) => p.id !== id));
            toast({
                title: "Project deleted",
            });
        } catch (error) {
            console.error("Error deleting project:", error);
            toast({
                title: "Error",
                description: "Failed to delete project. Please try again.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <Loader2 className="w-8 h-8 animate-spin text-primary" />;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-display">Projects</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateDialog}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                            <DialogDescription>
                                {editingProject ? "Update the project details below." : "Create a new project case study to display on the site."}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        required
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        required
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({ ...formData, category: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    required
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="project_url">Project URL (Optional)</Label>
                                <Input
                                    id="project_url"
                                    placeholder="https://"
                                    value={formData.project_url}
                                    onChange={(e) =>
                                        setFormData({ ...formData, project_url: e.target.value })
                                    }
                                />
                                <p className="text-[10px] text-muted-foreground">If added, this will appear in the "View Project" button on the card.</p>
                            </div>

                            <div className="flex items-center space-x-2 py-2">
                                <Checkbox
                                    id="featured"
                                    checked={formData.is_featured}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, is_featured: !!checked })
                                    }
                                />
                                <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Show in "Recent Projects" (Home Page)
                                </Label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="challenge">The Challenge</Label>
                                    <Textarea
                                        id="challenge"
                                        value={formData.challenge}
                                        onChange={(e) =>
                                            setFormData({ ...formData, challenge: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="solution">Our Solution</Label>
                                    <Textarea
                                        id="solution"
                                        value={formData.solution}
                                        onChange={(e) =>
                                            setFormData({ ...formData, solution: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="results">Key Results (comma separated)</Label>
                                <Input
                                    id="results"
                                    placeholder="50% increase, 2M users, Award winning..."
                                    value={formData.results}
                                    onChange={(e) =>
                                        setFormData({ ...formData, results: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">
                                    {editingProject ? "Change Project Image/Video (Optional)" : "Project Image/Video"}
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                />
                                {editingProject && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Current: <a href={editingProject.image_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">View Image</a>
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={isUploading} className="w-full">
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        {editingProject ? "Updating..." : "Uploading..."}
                                    </>
                                ) : (
                                    editingProject ? "Update Project" : "Create Project"
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden flex flex-col">
                        <div className="aspect-video relative group">
                            {project.image_url.includes('/video/') || project.image_url.endsWith('.mp4') ? (
                                <video src={project.image_url} className="w-full h-full object-cover" controls />
                            ) : (
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => openEditDialog(project)}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-start">
                                <span className="truncate">{project.title}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:bg-destructive/10 -mr-2"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {project.project_url && (
                                <div className="flex items-center gap-2 mb-2 text-xs text-sky font-medium">
                                    <LinkIcon className="w-3 h-3" />
                                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[200px]">
                                        {project.project_url}
                                    </a>
                                </div>
                            )}
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {project.description}
                            </p>
                            <div className="flex items-center gap-2 mt-auto pt-2 border-t">
                                <Checkbox
                                    id={`featured-${project.id}`}
                                    checked={project.is_featured}
                                    onCheckedChange={(checked) => toggleFeatured(project, { stopPropagation: () => { } } as React.MouseEvent)}
                                />
                                <Label htmlFor={`featured-${project.id}`} className="text-xs text-muted-foreground cursor-pointer select-none">
                                    Show on Home Page
                                </Label>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
