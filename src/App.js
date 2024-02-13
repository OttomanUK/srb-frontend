import React from "react";
import "./styles.css";
import {  BrowserRouter as Router,Routes, Route, useNavigate } from "react-router-dom";
import Analytics from "./components/plots/showAll.js"
import styled from "styled-components";
import AccountBox from "./components/resuseable_components/accountBox/index.jsx"
import InvoiceDetails from "./components/pages/invoice_detail/invoice_detail.js"

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
          <Route exact path="/InvoiceDetails" element={<InvoiceDetails data={{
    srb_invoice_id: 'INV12345',
    pos_id: 'POS987',
    ntn: '123456789',
    name: 'John Doe',
    invoice_date: '2024-02-13',
    invoice_no: 'INV2024001',
    rate_value: '$50.00',
    sales_value: '$200.00',
    sales_tax: '$20.00',
    consumer_name: 'Jane Smith',
    consumer_ntn: '987654321',
    consumer_address: '123 Main St, Cityville',
    tariff_code: '123456',
    extra_info: 'Lorem ',
    pos_user: 'user123',
    pos_pass: '********',
    is_active: true,
    created_date_time: '2024-02-13 10:30 AM',
    invoice_type: 'Standard',
    consider_for_Annex: false}}  />} />
          
        </Routes>
        </Router>
    

  </AppContainer>
}
