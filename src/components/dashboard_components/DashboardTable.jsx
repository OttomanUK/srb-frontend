import React,{useState,useEffect} from 'react'; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Footer from './DashboardFooter';
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


 
export function MembersTable() {
  const TABS = [
    { label: "Anomalous", value: "True" },
    { label: "Non Anomalous", value: "False" },
  ];
  const [anomalous,setAnomolous]=useState("True");

  const TABLE_HEAD = [
    'pos_id', 'ntn', 'rate_value', 'sales_value', 'consumer_name', 'consumer_address', 'extra_info', 'is_active', 'created_date_time', 'invoice_type', 'consider_for_Annex', 'month', 'weekday', 'day', 'time_seconds', 'anomaly'
  ];

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    try {
      const jsonData = JSON.stringify([
        {"pos_id": 395, "ntn": 55, "rate_value": 13, "sales_value": 1327.44, "consumer_name": 0, "consumer_ntn": 0, "consumer_address": 0, "extra_info": 0, "is_active": 1, "created_date_time": 1699967059000, "invoice_type": 1, "consider_for_Annex": 1, "month": 11, "weekday": 1, "day": 14, "time_seconds": 47059, "anomaly": 0},
        {"pos_id": 395, "ntn": 55, "rate_value": 13, "sales_value": 1327.44, "consumer_name": 0, "consumer_ntn": 0, "consumer_address": 0, "extra_info": 0, "is_active": 1, "created_date_time": 1699967059000, "invoice_type": 1, "consider_for_Annex": 1, "month": 11, "weekday": 1, "day": 14, "time_seconds": 47059, "anomaly": 1}
      ]);
      const parsedData = JSON.parse(jsonData);
      console.log("hi")
      setTableData(parsedData);
    } catch (error) {
      console.error('Error parsing JSON data:', error.message);
      // Handle error as needed
    }
  }, [anomalous]);
  
  return (
    <Card className='dark:border-slate-700 dark:bg-slate-800' >
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" dark:border-slate-700 dark:bg-slate-800 flex justify-evenly">
          <div>
            <Typography color="gray" className="mt-1 font-normal ">
              Filter anomalous data based on your preference
            </Typography>
          </div>
        </div>
        <div className=" dark:border-slate-700 dark:bg-slate-800 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="dark:border-slate-700 dark:bg-slate-800 w-full md:w-max">
          <TabsHeader
        className="rounded-none bg-transparent p-0" indicatorProps={{className:"bg-transparent border-b-4 border-gray-900 shadow-none rounded-none",
        }}
      >
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value} onClick={()=>setAnomolous(value)}>
                  {label} 
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className=" mb-8 flex gap-8 mx-3 dark:border-slate-700 dark:bg-slate-800">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-10 w-10" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className=" overflow-scroll px-0 dark:border-slate-700 dark:bg-slate-800">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, index) => (
              <TableRow key={index} rowData={rowData} />
            ))}
          </tbody>
        </table>
      </CardBody>

      <Footer/>
    </Card>
  );
}
export default MembersTable