import React from "react";

const GamesHeaderElement = ({ Icon, action, label, info, children }) => {
  return (
    <div className="flex item-center gap-2  w-fit   hover:text-white/90 hover:bg-white/5 px-2 -mx-2 cursor-pointer duration-200 py-1">
      <div className="flex items-center ">{Icon}</div>
      <div
        typeof="button"
        onClick={action}
        className="flex flex-col  text-[13px] font-medium"
      >
        <span className="">{label}</span>
        <p className="font-light text-nowrap text-[12px] -mt-[2px]">{info}</p>
      </div>
      {children}
    </div>
  );
};

export default GamesHeaderElement;
