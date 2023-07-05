import MySql from "./svg/mysql";
import NextJs from "./svg/nextJs";
import Stripe from "./svg/stripe";
import Tailwind from "./svg/tailwind";
type Props = {
  className?: string;
};
export default function Technology({ className }: Props) {
  return (
    <div
      className={`max-w-[800px] mx-auto flex gap-2  flex-wrap mb-8 ${className}`}
    >
      <Icon iconName="Next Js 13" icon={<NextJs />} />
      <Icon iconName="Tailwind" icon={<Tailwind />} />
      <Icon icon={<MySql />} iconName="MySql" />
      <Icon icon={<Stripe />} />
    </div>
  );
}
type IconType = {
  iconName?: string;
  icon: React.ReactNode;
};
function Icon({ iconName, icon }: IconType) {
  return (
    <div className="border-2 shadow-lg w-[150px] h-[150px]  flex justify-center items-center flex-col rounded-full mx-auto">
      <div className=" w-[50px]">{icon}</div>
      {iconName && <h1 className="text-xl font-bold">{iconName}</h1>}
    </div>
  );
}
