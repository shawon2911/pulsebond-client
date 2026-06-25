import DashboardNavbar from "@/Components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";


const DashboardLayout = ({children}) => {
    return (
        <div className="flex h-screen bg-background">
      <DashboardSidebar className="" />
      <div className="w-full flex-1">
        <div className="border-b p-5">
          <DashboardNavbar />
        </div>
        <main className="py-10 px-15">{children}</main>
      </div>
    </div>
    );
};

export default DashboardLayout;