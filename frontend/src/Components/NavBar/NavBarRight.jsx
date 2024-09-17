import React, { useContext } from "react";
import NavBarRightAuthenticated from "./NavBarRightAuthenticated";
import NavBarRightNotAuthenticated from "./NavBarRightNotAuthenticated";
import { authContext } from "../../Context/AuthProvider";

const NavBarRight = () => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <>
      {isAuthenticated ? (
        <NavBarRightAuthenticated />
      ) : (
        <NavBarRightNotAuthenticated />
      )}
    </>
  );
};

export default NavBarRight;
