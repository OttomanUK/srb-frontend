import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';

const TableRow = ({ rowData }) => {
  const navigate=useNavigate();
    const classes = "p-4 border-b border-blue-gray-50";
  
    return (
      <tr className='dark:text-white'>
        {Object.values(rowData).map((value, index) => (
          <td key={index} className={classes} onClick={() => {
            if (index === 1) {
              navigate(`/dashboard/?ntn=${rowData.ntn}&pos=${value}`);
            }
            else if (index === 2) {
              navigate(`/dashboard/?ntn=${value}`);
            }else{
              
              navigate(`/InvoiceDetails/${rowData.srb_invoice_id}`);
            }
          }} style={{ cursor: "pointer" }}>
            <div className="flex flex-col">
            <Typography  variant="small" color="blue-gray" className="font-normal hover:cursor:pointer" >
  {value}
</Typography>
            </div>
          </td>
        ))}
      </tr>
    );
  };
export default TableRow;