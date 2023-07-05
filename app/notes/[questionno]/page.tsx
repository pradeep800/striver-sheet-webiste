import MainNotes from "@/components/mainNotes";
type Props = {
  params: { [key: string]: string };
};
export default async function NotesPage({ params }: Props) {
  const { username } = params;

  return <MainNotes type="real" params={params} />;
}
