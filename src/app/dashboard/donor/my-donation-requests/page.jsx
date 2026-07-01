import Filtering from "@/Components/Dashboard/Donor/Filtering";
import HomePagetable from "@/Components/Dashboard/Donor/HomePagetable";
import { userDonationReq } from "@/lib/api/action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



const MyDonationRequestsPage = async ({searchParams}) => {
  const {status = "all"} = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user;
  const email = user?.email;
  // console.log({ user: user, email: email });

  if (!email){
    redirect("/signin")
  }
 

  const res = await fetch(`${process.env.SERVER_URL}/bloodReq?email=${email}&status=${status}`,
    {
      cache: "no-store",
  },
);
  const result = await res.json();
  const allResult = result?.data;
  // console.log("allresult", allResult);

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        Unauthorized! Please login.
      </div>
    );
  }
  

  return (
    <div className="md:px-3">
      <div className="flex items-center md:gap-15 py-5">
             <h2 className="text-ink text-xl font-bold md:ml-3 mb-2">
               All<span className="font-display text-2xl text-crimson">Donation</span>  Requests
            </h2>
            <span className="flex items-center gap-2  ">
              <p className="text-ink text-xl font-bold"><span className="font-display text-2xl text-crimson">Filter</span> By:</p>
              <Filtering />
            </span>
           </div>

      {allResult.length !== 0 ? (
        <>
          <div className="">
           
            <HomePagetable data={allResult} />
          </div>
        </>
      ) : (
       
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

export default MyDonationRequestsPage;





















// import HomePagetable from "@/Components/Dashboard/Donor/HomePagetable";
// import { userDonationReq } from "@/lib/api/action";
// import { authClient } from "@/lib/auth-client";
// import { useEffect, useState } from "react";

// const MyDonationRequestsPage = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;
//   const email = user?.email;
//   console.log({user: user, email: email})

//   const [donations, setDonations] = useState([]);
//   const [status, setStatus] = useState("all");

//   useEffect(() => {
//     if (!email) return;

//     const fetchDonations = async () => {
//       try {
//         const result = await userDonationReq(email, status);
//         // console.log("result", result);
//         setDonations(result);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchDonations();
//   }, [email, status]);

//   if (!user) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Unauthorized! Please login.
//       </div>
//     );
//   }
//     console.log("all donation ", donations)

//   return (
//     <div className="md:px-3">
//       <HomePagetable data={donations} />
//     </div>
//   );
// };

// export default MyDonationRequestsPage;
