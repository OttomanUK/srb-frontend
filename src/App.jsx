import React, { useEffect,useState } from 'react';

import {  BrowserRouter as Router,Routes, Route, useNavigate, useLocation } from "react-router-dom";
import InvoiceDetails from "../src/pages/invoice_detail/invoice_detail.jsx"
import './css/style.css';
import { useDispatch,useSelector } from 'react-redux';
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
import { getAllLocation, getAllNtn, getAnomalyDescription } from './action/action.js';
import Analytics from './pages/Analytics.jsx';



function App() {
  const isAuthorized=useSelector((state) => state.centralStore.isAuthorized)
 const dispatch=useDispatch()
  const location = useLocation();
  const [isConnected, setIsconnected] = useState(false);
  const checkUserToken = () => {

    const user = JSON.parse(localStorage.getItem("authToken"));
    // const username = JSON.parse(localStorage.getItem("user-token")).name;
    if (user!=null) {
      setIsconnected(true);
    } else {
      setIsconnected(false);
    }
};
  useEffect(() => {
  checkUserToken();

    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''


  }, [location.pathname,isAuthorized]); // triggered on route change

  return (
      <Routes>
        {isConnected && (
  <>
    <Route exact path="/dashboard" element={<Dashboard />} />
    <Route exact path="/InvoiceDetails/:id" element={<InvoiceDetails />} />
    <Route exact path="/Analytics" element={<Analytics />} />
    <Route exact path="/missing" element= {<MissingInvoice/>} />
    {isAuthorized &&<Route exact path="/Query" element={<Query/>} />}
        <Route exact path="/UserProfile" element={<UserProfile/>}/>
        <Route exact path="/NtnList" element={<NtnList/>} />
  </>
)}
        {isConnected && (
  <>

<Route exact path="/login" element={<Login />} />
{/* <Route exact path="/setting" element={<Settings/>} /> */}
{/* <Route exact path="/" element={<Login/>} /> */}
<Route exact path="/register" element={<Register/>} />
     </>
)}
        <Route exact path="/*" element={<NotFound/>}/> 
      </Routes>
  );
}

export default App;
