import DashboardBarChart from "@/src/features/dashboard/components/DashboardBarChart";
import DashboardHeatMap from "@/src/features/dashboard/components/DashboardHeatMap";
import DashboardKpis from "@/src/features/dashboard/components/DashboardKpis";

export default function Home() {
  return (
    <div className="max-w-screen-6xl w-full px-4 mx-auto">
      <DashboardKpis />
      <div className="grid grid-cols-2 gap-10 mt-10">
        <DashboardBarChart />
        <DashboardHeatMap />
      </div>
    </div>
  );
}
