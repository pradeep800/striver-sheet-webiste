"use client";
import { HeatMapDataForYear } from "@/app/(general)/[username]/page";
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
import React, { useEffect, useState, useTransition } from "react";
import { websiteBirthday } from "@/static/websiteBirthdayYear";
import Image from "next/image";

import { User } from "lucide-react";
import { Poppins } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { getIndianTime } from "@/lib/dateTimeFun";
const poppins = Poppins({ weight: "300", subsets: ["latin"] });
type User = {
  name: string;
  photo: string | null;
  description: string | null;
};

type Props = {
  user: User;
  heatMapData: HeatMapDataForYear;
  heatMapYears: number;
  totalSolvedQuestion: number;
};
export default function MainProfile({
  user,
  heatMapData,
  heatMapYears,
  totalSolvedQuestion,
}: Props) {
  const [year, setYear] = useState(heatMapYears);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const timer = setTimeout(() => {
      const solvedPer = parseInt(
        ((totalSolvedQuestion / 191) * 100).toFixed(2)
      );
      setProgress(solvedPer);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (heatMapYears !== year) {
      startTransition(() => {
        router.push(absoluteUrl(`/${pathname}?year=${year}`));
      });
    }
  }, [year]);
  return (
    <div className="max-w-[800px] mx-auto mt-5 ">
      <ProfileBackground />
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
          <SelectYear year={year} selected={heatMapYears} setYear={setYear} />
        </div>
        <div className=" w-[800px] mx-auto">
          {isPending ? (
            <Skeleton className="h-[150px]" />
          ) : (
            <HeatMap
              value={heatMapData ?? []}
              rectRender={(props, data) => {
                if (!data.count) return <rect {...props} />;
                return (
                  <Tooltip
                    key={props.key}
                    placement="top"
                    content={data.content}
                  >
                    <rect {...props} />
                  </Tooltip>
                );
              }}
              className="w-[700px] mx-auto"
              style={{
                color: "red",
                // @ts-ignore
                "--rhm-rect": "#b9b9b9",
                "--rhm-rect-active": "red",
              }}
              startDate={new Date(`${heatMapYears}/01/01`)}
              /*
            1-> 1st colro
            2,3->2nd color
            4,5->3rd color
            6,192->4th color
            */
              panelColors={{
                2: "#e4b293",
                4: "#d48462",
                6: "#b91c1c",
                193: "#450a0a",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileBackground() {
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
        <User className=" bg-white w-[100px] h-[100px] border-4 border-red-500 rounded-full text-red-500 dark:bg-background" />
      )}
    </div>
  );
}

function SelectYear({
  selected,
  setYear,
  year,
}: {
  selected: number;
  setYear: React.Dispatch<number>;
  year: number;
}) {
  const { year: todayYear } = getIndianTime();
  const SelectedItems: React.ReactNode[] = [];
  for (let year = websiteBirthday; year <= todayYear; year += 1) {
    SelectedItems.push(
      <SelectItem key={year} value={year.toString()}>
        {year.toString()}
      </SelectItem>
    );
  }

  return (
    <Select
      value={selected.toString()}
      onValueChange={(e) => {
        setYear(parseInt(e.valueOf()));
      }}
    >
      <SelectTrigger>
        <SelectValue>{selected}</SelectValue>
      </SelectTrigger>
      <SelectContent>{SelectedItems}</SelectContent>
    </Select>
  );
}
