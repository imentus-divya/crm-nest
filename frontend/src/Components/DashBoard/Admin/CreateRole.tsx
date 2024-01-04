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
                            <span className="p-float-label">
                                <InputText id="rolename" className="p-inputtext-lg" value={value} onChange={(e) => setValue(e.target.value)} />
                                <label htmlFor="rolename">rolename</label>
                            </span>
                            <span className="p-float-label">
                <InputTextarea id="description" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                <label htmlFor="description">Description</label>
            </span>
                            
                            <span className="p-float-label">
                                <InputText id="email" className="p-inputtext-lg" value={value} onChange={(e) => setValue(e.target.value)} />
                                <label htmlFor="username">Email</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="password" className="p-inputtext-lg" value={value} onChange={(e) => setValue(e.target.value)} />
                                <label htmlFor="password">Password</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="password" className="p-inputtext-lg" value={value} onChange={(e) => setValue(e.target.value)} />
                                <label htmlFor="password">Confirm Password</label>
                            </span>
                            <div className="card flex justify-content-center " >
                                <Dropdown value={selectedCounty} style={{
                                    width: '300px', paddingTop: '5px', paddingBottom: '5px'
                                }} onChange={(e) => setSelectedCounty(e.value)} options={counties} optionLabel="name"
                                    placeholder="Select County" className="w-full md:w-14rem" />
                            </div>
                            <div className="card flex justify-content-center " >
                                <Dropdown value={selectedFiletype} style={{
                                    width: '300px', paddingTop: '5px', paddingBottom: '5px'
                                }} onChange={(e) => setSelectedFiletype(e.value)} options={FileTypes} optionLabel="name"
                                    placeholder="Select FileType" className="w-full md:w-14rem" />
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




