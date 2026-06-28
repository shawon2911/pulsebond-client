"use client";
import HomePagetable from "@/Components/Dashboard/Donor/HomePagetable";
import WelcomeMessage from "@/Components/Dashboard/WelcomeMessage";
import { authClient } from "@/lib/auth-client";
import { Chip, Table } from "@heroui/react";
import { useEffect, useState } from "react";

const DonorDashboardHomePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const email = user?.email;

  const [donations, setDonations] = useState(null);

useEffect(() => {
  if (!email) return;

  const fetchDonations = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bloodReq?email=${email}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchDonations();
}, [email]);

const allData = donations?.data || [];
// console.log(allData)
const threeData = allData.slice(0,3);
console.log(threeData)

// console.log(allData);

  return (
    <div>
      {/* welcome message */}
      <WelcomeMessage userName={user?.name} />
      <div className="md:mx-5"> 
        <h2 className="text-ink text-xl font-bold md:ml-3 mb-2">Recent Donation Requests</h2>
        <HomePagetable threeData={threeData} />
      </div>
    </div>
  );
};

export default DonorDashboardHomePage;
