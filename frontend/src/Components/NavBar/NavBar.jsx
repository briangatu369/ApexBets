import React from "react";
import NavBarLeft from "./NavBarLeft";
import NavBarCenter from "./NavBarCenter";
import NavBarRight from "./NavBarRight";

const NavBar = () => {
  return (
    <div className="sticky h-[72px] -top-[0.4px] z-50 bg-gradient-to-b rounded-b-md from-secondary via-primary to-secondary flex justify-between items-center py-4 px-3">
      <NavBarLeft />
      <NavBarCenter />
      <NavBarRight />
    </div>
  );
};

export default NavBar;
