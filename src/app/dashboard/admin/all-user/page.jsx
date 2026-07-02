import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AllUserPage = async() => {
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users`,{
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const result = await res.json();
    const allUsers = result?.data;
    console.log(allUsers)
    return (
        <div>
            
        </div>
    );
};

export default AllUserPage;