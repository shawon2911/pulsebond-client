"use client"
import WelcomeMessage from "@/Components/Dashboard/WelcomeMessage";
import { authClient } from "@/lib/auth-client";


const DonorDashboardHomePage = () => {
    const { data: session } = authClient.useSession();
      const user = session?.user;
    
    return (
        <div>
            {/* welcome message */}
            <WelcomeMessage userName={user?.name} />

        </div>
    );
};

export default DonorDashboardHomePage;