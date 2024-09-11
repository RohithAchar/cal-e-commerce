"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

const MainNavigation = () => {
  const pathName = usePathname();
  const { storeId } = useParams();

  const routes = [
    {
      href: `/${storeId}`,
      label: "Overview",
      active: pathName === `/${storeId}`,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/${storeId}/billboards`,
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathName === `/${storeId}/categories`,
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathName === `/${storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("ml-6 flex items-center space-x-4 lg;space-x-6")}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-color hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavigation;
