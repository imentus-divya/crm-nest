import React, { useState, useRef, useEffect } from "react";
import "./adstyle.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios, { AxiosResponse } from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useLocation } from "react-router-dom";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";



const ManageRoles = () => {
    const urll = process.env.REACT_APP_BACKEND_API_URL;

    const location = useLocation();
    const roleDetails = location.state;
    console.log("role details are : ", roleDetails)
    const Navigation=useNavigate();

    useEffect(() => {
        setProducts(roleDetails);
    }, []);
   
    const handleTime = (roleDetails:any) => {
        console.log("🚀 ~ file: Uploads.tsx:57 ~ handleTime ~ rowData:", roleDetails)
        const date = new Date(roleDetails?.created_date);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: 'UTC', // Optionally specify the timezone
          // Other options like weekday, timeZoneName, etc., can also be added as needed
        };
        const formattedDate = date.toLocaleString('en-US');
        return ( <span>{formattedDate}</span>)
        // console.log("🚀 ~ file: Uploads.tsx:57 ~ handleTime ~ rowData:", rowData)
      }
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState<boolean>(true);

    const ActiveUserBtn = (userDetails: any) => {
        // console.log(userDetails)
        let checkd = true;
        const condition = userDetails.active ? '' : checkd = false;
        return (
            <InputSwitch checked={checkd} onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)} />
        );
    }
    const columns = [
        { field: "name", header: "Name", },
        { field: "created_date", header: "Last Modified" ,body: handleTime },
        { field: "true", header: "User status", body: ActiveUserBtn }]

    const createRolebtn = async () => {
        const token = localStorage.getItem('jwtToken')
        await axios.get(`${urll}/create-role`, { headers: { Authorization: token } })
            .then((response: AxiosResponse) => {
               if(response.status==200)
               {
                Navigation('/Admin/manage-roles/create-role')
               }
            }).
            catch((e) => {
                console.log("🚀 ~ file: ManageUser.tsx:52 ~ ManageUser ~ e:", e)

            })
        // console.log("button")
    }
    return (
        <>
        <div className="dashboard-container">
                <div className="main-content-admin">
                    <div className="main-admin">
                        <div className="top-content">
                            <h2>Manage Roles</h2>
                            <div className="card flex justify-content-center">
                                <Button label="Create Role  " onClick={createRolebtn}>
                                    {" "}
                                    <i style={{ marginLeft: "5px" }} className="pi pi-plus"></i>
                                </Button>
                            </div>
                        </div>
                        {/* <>{console.log("test", products)}</> */}
                        {/* <p>hshshshs${meta_data_values}</p> */}
                        
                     <div className="bottom-content">
                            <h4>List Of Roles</h4>

                            <div className="card" style={{ width: "100%" }}>
                                <DataTable
                                    value={products}
                                    selectionMode="single"
                                    //   onSelectionChange={(e) => handleCell(e)}
                                    tableStyle={{ minWidth: "50rem", width: '80rem' }}
                                    className="upload-table user-table-header "
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
           
        </>)
}
export default ManageRoles;