import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Activity, ShieldCheck, CalendarDays, ShoppingBag } from "lucide-react";
import { User } from "../types";

interface UserDetailsSheetProps {
  user: User | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsSheet({ user, isOpen, onOpenChange }: UserDetailsSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md border-l-0 shadow-2xl bg-background/95 backdrop-blur-xl">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            User Profile
          </SheetTitle>
        </SheetHeader>
        {user && (
          <div className="mt-6 flex flex-col gap-10 w-full animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Header / Avatar Section */}
            <div className="flex flex-col items-center gap-5 text-center w-full">
              <Avatar className="h-[84px] w-[84px]">
                <AvatarFallback className="bg-[#3A8F5C] text-white text-[32px] font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-foreground tracking-tight">{user.name}</h3>
                <p className="text-[15px] font-medium text-muted-foreground mt-1 bg-muted/50 px-3 py-1 rounded-full">{user.email}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Status Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : user.status === 'SUSPENDED' ? 'bg-red-500' : 'bg-amber-500'} animate-pulse`} />
                  <span className="text-[16px] font-semibold text-foreground">{user.status}</span>
                </div>
              </div>

              {/* Role Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Role</span>
                </div>
                <span className="text-[16px] font-semibold text-foreground">{user.role}</span>
              </div>

              {/* Joined Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Joined</span>
                </div>
                <span className="text-[16px] font-semibold text-foreground">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Orders Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingBag className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Orders</span>
                </div>
                <span className="text-[16px] font-semibold text-foreground">{user.ordersCount}</span>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
