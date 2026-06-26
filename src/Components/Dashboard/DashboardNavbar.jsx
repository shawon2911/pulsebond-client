"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Drawer, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { HomeIcon, Plus, UserCheck2Icon } from "lucide-react";
import { MdManageAccounts, MdRequestPage } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { usePathname } from "next/navigation";


const DashboardNavbar = () => {
  const pathname = usePathname();
  // console.log(pathname);
  const currentRoute = pathname.split("/").pop();
  const pageTitle = currentRoute
    ? currentRoute.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Dashboard";
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "donor"; 

  const dashboardItems = {
    donor: [
      { icon: HomeIcon, label: "Dashboard Home", link: "/dashboard/donor" },
      {
        icon: RiProfileFill,
        label: "Profile",
        link: "/dashboard/profile",
      },
      {
        icon: MdRequestPage,
        label: "My Donation Requests",
        link: "/dashboard/donor/my-donation-requests",
      },
      {
        icon: Plus,
        label: "Create Request",
        link: "/dashboard/donor/create-request",
      },
    ],
    volunteer: [
      { icon: HomeIcon, label: "Dashboard Home", link: "/dashboard/volunteer" },
      {
        icon: RiProfileFill,
        label: "Profile",
        link: "/dashboard/profile",
      },
      {
        icon: MdRequestPage,
        label: "All Requests",
        link: "/dashboard/volunteer/all-requests",
      },
    ],
    admin: [
      { icon: HomeIcon, label: "Dashboard Home", link: "/dashboard/admin" },
      {
        icon: RiProfileFill,
        label: "Profile",
        link: "/dashboard/profile",
      },
      {
        icon: UserCheck2Icon,
        label: "All User",
        link: "/dashboard/admin/all-user",
      },
      {
        icon: MdRequestPage,
        label: "All Requests",
        link: "/dashboard/admin/all-requests",
      },
      {
        icon: MdManageAccounts,
        label: "Content Management",
        link: "/dashboard/admin/content-management",
      },
    ],
  };
    const navItems = dashboardItems[role] || [];

  return (
    <div className="flex justify-between items-center px-5">
      <Drawer>
        {/* Mobile Top Navbar Trigger */}
        <div className="w-full flex items-center justify-between md:hidden border-b border-white/10">
          
          <Drawer.Trigger>
            <div
              size="sm"
              variant="flat"
              className=" flex items-center gap-2 text-ink bg-white/10 hover:bg-white/20"
            >
              <FaBars className="size-4 mr-1" />
              Dashboard
            </div>
          </Drawer.Trigger>
        </div>

        {/* Mobile Drawer Structure */}
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-ink text-white border-r border-white/10 h-full max-w-[280px] flex flex-col">
              <Drawer.CloseTrigger className="absolute right-4 top-4 text-gray-400 hover:text-white z-50" />
              <Drawer.Header className="border-b border-white/10 pb-4 pt-5  shrink-0">
                <Drawer.Heading className="text-lg font-bold flex items-center gap-2">
                  <Link href={"/"}>
                                <div className="flex items-center gap-2">
                                  <Image
                                    height={40}
                                    width={40}
                                    loading="eager"
                                    src="/logo.png"
                                    alt="logo"
                                  />
                                  <p className="font-bold text-2xl font-display">
                                    <span className="text-white">Pulse</span>
                                    <span className="text-crimson-dark">Bond</span>
                                  </p>
                                </div>
                              </Link>
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="">
                <nav className="flex flex-col gap-1 p-4 ">
                  {navItems.map((item) => {
                    
                    
                    return (
                      <Link
                        key={item.label}
                        href={item.link}
                        className={"flex items-center gap-3 rounded-xl  py-5 text-sm font-medium transition-all duration-200 "}
                      >
                        <item.icon className="size-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <div className="hidden w-full md:flex md:justify-between md:px-10">
        <h1 className="text-xl font-semibold text-gray-800">
        {pageTitle === "donor" || pageTitle === "admin" || pageTitle === "volunteer" 
          ? "Dashboard Home" 
          : pageTitle}
      </h1>
        <div className="flex items-center gap-2">
        <Dropdown>
        <Dropdown.Trigger className="rounded-full">
          <Avatar size="sm" aria-label="Menu">
            <Avatar.Image
              referrerPolicy="no-referrer"
              alt="John Doe"
              src={user?.image}
            />
            <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
        </Dropdown.Trigger>
        <Dropdown.Popover>
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <Avatar.Image alt={user?.name} src={user?.image} />
                <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p className="text-sm leading-5 font-medium">{user?.name}</p>
                <p className="text-xs leading-none text-muted">{user?.email}</p>
              </div>
            </div>
          </div>
        </Dropdown.Popover>
      </Dropdown>
      <p className="text-ink font-display font-bold">{user?.name}</p>
      </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
