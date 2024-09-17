import React, { useContext } from "react";
import { Button } from "@nextui-org/button";
import { authContext } from "../../Context/AuthProvider";
import { twoDecimals } from "../../utils/twoDecimals";
import { ACCOUNTS } from "../../Data/constants";

const NavBarCenter = () => {
  const { isAuthenticated, userDetails, currentAccount, setCurrentAccount } =
    useContext(authContext);

  const changeAccont = () => {
    if (currentAccount === ACCOUNTS.REAL) {
      setCurrentAccount(ACCOUNTS.DEMO);
    } else {
      setCurrentAccount(ACCOUNTS.REAL);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="bg-primary flex items-center justify-center pl-1 m-w-20 rounded-md gap-[2px]">
          <div className="flex items-center px-2 ">
            <h4 className="text-[13px] font-medium tracking-wide">
              KES{" "}
              {currentAccount === ACCOUNTS.DEMO
                ? twoDecimals(userDetails?.demoBalance)
                : twoDecimals(userDetails?.accountBalance)}
            </h4>
          </div>

          <Button
            disableRipple
            onClick={changeAccont}
            className="bg-light-cream text-[12px] font-medium tracking-wider h-9 gap-0 w-fit px-[10px] hover:opacity-1 "
          >
            <span className="font-semibold">
              {currentAccount === ACCOUNTS.REAL ? "Real acc" : "Demo acc"}
            </span>
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBarCenter;
