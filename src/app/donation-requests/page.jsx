import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const AllDonationReqPage = async() => {
    const session = await auth.api.getSession({
        headers : await headers()
    })
    const user = session?.user;
    // console.log(user)
    const email = user?.email;
    
    const currentFilterStatus = "all";
    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/bloodReq?email=${email}`;
    if(currentFilterStatus && currentFilterStatus !== "all"){
        url += `&status=${currentFilterStatus}`;
    }

    const res = await fetch(url);
    const result = await res.json();
    console.log(result);
    return (
        <div>
            all
        </div>
    );
};

export default AllDonationReqPage;