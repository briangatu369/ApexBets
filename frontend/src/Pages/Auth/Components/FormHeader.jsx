import React from "react";
import LogoIcon from "../../../assets/logoIcon.webp";

const FormHeader = ({ title, info }) => {
  return (
    <div className="flex flex-col gap-4 items-center ">
      <div className="w-[60px]">
        <img src={LogoIcon} alt="icon" />
      </div>

      <div className="flex flex-col items-center">
        <h4 className=" text-3xl tracking-wide font-medium ">{title}</h4>
        <p className="text-sm leading-9 text-white/80 tracking-wide">{info}</p>
      </div>
    </div>
  );
};

export default FormHeader;
