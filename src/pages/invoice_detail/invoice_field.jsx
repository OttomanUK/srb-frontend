import React from 'react';
import "./invoice_detail.css";
const InvoiceField = ({ label, children }) => {
    return (
      <div className="invoice-field">
        <span className="invoice-label">{label}:</span>
        <span className="invoice-value">{children || 'N/A'}</span>
      </div>
    );
  };
  
  export default InvoiceField;
  