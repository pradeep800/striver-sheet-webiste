import SRProgress from "@/components/SRprogress";

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto">
      <SRProgress reminderValue={3} solvedValue={5} total={8} />
    </div>
  );
}
