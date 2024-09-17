import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer";
import AllGameCards from "./AllGameCards";

const Home = () => {
  return (
    <div className="relative min-h-[100vh]">
      <NavBar />
      <div className=" pb-20 mt-6 lg:mt-8 px-2">
        <AllGameCards />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
