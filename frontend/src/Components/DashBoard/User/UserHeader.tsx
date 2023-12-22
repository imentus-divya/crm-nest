import React from "react";
import { Dropdown } from "primereact/dropdown";
import "../styledashb.css";
import { Badge } from "primereact/badge";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";

export default function Header(props: any) {
  const { navcloseFunc, items, setItems } = props;

  const Navigation = useNavigate();

  const Logoclick = () => {
    Navigation("/");
  };
  const user = localStorage.getItem("display_name");

  const optionList = [
    { value: "Dashboard", label: "Dashboard" },
    { value: "FCdata", label: "Foreclosure" },
    { value: "Activities", label: "Activities" },
    { value: "Mytask", label: "My Task" },
  ];

  return (
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
          <h6 style={{ color: "black", fontWeight: "100", fontSize: "15px" }}>
            {user}
          </h6>
        </div>
      </header>
    </>
  );
}
