import React from "react";
import "./styles.css";
import {  BrowserRouter as Router,Routes, Route, useNavigate } from "react-router-dom";
import Analytics from "./components/plots/showAll.js"
import styled from "styled-components";
import AccountBox from "./components/resuseable_components/accountBox/index.jsx"
import InvoiceDetails from "./components/pages/invoice_detail/invoice_detail.js"
import {data1} from "./data/singleData.js"

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return <AppContainer>
 <Router>
 <Routes>
          <Route exact path="/" element={<AccountBox />} />
          
          <Route exact path="/Analytics" element={<Analytics  />} />
          <Route exact path="/InvoiceDetails/:id" element={<InvoiceDetails data1={data1}  />} />
          
        </Routes>
        </Router>
    

  </AppContainer>
}
