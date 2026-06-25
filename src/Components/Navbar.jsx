"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? "text-red-600 font-semibold "
      : "text-gray-700 hover:text-red-600";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

    
    // console.log(pathName)
    if(pathname.includes("dashboard")){
      return null;
    }

  return (
    <div>
      <div className="bg-red-900 p-1 text-white">
        <marquee scrollamount="5">
          🩸 Donate Blood, Save Lives | ❤️ Every Drop Counts | 🚨 Emergency
          Blood Requests Available 24/7 | 🤝 Join Our Donor Community Today
        </marquee>
      </div>

      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-white backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
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
                  <span className="text-ink">Pulse</span>
                  <span className="text-crimson-dark">Bond</span>
                </p>
              </div>
            </Link>
          </div>
          <ul className="hidden items-center gap-4 md:flex text-ink font-medium">
            <li>
              <Link
                href="/donation-requests"
                className={linkClass("/donation-requests")}
                aria-current="page"
              >
                Donation Requests
              </Link>
            </li>
            <li>
              <Link
                href="/search-donors"
                className={linkClass("/search-donors")}
              >
                Search Donors
              </Link>
            </li>
            <li>
              <Link href="#contact" className={linkClass("")}>
                Contact Us
              </Link>
            </li>
          </ul>
          {!user && (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/signin"
                className="bg-border py-1 px-3 rounded-md text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-crimson-dark  py-1 px-3 rounded-md text-sm text-white hover:bg-maroon"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="mr-5 md:mr-0 items-center gap-4 ">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <Avatar size="sm" aria-label="Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt="John Doe"
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
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
                        <p className="text-sm leading-5 font-medium">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="new-file" textValue="New file" variant="none">
                      <Link
                        href={`/dashboard/${user?.role}`}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-gray-700  hover:text-red-700 transition"
                      >
                        <MdDashboard />
                        Dashboard
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="copy-link" textValue="Copy link">
                      <Link
                        href={`/dashboard/${user?.role}-profile`}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-gray-700  hover:text-red-700 transition"
                      >
                        <CgProfile />
                        Profile
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="delete-file"
                      textValue="Delete file"
                      variant="danger"
                      onClick={handleSignOut}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <BiLogOut />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </header>

        {/* mobile view for nav items */}

        {isMenuOpen && (
          <div className="md:hidden border-t border-red-200 bg-white shadow-md">
            <div className="flex flex-col px-4 py-3 gap-2">
              <Link
                href="/donation-requests"
                className="py-2 px-3 rounded-md text-gray-700 border border-red-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Donation Requests
              </Link>

              <Link
                href="/search-donors"
                className="py-2 px-3 rounded-md text-gray-700 border border-red-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Donors
              </Link>

              <Link
                href="#contact"
                className="py-2 px-3 rounded-md text-gray-700 border border-red-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {!user && (
                <div className="flex flex-col gap-2 pt-2 border-t border-red-100">
                  <Link
                    href="/signin"
                    className="text-center font-bold py-2 rounded-md border border-red-200 text-red-700 hover:bg-red-50 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="text-center font-bold py-2 rounded-md bg-red-700 text-white transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}

              
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
