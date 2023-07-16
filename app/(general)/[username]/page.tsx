import MainProfile from "@/components/mainProfile";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { absoluteUrl } from "@/lib/utils";
import { websiteBirthday } from "@/static/websiteBirthdayYear";
import { eq, sql } from "drizzle-orm";
import { Metadata } from "next";
export const revalidate = 0;
type DayType = {
  solvedQuestions: string;
  month: number;
  day: number;
  year: number;
};
export type HeatMapDataForYear = {
  date: string;
  count: number;
  content: string;
}[];
export type HeatMapData = HeatMapDataForYear[];

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { username } = params;
  const [userInfo] = await db
    .select({
      description: users.description,
      name: users.name,
      image: users.image,
    })
    .from(users)
    .where(eq(users.userName, username))
    .limit(1);
  if (userInfo) {
    const url = new URL("api/og", absoluteUrl("/"));
    url.searchParams.set("name", userInfo?.name ?? "");
    url.searchParams.set("username", username ?? "");

    url.searchParams.set("description", userInfo?.description ?? "");
    url.searchParams.set("image", userInfo?.image ?? "");
    const urlInString = url.toString();

    return {
      title: username,
      openGraph: {
        title: "Striver Sheet",
        type: "website",
        locale: "en_US",
        siteName: "Striver Sheet",
        description: userInfo?.description ?? "",
        images: [urlInString],
        url: "https://striversheet.pradeepbisht.com",
      },
      twitter: {
        card: "summary_large_image",
        title: "Striver Sheet",
        description: userInfo?.description ?? "",
        images: [urlInString],

        creator: "@pradeep8b0",
      },
    };
  }
}
type Props = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};
export default async function ProfilePage({ params, searchParams }: Props) {
  const { username } = params;
  const { year } = searchParams;

  let yearInNumber = parseInt(year);
  const options = { timeZone: "Asia/Kolkata" };
  const currentDate = new Date();
  const indianDate = currentDate.toLocaleDateString("en-US", options);
  const todayYear = parseInt(indianDate.replace(/(\d+)\/(\d+)\/(\d+)/, "$3"));

  if (
    isNaN(yearInNumber) ||
    todayYear < yearInNumber ||
    websiteBirthday > yearInNumber
  ) {
    yearInNumber = todayYear;
  }

  const user = await db
    .select({
      sheet_id: users.striver_sheet_id_30_days,
      name: users.name,
      description: users.description,
      image: users.image,
    })
    .from(users)
    .where(eq(users.userName, username))
    .limit(1);

  if (user.length === 0) {
    throw new Error("Unable to find user");
  }

  // const currentDate = new Date();
  // currentDate.setHours(0, 0, 0, 0);

  const heatMapData: HeatMapData = [];
  const heatMapYears: number[] = [];
  let totalSolvedQuestion: number = 0;

  const a = await db.execute(
    sql`
    SELECT count(id) AS solvedQuestions, day, month
    FROM (
        SELECT DAY(CONVERT_TZ(questions.updated_at, 'UTC', 'Asia/Kolkata')) AS day,
               MONTH(CONVERT_TZ(questions.updated_at, 'UTC', 'Asia/Kolkata')) AS month,
               questions.updated_at AS id
        FROM questions        
        WHERE questions.sheet_id = ? AND 
              questions.solved = 'SOLVED'
        GROUP BY id
    ) AS subquery
    WHERE subquery.sheet_id = ? AND 
          subquery.solved = 'SOLVED'
    GROUP BY solvedQuestions
    ORDER BY month, day
`
  );

  console.log("timezone");
  console.log(a);
  // const days = (
  //   await db.execute(
  //     sql`SELECT COUNT(id) AS solvedQuestions, month, day
  // FROM (
  //   SELECT id,EXTRACT(MONTH FROM ${questions.updated_at}) AS month,
  //             EXTRACT(DAY FROM ${questions.updated_at}) AS day
  //   FROM ${questions}
  //   WHERE ${questions.solved} = ${"SOLVED"}
  //     AND ${questions.sheet_id} = ${user[0].sheet_id}
  //     AND extract(year from ${questions.updated_at})=${year}
  // ) AS subquery
  // GROUP BY month, day
  // ORDER BY month, day`
  //   )
  // ).rows as DayType[];
  // console.log(days);
  // const lastYear=days.length===0?
  // const data: HeatMapDataForYear = days.map((day) => {
  //   totalSolvedQuestion += parseInt(day.solvedQuestions);
  //   return {
  //     date: `${year}/${day.month}/${day.day}`,
  //     count: parseInt(day.solvedQuestions),
  //     content: `${day.solvedQuestions} questions solved`,
  //   };
  // });
  // if (data.length > 0) {
  //   heatMapYears.push(year);
  //   heatMapData.push(data);
  // }
  return <div>hello world</div>;
  // return (
  //   <MainProfile
  //     heatMapData={heatMapData}
  //     heatMapYears={heatMapYears}
  //     user={{
  //       name: user[0]?.name ?? username,
  //       photo: user[0].image,
  //       description: user[0].description,
  //     }}
  //     totalSolvedQuestion={totalSolvedQuestion}
  //   />
  // );
}
