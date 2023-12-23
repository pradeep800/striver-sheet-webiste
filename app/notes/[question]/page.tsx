import MainNotes from "@/components/mainNotes";
type Props = {
  params: { [key: string]: string };
};
export default async function NotesPage({ params }: Props) {
  return <MainNotes type="real" params={params} />;
}
