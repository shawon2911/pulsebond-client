

export default function WelcomeMessage({ userName }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative bg-linear-to-r from-crimson-dark via-rose-400 to-crimson-dark rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100 overflow-hidden mb-8 md:mx-5">
      {/* Background Decorative Circles/Shapes */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-12 -mb-8 w-40 h-40 bg-pink-300 opacity-20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
        {/* Left Side: Text Details */}
        <div>
          <p className="text-xs md:text-sm font-medium text-rose-100 uppercase tracking-wider mb-1">
            {currentDate}
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            Welcome Back,{" "}
            <span className="text-ink font-display">
              {userName || "Donor"}
            </span>
             👋
          </h1>
          <p className="text-rose-50 text-sm md:text-base font-light max-w-xl leading-relaxed">
            "Your single drop of blood can bring a smile to a face and save a
            precious life." Thank you for being a hero! ❤️
          </p>
        </div>

        {/* Right Side: Quick Stats or Badge */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 self-start md:self-center">
          <div className="bg-white rounded-xl p-2.5 text-rose-500 flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-rose-100 font-medium uppercase tracking-wider">
              Status
            </p>
            <p className="text-sm font-bold text-white">Ready to Donate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
