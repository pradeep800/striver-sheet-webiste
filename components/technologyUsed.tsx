import MySql from "./svg/mysql";
import NextJs from "./svg/nextJs";
import Tailwind from "./svg/tailwind";

export default function Technology() {
  return (
    <div className="max-w-[800px] mx-auto flex gap-2 md:flex-row flex-col">
      <div className="border-2 shadow-lg w-[250px] h-[250px]   flex justify-center items-center flex-col rounded-full mx-auto">
        <div className="w-[100px]">
          <NextJs />
        </div>
        <h1 className="text-xl font-bold">Next Js 13</h1>
      </div>
      <div className="border-2 shadow-lg w-[250px] h-[250px]   flex justify-center items-center flex-col rounded-full mx-auto">
        <div className="w-[100px]">
          <Tailwind />
        </div>
        <h1 className="text-xl font-bold">Tailwind</h1>
      </div>
      <div className="border-2 shadow-lg w-[250px] h-[250px]   flex justify-center items-center flex-col rounded-full mx-auto">
        <div className="w-[100px]">
          <MySql />
        </div>
        <h1 className="text-xl font-bold">MySql</h1>
      </div>
    </div>
  );
}
