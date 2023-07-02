import StartToday from "@/components/startToday";
import Danger from "@/components/dangerDoingSheet";
import Pricing from "@/components/pricing";
import { AlertTriangle, Cpu, Gem } from "lucide-react";
import Technology from "@/components/technologyUsed";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <StartToday />

      <hr className="mt-3" />
      <div className="flex justify-center items-center gap-2 text-red-500 pt-3 ">
        <Gem />
        <h1 className="text-2xl font-bold text-center ">Pricing</h1>
      </div>
      <Pricing />
      <hr className="mt-3" />
      <Danger />
      <hr className="mt-3" />
      <div className="flex justify-center items-center gap-2 text-red-500 pb-3 pt-3">
        <Cpu />
        <h1 className="text-2xl font-bold text-center ">Technology Used</h1>
      </div>
      <Technology />
    </div>
  );
}
