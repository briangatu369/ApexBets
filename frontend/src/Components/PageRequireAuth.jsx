import React, { useContext, useEffect } from "react";
import { authContext } from "../Context/AuthProvider";
import { FaExclamationTriangle } from "react-icons/fa";
import { useHandleNavigate } from "../Hooks/useHandleNavigate";

const PageRequireAuth = ({ children }) => {
  const { setUserDetails, setIsAuthenticated, isAuthenticated } =
    useContext(authContext);
  const { handleNavigate } = useHandleNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthenticated(false);
      setUserDetails({});
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-3  ">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <FaExclamationTriangle size={30} />
          <h4 className="text-sm font-medium ">
            You need to be logged in to view this page
          </h4>
        </div>

        <button
          onClick={() => handleNavigate("/login")}
          className="bg-mint-green py-2 px-12 rounded-md text-black font-medium text-sm"
        >
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageRequireAuth;
