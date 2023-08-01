import MainProfile from "@/components/mainProfile";
import { getIndianTime } from "@/lib/dateTimeFun";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { absoluteUrl } from "@/lib/utils";
import { websiteBirthday } from "@/static/websiteBirthdayYear";
import { and, eq, sql } from "drizzle-orm";
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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { username } = params;
  try {
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
        description: userInfo?.description ?? "",
        keywords: [
          `stirversheet ${username}`,
          `${username} striversheet`,
          "dsa",
          `${userInfo.name} striversheet`,
        ],
        openGraph: {
          title: "Striver Sheet",
          type: "website",
          locale: "en_US",
          siteName: "Striver Sheet",
          description: userInfo?.description ?? "",
          images: [{ url: urlInString, width: 1200 }],
          url: "https://striversheet.pradeepbisht.com",
        },
        twitter: {
          card: "summary_large_image",
          title: "Striver Sheet",
          description: userInfo?.description ?? "",
          images: [urlInString],

          creator: "@pradeep8b0",
        },
        alternates: { canonical: `/${username}` },
      };
    }
  } catch (err) {
    return {
      title: "Not found",
      description: "The page you are looking for does not exists",
      alternates: { canonical: `/${username}` },
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

  const { year: todayYear } = getIndianTime();

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
  if (user.length == 0) {
    throw new Error("Unable to find user");
  }
  const userInfo = user[0];
  // prettier-ignore
  const daysPromise = db.execute(
      sql`SELECT COUNT(id) AS solvedQuestions, month, day
          FROM (SELECT id,DAY(CONVERT_TZ(${questions.updated_at}, 'UTC', 'Asia/Kolkata')) AS day,
                      MONTH(CONVERT_TZ(${questions.updated_at}, 'UTC', 'Asia/Kolkata')) AS month
                FROM ${questions}
                WHERE ${questions.solved} = ${"SOLVED"} AND 
                      ${questions.sheet_id} = ${userInfo.sheet_id} AND 
                       year(CONVERT_TZ(${questions.updated_at}, 'UTC', 'Asia/Kolkata')) = ${yearInNumber}
                ) as sq 
         GROUP BY month, day
         ORDER BY month, day`
    )

  const totalSolvedQuestionPromise = db
    .select({ count: sql`count(${questions.id})` })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, userInfo.sheet_id),
        eq(questions.solved, "SOLVED")
      )
    );
  const [daysQueryResult, totalSolvedQuestionQueryResult] = await Promise.all([
    daysPromise,
    totalSolvedQuestionPromise,
  ]);
  const days = daysQueryResult.rows as DayType[];
  const [totalSolvedQuestionObject] = totalSolvedQuestionQueryResult;

  const HeatmapData = days.map<HeatMapDataForYear[number]>((day) => {
    return {
      date: `${yearInNumber}/${day.month}/${day.day}`,
      content: `${day.solvedQuestions} question solved`,
      count: parseInt(day.solvedQuestions),
    };
  });

  let totalSolveQuestion = 0;
  if (totalSolvedQuestionObject.count) {
    totalSolveQuestion = parseInt(totalSolvedQuestionObject.count as string);
  }
  if (isNaN(totalSolveQuestion)) {
    totalSolveQuestion = 0;
  }

  return (
    <MainProfile
      heatMapData={HeatmapData}
      heatMapYears={yearInNumber}
      user={{
        name: userInfo?.name ?? username,
        photo: userInfo.image,
        description: userInfo.description,
      }}
      totalSolvedQuestion={totalSolveQuestion}
    />
  );
}
