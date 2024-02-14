import React from 'react'; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";


 
export function MembersTable() {
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Anomalous",
      value: "anomalous",
    },
    {
      label: "Non Anomalous",
      value: "non-anomalous",
    },
  ];
   
  const TABLE_HEAD = [  
      'pos_id',
      'ntn',
      'rate_value',
      'sales_value',
      'consumer_name',
      'consumer_address',
      'extra_info',
      'is_active',
      'created_date_time',
      'invoice_type',
      'consider_for_Annex',
      'month',
      'weekday',
      'day',
      'time_seconds',
      'anomaly'
  
  
  ];
  
  const jsonData = JSON.stringify([{"pos_id":395,"ntn":55,"rate_value":13,"sales_value":1327.44,"consumer_name":0,"consumer_ntn":0,"consumer_address":0,"extra_info":0,"is_active":1,"created_date_time":1699967059000,"invoice_type":1,"consider_for_Annex":1,"month":11,"weekday":1,"day":14,"time_seconds":47059,"anomaly":0},
  {"pos_id":395,"ntn":55,"rate_value":13,"sales_value":1327.44,"consumer_name":0,"consumer_ntn":0,"consumer_address":0,"extra_info":0,"is_active":1,"created_date_time":1699967059000,"invoice_type":1,"consider_for_Annex":1,"month":11,"weekday":1,"day":14,"time_seconds":47059,"anomaly":0}])
  
  const text = JSON.parse(jsonData)
  console.log(text)
  
  const TableRows = [
    text[0],
    text[1]
  ]
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
                <Tab key={value} value={value}>
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
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TableRows.map(
              ({ pos_id, ntn, rate_value, sales_value, consumer_name, consumer_ntn, consumer_address, extra_info, is_active, created_date_time, invoice_type, consider_for_Annex, month, weekday, day, time_seconds, anomaly}, index) => {
                const isLast = index === TableRows - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={pos_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {pos_id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {ntn}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {rate_value}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {sales_value}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {consumer_ntn}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {consumer_address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {extra_info}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {is_active}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {created_date_time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {invoice_type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {consider_for_Annex}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {month}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {weekday}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {day}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {time_seconds}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {anomaly}
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default MembersTable