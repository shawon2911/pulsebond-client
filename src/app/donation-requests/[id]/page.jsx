import DonateButton from "@/Components/DonateButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

const ReqDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.SERVER_URL}/bloodReq/${id}`,
    {
      cache: "no-store",
    },
  );
  const result = await res.json();

  const reqDetails = result?.data;
  const status = reqDetails?.status;
  const recipientDistrictId = reqDetails?.recipientDistrict;
  const recipientUpazilaId = reqDetails?.recipientUpazila;
  // console.log({district: recipientDistrictId, upazila: recipientUpazilaId})
  // console.log(status)

  const districtName = districtsData.find(d => d.id === recipientDistrictId)?.name;
  const upazilaName = upazilasData.find(u => u.id === recipientUpazilaId)?.name;
  // console.log({district: districtName, upazila: upazilaName})

  const details = [
    { label: "Recipient Name", value: reqDetails?.recipientName },
    { label: "Blood Group", value: reqDetails?.bloodGroup, highlight: true },
    { label: "Hospital", value: reqDetails?.hospitalName },
    { label: "Full Address", value: reqDetails?.fullAddress },
    {
      label: "District / Upazila",
      value: `${districtName} / ${upazilaName}`,
    },

    {
      label: "Donation Date",
      value: new Date(reqDetails?.donationDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },

    {
      label: "Donation Time",
      value: new Date(
        `1970-01-01T${reqDetails?.donationTime}`,
      ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    },
    { label: "Requested By", value: reqDetails?.requesterName },
  ];

  const session = await auth.api.getSession({
  headers: await headers()
});
  const donorName = session?.user?.name;
  const donorEmail = session?.user?.email;
  // console.log(session)


  return (
    <div className=" bg-paper">
      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <p className="text-xs text-muted mb-4">
            <Link href="/" className="hover:text-crimson">
              Home
            </Link>
            {" / "}
            <Link href="/donation-requests" className="hover:text-crimson">
              Donation Requests
            </Link>
            {" / "}
            <span className="text-ink font-semibold">Details</span>
          </p>
          <Link
            href="/donation-requests"
            className="text-sm font-semibold text-muted hover:text-ink transition-colors flex items-center gap-1"
          >
            ← Back to requests
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left — main details ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* header card */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson">
                Blood needed
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-2 leading-snug">
                {reqDetails?.recipientName}
              </h1>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <span className="bg-crimson text-white text-sm font-bold px-3 py-1 rounded-lg">
                  {reqDetails?.bloodGroup}
                </span>
                <span className="bg-[#FCEFD8] text-[#9A6B14] text-xs font-bold px-3 py-1 rounded-full capitalize">
                  {reqDetails?.status}
                </span>
              </div>

              {/* divider */}
              <div className="border-t border-border my-6" />

              {/* detail grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {details.map((d) => (
                  <div key={d.label}>
                    <p className="text-xs text-muted font-semibold uppercase tracking-wide mb-1">
                      {d.label}
                    </p>
                    <p
                      className={`text-sm font-semibold ${d.highlight ? "text-crimson text-base" : "text-ink"}`}
                    >
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* message card */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <p className="text-xs text-muted font-semibold uppercase tracking-wide mb-3">
                Request message
              </p>
              <p className="text-sm text-ink leading-relaxed">
                {reqDetails?.requestMessage}
              </p>
            </div>
          </div>

          {/* ── Right — action card ── */}
          <div className="flex flex-col gap-5">
            {/* donate card */}
            <div className="bg-white border border-border rounded-2xl p-6  top-20">
              <div className="w-12 h-12 rounded-xl bg-[#FCEFEF] flex items-center justify-center mb-4">
                🩸
              </div>
              <h3 className="font-display text-lg font-semibold text-ink mb-1">
                Ready to donate?
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-5">
                By confirming, your name and email will be shared with the
                requester and the status will change to In Progress.
              </p>

              <div className="border-t border-border mt-5 pt-4">
                <p className="text-xs text-muted font-semibold uppercase tracking-wide mb-3">
                  Location
                </p>
                <p className="text-sm font-semibold text-ink">
                  {reqDetails?.hospitalName}
                </p>
                <p className="text-xs text-muted mt-1">
                  {reqDetails?.fullAddress}
                </p>
                <p className="text-xs text-muted">
                  {districtName}, {upazilaName}
                </p>
              </div>
            </div>

            {/* emergency strip */}
            <div className="bg-[linear-gradient(120deg,#5C0E1B,#C81E3A)] rounded-2xl px-5 py-4 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F4D9DE]">
                Need help?
              </p>
              <p className="font-display text-base font-semibold mt-1">
                Call our hotline
              </p>
              <p className="text-[#F4D9DE] font-bold text-lg mt-1">
                +880 1XXX-XXXXXX
              </p>
            </div>
            <DonateButton donorName={donorName} donorEmail={donorEmail} requestId={id} status={status} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReqDetailsPage;
