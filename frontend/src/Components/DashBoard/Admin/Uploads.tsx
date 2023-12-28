import React from "react";
import "./adstyle.css";
// import '../styledashb.css'
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewUpload from "./NewUpload";
import { useLocation } from "react-router-dom";

const Admindash = () => {
  const urll = process.env.REACT_APP_BACKEND_API_URL;
  const location = useLocation();
  const meta_data_values = location.state;
  console.log(
    "🚀 ~ file: Uploads.tsx:20 ~ Admindash ~ additionalData:",
    meta_data_values
  );
  // const sample_foreclosure_url = meta_data_values.view_data;

  interface Product {
    UploadDate: Date | null;
    UploadType: string;
    County: string;
    File: string;
    RecordCount: number;
    Download: JSX.Element;
  }
  useEffect(() => {
    setProducts(meta_data_values);
  }, []);

  const [products, setProducts] = useState<Product[]>([]);

  const handleButtonClick = (rowData: any) => {
    // Handle button click for the specific row data
    console.log("Button clicked for:", rowData);
    const filepath = `http://localhost:8000/${rowData.view_data}`;
    const fileName = "qwertyuio.csv";
    const aTag = document.createElement("a");
    aTag.href = filepath;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  const download_Btn = (rowData: any) => {
    return (
      <Button label="Download" onClick={() => handleButtonClick(rowData)} />
    );
  };

  const columns = [
    { field: "date", header: "upload Date" },
    { field: "upload_type.name", header: "Upload Type" },
    { field: "county.name", header: "County" },
    { field: "filename", header: "File" },
    { field: "record_count", header: "Record Count" },
    { field: "view_data", header: "Download", body: download_Btn },
  ];
  // new upload btn
  const Navigation = useNavigate();
  const NewUploadbtn = async () => {
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("role_id");

    await axios
      .get(`${urll}/upload-data/new-upload`, {
        headers: { Authorization: token },
        params: { role },
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: Uploads.tsx:63 ~ awaitaxios.get ~ response:",
          response
        );

        if (response.status == 200) {
          Navigation("/Admin/upload-data/new-upload");
        }
      });
  };
  const handleCell = (e: any) => {
    console.log("🚀 ~ file: Uploads.tsx:60 ~ handleCell ~ e:", e);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="main-content-admin">
          <div className="main-admin">
            <div className="top-content">
              <h2>History Uploads</h2>
              <div className="card flex justify-content-center">
                <Button label="New Upload" onClick={NewUploadbtn}>
                  {" "}
                  <i style={{ marginLeft: "5px" }} className="pi pi-plus"></i>
                </Button>
              </div>
            </div>
            <>{console.log("test", products)}</>
            {/* <p>hshshshs${meta_data_values}</p> */}
            <div className="bottom-content">
              <div className="card" style={{ width: "100%" }}>
                <DataTable
                  value={products}
                  selectionMode="single"
                  onSelectionChange={(e) => handleCell(e)}
                  tableStyle={{ minWidth: "50rem" }}
                  className="upload-table"
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                >
                  {columns.map((col) => (
                    <Column
                      key={col.field}
                      field={col.field}
                      header={col.header}
                      body={col.body}
                    />
                  ))}
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admindash;
