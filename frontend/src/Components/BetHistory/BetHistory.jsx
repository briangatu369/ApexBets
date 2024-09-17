import React from "react";
import BetHistoryHeader from "./BetHistoryHeader";
import { Modal, ModalContent } from "@nextui-org/modal";

const BetHistory = ({
  isOpen,
  onOpenChange,
  children,
  fetchMore,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="bg-secondary border-2 border-primary   text-white/80 "
      hideCloseButton
      radius="md"
      size="lg"
      scrollBehavior="outside"
    >
      <ModalContent className="h-fit  ">
        {(onClose) => (
          <div className=" mx-1 ">
            <BetHistoryHeader closeModal={onClose} />

            <div className="flex flex-col gap-[3px] ">{children}</div>

            <div className=" w-full flex justify-center   gap-4  px-2 py-[6px] my-1">
              <button
                disabled={isLoading}
                onClick={fetchMore ? fetchMore : () => {}}
                type="button"
                className="bg-secondary px-5 text-sm py-2 border-1 transition-all border-white/50 hover:opacity-85  rounded-full text-white/80 disabled:cursor-not-allowed"
              >
                {isLoading ? "loading..." : "Load more"}
              </button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BetHistory;
