import React from 'react';
import './invoice_detail.css'; // Import the CSS file
import InvoiceField from './invoice_field';
import { useParams } from "react-router-dom"


const InvoiceDetails = ({ data }) => {
    // navigate(`/orderDetail/${order.id}`) }
// const { id } = useParams();
  const fields = [
    'srb_invoice_id', 'pos_id', 'ntn', 'name', 'invoice_date',
    'invoice_no', 'rate_value', 'sales_value', 'sales_tax', 'consumer_name',
    'consumer_ntn', 'consumer_address', 'tariff_code', 'extra_info',
    'pos_user', 'pos_pass', 'is_active', 'created_date_time',
    'invoice_type', 'consider_for_Annex'
  ];

  return (
    <div className="invoice-container">
      <h2 className="invoice-header">Invoice Details</h2>
      {fields.map(field => (
        <InvoiceField key={field} label={field.replace(/_/g, ' ').toUpperCase()}>
          {data[field]}
        </InvoiceField>
      ))}
    </div>
  );
};

export default InvoiceDetails;