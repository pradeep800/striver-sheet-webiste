"use client";
import { HeatMapData } from "@/app/(general)/[username]/page";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "./ui/select";
import darkModeProfile from "@/public/bg-profile-dark.jpg";
import lightModeProfile from "@/public/bg-profile-light.jpg";
import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import { useEffect, useState } from "react";
import { websiteBirthday } from "@/static/websiteBirthdayYear";
import Image from "next/image";

import { User } from "lucide-react";
import { Poppins } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
const poppins = Poppins({ weight: "300", subsets: ["latin"] });
type User = {
  name: string;
  photo: string | null;
  description: string | null;
};

type Props = {
  user: User;
  heatMapData: HeatMapData;
  heatMapYears: number[];
  totalSolvedQuestion: number;
};
export default function MainProfile({
  user,
  heatMapData,
  heatMapYears,
  totalSolvedQuestion,
}: Props) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const solvedPer = parseInt(
        ((totalSolvedQuestion / 191) * 100).toFixed(2)
      );
      setProgress(solvedPer);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="max-w-[800px] mx-auto mt-5 ">
      <BackgroundStripe />
      <ProfilePhoto photo={user.photo} />

      <div className="translate-y-[-40px] ">
        <p className="text-center font-semibold text-red-500">{`${user.name}`}</p>
        <p
          className={`text-center  font-light  max-w-[700px] mx-auto text-base ${poppins.className}`}
        >
          {user.description}
        </p>
      </div>
      <Card className="mb-5 ">
        <CardHeader className="text-center">
          <CardTitle>Total Number Of Question In Striver Sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} />
          <div className="flex justify-between font-bold">
            <div>{`${totalSolvedQuestion}/191`}</div>
            <div>{`${progress}%`}</div>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-auto dark:bg-background border shadow-sm rounded-lg">
        <div className="max-w-[200px] m-2 mx-auto">
          <SelectYear heatMapYears={heatMapYears} setYear={setYear} />
        </div>
        <div className=" w-[800px] mx-auto">
          <HeatMap
            value={heatMapData?.[heatMapYears.indexOf(year)] ?? []}
            rectRender={(props, data) => {
              if (!data.count) return <rect {...props} />;
              return (
                <Tooltip key={props.key} placement="top" content={data.content}>
                  <rect {...props} />
                </Tooltip>
              );
            }}
            className="w-[700px] mx-auto"
            style={{ color: "#ad001d" }}
            startDate={new Date(`${year}/01/01`)}
            panelColors={{
              1: "#e4b293",
              3: "#d48462",
              5: "#c2533a",
              7: "#ad001d",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function BackgroundStripe() {
  return (
    <div className="w-[100%] h-[20vh] overflow-hidden  rounded-md ">
      <Image
        className="dark:block hidden h-[100%] w-[100%] object-none"
        src={darkModeProfile}
        alt="Background Photo"
      />
      <Image
        className=" dark:hidden h-[100%] w-[100%] object-none object-center"
        src={lightModeProfile}
        alt="Background Photo"
      />
    </div>
  );
}

function ProfilePhoto({ photo }: { photo: string | null }) {
  return (
    <div className="translate-y-[-50%] w-[100px] mx-auto">
      {photo ? (
        <Image
          className="w-[100px] h-[100px] border-4 rounded-full border-red-500 "
          src={photo}
          alt="profile photo"
          width={100}
          height={100}
        />
      ) : (
        <User className=" bg-white w-[100px] h-[100px] border-4 border-red-500 rounded-full text-red-500" />
      )}
    </div>
  );
}

function SelectYear({
  setYear,
  heatMapYears,
}: {
  setYear: React.Dispatch<number>;
  heatMapYears: number[];
}) {
  return (
    <Select
      defaultValue={(heatMapYears[0] ?? new Date().getFullYear()).toString()}
      onValueChange={(e) => {
        setYear(parseInt(e.valueOf()));
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="2023">
          {heatMapYears[0] ?? new Date().getFullYear()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {heatMapYears.map((heatMapYear, i) => {
          return (
            <SelectItem key={i} value={heatMapYear.toString()}>
              {heatMapYear}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
