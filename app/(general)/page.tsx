import StartToday from "@/components/startToday";
import Danger from "@/components/dangerDoingSheet";
import Pricing from "@/components/pricing";
import { Cpu, Gem } from "lucide-react";
import Technology from "@/components/technologyUsed";

export default function Page() {
  return (
    <div>
      <StartToday />

      <div className="flex justify-center items-center gap-2 text-red-500 my-4 sm:mt-8 ">
        <Gem />
        <h1 className="text-3xl font-bold text-center tracking-wide ">
          Pricing
        </h1>
      </div>
      <Pricing />

      <Danger />

      <div className="flex justify-center items-center sm:gap-2 gap-5  text-red-500 pb-3  my-8">
        <Cpu />
        <h1 className="text-3xl font-bold text-center tracking-wide">
          Technology Used
        </h1>
      </div>
      <Technology />
    </div>
  );
}
