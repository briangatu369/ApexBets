import React from "react";
import PageRequireAuth from "../../Components/PageRequireAuth";
import NavBar from "../../Components/NavBar/NavBar";
import { FaArrowLeftLong } from "react-icons/fa6";

import DepositCards from "./DepositCards";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const navigate = useNavigate();
  return (
    <PageRequireAuth>
      <NavBar />
      <div className="flex items-center py-2 px-4 mt-2 ">
        <button
          onClick={() => navigate(-1)}
          className="text-white/80  transition-all hover:rounded-full hover:bg-white/90 hover:text-black p-1"
        >
          <FaArrowLeftLong size={17} />
        </button>
        <div className="flex-1 flex justify-center ">
          <h4 className="font-medium tracking-wide  ">Deposit Methods</h4>
        </div>
      </div>

      <DepositCards />
    </PageRequireAuth>
  );
};

export default Deposit;
