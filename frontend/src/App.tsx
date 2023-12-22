
import './App.css';
import './Components/DashBoard/Admin/adnavStyle.css'
// 
import Login from './Components/Login/Login'
import Dashboard from './Components/DashBoard/User/Dashboard'
import DashFC from './Components/DashBoard/User/DashFC'
import Admindashboard from './Components/DashBoard/Admin/Admindashboard'
import Uploads from './Components/DashBoard/Admin/Uploads'
import AdminNavbar from './Components/DashBoard/Admin/AdminNavbar';
import Usernav from './Components/DashBoard/UserNav';
import Foreclosure from './Components/DashBoard/User/Foreclosure'
import NewUpload from './Components/DashBoard/Admin/NewUpload';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Sidebar from './Components/DashBoard/Admin/sidebar/Sidebar';

function App() {
  // console.log("hello")
  return (
    <div >

      <BrowserRouter>
        <AdminNavbar />
        <div style={{ display: 'flex' }}>
          <div >
            <Sidebar />
          </div>
          <div>
            <Routes>
              <Route path='/' element={<Login />}></Route>
              {/* <Route path='/nav' element={<AdminNavbar/>}/>
     <Route path='/nav' element={<AdminNavbar/>}/>
     <Route path='/usernav' element={<Usernav/>}/> */}

              <Route element={<ProtectedRoutes />}>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/foreclosure' element={<Foreclosure />}></Route>
                <Route path='/dashboard/ForeclosureData' element={<DashFC />}></Route>
                <Route path='/Admin/admin-dashboard' element={<Admindashboard />}></Route>
                <Route path='/Admin/upload-data' element={<Uploads />}></Route>
                <Route path='/Admin/upload-data/new-upload' element={<NewUpload />}></Route>
                <Route path='/nav' element={<AdminNavbar />} />
              </Route>

            </Routes>
          </div>

        </div>


      </BrowserRouter>


    </div>

  );
}

export default App;
