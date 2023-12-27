import axios, { AxiosResponse } from "axios";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import React, { useRef, useState } from "react";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import {
  FaChartColumn,
  FaUpload,
  FaUserPlus,
  FaUsersGear,
  FaUsersViewfinder,
} from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import navStyles from "./Navbar.module.css";

export default function Navbar(props: any) {
  const { isNavClose, setIsNavClose } = props;
  const urll = process.env.REACT_APP_BACKEND_API_URL;
  const navRef = useRef(null);
  const [NavBoxClose, setNavBoxClose] = useState(false);
  const [items, setItems] = useState([]);
  const user = localStorage.getItem("display_name");

  const location = useLocation().pathname;

  const navcloseFunc = (props: any) => {
    // Toggle the state to control the className
    setIsNavClose(!isNavClose);

    // Toggle the state to control the className
    setNavBoxClose(!isNavClose);
  };

  const Navigation = useNavigate();
  const Logoclick = () => {
    Navigation("/");
  };

  const dashboard_btn = async () => {
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("role_id");

    await axios
      .get(`${urll}/admin-dashboard`, {
        headers: { Authorization: token },
      })
      .then((response: AxiosResponse) => {
        // Handle successful response and update the dashboard UI
        console.log(
          "response recieved from token AdminDashboard verification",
          response
        );
        if (response.status == 200) {
          Navigation("/Admin/admin-dashboard");
        }
      })
      .catch((error: Error) => {
        console.error("Error fetching dashboard data:", error);
      });
  };
  const upload_btn = async () => {
    const token = localStorage.getItem("jwtToken");

    await axios
      .get(`${urll}/upload-data`, {
        headers: { Authorization: token },
      })
      .then((response: AxiosResponse) => {
        // Handle successful response and update the dashboard UI
        console.log(
          "response recieved from upload data verification",
          response
        );

        if (response.status == 200) {
          const metaData = response.data;
          console.log(
            "🚀 ~ file: AdminNavbar.tsx:59 ~ awaitaxios.get ~ metaData:",
            metaData
          );
          Navigation("/Admin/upload-data", { state: metaData });
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  };
  const logout_btn = async () => {
    const token = localStorage.getItem("jwtToken");
    const userid = localStorage.getItem("userid");

    await axios.get(`${urll}/logout`, { headers: { Authorization: token } });
    console.log("response recieved from logout ");
  };

  const optionList = [
    { value: "Dashboard", label: "Dashboard" },
    { value: "UploadData", label: "Upload Data" },
    { value: "Activities", label: "Activities" },
    { value: "Mytask", label: "My Task" },
  ];
  const styles = {
    mainContainer: {
      width: NavBoxClose ? "70px" : "250px",
      height: `calc(100vh - 70px)`,
      position: "relative",
      overflowX: "hidden",
      transition: "all 0.5s ease-in-out",
    },
  };

  return (
    <div className={`${navStyles.NavWrap}`}>
      {location === "/" ? (
        ""
      ) : (
        <>
          <header>
            <div className="logosec">
              <div className="logo" onClick={Logoclick}>
                CRM App
              </div>

              <span
                className="pi pi-bars icn menuicn"
                onClick={navcloseFunc}
              ></span>
            </div>

            <div className="searchbar">
              <div className="card flex justify-content-center">
                <Dropdown
                  value={items}
                  onChange={(e) => setItems(e.value)}
                  options={optionList}
                  optionLabel="label"
                  editable
                  placeholder="Search"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>

            <div className="message">
              <Tooltip target=".custom-target-icon" />
              <i
                className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
                data-pr-tooltip="No notifications"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                style={{ fontSize: "2rem", cursor: "pointer" }}
              >
                <Badge severity="danger"></Badge>
              </i>

              <div className="dp">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                  className="dpicn"
                  alt="dp"
                />
              </div>
              <h6
                style={{ color: "black", fontWeight: "100", fontSize: "15px" }}
              >
                {user}
              </h6>
            </div>
          </header>

          <div
            className={`main-container-admin ${
              NavBoxClose ? "navboxclose" : ""
            }`}
          >
            <div className={`navcontainer  ${isNavClose ? "navclose" : ""}`}>
              <nav className="nav">
                <div className="nav-upper-options">
                  <div className="nav-option option1 " onClick={dashboard_btn}>
                    <FaChartColumn className="nav-img" />
                    <h3> Dashboard</h3>
                  </div>

                  <div className="option2 nav-option" onClick={upload_btn}>
                    <FaUpload className="nav-img" />
                    <h3>Upload Data</h3>
                  </div>

                  <div className="nav-option ">
                    <FaUserPlus className="nav-img" />
                    <h3> Manage User</h3>
                  </div>

                  <div className="nav-option option4">
                    <FaUsersGear className="nav-img" />
                    <h3>Manage Roles</h3>
                  </div>
                  <div className="nav-option option4">
                    <FaUsersViewfinder className="nav-img" />
                    <h3>Manage Screen</h3>
                  </div>

                  <div className="nav-option option6">
                    <AiOutlineSetting className="nav-img" />
                    <h3> Settings</h3>
                  </div>

                  <div className="nav-option logout " onClick={logout_btn}>
                    <AiOutlineLogout className="nav-img" />
                    <h3>Logout</h3>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
