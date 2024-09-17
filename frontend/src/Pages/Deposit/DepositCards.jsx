import React from "react";
import DepositCard from "./DepositCard";
import MpesaLogo from "../../assets/mpesaLogo.png";
import StripeLogo from "../../assets/stripeLogo.svg";
import PaypalLogo from "../../assets/paypalLogo.svg";
import { useDisclosure } from "@nextui-org/react";
import MpesaPayment from "./MpesaPayment/MpesaPayment";
import { toast } from "sonner";

const DepositCards = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const depositMethods = [
    {
      id: "0",
      name: "M-Pesa",
      image: MpesaLogo,
      handleCardEvent: () => {
        onOpen();
      },
    },
    {
      id: "1",
      name: "Stripe",
      image: StripeLogo,
      handleCardEvent: () => {
        toast.message("Stripe is Coming soon.", {
          position: "top-right",
          style: { padding: "20px", fontSize: "14px", color: "black" },
        });
      },
    },
    {
      id: "2",
      name: "Paypal",
      image: PaypalLogo,
      handleCardEvent: () => {
        toast.message("Paypal is Coming soon.", {
          position: "top-right",
          style: { padding: "20px", fontSize: "14px", color: "blue" },
        });
      },
    },
  ];

  return (
    <div className="py-5 px-5 lg:px-9 flex flex-wrap gap-4 justify-center">
      <MpesaPayment isOpen={isOpen} onOpenChange={onOpenChange} />
      {depositMethods.map((method) => {
        const { id, name, image, handleCardEvent } = method;
        return (
          <DepositCard
            key={id}
            name={name}
            image={image}
            handleCardEvent={handleCardEvent}
          />
        );
      })}
    </div>
  );
};

export default DepositCards;
