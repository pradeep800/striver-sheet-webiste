import MainNotes from "@/components/mainNotes";
type Props = {
  params: { [key: string]: string };
};

export default async function Notes({ params }: Props) {
  //this area is same for model and notes so i abstracted it
  return <MainNotes params={params} type={"modal"} />;
}
