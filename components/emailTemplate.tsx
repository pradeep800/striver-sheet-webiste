import { Tailwind } from "@react-email/tailwind";

export default function EmailTemplate({ name }: { name: string }) {
  console.log("i am getting excicuted");
  return (
    <Tailwind>
      <div className="max-w-[800px] p-2 mx-auto bg-red-500">
        <h1>hello {name}</h1>
        <div className="grid grid-cols-3 gap-5 ">
          <div className="border-black border-2">hello </div>
          <div className="border-black border-2">hello </div>
          <div className="border-black border-2">hello </div>
        </div>
      </div>
    </Tailwind>
  );
}
