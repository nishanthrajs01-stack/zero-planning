"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PlusCircle, Layers, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Project", href: "/projects/new", icon: PlusCircle },
  { name: "Components", href: "/components", icon: Layers },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform">
                Z
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900">
                ZERO<span className="text-blue-600">PLANE</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-tr from-slate-100 to-slate-200 rounded-full border border-slate-200 shadow-inner flex items-center justify-center text-slate-500 font-bold text-xs">
              CS
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
