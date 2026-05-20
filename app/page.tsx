import DashboardBarChart from "@/src/features/dashboard/components/DashboardBarChart";
import DashboardHeatMap from "@/src/features/dashboard/components/DashboardHeatMap";
import DashboardKpis from "@/src/features/dashboard/components/DashboardKpis";

export default function Home() {
  return (
    <div className="max-w-screen-6xl w-full px-4 mx-auto flex flex-col min-h-screen">

      <header className="w-full py-6 text-center border-b">
        <h1 className="text-2xl font-semibold">
          Stress Analysis en subreddits
        </h1>
      </header>

      <main className="flex-grow">
        <DashboardKpis />
        <div className="grid grid-cols-2 gap-10 mt-10">
          <DashboardBarChart />
          <DashboardHeatMap />
        </div>
      </main>

      <footer className="w-full py-6 text-center border-t mt-10 text-sm text-gray-500">
        Magus Corp™ 2026. Todos los derechos reservados.
      </footer>

    </div>
  );
}