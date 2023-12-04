import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar/Navbar";
import Footer from "../Component/Shared/Navbar/Footer/Footer";
const bgImg =
  "https://as2.ftcdn.net/v2/jpg/06/61/85/79/1000_F_661857964_cTPW88FBKjiVKzIBMLQPpM761J1IsZtA.webp";
const MainLayout = () => {
  return (
    <div
      className="bg-repeat"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "15px auto" }}
    >
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
