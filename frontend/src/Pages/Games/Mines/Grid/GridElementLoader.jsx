import React from "react";
import { twMerge } from "tailwind-merge";

const GridElementLoader = () => {
  return (
    <div
      className={twMerge(
        `flex justify-center items-center w-full
         h-full font-medium text-sm bg-gray-700
       text-white/50 rounded-md cursor-pointer 
         hover: duration-100`
      )}
    ></div>
  );
};

export default GridElementLoader;
