import React from "react";

const InputError = ({ condition, errorMessage }) => {
  return (
    <>
      {condition && (
        <p className="text-red-600 text-[12px] font-medium mt-[1px] tracking-wider ">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default InputError;
