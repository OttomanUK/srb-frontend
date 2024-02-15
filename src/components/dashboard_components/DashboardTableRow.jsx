import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const TableRow = ({ rowData }) => {
    const classes = "p-4 border-b border-blue-gray-50";
  
    return (
      <tr>
        {Object.values(rowData).map((value, index) => (
          <td key={index} className={classes}>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-normal">
                {value}
              </Typography>
            </div>
          </td>
        ))}
      </tr>
    );
  };
export default TableRow;