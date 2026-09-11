import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "../types";

interface UserTableProps {
  users: User[];
  onViewUser: (user: User) => void;
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
}

export function UserTable({ users, onViewUser, onSuspendUser, onActivateUser }: UserTableProps) {
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Suspended":
        return "bg-[#ffe5e5] text-[#EF4444] hover:bg-[#ffe5e5]";
      case "Pending":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      default:
        return "";
    }
  };

  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case "Buyer":
        return "bg-[#e5f0ff] text-[#3B82F6] hover:bg-[#e5f0ff]";
      case "Applicant":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      case "Seller":
        return "bg-[#e5f0ff] text-[#3B82F6] hover:bg-[#e5f0ff]";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Name</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Email</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Status</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Joined</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Orders</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Role</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-border hover:bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-foreground text-sm">{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">{user.email}</TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="secondary" className={`rounded-full px-4 py-3 border-none text-[11px] font-bold ${getStatusBadgeStyles(user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase())}`}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="px-6 py-4 text-foreground text-sm font-medium">{user.ordersCount}</TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="secondary" className={`rounded-full px-4 py-3 border-none text-[11px] font-bold ${getRoleBadgeStyles(user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase())}`}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => onViewUser(user)} className="cursor-pointer text-primary font-bold text-[13px] hover:underline">View</button>
                  {user.role !== "ADMIN" && (
                    user.status === "SUSPENDED" ? (
                      <button onClick={() => onActivateUser(user.id)} className="cursor-pointer text-primary font-bold text-[13px] hover:underline">Activate</button>
                    ) : (
                      <button onClick={() => onSuspendUser(user.id)} className="cursor-pointer text-destructive font-bold text-[13px] hover:underline">Suspend</button>
                    )
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
