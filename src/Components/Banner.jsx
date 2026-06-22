import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="bg-[linear-gradient(180deg,#FFF8F6_0%,#FBF1EE_100%)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* left — text */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-crimson">
              Bangladesh&apos;s blood donor network
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink mt-4 leading-[1.1]">
              Someone near you needs blood{" "}
              <em className="not-italic text-crimson">today.</em>
            </h1>

            <p className="text-base text-muted mt-5 leading-relaxed max-w-lg">
              <span className="text-ink font-bold text-lg font-display">Pulse</span>
              <span className="text-crimson-dark font-bold text-lg font-display">
                Bond
              </span>{" "}
              connects verified blood donors with patients across every district
              and upazila in Bangladesh — fast, transparent, and free to use.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/signup"
                className="bg-crimson hover:bg-crimson-dark text-white font-semibold text-sm px-6 py-3 rounded-xl text-center transition-colors duration-200"
              >
                Join as a Donor
              </Link>
              <Link
                href="/search"
                className="border-2 border-crimson text-crimson hover:bg-crimson hover:text-white font-semibold text-sm px-6 py-3 rounded-xl text-center transition-colors duration-200"
              >
                Search Donors
              </Link>
            </div>

            {/* quick stats */}
            <div className="hidden md:flex flex-wrap     gap-6 mt-10 pt-8 border-t border-border">
              {[
                { count: "1,200+", label: "Active Donors" },
                { count: "64", label: "Districts Covered" },
                { count: "347+", label: "Lives Saved" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl md:text-2xl font-semibold text-ink">
                    {stat.count}
                  </p>
                  <p className="text-xs text-muted font-semibold uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* right — illustration */}
          <div className="flex items-center justify-center">
            <div className="">
              {/* banner image */}
              <Image
                height={500}
                width={500}
                loading="eager"
                src="/banner-image.png"
                alt="logo"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center md:hidden gap-6 mt-10 pt-8 ">
              {[
                { count: "1,200+", label: "Active Donors" },
                { count: "64", label: "Districts Covered" },
                { count: "347+", label: "Lives Saved" },
              ].map((stat) => (
                <div key={stat.label} className="  border-t pt-3  w-full ">
                  <p className="font-display text-xl md:text-2xl font-semibold text-ink">
                    {stat.count}
                  </p>
                  <p className="text-xs text-muted font-semibold uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
      </div>
    </section>
  );
}
