import { auth } from "@/lib/auth";
// import {

//   Bell,
//   Envelope,
//   Gear,
//   House,
//   Magnifier,
//   Person,
// } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartArea, HomeIcon, Plus, User, UserCheck2Icon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BiMoney } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { MdManageAccounts, MdRequestPage } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { TbAsset } from "react-icons/tb";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  //    console.log(user);
  const role = user?.role || "donor";

  const dashboardItems = {
    donor: [
      { icon: HomeIcon, label: "Dashboard Home", link: "/dashboard/donor" },
      {
        icon: RiProfileFill,
        label: "Profile",
        link: "/dashboard/donor/profile",
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
        link: "/dashboard/volunteer/profile",
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
        link: "/dashboard/admin/profile",
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
    <Drawer>
      <Button className={"md:hidden"} variant="secondary">
        <FaBars />
        Menu
      </Button>

      <div className="w-64 min-h-screen border-r border-gray-300">
        <div className="flex items-center gap-2">
          <Image
            height={40}
            width={40}
            loading="eager"
            src="/logo.png"
            alt="logo"
          />
          <p className="font-bold text-2xl font-display">
            <span className="text-ink">Pulse</span>
            <span className="text-crimson-dark">Bond</span>
          </p>
        </div>

        <nav className="hidden md:flex md:flex-col gap-1 px-15 py-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            >
              <item.icon className="size-5 text-muted" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
