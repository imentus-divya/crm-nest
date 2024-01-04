import "../styledashb.css";
import { useLocation, useNavigate } from "react-router-dom";
import Duration from "../../Calender/Duration";
import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import styles from "./user.module.css";
import { Button } from "primereact/button";
import ForeClosureTab from "./ForeclosureTable";

const Foreclosure = () => {
  const [showForm, setShowForm] = useState(true);
  const [isNavClose, setIsNavClose] = useState(false);
  const [isManageCol, setIsManageCol] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");

  //County list
  const counties = ["Hillsborough", "orange", "London", "Madison"];

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
              </div>
            </div>

            {/* inputs */}
            <div className="header-box-form">
              {showForm && (
                <div className={`${styles.countyRow}`}>
                  <div className={`${styles.countyList}`}>
                    <div>
                      {/* <p style={{ margin: "5px" }}>County Name</p> */}
                      <div className={``}>
                        <Dropdown
                          value={selectedCounty}
                          onChange={(e: DropdownChangeEvent) =>
                            setSelectedCounty(e.value)
                          }
                          options={counties}
                          // optionLabel="hjj"
                          placeholder={"Select a county"}
                          style={{ border: "0px !important" }}
                          className={`${styles.countyListD}`}
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
                        onClick={() => {
                          setIsManageCol(!isManageCol);
                        }}
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
              )}
            </div>

            <div className={`fc-box-two ${styles.ftable}`}>
              <ForeClosureTab
                isManageCol={isManageCol}
                county={selectedCounty}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Foreclosure;
