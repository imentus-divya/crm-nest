import axios from "axios";
import React, { useState } from "react";
import {
  AiOutlineContainer,
  AiOutlineFileProtect,
  AiOutlineFund,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineSnippets,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function SideNav(props: any) {
  const { navRef } = props;
  const [isNavClose, setIsNavClose] = useState(false);

  const Navigation = useNavigate();

  const urll = process.env.REACT_APP_BACKEND_API_URL;

  const dashboard_btn = async () => {
    const token = localStorage.getItem("jwtToken");
    await axios
      .get(`${urll}/dashboard`, { headers: { Authorization: token } })
      .then((response) => {
        // Handle successful response and update the dashboard UI
        console.log("response recieved from Dashboard verification", response);
        if (response.status == 200) {
          Navigation("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  };

  const foreclosure_btn = async () => {
    let role = 1;
    const token = localStorage.getItem("jwtToken");
    console.log(
      "🚀 ~ file: Dashboard.tsx:55 ~ constforeclosure_btn= ~ token:",
      token
    );
    await axios
      .get(`${urll}/foreclosure`, {
        headers: { Authorization: token },
        params: { role },
      })
      .then((response) => {
        // Handle successful response and update the dashboard UI
        console.log(
          "response recieved from Foreclosure verification",
          response
        );
        if (response.status == 200) {
          Navigation("/foreclosure");
        }
      })
      .catch((error) => {
        console.error("Error fetching foreclosure data:", error);
      });
  };

  return (
    <>
      <div
        className={`navcontainer ${isNavClose ? "navclose" : ""}`}
        ref={navRef}
      >
        <nav className="nav" ref={navRef}>
          <div className="nav-upper-options">
            <div className="nav-option option1 " onClick={dashboard_btn}>
              <AiOutlineFund className="nav-img" />
              <h3> Dashboard</h3>
            </div>

            <div className="option2 nav-option" onClick={foreclosure_btn}>
              <AiOutlineContainer className="nav-img" />
              <h3> Foreclosure</h3>
            </div>

            <div className="nav-option ">
              <AiOutlineFileProtect className="nav-img" />
              <h3> Activities</h3>
            </div>

            <div className="nav-option option4">
              <AiOutlineSnippets className="nav-img" />
              <h3>My Task</h3>
            </div>

            <div className="nav-option option6">
              <AiOutlineSetting className="nav-img" />
              <h3> Settings</h3>
            </div>

            <div className="nav-option logout">
              <AiOutlineLogout className="nav-img" />
              <h3>Logout</h3>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
