import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { mpesaDepositSchema } from "./MpesaFormValidation";
import InputError from "../../../Components/InputError";
import SubmitButton from "../../../Components/SubmitButton";
import { twMerge } from "tailwind-merge";

const MpesaPaymentForm = ({ sendStkPush, isLoading }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      phoneNumber: "",
      amount: "",
    },
    resolver: yupResolver(mpesaDepositSchema),
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(sendStkPush)} className="flex flex-col gap-4">
      <div>
        <h4 className="mb-[3px] text-white/90 text-sm">Phone Number</h4>
        <input
          {...register("phoneNumber")}
          type="text"
          placeholder="e.g. 254740774613"
          className={twMerge(
            errors.phoneNumber && "border-red-600 focus:outline-none"
          )}
        />
        <InputError
          condition={errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
        />
      </div>
      <div>
        <h4 className="mb-[3px] text-white/90 text-sm">Amount</h4>
        <div className="relative ">
          <input
            {...register("amount")}
            type="text"
            placeholder="e.g. 100"
            className={twMerge(
              errors.amount && "border-red-600 focus:outline-none"
            )}
          />
          <InputError
            condition={errors.amount}
            errorMessage={errors.amount?.message}
          />
        </div>
      </div>
      <SubmitButton styles={"my-3 "} isLoading={isLoading}>
        Deposit
      </SubmitButton>
    </form>
  );
};

export default MpesaPaymentForm;
