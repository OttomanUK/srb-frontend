import React, { useEffect } from 'react';

import {  BrowserRouter as Router,Routes, Route, useNavigate, useLocation } from "react-router-dom";
import InvoiceDetails from "../src/pages/invoice_detail/invoice_detail.jsx"
import './css/style.css';
import './components/charts/ChartjsConfig';
import Analytics from './pages/Analytics';

import Settings from './pages/Settings';
// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import {data1} from "./data/singleData.js"
import Query from './pages/Query.jsx';
import MissingInvoice from './pages/MissingInvoice/MissingInvoice.jsx';
import UserProfile from './pages/User_Profile/UserProfile.jsx';
import NtnList from './pages/NtnList.jsx';
import Loader from './components/utils/Loader.jsx';
import NotFound from './pages/NotFound.jsx';
import PleaseReload from './pages/PleaseReload.jsx';



function App() {
 
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/InvoiceDetails/:id" element={<InvoiceDetails data1={data1}  />} />
        <Route exact path="/Analytics" element={<Analytics />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/setting" element={<Settings/>} />
        {/* <Route exact path="/" element={<Login/>} /> */}
        <Route exact path="/missing" element= {<MissingInvoice/>} />
        <Route exact path="/Query" element={<Query/>} />
        <Route exact path="/UserProfile" element={<UserProfile/>}/>
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/NtnList" element={<NtnList/>} />
        <Route exact path="/NotFound" element={<NotFound/>}/> 
        <Route exact path="/PleaseReload" element={<PleaseReload/>}/> 
        {/* <Route exact path="/Loader" element={<Loader/>} /> */}

      </Routes>
  );
}

export default App;
