"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Briefcase, Clock, AlertCircle, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, CS. You have {projects.length} active projects.</p>
        </div>
        <Link 
          href="/projects/new" 
          className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 md:h-12 px-6 rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center justify-center")}
        >
          <Plus className="mr-2 h-5 w-5" /> New Project
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Projects", value: projects.length, icon: Briefcase, color: "text-blue-600" },
          { label: "Total Velocity", value: "24h/wk", icon: Clock, color: "text-green-600" },
          { label: "Current Bottlenecks", value: 0, icon: AlertCircle, color: "text-amber-600" },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-200/60 shadow-sm overflow-hidden group hover:border-blue-200 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon size={28} strokeWidth={2.5} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Projects</h2>
          <Button variant="link" className="text-blue-600 font-bold hover:no-underline px-0 group">
            View All Projects <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-20">
            <Loader2 className="h-10 w-10 animate-spin text-slate-300" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <Card key={project._id} className="border-slate-200/60 shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-full ${
                      project.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      project.priority === 'High' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.priority}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 space-y-4">
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed h-10">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 h-7 overflow-hidden">
                    {project.techStackPreference.map((tech: string, i: number) => (
                      <span key={i} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/projects/${project._id}/spec`}
                    className={cn(buttonVariants({ variant: "secondary" }), "w-full font-bold h-11 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100 italic inline-flex items-center justify-center")}
                  >
                    Open Project
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Briefcase size={32} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-600">No projects yet</p>
                <p className="text-sm text-slate-400">Start your journey by capturing your first big idea.</p>
              </div>
              <Link 
                href="/projects/new" 
                className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-10 h-12 inline-flex items-center justify-center")}
              >
                Create First Project
              </Link>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
