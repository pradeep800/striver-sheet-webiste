import StartToday from "@/components/startToday";
import Danger from "@/components/dangerDoingSheet";
import { Cpu, Gem } from "lucide-react";
import Technology from "@/components/technologyUsed";
import MainPricing from "@/components/mainPricing";

export default function Page() {
  return (
    <div>
      <StartToday />
      <div className="mb-12 mt-8">
        <div className="flex justify-center items-center gap-2 text-red-500 mb-3">
          <Gem />
          <h1 className="text-2xl font-bold text-center tracking-wide ">
            Pricing
          </h1>
        </div>
        <MainPricing sessionUser={undefined} />
      </div>

      <div className="mb-12">
        <Danger />
      </div>

      <div className=" ">
        <div className="flex justify-center items-center  text-red-500 mb-4">
          <Cpu />
          <h1 className="text-2xl font-bold text-center tracking-wide">
            Technology Used
          </h1>
        </div>
        <Technology />
      </div>
    </div>
  );
}
