import AllUserTable from "@/Components/Dashboard/Admin/AllUserTable";
import Filtering from "@/Components/Dashboard/Donor/Filtering";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const AllUserPage = async({searchParams}) => {
    const {status = "all"} = await searchParams;
    // console.log("params", searchParams)
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users?status=${status}`,{
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const result = await res.json();
    const allUsers = result?.data;
    // console.log(allUsers)
        const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "blocked", label: "Blocked" },
    
  ];
    return (
        <div>
            <Filtering options={options} />
            <AllUserTable data={allUsers}/>
        </div>
    );
};

export default AllUserPage;