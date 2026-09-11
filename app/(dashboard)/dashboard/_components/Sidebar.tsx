"use client";
import Image from "next/image";
import { LogoutIcon } from "@/components/icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { signOutAction } from "@/app/actions/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigationConfig, type Role, type NavItem } from "./navigation";
import { useMemo, memo } from "react";

interface SidebarProps {
  currentRole: Role;
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}

interface NavItemButtonProps {
  item: NavItem;
  currentRole: Role;
  isActive: boolean;
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

const NavItemButton = memo(function NavItemButton({ item, currentRole, isActive, isCollapsed, onNavigate }: NavItemButtonProps) {
  const IconToUse = item.icons[currentRole] || item.defaultIcon;

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "text-[15px] font-semibold rounded-lg transition-all overflow-hidden border-0",
        "w-full justify-start px-3 h-12",
        !isActive && "text-foreground hover:bg-muted/50"
      )}
      render={<Link href={item.href} />}
      nativeButton={false}
      onClick={onNavigate}
      title={isCollapsed ? item.title : undefined}
    >
      <IconToUse className={cn("w-6 h-6 min-w-6 min-h-6 shrink-0", !isCollapsed && "mr-4")} />
      {!isCollapsed && <span className="truncate">{item.title}</span>}
    </Button>
  );
});

export const Sidebar = memo(function Sidebar({ currentRole, className, isCollapsed, onToggle, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const navItems = useMemo(() => {
    return navigationConfig.filter((item) => item.roles.includes(currentRole));
  }, [currentRole]);

  return (
    <div className={cn("h-full bg-card text-card-foreground flex flex-col relative transition-all duration-300", className)}>
      <div className={cn("flex items-center h-[88px] mb-2 transition-all", isCollapsed ? "justify-center px-0" : "gap-3 px-6")}>
        <Image src="/logo.png" alt="Logo" width={160} height={160} unoptimized priority className="w-10 h-10 rounded-lg object-contain shrink-0" />
        {!isCollapsed && (
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-bold text-foreground text-[20px] leading-tight tracking-tight">MatPrep</span>
            <span className="text-[14px] text-muted-foreground font-medium">Admin Panel</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="space-y-2 flex flex-col px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <NavItemButton
                key={item.href}
                item={item}
                currentRole={currentRole}
                isActive={isActive}
                isCollapsed={isCollapsed}
                onNavigate={onNavigate}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-auto pb-4 flex px-4">
        <form action={signOutAction} className="w-full flex">
          <Button
            type="submit"
            variant="ghost"
            className={cn(
              "text-[15px] font-semibold rounded-lg text-[#E7000B] hover:text-[#E7000B] hover:bg-red-50/50 transition-all overflow-hidden border-0",
              "w-full justify-start px-3 h-12"
            )}
            title={isCollapsed ? "Log Out" : undefined}
          >
            <LogoutIcon className={cn("w-6 h-6 min-w-6 min-h-6 shrink-0", !isCollapsed && "mr-4")} />
            {!isCollapsed && <span className="truncate">Log Out</span>}
          </Button>
        </form>
      </div>
    </div>
  );
});
