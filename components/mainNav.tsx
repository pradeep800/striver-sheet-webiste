import { getServerSession } from "next-auth";
import NavBar from "./navbar";

export default async function MainNav() {
  const session = await getServerSession();
  const user = session?.user;
  return <NavBar user={user} />;
}
