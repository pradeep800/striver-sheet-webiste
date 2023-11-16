"use client";
import { useRouter } from "next/navigation";
import Modal from "../modal";
import AiComponent from "./aiComponent";

export function AiModal() {
  const router = useRouter();
  return (
    <Modal>
      <div className="max-w-[820px] bg-background rounded-lg mx-auto  h-[80vh]">
        <div className="h-[100%] overflow-scroll">
          <AiComponent
            modal={true}
            back={() => {
              router.back();
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
