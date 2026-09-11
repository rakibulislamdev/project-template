import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9
} from "@/components/icons";
import { type LucideIcon } from "lucide-react";
import { SVGProps } from "react";

export type Role = "admin" | "manager" | "user";

export interface NavItem {
  title: string;
  href: string; // Absolute path, e.g., "/dashboard/..."
  roles: Role[];
  icons: Partial<Record<Role, React.ComponentType<SVGProps<SVGSVGElement>>>>;
  defaultIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const navigationConfig: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    roles: ["admin", "manager", "user"],
    defaultIcon: Icon1,
    icons: {}
  },
  {
    title: "Users",
    href: "/dashboard/users",
    roles: ["admin", "manager"],
    defaultIcon: Icon2,
    icons: {}
  }
];
