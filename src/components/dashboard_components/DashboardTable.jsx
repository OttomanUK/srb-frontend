import React,{useState,useEffect} from 'react'; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loader from '../utils/Loader';
import TableRow from './DashboardTableRow';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";


 
export function MembersTable({tableData}) {
 const TABS = [
    { label: "Anomalous", value: "True" },
    { label: "Non Anomalous", value: "False" },
  ];

  const [page,setPage]=useState(0)
 
  const [tableHead,setTableHead]=useState([]);

  useEffect(() => {
    try {
      
      if (tableData!=null && tableData.length > 0) {
        setTableHead(Object.keys(tableData[0]));
      }
      // Handle data as needed
    } catch (error) {
      console.error('Error parsing JSON data:', error.message);
      // Handle error as needed
    }
  }, [tableData]);

  if (!tableData || tableData.length === 0) {
    return <><h1>No Data</h1></>;
  }
  return (
    <Card className='dark:border-slate-800 dark:bg-slate-800'>
      <CardBody className="overflow-scroll h-[700px] px-0  dark:bg-slate-800">
        <table className="w-full h-full min-w-max table-auto text-left border-collapse">
          <thead className='dark:bg-slate-800 bg-white' style={{ fontWeight: 'bold', position: 'sticky', top: 0, zIndex: 2 }}>
            <tr >
              {tableHead.map((head) => (
                <th key={head} className=" bg-blue-gray-50/50 p-4 dark:text-white font-bold">
                  <Typography variant="small" color="blue-gray" className="font-heading leading-none">
                    <span style={{ fontWeight: 'bold', fontSize: "1.3em" }}> {head}</span>
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{zIndex:1}}>
            {Array.isArray(tableData) ? (
              tableData.map((rowData, index) => (
                <TableRow key={index} rowData={rowData} />
              ))
            ) : (
              <tr>
                <td colSpan={tableHead.length}>
                  <h1>No Data</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
    );
  }
  
  export default MembersTable;