import Back from "@/components/svg/back";

export default function AiPage() {
  return (
    <div className="max-w-[800px] mx-auto min-h-[80vh]">
      <div className="flex  justify-between items-center">
        <div className="cursor-pointer ml-2">
          <Back />
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-3 mb-2 flex-col items-center  ">
        <h1 className="text-2xl font-bold tracking-wide text-red-500 mr-5 text-center">
          Questions
        </h1>
      </div>
    </div>
  );
}
