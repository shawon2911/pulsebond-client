import { ShieldCheck, Zap, MapPin, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Verified donors",
    desc: "Every profile is tied to a real district & upazila for quick local matching.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Fast matching",
    desc: "Open requests are visible instantly to nearby eligible donors.",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "District-wise search",
    desc: "Filter donors by blood group, district and upazila in seconds.",
  },
  {
    icon: <HeartHandshake className="w-5 h-5" />,
    title: "Community funding",
    desc: "Support running costs and outreach drives with a small contribution.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* section header */}
        <div className="mb-10">
          <span className="text-lg font-bold uppercase tracking-widest text-crimson">
            Why <span className="text-ink font-display text-xl">Pulse</span>
                  <span className="text-crimson-dark font-display text-xl">Bond</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-2">
            Built for trust, speed, and reach
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FCEFEF] text-crimson flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}