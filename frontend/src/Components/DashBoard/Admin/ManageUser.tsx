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



const ManageUser = () => {
    const urll = process.env.REACT_APP_BACKEND_API_URL;

    const location = useLocation();
    const userDetails = location.state;
    console.log("user details are : ", userDetails)
    const Navigation=useNavigate();

    useEffect(() => {
        setProducts(userDetails);
    }, []);

    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState<boolean>(true);

    const ActiveUserBtn = (userDetails: any) => {
        let checkd = true;
        const condition = userDetails.active ? '' : checkd = false;
        return (
            <InputSwitch checked={checkd} onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)} />
        );
    }
    
    const EditUserBtn = (id:any) => {
        
        return (<h3 className="editBtn">Edit</h3>  );
      };
    const columns = [
        { field: "first_name", header: "Name", },
        { field: "email", header: "Email Address" },
        { field: "role_id.name", header: "Role" },
        { field: "tenant_id", header: "Profile" },
        { field: "true", header: "User status", body: ActiveUserBtn },
        { field: "id", header: "Edit", body:EditUserBtn((userDetails.id))}
      ]


    const addUserbtn = async () => {
        console.log("🚀 ~ file: ManageUser.tsx:47 ~ ManageUser ~ addUserbtn:", addUserbtn)
        const token = localStorage.getItem('jwtToken')
        await axios.get(`${urll}/add-user`, { headers: { Authorization: token } })
            .then((response: AxiosResponse) => {
               if(response.status==200)
               {
               console.log("🚀 ~ file: ManageUser.tsx:64 ~ .then ~ response:", response)
                const roles=response.data;
                Navigation('/Admin/manage-user/add-user',{state:roles})

               }
            }).
            catch((e) => {
                console.log("🚀 ~ file: ManageUser.tsx:52 ~ ManageUser ~ e:", e)

            })
        console.log("button")
    }
    
    return (
        <>
            <div className="dashboard-container">
                <div className="main-content-admin">
                    <div className="main-admin">
                        <div className="top-content">
                            <h2>Manage User</h2>
                            <div className="card flex justify-content-center">
                                <Button label="Add User" onClick={addUserbtn}>
                                    {" "}
                                    <i style={{ marginLeft: "5px" }} className="pi pi-plus"></i>
                                </Button>
                            </div>
                        </div>
                        {/* <>{console.log("test", products)}</> */}
                        {/* <p>hshshshs${meta_data_values}</p> */}
                        <div className="bottom-content">
                            <h4>List Of User</h4>

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
export default ManageUser;