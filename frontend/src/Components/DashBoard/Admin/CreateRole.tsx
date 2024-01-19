import React, { useState,ChangeEvent } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea"
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { Chip } from 'primereact/chip';


const CreateRole = () => {
    interface InputTextType
    {
        rolename:string;
        description:string;
        screens:object;
    }
    interface Module {
        id: number,
        name: string;
    }

    const [Input,setInput]=useState<InputTextType>({
        rolename:"",
        description:"",
        screens:{},
    })
    
    const [value, setValue] = useState<string>('');    const [error,setError]=useState<Record<string, string>>({});

    const module = localStorage.getItem('role_groups')
    const module_screen = module ? JSON.parse(module) : '';
    const module_screenOptions: Module[] = module_screen ? module_screen.module_screen : '';
    const [selectedModules, setSelectedModules] = useState([]);

    const inputEvent = (event: ChangeEvent<HTMLInputElement> ): void => {
    //     setInput({ ...Input, [event.target.name]: event.target.value });
      };
    // FORM VALIDATION
    // const formValidate=()=>
    // {

    // }
    // // SAVE BUTTON
    const Save_Btn=()=>
    {
    //     if(formValidate)
    //     {

    //     }
    }


    return (
        <>
            <div className="dashboard-container">
                <div className="main-content-admin">
                    <div className="main-admin">
                        <div className="top-content top-adduser">
                            <FaArrowLeftLong className="back-btn" />
                            <h2>Create Role</h2>
                        </div>
                        <div className="create-role-form">
                            <div className="form-data">


                                <div className="form-databox-input">
                                    <label htmlFor="uname">Role name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Role name"
                                        name="rolename"
                                        required
                                          onChange={inputEvent}
                                          value={Input.rolename}
                                        className="username"
                                    />
                                    {/* {errors.username ? ( */}
                                    {/* <p className="error-class">{errors.username}</p>
            ) : (
              ""
            )} */}

                                    <label htmlFor="description">Description</label>
                                    <div className="card flex justify-content-center">
                                        <InputTextarea value={value} onChange={(e)=>setInput} rows={5} cols={30} style={{margin:'8px 0'}} />
                                    </div>
                                    {/* {errors.password ? (
            //   <p className="error-class">{errors.password}</p>
            ) : (
              ""
            )} */}
                                    <label htmlFor="Screens">Screens</label>
                                    <div className="screens-options" style={{margin:'8px 0'}} >
                                        <div className="card flex justify-content-center">
                                            <MultiSelect value={selectedModules} onChange={(e: MultiSelectChangeEvent) => setSelectedModules(e.value)} options={module_screenOptions} optionLabel="name"
                                                placeholder="Select Screen Module" maxSelectedLabels={3} className="w-full md:w-20rem" />
                                        </div>
                                        
                                        <div className="card p-fluid chip-box">
                                            
                                            <div className="card flex flex-wrap gap-2 ">
                                                {selectedModules.map((mod: Module) => (
                                                    <Chip key={mod.name} label={mod.name} removable />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons-submit-cancel">
                                        <div className="card flex justify-content-center flex-columns">
                                            <Button label=" Save " onClick={Save_Btn} />
                                        </div>
                                        <div className="card flex justify-content-center">
                                            <Button label="Cancel" />
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}
export default CreateRole;




