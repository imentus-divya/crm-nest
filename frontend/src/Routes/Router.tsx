import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Login/Login";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Dashboard from "../Components/DashBoard/User/Dashboard";
import Admindashboard from "../Components/DashBoard/Admin/Admindashboard";
import NewUpload from "../Components/DashBoard/Admin/NewUpload";
import Uploads from "../Components/DashBoard/Admin/Uploads";
import DashFC from "../Components/DashBoard/User/DashFC";
import Foreclosure from "../Components/DashBoard/User/Foreclosure";
import ManageUser from '../Components/DashBoard/Admin/ManageUser';
import AddUser from '../Components/DashBoard/Admin/AddUser';
import ManageRoles from '../Components/DashBoard/Admin/ManageRoles';
import CreateRole from '../Components/DashBoard/Admin/CreateRole';

import Layout from "./Layout";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />}></Route>


            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/foreclosure" element={<Foreclosure />}></Route>
              <Route
                path="/dashboard/ForeclosureData"
                element={<DashFC />}
              ></Route>
              <Route
                path="/Admin/admin-dashboard"
                element={<Admindashboard />}
              ></Route>
              <Route path="/Admin/upload-data" element={<Uploads />}></Route>
              <Route
                path="/Admin/upload-data/new-upload"
                element={<NewUpload />}
              ></Route>
              <Route path="/Admin/manage-user" element={<ManageUser />}></Route>
              <Route path="/Admin/manage-user/add-user" element={<AddUser />}></Route>

              <Route path="/Admin/manage-roles" element={<ManageRoles/>}></Route>
              <Route path="/Admin/manage-roles/create-role" element={<CreateRole/>}></Route>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
