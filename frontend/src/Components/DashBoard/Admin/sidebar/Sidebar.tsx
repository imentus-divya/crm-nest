
import React, { useRef } from "react";
import axios, { AxiosResponse } from "axios";
import '../adnavStyle.css'
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import {  AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { FaChartColumn ,FaUpload,FaUserPlus,FaUsersGear ,FaUsersViewfinder,FaAlignJustify} from "react-icons/fa6";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';


const Navbar = () => {
    const urll = process.env.REACT_APP_BACKEND_API_URL;
    const navRef = useRef(null);
    const [isNavClose, setIsNavClose] = useState(false);
    const [NavBoxClose,setNavBoxClose]=useState(false)
    const [items, setItems] = useState([]);
    const user = localStorage.getItem('display_name');
  
   

    const navcloseFunc = () => {
        // Toggle the state to control the className
        setIsNavClose(!isNavClose);

        // Toggle the state to control the className
        setNavBoxClose(!isNavClose);

    };

    const Navigation = useNavigate();
    const Logoclick = () => {
        Navigation("/")
    }

    const dashboard_btn = async () => {
        const token = localStorage.getItem('jwtToken')
        const role=localStorage.getItem('role_id')

        await axios.get(`${urll}/admin-dashboard`, { headers: { 'Authorization': token },params:{role} }).then((response:AxiosResponse)=> {
            // Handle successful response and update the dashboard UI
            console.log("response recieved from token AdminDashboard verification", response);
            if (response.status == 200) {
                Navigation("/Admin/admin-dashboard");
            }
        })
            .catch((error:Error )=> {
                console.error('Error fetching dashboard data:', error);
            });
    }
    const upload_btn = async () => {
        const token = localStorage.getItem('jwtToken')
        const role=localStorage.getItem('role_id')

        await axios.get(`${urll}/upload-data`, { headers: { 'Authorization': token },params:{role}}).then((response:AxiosResponse) => {
            // Handle successful response and update the dashboard UI
           console.log("🚀 ~ file: Navbar.tsx:59 ~ awaitaxios.get ~ response:", response)
           
            if (response.status == 200) {
               const metaData=response.data;
                console.log("🚀 ~ file: Navbar.tsx:59 ~ awaitaxios.get ~ metaData:",response.data)          
                Navigation("/Admin/upload-data",{state:metaData})
            }
        })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }
    const logout_btn = async () => 
    {
        const token = localStorage.getItem('jwtToken')
        const userid = localStorage.getItem('userid')
        const role=localStorage.getItem('role_id')

      
        await axios.get(`${urll}/logout`, { headers: { 'Authorization': token } ,params:{role}});
        console.log("response recieved from logout ");

    }


    const optionList = [
        { value: "Dashboard", label: "Dashboard" },
        { value: 'UploadData', label: "Upload Data" },
        { value: "Activities", label: "Activities" },
        { value: "Mytask", label: "My Task" },

    ];
    const styles = {
        mainContainer: {
          width: NavBoxClose ? '70px' : '250px',
          height: `calc(100vh - 70px)`,
          position: 'relative',
          overflowX: 'hidden',
          transition: 'all 0.5s ease-in-out'
        }
      };

    return (
        <>
                    <div className={`main-container-admin ${NavBoxClose? 'navboxclose' : ''}` }  >
                <div className={`navcontainer  ${isNavClose ? 'navclose' : ''}`} >
                    <nav className="nav" >
                        <div className="nav-upper-options">
                       

                            <div className="nav-option option1 " onClick={dashboard_btn}>
                                <FaChartColumn className="nav-img"/>
                                <h3> Dashboard</h3>
                            </div>

                            <div className="option2 nav-option" onClick={upload_btn}>
                                <FaUpload className="nav-img" />
                                <h3>Upload Data</h3>
                            </div>

                            <div className="nav-option " >
                                <FaUserPlus  className="nav-img" />
                                <h3> Manage User</h3>
                            </div>

                            <div className="nav-option option4">
                                <FaUsersGear  className="nav-img" />
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
    )
}
export default Navbar;

