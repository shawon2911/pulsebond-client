
import { auth } from "@/lib/auth";
import { Button, Drawer, useDisclosure } from "@heroui/react";

import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import DashboardSidebarItems from "./DashboardSidebarItems";



export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const role = user?.role || "donor";

  const dashboardItems = {
    donor: [
      { icon: "home", label: "Dashboard Home", link: "/dashboard/donor" },
      { icon: "profile", label: "Profile", link: "/dashboard/profile" },
      { icon: "request", label: "My Donation Requests", link: "/dashboard/donor/my-donation-requests" },
      { icon: "plus", label: "Create Request", link: "/dashboard/donor/create-request" },
    ],
    volunteer: [
      { icon: "home", label: "Dashboard Home", link: "/dashboard/volunteer" },
      { icon: "profile", label: "Profile", link: "/dashboard/profile" },
      { icon: "request", label: "All Requests", link: "/dashboard/volunteer/all-requests" },
    ],
    admin: [
      { icon: "home", label: "Dashboard Home", link: "/dashboard/admin" },
      { icon: "profile", label: "Profile", link: "/dashboard/profile" },
      { icon: "user", label: "All User", link: "/dashboard/admin/all-user" },
      { icon: "request", label: "All Requests", link: "/dashboard/admin/all-requests" },
      { icon: "management", label: "Content Management", link: "/dashboard/admin/content-management" },
    ],
  };

  const navItems = dashboardItems[role] || [];

  return (
    <Drawer>
      

      {/* Desktop Sidebar Layout */}
      <div className="hidden md:flex md:flex-col w-64 h-screen sticky top-0 bg-ink border-r border-white/10 text-white overflow-hidden">
        <Link href={"/"}>
        <div className="flex items-center gap-3 px-6 py-3.5 border-b border-white/10">
          <Image height={36} width={36} loading="eager" src="/logo.png" alt="logo" />
          <p className="font-bold text-xl font-display tracking-wide">
            <span>Pulse</span>
            <span className="text-crimson-dark ">Bond</span>
          </p>
        </div>
        </Link>

       <DashboardSidebarItems navItems={navItems} />
      </div>

      
    </Drawer>
  );
}




