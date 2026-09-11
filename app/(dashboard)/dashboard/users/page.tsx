"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommonPagination } from "@/components/common/CommonPagination";
import { PageHeader } from "@/components/common/PageHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { PaginationSkeleton } from "@/components/common/PaginationSkeleton";
import { TablePageSkeleton } from "@/components/common/TablePageSkeleton";
import { toast } from "sonner";

import { User } from "./types";
import { UserTable } from "./_components/UserTable";
import { UserDetailsSheet } from "./_components/UserDetailsSheet";
import { UserActionDialogs } from "./_components/UserActionDialogs";
import { getUsers, changeUserStatus } from "@/app/actions/users";

function UsersPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialTabParam = searchParams.get("tab");
  const initialTab = initialTabParam 
    ? initialTabParam.charAt(0).toUpperCase() + initialTabParam.slice(1).toLowerCase() 
    : "All";
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialView = searchParams.get("view") || null;

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState<string | null>(null);
  const [userToActivate, setUserToActivate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const USERS_PER_PAGE = 5;

  // Sync URL when state changes
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearch) params.set("search", debouncedSearch);
    
    if (activeTab !== "All") params.set("tab", activeTab.toLowerCase());
    
    if (currentPage > 1) params.set("page", currentPage.toString());

    if (isSheetOpen && selectedUser) params.set("view", selectedUser.id.toString());

    const newUrl = `${pathname}?${params.toString()}`;
    // Replace URL without triggering a full page reload or scrolling
    window.history.replaceState(null, '', newUrl);
  }, [debouncedSearch, activeTab, currentPage, isSheetOpen, selectedUser, pathname]);

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers({
        searchTerm: debouncedSearch,
        status: activeTab === "All" ? undefined : activeTab.toUpperCase(),
        page: currentPage,
        limit: USERS_PER_PAGE,
      });

      if (response && response.success) {
        setUsers(response.data.data);
        setTotalPages(response.data.meta.totalPage);
        
        // If there was a view parameter in URL on initial load, try to open the sheet
        if (initialView && !isSheetOpen && !selectedUser) {
          const userToView = response.data.data.find((u: User) => u.id.toString() === initialView);
          if (userToView) {
            setSelectedUser(userToView);
            setIsSheetOpen(true);
          }
        }
      } else {
        toast.error(response?.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("An error occurred while fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, activeTab, currentPage]);

  const handleToggleStatus = async (userId: string, targetStatus: "ACTIVE" | "SUSPENDED") => {
    try {
      const response = await changeUserStatus(userId, targetStatus);
      if (response && response.success) {
        toast.success(response.message || `User status changed to ${targetStatus}`);
        fetchUsers();
      } else {
        toast.error(response?.message || "Failed to update user status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsSheetOpen(true);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      // Clear selected user after sheet close animation
      setTimeout(() => setSelectedUser(null), 300);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <MotionWrapper delay={0.1}>
        <PageHeader
          title="Users"
          description="Manage registered users"
        />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input
            placeholder="Search users..."
            className="w-full sm:max-w-[250px] rounded-xl border-border h-10 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-transparent gap-3 h-auto p-0">
              {["All", "Active", "Suspended", "Pending"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-full cursor-pointer px-5 py-2 bg-card border border-border shadow-sm text-sm font-semibold transition-all duration-300 ease-out hover:bg-muted data-active:bg-primary data-active:text-primary-foreground data-active:border-primary"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <UserTable
            users={users}
            onViewUser={handleViewUser}
            onSuspendUser={setUserToSuspend}
            onActivateUser={setUserToActivate}
          />
        )}
      </MotionWrapper>

      {isLoading ? (
        <MotionWrapper delay={0.4}>
          <PaginationSkeleton />
        </MotionWrapper>
      ) : totalPages > 1 ? (
        <MotionWrapper delay={0.4}>
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </MotionWrapper>
      ) : null}

      <UserDetailsSheet
        user={selectedUser}
        isOpen={isSheetOpen}
        onOpenChange={handleSheetOpenChange}
      />

      <UserActionDialogs
        userToSuspend={userToSuspend}
        userToActivate={userToActivate}
        onCloseSuspend={() => setUserToSuspend(null)}
        onCloseActivate={() => setUserToActivate(null)}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<TablePageSkeleton />}>
      <UsersPageContent />
    </Suspense>
  );
}
