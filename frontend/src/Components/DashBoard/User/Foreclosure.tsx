import "../styledashb.css";
import { useLocation, useNavigate } from "react-router-dom";
import Duration from "../../Calender/Duration";
import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import styles from "./user.module.css";
import { Button } from "primereact/button";
import ForeClosureTab from "./ForeclosureTable";

const Foreclosure = () => {
  const urll = process.env.REACT_APP_BACKEND_API_URL;
  const [showForm, setShowForm] = useState(true);
  const [isNavClose, setIsNavClose] = useState(false);
  const [isManageCol, setIsManageCol] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");

  //County list
  const counties = ["HillsBorough", "Orange", "Fulton", "Madison"];

  const location = useLocation();
  const data = location.state;
  console.log(
    "🚀 ~ file: Foreclosure.tsx:22 ~ Foreclosure ~ meta_data_values:",
    data
  );

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
                      <div className={`${styles.countyListD}`}>
                        <Dropdown
                          value={selectedCounty}
                          onChange={(e: DropdownChangeEvent) =>
                            setSelectedCounty(e.value)
                          }
                          options={counties}
                          // optionLabel="hjj"
                          placeholder={counties[0]}
                          style={{ border: "0px !important" }}
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
              <ForeClosureTab isManageCol={isManageCol} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Foreclosure;
