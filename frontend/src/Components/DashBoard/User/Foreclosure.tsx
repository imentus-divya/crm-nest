import "../styledashb.css";
import Duration from "../../Calender/Duration";
import { useRef, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import styles from "./user.module.css";
import { Button } from "primereact/button";
import ForeClosureTab from "./ForeclosureTable";

const Foreclosure = () => {
  const [isManageCol, setIsManageCol] = useState(false);

  //County list
  const counties = ["Hillsborough", "orange", "London", "Madison"];
  const [selectedCounty, setSelectedCounty] = useState(counties[0]);
  const dt = useRef(null);

  interface CSVExportOptions {
    filename: string;
    // properties needed for configuring the CSV export
  }

  interface TypeExportCSV {
    exportCSV: (options: CSVExportOptions) => void;
    // Add other properties or methods if available
  }
  const exportCSV = (selectionOnly: boolean) => {
    // dt.current.exportCSV({ selectionOnly });
    if (dt.current !== null && dt.current !== undefined) {
      const dtCurrent = dt.current as TypeExportCSV;
      const options: CSVExportOptions = {
        filename: "exported_data.csv", // Example filename
        // Add other necessary properties based on the requirements
      };
      dtCurrent.exportCSV(options);
    } else {
      console.error("dt.current is null or undefined.");
    }
  };

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
              {" "}
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
                        placeholder={"Select a county"}
                        style={{ border: "0px !important" }}
                        className={`${styles.countyListD}`}
                      />
                    </div>
                  </div>
                  <div>
                    <Button label="Submit" size="small" />
                  </div>
                  <div>
                    <Button
                      label="Export"
                      size="small"
                      icon="pi pi-download"
                      onClick={() => exportCSV(false)}
                      data-pr-tooltip="CSV"
                    />
                  </div>
                </div>
                <div className={`${styles.countyList1}`}>
                  <Button
                    severity="secondary"
                    size="small"
                    value={selectedCounty}
                    onClick={() => {
                      setIsManageCol(!isManageCol);
                    }}
                  >
                    Manage col
                  </Button>
                </div>
              </div>
            </div>

            <div className={`fc-box-two ${styles.ftable}`}>
              <ForeClosureTab
                isManageCol={isManageCol}
                county={selectedCounty}
                dt={dt}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Foreclosure;
