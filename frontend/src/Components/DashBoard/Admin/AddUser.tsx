import React, { ChangeEvent, useState ,useRef} from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { InputText } from "primereact/inputtext";
import axios, { AxiosResponse } from "axios";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";


const AddUser = () => {
  const toast = useRef<Toast>(null);

    const urll = process.env.REACT_APP_BACKEND_API_URL;
    const location = useLocation();
    const roles = location.state;
    console.log("🚀 ~ file: AddUser.tsx:25 ~ AddUser ~ roles:", roles)
   

    const [value, setValue] = useState<string>('');
    const [selectedCounty, setSelectedCounty] = useState([]);
    const [selectedFiletype, setSelectedFiletype] = useState([]);
    const [selectedrole, setSelectedrole] = useState('');
    //    dropdown data 
    const dropdown = localStorage.getItem('county_fileType');
    const dropdownValues = dropdown ? JSON.parse(dropdown) : {};

    const countyOptions = dropdownValues.county;
    const fileTypeOptions = dropdownValues.fileType;

    if(roles)
    {
    // 
    
    }
    else
    {
        console.log('Roles array is empty or undefined.');
    }


    interface InputValues {
        firstname: string;
        lastname: string;
        email: string;
        username: string;
        password: string;
        confirm_password: string;
    }

    interface AllInputValues {
        firstname: string;
        lastname: string;
        email: string;
        username: string;
        password: string;
        confirm_password: string;
        county: {},
        fileType: {}
    }
    const [InputVal, setInputVal] = useState<InputValues>({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const inputEvent = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputVal({ ...InputVal, [event.target.name]: event.target.value });
    };
    const Save_btn = async () => {

        const AllInputs = { "InputVal": InputVal, "selectedCounty": selectedCounty, "selectedFiletype": selectedFiletype }
        console.log("🚀 ~ INput To Send When creating new user :--AddUser,tsx", AllInputs)
        if (formValidate(AllInputs)) {
            console.log("form is about to be submitted with data : ", AllInputs)
            const token = localStorage.getItem('jwtToken')
            // await axios.get(`${urll}/add-user`, )
            await axios.post(`${urll}/save-user`, AllInputs, { headers: { Authorization: token } }).
                then((response: AxiosResponse) => 
                {if(response.status==200)
                {
                    toast.current?.show({
                        severity: "success",
                        summary: "Added New User",
                      });
                }
                toast.current?.show({
                    severity: "error",
                    summary: "Error at User Creation",
                    detail: response.data.message,
                    life: 8000,
                  });

            }).
                catch((error) =>   toast.current?.show({
                    severity: "error",
                    summary: "User Not Found",
                    detail: "",
                    life: 8000,
                  }))
        }
        else {
            
        }
    }
    const formValidate = (AllInputs: any) => {
        let bugs: Record<string, string> = {};
        if (!AllInputs.InputVal.firstname) {
            bugs.firstname = 'First Name is required';
        }
        else if (AllInputs.InputVal.firstname.length > 25) {
            bugs.firstname = 'First Name should be less than 25 characters';
        }
        if (!AllInputs.InputVal.lastname) {
            bugs.lastname = 'Last Name is required';
        }
        else if (AllInputs.InputVal.lastname.length > 25) {
            bugs.lastname = 'Last Name should be less than 25 characters';
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!AllInputs.InputVal.email) {
            bugs.email = 'Email is required';
        } else if (!emailRegex.test(InputVal.email)) {
            bugs.email = 'Invalid email format';
        }
        if (!AllInputs.InputVal.password) {
            bugs.password = 'Password is required';
        } else if (InputVal.password.length < 4) {
            bugs.password = 'Password should be at least 4 characters';
        }

        // Confirm Password validation
        if (!AllInputs.InputVal.confirm_password) {
            bugs.confirm_password = 'Please confirm your password';
        } else if (InputVal.confirm_password !== InputVal.password) {
            bugs.confirm_password = 'Passwords do not match';
        }
        if (Object.keys(AllInputs.selectedCounty).length === 0) {
            bugs.county = "Please select at least 1 county !";
        }
        if (Object.keys(AllInputs.selectedFiletype).length === 0) {
            console.log("🚀 ~ file: AddUser.tsx:117 ~ formValidate ~ AllInputs.selectedFiletype:", AllInputs.selectedFiletype)

            bugs.fileType = "Please select atleast 1 Filetype";
        }
        console.log("bugs are ", bugs);
        setErrors(bugs);

        return Object.keys(bugs).length === 0;


    }
    console.log("🚀 ~ file: AddUser.tsx:172 ~ AddUser ~ roleOptions:", roles)

    return (
        <>
            <div className="dashboard-container">
      <Toast ref={toast} />

                <div className="main-content-admin">
                    <div className="main-admin">
                        <div className="top-content top-adduser">
                            <FaArrowLeftLong className="back-btn" />
                            <h2>Add User</h2>
                        </div>

                        <div className="add-user-box">
                            <span className="p-float-label">
                                <InputText id="firstname" className="p-inputtext-lg" name="firstname" onChange={inputEvent} value={InputVal.firstname} />
                                <label htmlFor="username">Firstname</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="lasstname" className="p-inputtext-lg" name="lastname" value={InputVal.lastname} onChange={inputEvent} />
                                <label htmlFor="lastname">Lastname</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="fullname" className="p-inputtext-lg" name="username" value={InputVal.username} onChange={inputEvent} />
                                <label htmlFor="username">Username</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="email" className="p-inputtext-lg" name="email" value={InputVal.email} onChange={inputEvent} />
                                <label htmlFor="username">Email</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="password" className="p-inputtext-lg" name="password" value={InputVal.password} onChange={inputEvent} />
                                <label htmlFor="password">Password</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="password" className="p-inputtext-lg" name="confirm_password" value={InputVal.confirm_password} onChange={inputEvent} />
                                <label htmlFor="password">Confirm Password</label>
                            </span>
                            {/* <div className="card flex justify-content-center">
                                <Dropdown value={selectedrole} onChange={(e: DropdownChangeEvent) => setSelectedrole(e.value)} options={roleOptions} optionLabel="name"
                                    placeholder="Select a Role" className="w-full md:w-14rem" style={{ width: '19rem', padding: '5px 5px 5px 5px' }} />
                            </div> */}
                            <div className="card flex justify-content-center">
                                <MultiSelect value={selectedCounty} onChange={(e: MultiSelectChangeEvent) => setSelectedCounty(e.value)} options={countyOptions} optionLabel="name"
                                    placeholder="Select County" maxSelectedLabels={10} className="w-full md:w-20rem" style={{ width: '19rem', padding: '5px 5px 5px 5px' }} />
                            </div>

                            <div className="card flex justify-content-center">
                                <MultiSelect value={selectedFiletype} onChange={(e: MultiSelectChangeEvent) => setSelectedFiletype(e.value)} options={fileTypeOptions} optionLabel="name"
                                    placeholder="Select FileType" maxSelectedLabels={10} className="w-full md:w-20rem" style={{ width: '19rem', padding: '5px 5px 5px 5px', marginLeft: '0' }} />
                            </div>

                            <div className="buttons-submit-cancel">
                                <div className="card flex justify-content-center flex-columns">
                                    <Button label="Save" size="large" onClick={Save_btn} />
                                </div>
                                <div className="card flex justify-content-center">
                                    <Button label="Cancel" size="large" />
                                </div>
                            </div>

                        </div>





                    </div>
                </div>
            </div>
        </>
    )
}
export default AddUser;




