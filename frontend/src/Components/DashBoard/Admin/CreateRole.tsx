import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea"
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Button } from 'primereact/button';
interface County {
    name: string;
    code: string;
}
interface FileType {
    name: string;
    code: string;
}
const CreateRole = () => {
    const [value, setValue] = useState<string>('');
    const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
    const [selectedFiletype, setSelectedFiletype] = useState<FileType | null>(null);

    const counties: County[] = [
        { name: 'Orange', code: 'Orange' },
        { name: 'Hillsborough', code: 'Hillsborough' },
    ];
    const FileTypes: FileType[] = [
        { name: 'Foreclosure', code: 'fc' },
        { name: 'LpCourt Cases', code: 'Lcc' },
    ];
    return (
        <>
            <div className="dashboard-container">
                <div className="main-content-admin">
                    <div className="main-admin">
                        <div className="top-content top-adduser">
                            <FaArrowLeftLong className="back-btn" />
                            <h2>Create Role</h2>
                        </div>

                        <div className="add-user-box">

                        {/*  role name */}
                        <div className="card flex flex-column align-items-center  ">
                        <InputText type="text" className="p-inputtext-lg" placeholder="Role Name" />
                        </div>
                        {/* text area */}
                        <div className="card flex justify-content-center">
                        <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                        </div>
            
                            <div className="buttons-submit-cancel">
                                <div className="card flex justify-content-center flex-columns">
                                    <Button label="Create" size="large" />
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
export default CreateRole;




