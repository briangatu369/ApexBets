import React from "react";
import Logo from "../assets/logo.webp";

const LazyLoadingFallback = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col gap-4 items-center -translate-y-12 justify-center">
      <div className="w-20 max-h-10">
        <img src={Logo} alt="logo" className="w-full h-full object-contain" />
      </div>
      <div className="w-36">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default LazyLoadingFallback;
