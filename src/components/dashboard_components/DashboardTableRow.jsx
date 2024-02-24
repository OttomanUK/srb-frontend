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
          <td key={index} className={classes}>
            <div className="flex flex-col">
              <Typography key={index} variant="small" color="blue-gray" className="font-normal hover:cursor:pointer" onClick={()=>{
                if(index==1){

                  navigate(`/dashboard/?ntn=${rowData.ntn_id}&pos=${value}`)
                }
                if(index==19){
                  navigate(`/dashboard/?ntn=${value}`)
                }
              
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