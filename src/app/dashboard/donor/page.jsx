"use client";
import HomePagetable from "@/Components/Dashboard/Donor/HomePagetable";
import WelcomeMessage from "@/Components/Dashboard/WelcomeMessage";
import { userDonationReq } from "@/lib/api/action";
import { authClient } from "@/lib/auth-client";
import { Chip, Table } from "@heroui/react";
import { useEffect, useState } from "react";

const DonorDashboardHomePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const email = user?.email;

  const [donations, setDonations] = useState([]);
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (!email) return;

    const fetchDonations = async () => {
      try {
        const result = await userDonationReq(email, status);
        // console.log("result", result);
        setDonations(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDonations();
  }, [email, status]);

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        Unauthorized! Please login.
      </div>
    );
  }
  //  console.log("result", donations);
  const threeData = (donations || []).slice(0, 3);
  // console.log("Sliced Data:", threeData);

  return (
    <div>
      {/* welcome message */}
      <WelcomeMessage userName={user?.name} />
      {threeData.length !== 0 ? (
        <>
          <div className="md:mx-5">
            <h2 className="text-ink text-xl font-bold md:ml-3 mb-2">
              Recent Donation Requests
            </h2>
            <HomePagetable data={threeData} />
          </div>
        </>
      ) : (
        /* 🔴 Empty State Design: Jodi kono data na thake */
        <div className="md:mx-5 mt-6 flex flex-col items-center justify-center p-8 rounded-xl bg-crimson/10 border border-crimson/20 text-center">
          {/* Tumi chaile ekhane ekta Icon o use korte paro */}
          <div className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-md">
            !
          </div>
          <h3 className="text-xl font-semibold text-crimson mb-1">
            No Requests Found
          </h3>
          <p className="text-gray-600 text-sm max-w-sm">
            You haven't posted any blood requests yet. If you or someone you
            know needs blood, create a request now.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorDashboardHomePage;
