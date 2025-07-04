
import BgGradient from "@/components/common/BgGradient";
import CreateOrganization from "@/components/home/OrgSection";

const Dashboard = () => {


  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col w-full">
        <CreateOrganization />
      </div>
    </div>
  );
};

export default Dashboard;
