import { Button } from "@nextui-org/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBarRightNotAuthenticated = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 items-center">
      <Button
        onClick={() => navigate("/login")}
        size="sm"
        variant="bordered"
        className="bg-transparent text-mint-green font-medium tracking-wide border-mint-green"
      >
        Login
      </Button>
      <Button
        onClick={() => navigate("/register")}
        size="sm"
        radius="md"
        className="bg-mint-green font-medium tracking-wide "
      >
        Register
      </Button>
    </div>
  );
};

export default NavBarRightNotAuthenticated;
