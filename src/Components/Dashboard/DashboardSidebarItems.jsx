"use client";
import Link from "next/link";
import { HomeIcon, Plus, UserCheck2Icon } from "lucide-react";
import { MdManageAccounts, MdRequestPage } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { BiLogOut } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";

const DashboardSidebarItems = ({ navItems }) => {
  const pathname = usePathname();
  const iconMap = {
    home: HomeIcon,
    request: MdRequestPage,
    plus: Plus,
    user: UserCheck2Icon,
    management: MdManageAccounts,
    profile: RiProfileFill,
  };

  const handleSignOut = async () => {
      await authClient.signOut();
      redirect("/");
    };

  return (
    <div className="flex flex-col flex-1 justify-between min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-100px)]">
      {/* Upper Navigation section */}
      <nav className="flex flex-col gap-1 p-4 mt-4">
        {navItems.map((item) => {
          const IconComponent = iconMap[item.icon] || HomeIcon;
          const isActive = pathname === item.link;
          return (
            <Link
              key={item.label}
              href={item.link}
              className={`flex items-center gap-3 rounded-xl px-4 py-5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-crimson-dark text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <IconComponent className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      
      <div className="p-4 mb-6">
        <Button onClick={handleSignOut} className="w-full flex items-center text-md justify-center gap-3 bg-crimson-dark text-white rounded-xl py-5">
          <BiLogOut className="size-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebarItems;
