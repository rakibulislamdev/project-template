"use client";

import { Menu, AlignLeft, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "@/components/icons";
import { Sidebar } from "./Sidebar";
import type { Role } from "./navigation";
import { useState, useCallback, useEffect } from "react";
import { getCurrentUser } from "@/app/actions/profile";
import { signOutAction } from "@/app/actions/auth";

interface HeaderProps {
  currentRole: Role;
  onToggle?: () => void;
}

export function Header({ currentRole, onToggle }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavigate = useCallback(() => setIsOpen(false), []);
  const [user, setUser] = useState<{name?: string, profilePicture?: string, role?: string} | null>(null);

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  const handleLogout = async () => {
    await signOutAction();
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:h-[68px] lg:px-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger render={<Button variant="outline" size="icon" className="shrink-0 md:hidden" />}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <Sidebar currentRole={currentRole} onNavigate={handleNavigate} />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1 flex items-center gap-4">
        {onToggle && (
          <Button 
            variant="ghost" 
            className="hidden md:flex shrink-0 h-10 w-10 items-center justify-center text-primary hover:text-primary hover:bg-muted/50"
            onClick={onToggle}
          >
            <AlignLeft className="size-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border text-foreground">
          <BellIcon className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            type="button"
            className="flex items-center gap-3 border border-border rounded-full pl-1.5 pr-5 py-1.5 cursor-pointer hover:bg-muted/50 transition-colors outline-none"
          >
            <Avatar className="h-8 w-8">
              {user?.profilePicture && <AvatarImage src={user.profilePicture} alt="Profile" className="object-cover" />}
              <AvatarFallback className="bg-[#e8f3ec] text-primary font-medium text-[16px]">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </AvatarFallback>
            </Avatar>
            <span className="text-[16px] font-medium text-foreground">
              {user?.name || "Admin"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 mt-2 p-2 shadow-xl border-border/50 rounded-xl">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-3 py-2 text-[14px] font-semibold text-muted-foreground">My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem 
              render={<Link href="/dashboard/settings" />}
              className="cursor-pointer px-3 py-3 text-[15px] font-medium rounded-lg transition-colors flex items-center w-full hover:bg-muted/50 focus:bg-muted/50"
            >
              <User className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 focus:text-red-600 focus:bg-red-50 cursor-pointer px-3 py-3 text-[15px] font-medium rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
