import React, { useState, useEffect } from 'react';
import './invoice_detail.css'; // Import the CSS file
import InvoiceField from './invoice_field';
import { useParams } from "react-router-dom";
import { login, getPosInvoice, submit_data, getSingleInvoice } from "../../action/action";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from '../../components/resuseable_components/Sidebar';
import Header from '../../components/resuseable_components/Header';
import WelcomeBanner from '../../components/dashboard_components/WelcomeBanner';
import Loader from '../../components/utils/Loader';

const InvoiceDetails = ({ data1 }) => {
  const customGreeting = 'Specific Invoice';
  const [data, setData] = useState({});
  const { isLoading } = useSelector(state => state.centralStore);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { results: res } = await dispatch(getSingleInvoice(id));
        setData(res[0]);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fields = [
    'srb_invoice_id', 'pos_id', 'ntn', 'name', 'invoice_date',
    'invoice_no', 'rate_value', 'sales_value', 'sales_tax', 'consumer_name',
    'consumer_ntn', 'consumer_address', 'tariff_code', 'extra_info',
    'pos_user', 'pos_pass', 'is_active', 'created_date_time',
    'invoice_type', 'consider_for_Annex'
  ];

  if (isLoading) {
    return <Loader />;
  }

  // Extract key-value pairs and display them
  const keyValuePairs = Object.entries(data);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <WelcomeBanner greeting={customGreeting} text={''} />
          <div className="invoice-container dark:border-slate-700 dark:bg-slate-800">
            <h2 className="invoice-header">Invoice Details</h2>
            {keyValuePairs.map(([key, value]) => (
              <InvoiceField key={key} label={key.replace(/_/g, ' ').toUpperCase()}>
                {value}
              </InvoiceField>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
