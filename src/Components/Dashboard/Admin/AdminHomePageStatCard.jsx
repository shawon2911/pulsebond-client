import { Users, Droplets, HandCoins } from "lucide-react";



const AdminHomePageStatCard = ({statsInfo}) => {
    const stats = [
  {
    icon: <Users className="w-5 h-5" />,
    label: "Total Donors",
    value: statsInfo.totalDonors,
    iconBg: "bg-[#FCEFEF]",
    iconColor: "text-crimson",
  },
  {
    icon: <HandCoins className="w-5 h-5" />,
    label: "Total Funding",
    value: "৳ 62,400",
    iconBg: "bg-[#FFF3E0]",
    iconColor: "text-gold",
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    label: "Total Donation Requests",
    value: statsInfo.totalRequests,
    iconBg: "bg-red-100",
    iconColor: "text-crimson",
  },
];
    return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:mx-4 ">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4"
        >
          <div className={`w-12 h-12 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
            {stat.icon}
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-ink">
              {stat.value}
            </p>
            <p className="text-xs text-muted font-semibold uppercase tracking-wide mt-0.5">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminHomePageStatCard;





 
