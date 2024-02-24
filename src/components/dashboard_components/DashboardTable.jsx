mport React,{useState,useEffect} from 'react'; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
    <Card className='dark:border-slate-700 dark:bg-slate-800' >
      <CardBody className=" overflow-scroll px-0 dark:border-slate-700 dark:bg-slate-800">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            
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
export default MembersTable