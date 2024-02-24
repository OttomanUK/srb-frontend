import React, { useEffect } from 'react';
// import {
//   Routes,
//   Route,
//   useLocation
// } from 'react-router-dom';
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
import MissingInvoice from './pages/MissingInvoice.jsx';
import UserProfile from './pages/User_Profile/UserProfile.jsx';
import NtnList from './pages/NtnList.jsx';


function App() {
 
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/Missing" element= {<MissingInvoice/>} />
        <Route exact path="/Query" element={<Query/>} />
        <Route exact path="/InvoiceDetails/:id" element={<InvoiceDetails data1={data1}  />} />
        <Route exact path="/Analytics" element={<Analytics />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/setting" element={<Settings/>} />
        <Route exact path="/UserProfile" element={<UserProfile/>}/>
        {/* <Route exact path="/" element={<Login/>} /> */}
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/NtnList" element={<NtnList/>} />
      </Routes>
  );
}

export default App;
