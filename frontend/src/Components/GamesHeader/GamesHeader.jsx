import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const GameHeader = ({ gameName, children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-primary font-semibold tracking-wide  mb-[2px] flex justify-between items-center  mt-2 px-2">
      <h4 className="text-lg tracking-wide">{gameName}</h4>
      <div className="relative flex">
        <button
          onClick={() => setShowModal(!showModal)}
          className="font-bold text-white/75 hover:text-white transition-all"
        >
          <GiHamburgerMenu size={22} />
        </button>
        {showModal && (
          <div className="absolute min-w-36 bg-primary border-2 shadow-sm border-secondary right-0 top-7 z-20 py-2 px-3 rounded-md text-white/70">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
