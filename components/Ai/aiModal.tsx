import Modal from "../modal";
import AiComponent from "./aiComponent";

export function AiModal() {
  return (
    <Modal>
      <div className="max-w-[820px] bg-background rounded-lg mx-auto  h-[100vh]">
        <div className="h-[100%] overflow-scroll">
          <AiComponent modal={true} />
        </div>
      </div>
    </Modal>
  );
}
