import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-3  ">
      <div className="flex flex-col items-center gap-2 text-white/70">
        <FaExclamationTriangle size={30} />
        <h4 className="text-sm font-medium ">Page Not Found</h4>
      </div>

      <button
        onClick={handleNavigation}
        className="bg-mint-green py-2 px-12 rounded-md text-black font-medium text-sm"
      >
        Back Home
      </button>
    </div>
  );
};

export default PageNotFound;
