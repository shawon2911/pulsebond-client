import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button, Card, CardBody } from "@heroui/react";

import { Calendar, Clock, HeartCrack, MapPin } from "lucide-react";
import { BiLocationPlus } from "react-icons/bi";
import Link from "next/link";
export default async function AllDonationReqPage({ searchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  // console.log(user)
  const email = user?.email;

  const resolvedSearchParams = await searchParams;
  const currentFilterStatus = resolvedSearchParams?.status || "all";
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;
  const limit = 15;

  // Build URL with query params
  const queryParams = new URLSearchParams();
  if (currentFilterStatus && currentFilterStatus !== "all") {
    queryParams.append("status", currentFilterStatus);
  }
  queryParams.append("page", currentPage);
  queryParams.append("limit", limit);

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/bloodReq?${queryParams.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  const result = await res.json();
  // console.log(result)

  const donationReqArray = result?.data || [];
  const pagination = result?.pagination || { totalPages: 1, currentPage: 1 };
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
                    <Button
                      variant="none"
                      className={
                        "w-full border border-crimson text-crimson hover:bg-crimson-dark hover:text-white font-medium text-sm py-2 px-4 rounded-xl transition-colors duration-200 shadow-sm shadow-red-100"
                      }
                    >
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
              There are currently no pending blood donation requests found.
              We'll notify you when someone needs help!
            </p>
          </div>
        )}
      </div>

      
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          {/* Previous Button */}
          <Link href={`/donation-requests?status=${currentFilterStatus}&page=${currentPage - 1}`}>
          <Button 
            
            
            isDisabled={currentPage <= 1}
            variant="flat"
          >
            Previous
          </Button></Link>

          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {pagination.totalPages}
          </span>

          {/* Next Button */}
          <Link href={`/donation-requests?status=${currentFilterStatus}&page=${currentPage + 1}`}>
          <Button 
            
            
            isDisabled={currentPage >= pagination.totalPages}
            variant="flat"
          >
            Next
          </Button>
          </Link>
        </div>
      )}
    </section>

    // <div className="container mx-auto px-4 py-8">
    //   <h1 className="text-2xl font-bold mb-6">Blood Donation Requests</h1>
      
    //   {/* Cards Grid */}
    //   {donationReqArray.length === 0 ? (
    //     <div className="flex flex-col items-center justify-center py-12">
    //       <HeartCrack className="w-12 h-12 text-gray-400 mb-2" />
    //       <p className="text-gray-500">No donation requests found.</p>
    //     </div>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {donationReqArray.map((req) => (
    //         <Card key={req._id} className="p-4 shadow-sm">
    //           <CardBody>
    //             <h3 className="font-semibold text-lg text-red-600">{req.patientName || req.bloodGroup}</h3>
    //             <p className="text-sm text-gray-600 flex items-center gap-1 mt-2">
    //               <MapPin className="w-4 h-4" /> {req.hospitalName}, {req.district}
    //             </p>
    //             <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
    //               <Calendar className="w-4 h-4" /> {req.donationDate} at {req.donationTime}
    //             </p>
    //             <div className="mt-4 flex justify-between items-center">
    //               <span className={`px-2 py-1 text-xs rounded-full font-medium ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
    //                 {req.status}
    //               </span>
    //               <Button size="sm" color="danger" variant="flat" as={Link} href={`/blood-requests/${req._id}`}>
    //                 View Details
    //               </Button>
    //             </div>
    //           </CardBody>
    //         </Card>
    //       ))}
    //     </div>
    //   )}

    // //   {/* Pagination UI Controls */}
    //   {pagination.totalPages > 1 && (
    //     <div className="flex justify-center items-center gap-4 mt-8">
    //       {/* Previous Button */}
    //       <Button 
    //         as={Link} 
    //         href={`/blood-requests?status=${currentFilterStatus}&page=${currentPage - 1}`}
    //         isDisabled={currentPage <= 1}
    //         variant="flat"
    //       >
    //         Previous
    //       </Button>

    //       <span className="text-sm font-medium text-gray-600">
    //         Page {currentPage} of {pagination.totalPages}
    //       </span>

    //       {/* Next Button */}
    //       <Button 
    //         as={Link} 
    //         href={`/blood-requests?status=${currentFilterStatus}&page=${currentPage + 1}`}
    //         isDisabled={currentPage >= pagination.totalPages}
    //         variant="flat"
    //       >
    //         Next
    //       </Button>
    //     </div>
    //   )}
    // </div>
  );
};

// export default AllDonationReqPage;
