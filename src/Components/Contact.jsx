"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Emergency Hotline",
    value: "+880 121-21212",
    sub: "Available 24/7",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email Us",
    value: "support@pulsebond.test",
    sub: "We reply within 24 hours",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Based In",
    value: "Dhaka, Bangladesh",
    sub: "Serving all 64 districts",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire up your email/API here
    setSent(true);
  };

  return (
    <section className="py-16 bg-paper" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* section header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-crimson">
            Get in touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-2">
            Have a question?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* form card */}
          <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#DCF3E4] flex items-center justify-center text-2xl">
                  ✅
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Message sent!
                </h3>
                <p className="text-sm text-muted">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-crimson font-semibold mt-2 underline underline-offset-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">

                <div>
                  <label className="block text-xs font-bold text-[#4D454A] uppercase tracking-wide mb-1.5">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-ink placeholder:text-muted focus:outline-none focus:border-crimson transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4D454A] uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-ink placeholder:text-muted focus:outline-none focus:border-crimson transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4D454A] uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm text-ink placeholder:text-muted focus:outline-none focus:border-crimson transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-crimson hover:bg-crimson-dark text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200 w-full sm:w-auto"
                >
                  Send Message
                </button>

              </div>
            )}
          </div>

          {/* contact info */}
          <div className="flex flex-col gap-5">

            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="bg-white border border-border rounded-2xl px-5 py-4 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FCEFEF] text-crimson flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-muted font-semibold uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-ink mt-0.5">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}

            {/* emergency box */}
            <div className="bg-[linear-gradient(120deg,#5C0E1B,#C81E3A)] rounded-2xl px-6 py-5 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F4D9DE]">
                Urgent blood needed?
              </p>
              <p className="font-display text-2xl font-semibold mt-1">
                Call us anytime
              </p>
              <p className="text-[#F4D9DE] text-sm mt-1">
                Our volunteer team responds to emergencies around the clock.
              </p>
              <p className="font-display text-3xl font-bold mt-3">
                +880 121-21212
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}