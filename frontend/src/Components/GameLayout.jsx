import React from "react";

const GameLayout = ({ LeftComponent, RightComponent }) => {
  return (
    <div className=" flex flex-col-reverse items-center bg-secondary  lg:flex-row lg:items-stretch lg:w-full py-1 px-2  mb-2 rounded-lg gap-2 ">
      <div className="bg-primary min-w-[365px]  lg:min-w-80 rounded-md pb-1 px-3 py-2">
        {LeftComponent}
      </div>
      <div className="flex-1 flex justify-center w-full">{RightComponent}</div>
    </div>
  );
};

export default GameLayout;
