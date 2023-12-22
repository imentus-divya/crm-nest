import React, { useRef } from "react";
import axios from "axios";
import "../styledashb.css";
import { useNavigate } from "react-router-dom";
import DashFC from "./DashFC";
import { Tooltip } from "primereact/tooltip";
import Duration from "../../Calender/Duration";
import { Badge } from "primereact/badge";
import {
  AiOutlineFilter,
  AiOutlineContainer,
  AiOutlineFileProtect,
  AiOutlineSnippets,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineFund,
} from "react-icons/ai";
import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import styles from "./user.module.css";
import { Button } from "primereact/button";
import Header from "./UserHeader";
import SideNav from "./UserSideNav";

const Foreclosure = () => {
  const urll = process.env.REACT_APP_BACKEND_API_URL;
  const [showForm, setShowForm] = useState(true);
  const [isNavClose, setIsNavClose] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");

  //County list
  const counties = ["HillsBorough", "Orange", "Fulton", "Madison"];



  const Navigation = useNavigate();

  return (
    <>
      <div className="main-container">
        <div className="main">
          <div className="fc-container">
            <div className="fc-header-box">
              <div className="header-box-text">
                <h2>Foreclosure</h2>
                <p>Here's what happening with your track today</p>
              </div>

              <div className="header-box-filter">
                <Duration />
                {/* <input
                  className="calend"
                  type="date"
                  name="start"
                  value="2001-01-01"
                  min="2001-01-01"
                  max="2023-12-31"
                />
                <input
                  className="calend"
                  type="date"
                  name="end"
                  value="2002-05-05"
                  min="201-01-01"
                  max="2023-12-31"
                /> */}
                {/* <AiOutlineFilter className="filter-icon" onClick={toggleForm} /> */}
              </div>
            </div>

            {/* inputs */}
            <div className="header-box-form">
              {showForm && (
                <div className={`${styles.countyRow}`}>
                  <div className={`${styles.countyList}`}>
                    <div>
                      {/* <p style={{ margin: "5px" }}>County Name</p> */}
                      <div className={`${styles.countyListD}`}>
                        <Dropdown
                          value={selectedCounty}
                          onChange={(e: DropdownChangeEvent) =>
                            setSelectedCounty(e.value)
                          }
                          options={counties}
                          // optionLabel="hjj"
                          placeholder={counties[0]}
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>
                    <div className={`${styles.countyListSubmit}`}>
                      <Button label="Submit" />
                    </div>
                    <div className={`${styles.countyListSubmit}`}>
                      <Button label="Export" icon="pi pi-download" disabled />
                    </div>
                  </div>
                  <div className={`${styles.countyList1}`}>
                    <div className="card flex justify-content-center">
                      <Dropdown
                        value={selectedCounty}
                        // onChange={(e: DropdownChangeEvent) =>
                        //   setSelectedCounty(e.value)
                        // }
                        // options={counties}
                        placeholder="Manage col"
                        className={`"w-full md:w-14rem"`}
                      />
                    </div>
                  </div>
                </div>
                // <form className="form-inline">
                //   <label htmlFor="County">County Name:</label>
                //   <select className="select input" name="county">
                //     <option value="HillsBorough">HillsBorough</option>
                //     <option value="Orange">Orange</option>
                //     <option value="Fulton">Fulton</option>
                //     <option value="Madison">Madison</option>
                //   </select>
                //   <label htmlFor="pwd">Document:</label>
                //   <select className="select input " name="Document">
                //     <option value="Foreclosure Data">Foreclosure Data</option>
                //   </select>

                //   <label htmlFor="Reporting Date">Reporting Date :</label>
                //   <input
                //     className="input"
                //     type="date"
                //     name="start"
                //     value="2001-01-01"
                //     min="2001-01-01"
                //     max="2023-12-31"
                //   />

                //   <button className="button" type="submit">
                //     Submit
                //   </button>
                // </form>
              )}
            </div>

            <div className={`fc-box-two ${styles.ftable}`}>
              <DashFC />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Foreclosure;
