import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-0">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
            ZERO <span className="text-blue-600">Planning System</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            10x velocity starts with upstream planning. Generate specs, architectures, and roadmaps with AI-powered precision.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/projects/new" 
            className={cn(buttonVariants({ size: "lg" }), "px-8 py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 h-auto")}
          >
            + New Project
          </Link>
          <Link 
            href="/dashboard" 
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8 py-6 text-lg font-semibold border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 h-auto")}
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {[
            { title: "AI Specs", desc: "10-point feature specs generated in seconds." },
            { title: "Architecture", desc: "Visual canvases and Mermaid diagram exports." },
            { title: "Roadmaps", desc: "Phased timelines with actionable checklists." },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
