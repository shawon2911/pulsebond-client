import AllUserTable from "@/Components/Dashboard/Admin/AllUserTable";
import Filtering from "@/Components/Dashboard/Donor/Filtering";
import Pagination from "@/Components/pagination";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

const AllUserPage = async ({ searchParams }) => {
  
  // console.log("params", searchParams)
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

     const resolvedSearchParams = await searchParams; 
  const status = resolvedSearchParams?.status || "all";
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;
  const limit = 10;


   const queryParams = new URLSearchParams();
  if (status && status !== "all") {
    queryParams.append("status", status);
  }
  queryParams.append("page", currentPage);
  queryParams.append("limit", limit);


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-users?${queryParams.toString()}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const result = await res.json();
  // console.log(result)
  const allUsers = result?.data;
  const pagination = result?.pagination || { totalPages: 1, currentPage: 1 };
  const totalPages = pagination.totalPages;
  // console.log(allUsers)
  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "blocked", label: "Blocked" },
  ];
  return (
    <div>
      <div className="flex items-center  md:gap-15 py-5">
        <h2 className="text-ink  text-xl font-bold md:ml-3 mb-2">
          All
          <span className="font-display text-2xl text-crimson">User</span>
        </h2>
        <span className="flex items-center gap-2  ">
          <p className="text-ink text-xl font-bold">
            <span className="font-display text-2xl text-crimson">Filter</span>{" "}
            By:
          </p>
          <Filtering options={options} />
        </span>
      </div>
      <AllUserTable data={allUsers} />

      {pagination.totalPages > 1 && (
             <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              status={status}
              basePath={"/dashboard/admin/all-user"}
             />
            )}
    </div>
  );
};

export default AllUserPage;
