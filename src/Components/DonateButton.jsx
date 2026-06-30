"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function DonateButton({ donorName, donorEmail, requestId, status }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(status === "inprogress" || status === "Done");
// console.log(status)
 
  

  const handleConfirm = async () => {
    const {data: token} = await authClient.token()
    // console.log("token" , token.token)
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bloodReq/${requestId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         authorization : `Bearer ${token?.token}`
         },
      body: JSON.stringify({ status: "inprogress", donorName, donorEmail }),
    });
    setLoading(false);
    setConfirmed(true);
    window.alert("donation in progress");
  };

   

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full mt-5 bg-crimson hover:bg-crimson-dark text-white font-semibold text-sm py-3 rounded-xl transition-colors duration-200"
      >
        Donate Blood
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(24,14,20,0.6)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-8">
            {confirmed ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#DCF3E4] flex items-center justify-center text-2xl mx-auto mb-4">✅</div>
                <h3 className="font-display text-xl font-semibold text-ink mb-2">Donation confirmed!</h3>
                <p className="text-sm text-muted mb-5">Status updated to In Progress. Thank you!</p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-crimson text-white font-semibold text-sm px-6 py-2.5 rounded-xl w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-display text-lg font-semibold text-ink">Confirm your donation</h3>
                  <button onClick={() => setModalOpen(false)} className="text-muted hover:text-ink text-xl">✕</button>
                </div>
                <p className="text-xs text-muted mb-5">Your details will be shared with the requester.</p>

                <div className="flex flex-col gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-[#4D454A] uppercase tracking-wide mb-1.5">Donor Name</label>
                    <input readOnly value={donorName} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-[#F6F1EF] cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4D454A] uppercase tracking-wide mb-1.5">Donor Email</label>
                    <input readOnly value={donorEmail} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-[#F6F1EF] cursor-not-allowed" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-[#F4ECEA] text-ink font-semibold text-sm py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    
                    onClick={handleConfirm}
                    disabled={disabled}
                    className="flex-1 bg-crimson hover:bg-crimson-dark disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
                  >
                    {loading ? "Confirming..." : "Confirm Donation"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}