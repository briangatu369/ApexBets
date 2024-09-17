import React, { useState } from "react";
import ProcessingMpesaPayments from "./ProcessingMpesaPayments";
import MpesaPaymentError from "./MpesaPaymentError";
import MpesaTransactionSuccess from "./MpesaTransactionSuccess";
import MpesaPaymentForm from "./MpesaPaymentForm";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useMpesaPayment } from "./useMpesaPayments";

const MpesaPayment = ({ isOpen, onOpenChange }) => {
  const {
    isLoading,
    isTransactionSuccessful,
    mpesaError,
    hasError,
    sendStkPush,
    restState,
  } = useMpesaPayment();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="bg-primary border-2 border-secondary -translate-y-2 "
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={isLoading}
    >
      <ModalContent className="relative min-h-56">
        {(onClose) => (
          <div>
            {isLoading ? (
              <ProcessingMpesaPayments />
            ) : //failed transaction
            hasError ? (
              <MpesaPaymentError
                error={mpesaError}
                close={() => restState(onClose)}
              />
            ) : //successful transaction
            isTransactionSuccessful ? (
              <MpesaTransactionSuccess close={() => restState(onClose)} />
            ) : (
              //mpesa form
              <div>
                <ModalHeader className="flex flex-col gap-1 pb-2 text-[16px] tracking-wider">
                  Mpesa-Deposit
                </ModalHeader>
                <ModalBody>
                  <div>
                    <p className="text-sm text-white/60  pb-2 tracking-wide">
                      Enter the phone number to deposit from. This is where the
                      STK push will be sent to.
                    </p>
                  </div>
                  <MpesaPaymentForm
                    sendStkPush={sendStkPush}
                    isLoading={isLoading}
                  />
                </ModalBody>
              </div>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MpesaPayment;
