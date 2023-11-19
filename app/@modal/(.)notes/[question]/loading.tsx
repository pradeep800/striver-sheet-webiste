import Modal from "@/components/modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout() {
  return (
    <Modal alert={true}>
      <Skeleton className="max-w-[800px] mx-auto h-[100vh]" />
    </Modal>
  );
}
