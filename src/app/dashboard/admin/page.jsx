import AdminHomePageStatCard from "@/Components/Dashboard/Admin/AdminHomePageStatCard";
import WelcomeMessage from "@/Components/Dashboard/WelcomeMessage";
import { stats } from "@/lib/api/action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const AdminDashboardHomePage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    // console.log(session)
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    // console.log("token", token)
    const statsInfo = await stats(token)
    // console.log(statsInfo)
    // const {totalDonors, totalReq} = statsInfo;
    return (
        <section>
            <div>
                <WelcomeMessage userName={user?.name} role={"admin"} />
            </div>
            <div className="mt-10">
                <AdminHomePageStatCard statsInfo={statsInfo}  />
            </div>
        </section>
    );
};

export default AdminDashboardHomePage;