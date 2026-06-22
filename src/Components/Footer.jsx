import Image from "next/image";
import Link from "next/link";

const links = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "Donation Requests", href: "/donation-requests" },
    { label: "Search Donors", href: "/search" },
  ],
  Account: [
    { label: "Log In", href: "/signin" },
    { label: "Register", href: "/signup" },
    { label: "Funding", href: "/funding" },
  ],
  Support: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-[#CBC1C5]">

      {/* main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Link href={"/"}>
              <div className="flex items-center gap-2">
                <Image
                  height={40}
                  width={40}
                  loading="eager"
                  src="/logo.png"
                  alt="logo"
                />
                <p className="font-bold text-2xl">
                  <span className="text-white">Pulse</span>
                  <span className="text-crimson-dark">Bond</span>
                </p>
              </div>
            </Link>
            </div>
            <p className="text-sm leading-relaxed text-[#9C939A] max-w-[220px]">
              Every drop counts. Connecting donors and recipients across Bangladesh.
            </p>

            {/* social */}
            <div className="flex gap-3 mt-5">
              {["𝕏", "f", "in"].map((icon) => (
                <button
                  key={icon}
                  className="w-8 h-8 rounded-full bg-[#2D262F] text-white text-xs flex items-center justify-center hover:bg-crimson transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-sm font-bold mb-4 font-body">{group}</h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#CBC1C5] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-[#38303B] ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5   gap-3 ">
          <p className="text-xs text-[#9C939A] text-center">
            © {new Date().getFullYear()} PulseBond All rights reserved.
          </p>
          
        </div>
      </div>

    </footer>
  );
}