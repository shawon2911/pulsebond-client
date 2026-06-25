"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";

const DashboardNavbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
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
    </div>
  );
};

export default DashboardNavbar;
