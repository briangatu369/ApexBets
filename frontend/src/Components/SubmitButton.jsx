import { Button } from "@nextui-org/button";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SubmitButton = forwardRef((props, ref) => {
  const { isLoading, showLoader, handleSubmit, styles, children, ...others } =
    props;

  return (
    <Button
      {...others}
      isLoading={isLoading}
      disabled={isLoading}
      onClick={handleSubmit}
      ref={ref}
      type="submit"
      className={twMerge(
        "w-full bg-mint-green rounded-md font-medium tracking-wide capitalize",
        isLoading && "text-white/80",
        isLoading && "bg-gray-700",
        isLoading && "cursor-not-allowed",
        styles
      )}
    >
      {children}
    </Button>
  );
});

export default SubmitButton;
