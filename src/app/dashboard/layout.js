import DashboardNavbar from "@/Components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";


const DashboardLayout = ({children}) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background">
      <DashboardSidebar className="shrink-0" />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <div className="border-b py-4 bg-[#fdefe9] shrink-0">
          <DashboardNavbar />
        </div>
        <main className="flex-1 py-5 px-2 bg-paper overflow-y-auto h-full">{children}</main>
      </div>
    </div>
    );
};

export default DashboardLayout;