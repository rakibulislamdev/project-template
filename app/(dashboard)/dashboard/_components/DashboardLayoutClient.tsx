"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import type { Role } from "./navigation";
import { cn } from "@/lib/utils";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  currentRole: Role;
}

export function DashboardLayoutClient({ children, currentRole }: DashboardLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <div 
        className={cn(
          "hidden bg-muted/40 md:block h-full overflow-hidden transition-all duration-300 ease-in-out shrink-0",
          isCollapsed ? "w-[80px]" : "w-[220px] lg:w-[280px]"
        )}
      >
        <Sidebar 
          currentRole={currentRole} 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
      </div>
      <div className="flex flex-col h-full flex-1 overflow-hidden min-w-0">
        <Header currentRole={currentRole} onToggle={() => setIsCollapsed(!isCollapsed)} />
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
