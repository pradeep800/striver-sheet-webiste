import MySql from "./svg/mysql";
import NextJs from "./svg/nextJs";
import Stripe from "./svg/stripe";
import Tailwind from "./svg/tailwind";

export default function Technology() {
  return (
    <div className="max-w-[800px] mx-auto flex gap-2  flex-wrap">
      <div className="border-2 shadow-lg  w-[150px] h-[150px]  flex justify-center items-center flex-col rounded-full mx-auto">
        <div className="sm:w-[100px] w-[50px]">
          <NextJs />
        </div>
        <h1 className="text-xl font-bold">Next Js 13</h1>
      </div>
      <div className="border-2 shadow-lg  w-[150px] h-[150px]  flex justify-center items-center flex-col rounded-full mx-auto">
        <div className=" w-[50px]">
          <Tailwind />
        </div>
        <h1 className="text-xl font-bold">Tailwind</h1>
      </div>
      <div className="border-2 shadow-lg w-[150px] h-[150px]  flex justify-center items-center flex-col rounded-full mx-auto">
        <div className=" w-[50px]">
          <MySql />
        </div>
        <h1 className="text-xl font-bold">MySql</h1>
      </div>
      <div className="border-2 shadow-lg  w-[150px] h-[150px]  flex justify-center items-center flex-col rounded-full mx-auto">
        <div className="  w-[50px]">
          <Stripe />
        </div>
      </div>
    </div>
  );
}
