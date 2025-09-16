import React from "react";
import Navbar from "../Navbar/Navbar";

import { Outlet } from "react-router-dom";
import FooterComponent from "../FooterComponent/FooterComponent";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="mt-[100px]">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}
