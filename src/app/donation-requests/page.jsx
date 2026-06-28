import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button, Card, CardBody } from "@heroui/react";
import { Calendar, Clock, HeartCrack, MapPin } from "lucide-react"; 
import { BiLocationPlus } from "react-icons/bi";
import Link from "next/link";
const AllDonationReqPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  // console.log(user)
  const email = user?.email;

  const currentFilterStatus = "all";
  let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/bloodReq`;
  if (currentFilterStatus && currentFilterStatus !== "all") {
    url += `&status=${currentFilterStatus}`;
  }

  const res = await fetch(url);
  const result = await res.json();
  const donationReqArray = result?.data;
  // console.log(result);
  // console.log(donationReqArray);
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      
      <div className="mb-8 border-l-4 border-crimson pl-4">
        <h3 className="uppercase text-xs font-bold tracking-wider text-crimson mb-1">
          Pending only
        </h3>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Blood Donation Requests
        </h2>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-15">
        {donationReqArray?.length > 0 ? (
          donationReqArray.map((req) => (
            <Card
              key={req._id}
              
              className="border border-slate-100 shadow-sm hover:shadow-lg transition-shadow   duration-300"
            >
              <div className="p-5 flex flex-col gap-4">
               
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 line-clamp-1">
                      {req.recipientName}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Recipient</p>
                  </div>
                  <span className="bg-red-50 text-crimson font-black px-3 py-1.5 rounded-xl text-sm border border-red-100 shadow-sm shrink-0 min-w-[45px] text-center">
                    {req.bloodGroup}
                  </span>
                </div>

                <hr className="border-slate-100" />

                
                <div className="flex flex-col gap-2.5 text-sm text-slate-600">
                  
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                    <p className="line-clamp-2 leading-relaxed">
                      {req.fullAddress}
                    </p>
                  </div>

                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.donationDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.donationTime}</span>
                    </div>
                  </div>
                </div>

                
                <div className="mt-2">
                  <Link href={`/donation-requests/${req._id}`}>
                    <Button variant="none" className={"w-full border border-crimson text-crimson hover:bg-crimson-dark hover:text-white font-medium text-sm py-2 px-4 rounded-xl transition-colors duration-200 shadow-sm shadow-red-100"}>
                    View Request
                  </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
    
    <div className="p-4 bg-crimson/10 rounded-full text-crimson mb-4 animate-pulse">
        <HeartCrack className="w-10 h-10" />
    </div>
    
   
    <h3 className="text-lg font-bold text-slate-700 mb-1">
        No Requests Available
    </h3>
    <p className="text-sm text-slate-400 max-w-sm">
        There are currently no pending blood donation requests found. We'll notify you when someone needs help!
    </p>
</div>
        )}
      </div>
    </section>
  );
};

export default AllDonationReqPage;
