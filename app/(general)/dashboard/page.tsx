import Image from "next/image";
import striverSheetData from "@/static/striverSheet.json";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
export default async function Home() {
  const data = await getServerSession(authOption);
  return <div>dashboard</div>;
}
