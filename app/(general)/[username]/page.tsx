import MainProfile from "@/components/mainProfile";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { websiteBirthday } from "@/static/websiteBirthdayYear";
import { eq, sql } from "drizzle-orm";

type DayType = { solvedQuestions: string; month: number; day: number };
export type HeatMapDataForYear = {
  date: string;
  count: number;
}[];
export type HeatMapData = HeatMapDataForYear[];

type Props = {
  params: Record<string, string>;
};
export default async function ProfilePage({ params }: Props) {
  const { username } = params;
  const user = await db
    .select({
      sheet_id: users.striver_sheet_id_30_days,
      name: users.name,
      description: users.description,
      image: users.image,
    })
    .from(users)
    .where(eq(users.userName, username));

  if (user.length == 0) {
    throw Error("Unable to Find User");
  }

  const currentDate = new Date();
  const options = { timeZone: "Asia/Kolkata" };
  const indianDate = currentDate.toLocaleDateString("en-US", options);
  const todayYear = parseInt(indianDate.replace(/(\d+)\/(\d+)\/(\d+)/, "$3"));

  const heatMapData: HeatMapData = [];
  const heatMapYears: number[] = [];
  let totalSolvedQuestion: number = 0;
  for (let year = websiteBirthday; year <= todayYear; year++) {
    const days = (
      await db.execute(
        sql`select count(${questions.id}) as solvedQuestions
        ,extract(month from ${
          questions.updated_at
        }) as month,extract(day from ${
          questions.updated_at
        }) as day  from ${questions} where ${
          questions.solved
        }=${"SOLVED"} and ${questions.sheet_id}=${
          user[0].sheet_id
        } and extract(year from ${
          questions.updated_at
        })=${year} group by month,day order by month,day`
      )
    ).rows as DayType[];

    const data: HeatMapDataForYear = days.map((day) => {
      totalSolvedQuestion += parseInt(day.solvedQuestions);
      return {
        date: `${year}/${day.month}/${day.day}`,
        count: parseInt(day.solvedQuestions),
      };
    });
    if (data.length > 0) {
      heatMapYears.push(year);
      heatMapData.push(data);
    }
  }

  return (
    <MainProfile
      heatMapData={heatMapData}
      heatMapYears={heatMapYears}
      user={{
        name: user[0]?.name ?? username,
        photo: user[0].image,
        description: user[0].description,
      }}
      totalSolvedQuestion={totalSolvedQuestion}
    />
  );
}