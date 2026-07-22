import AdminAllReqTable from "@/Components/Dashboard/Admin/AdminAllReqTable";
import Filtering from "@/Components/Dashboard/Donor/Filtering";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const options = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "inprogress", label: "Inprogress" },
  { value: "done", label: "Done" },
  { value: "cancelled", label: "Cancelled" },
];

const AdminAllRequestsPage = async ({ searchParams }) => {
  const { status = "all" } = await searchParams;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/all-blood-requests?status=${status}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await res.json();
  const data = result?.data;
//   console.log("data", data);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center md:gap-15 py-5">
              <h2 className="text-ink text-xl font-bold md:ml-3 mb-2">
                All{" "}
                <span className="font-display text-2xl text-crimson">Donation</span>{" "}
                Requests
              </h2>
              <span className="flex items-center gap-2  ">
                <p className="text-ink text-xl font-bold">
                  <span className="font-display text-2xl text-crimson">Filter</span>{" "}
                  By:
                </p>
                <Filtering options={options} />
              </span>
            </div>
      
      <AdminAllReqTable data={data || []} />
    </div>
  );
};

export default AdminAllRequestsPage;
