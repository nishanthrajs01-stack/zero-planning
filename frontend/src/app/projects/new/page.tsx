"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters."),
  description: z.string().max(500, "Description must not exceed 500 characters."),
  type: z.string().min(1, "Please select a project type."),
  techStackPreference: z.string().optional(),
  estimatedTimeline: z.string().min(1, "Please select an estimated timeline."),
  priority: z.string().min(1, "Please select a priority level."),
  client: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "Web App",
      techStackPreference: "",
      estimatedTimeline: "1 month",
      priority: "Medium",
      client: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          techStackPreference: values.techStackPreference?.split(",").map(s => s.trim()) || [],
        }),
      });

      if (!response.ok) throw new Error("Failed to create project");

      const project = await response.json();
      toast.success("Project created! Generating AI Spec...");
      router.push(`/projects/${project._id}/spec`);
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">New Project Idea</h1>
          <p className="text-slate-500 mt-2">Capture your raw idea and let AI generate the blueprint.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Sentinel, Unigate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Description (Max 500 chars)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What is the core problem being solved?" 
                      className="min-h-[120px] resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="type"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Web App", "Mobile App", "Backend API", "Full-Stack", "Automation", "Platform", "Redesign"].map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedTimeline"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Timeline Estimate</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["2 weeks", "1 month", "3 months", "6 months", ">6 months"].map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="techStackPreference"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Tech Stack Preference (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Next.js, React, Node.js" {...field} />
                  </FormControl>
                  <FormDescription>Comma separated list of preferred technologies.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Critical", "High", "Medium", "Low"].map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl transition-all" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Spec...
                </>
              ) : (
                "Generate Project Specification"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
