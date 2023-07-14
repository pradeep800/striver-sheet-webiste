import MainNotes from "@/components/mainNotes";
type Props = {
  params: { [key: string]: string };
};
export const revalidate = 0;
export default async function Notes({ params }: Props) {
  return <MainNotes params={params} type={"modal"} />;
}
