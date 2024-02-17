import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';
/* 
if(index==0){
  navigate('dashboard/?ntn=${rowData[1]}pos_id=${value}')
}
if(index==1){
  navigate('dashboard/?ntn=${values}')
}

*/
const TableRow = ({ rowData }) => {
  const navigate=useNavigate();
    const classes = "p-4 border-b border-blue-gray-50";
  
    return (
      <tr>
        {Object.values(rowData).map((value, index) => (
          <td key={index} className={classes}>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-normal hover:cursor:pointer" onClick={()=>{
              console.log(index,value,rowData)
              }} style={{cursor:"pointer"}}>
                {value}
              </Typography>
            </div>
          </td>
        ))}
      </tr>
    );
  };
export default TableRow;