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
      const result = await userDonationReq(email, status );
      // console.log("result", result);
      setDonations(result);
     
    } catch (error) {
      console.log(error);
    }
  };

  fetchDonations();
}, [email, status]);
 

  if (!user) {
    return <div className="p-6 text-center text-red-500">Unauthorized! Please login.</div>;
  }
//  console.log("result", donations);
const threeData = (donations || []).slice(0, 3);
  // console.log("Sliced Data:", threeData);

  return (
    <div>
      {/* welcome message */}
      <WelcomeMessage userName={user?.name} />
      <div className="md:mx-5"> 
        <h2 className="text-ink text-xl font-bold md:ml-3 mb-2">Recent Donation Requests</h2>
        <HomePagetable data={threeData} />
      </div>
    </div>
  );
};

export default DonorDashboardHomePage;
