import React from "react";
import { Link } from "react-router-dom";

const UnderDevelopment = ({ title }) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 mt-10">
      <h3 className="font-semibold text-mint-green tracking-wider text-lg">
        {title}
      </h3>
      <h4>This page is under development</h4>
      <Link
        to="/"
        className="bg-purple-1 p-2 rounded-md mt-2 font-semibold text-sm hover:opacity-85 transition-all"
      >
        Back Home
      </Link>
    </div>
  );
};

export default UnderDevelopment;
