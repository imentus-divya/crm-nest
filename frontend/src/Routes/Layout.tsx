import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Layout = () => {
  const [isNavClose, setIsNavClose] = useState(false);

  return (
    <>
      <Navbar isNavClose={isNavClose} setIsNavClose={setIsNavClose} />
      <div
        className={
          useLocation().pathname === "/"
            ? ""
            : isNavClose
            ? "common-close-page"
            : "common-page"
        }
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
