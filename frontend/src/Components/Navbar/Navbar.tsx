import axios, { AxiosResponse } from "axios";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import { FaRectangleList } from "react-icons/fa6";
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineFund,
  AiOutlineContainer,
  AiOutlineFileProtect,
} from "react-icons/ai";
import {
  FaChartColumn,
  FaUpload,
  FaUserPlus,
  FaUsersGear,
  FaUsersViewfinder,
} from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar(props: any) {
  const { isNavClose, setIsNavClose } = props;
  const urll = process.env.REACT_APP_BACKEND_API_URL;
  // const navRef = useRef(null);
  const [NavBoxClose, setNavBoxClose] = useState(false);
  const [items, setItems] = useState([]);

  const user = localStorage.getItem("display_name");

  const location = useLocation().pathname;
  // storing county&fileType for dropdown
  // let countyFileType;

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
    // const role = localStorage.getItem("role_id");

    await axios
      .get(`${urll}/admin-dashboard`, { headers: { Authorization: token } })
      .then((response: AxiosResponse) => {
        // Handle successful response and update the dashboard UI
        // countyFileType = response.data.county_FileType;

        if (response.status === 200) {
          Navigation("/Admin/admin-dashboard");
        }
      })
      .catch((error: Error) => {
        console.error("Error fetching dashboard data:", error);
      });
  };
  const foreclosure_btn = async () => {
    Navigation("/foreclosure");
  };
  const courtCaseBtn = async () => {
    Navigation("/LPcases");
  };
  const upload_btn = async () => {
    const token = localStorage.getItem("jwtToken");

    await axios
      .get(`${urll}/upload-data`, {
        headers: { Authorization: token },
      })
      .then((response: AxiosResponse) => {
        // Handle successful response and update the dashboard UI

        if (response.status === 200) {
          const metaData = response.data;
          Navigation("/Admin/upload-data", { state: metaData });
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  };
  const manageUser_btn = async () => {
    const token = localStorage.getItem("jwtToken");
    await axios
      .get(`${urll}/admin-manage-user`, { headers: { Authorization: token } })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          const userDetails = response.data;
          Navigation("/Admin/manage-user", { state: userDetails });
          // Navigation("/Admin/upload-data", { state: metaData });
        }
      })
      .catch((error) => {
        console.log("error ise: ", error);
      });
  };
  const manageRoles_btn = async () => {
    const token = localStorage.getItem("jwtToken");
    await axios
      .get(`${urll}/admin-manage-roles`, { headers: { Authorization: token } })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          const roleDetails = response.data;
          Navigation("/Admin/manage-roles", { state: roleDetails });
          // Navigation("/Admin/upload-data", { state: metaData });
        }
      })
      .catch((error) => {
        console.log("error ise: ", error);
      });
  };

  const logout_btn = async () => {
    Navigation("/");
    // const token = localStorage.getItem("jwtToken");
    // const userid = localStorage.getItem("userid");

    // await axios.get(`${urll}/logout`, { headers: { Authorization: token } });
    // console.log("response recieved from logout ");
  };

  const optionList = [
    { value: "Dashboard", label: "Dashboard" },
    { value: "UploadData", label: "Upload Data" },
    { value: "Activities", label: "Activities" },
    { value: "Mytask", label: "My Task" },
  ];

  return (
    <div className={`${styles.NavWrap}`}>
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

            <div className={`${styles.searchBox}`}>
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
              <p
                style={{ color: "black", fontWeight: "100", fontSize: "15px" }}
              >
                {user}
              </p>
            </div>
          </header>

          <div
            className={`main-container-admin ${
              NavBoxClose ? "navboxclose" : ""
            }`}
          >
            <div className={`navcontainer  ${isNavClose ? "navclose" : ""}`}>
              <nav className="nav">
                {user === "admin" ? (
                  <div className="nav-upper-options">
                    <div
                      className="nav-option option1 "
                      onClick={dashboard_btn}
                    >
                      <FaChartColumn className="nav-img" />
                      <h3> Dashboard</h3>
                    </div>

                    <div className="option2 nav-option">
                      <FaRectangleList className="nav-img" />
                      <h3>Foreclosure</h3>
                    </div>

                    <div className="option2 nav-option">
                      <FaRectangleList className="nav-img" />
                      <h3>LpCourt Cases</h3>
                    </div>

                    <div className="option2 nav-option" onClick={upload_btn}>
                      <FaUpload className="nav-img" />
                      <h3>Upload Data</h3>
                    </div>

                    <div
                      className="option2 nav-option"
                      onClick={manageUser_btn}
                    >
                      <FaUserPlus className="nav-img" />
                      <h3> Manage User</h3>
                    </div>

                    <div
                      className="nav-option option4"
                      onClick={manageRoles_btn}
                    >
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
                ) : (
                  <div className="nav-upper-options">
                    <div
                      className="nav-option option1 "
                      onClick={dashboard_btn}
                    >
                      <AiOutlineFund className="nav-img" />
                      <h3>Dashboard</h3>
                    </div>
                    <div
                      className="nav-option option1 "
                      onClick={foreclosure_btn}
                    >
                      <AiOutlineContainer className="nav-img" />
                      <h3>Foreclosure</h3>
                    </div>
                    <div className="nav-option option1 " onClick={courtCaseBtn}>
                      <AiOutlineFileProtect className="nav-img" />
                      <h3>LP Court Cases</h3>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
