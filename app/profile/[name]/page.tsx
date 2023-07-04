import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

type Props = {
  params: Record<string, string>;
};
export default async function PageName({ params }: Props) {
  const { name } = params;
  // const data=db.select({}).from(users).where()
  return <div></div>;
}
