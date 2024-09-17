import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import PageRequireAuth from "../../Components/PageRequireAuth";

const GameLayout = () => {
  return (
    <PageRequireAuth>
      <NavBar />
      <Outlet />
    </PageRequireAuth>
  );
};

export default GameLayout;
