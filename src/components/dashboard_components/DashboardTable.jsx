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
    'srb_invoice_id',
    'pos_id',
    'ntn',
    'name',
    'invoice_date',
    'invoice_no',
    'rate_value',
    'sales_value',
    'sales_tax',
    'consumer_name',
    'consumer_ntn',
    'consumer_address',
    'tariff_code',
    'extra_info',
    'pos_user',
    'pos_pass',
    'is_active',
    'created_date_time',
    'invoice_type',
    'consider_for_Annex',
];
 
const TABLE_ROWS = [
    {
        srb_invoice_id: 1,
        pos_id: 'POS123',
        ntn: 'NTN123',
        name: 'Company A',
        invoice_date: '2024-02-12',
        invoice_no: 'INV001',
        rate_value: 100,
        sales_value: 120,
        sales_tax: 20,
        consumer_name: 'John Doe',
        consumer_ntn: 'NTN456',
        consumer_address: '123 Main St',
        tariff_code: 'TC123',
        extra_info: 'Additional info',
        pos_user: 'user123',
        pos_pass: 'pass123',
        is_active: true,
        created_date_time: '2024-02-12T12:00:00',
        invoice_type: 'TypeA',
        consider_for_Annex: true,
      },
      {
        srb_invoice_id: 2,
        pos_id: 'POS456',
        ntn: 'NTN789',
        name: 'Company B',
        invoice_date: '2024-02-15',
        invoice_no: 'INV002',
        rate_value: 150,
        sales_value: 180,
        sales_tax: 25,
        consumer_name: 'Jane Doe',
        consumer_ntn: 'NTN101',
        consumer_address: '456 Oak St',
        tariff_code: 'TC456',
        extra_info: 'Additional details',
        pos_user: 'user456',
        pos_pass: 'pass456',
        is_active: false,
        created_date_time: '2024-02-15T14:30:00',
        invoice_type: 'TypeB',
        consider_for_Annex: false,
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      {
        "srb_invoice_id": 2,
        "pos_id": "POS124",
        "ntn": "NTN124",
        "name": "Company B",
        "invoice_date": "2024-02-13",
        "invoice_no": "INV002",
        "rate_value": 95,
        "sales_value": 110,
        "sales_tax": 15,
        "consumer_name": "Jane Smith",
        "consumer_ntn": "NTN457",
        "consumer_address": "456 Oak Ave",
        "tariff_code": "TC124",
        "extra_info": "Additional details",
        "pos_user": "user124",
        "pos_pass": "pass124",
        "is_active": true,
        "created_date_time": "2024-02-13T12:00:00",
        "invoice_type": "TypeB",
        "consider_for_Annex": false
      },
      
];
 
export function MembersTable() {
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
            {TABLE_ROWS.map(
              ({ name, srb_invoice_id, pos_id, ntn, invoice_date, invoice_no, rate_value, sales_value, sales_tax, consumer_name, consumer_ntn, consumer_address, tariff_code, extra_info, pos_user, pos_pass, is_active, created_date_time, invoice_type, consider_for_Annex }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
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
                          {srb_invoice_id}
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
                          {pos_id}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {ntn}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {invoice_date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {invoice_no}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {rate_value}
                      </Typography>
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
                        {sales_tax}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {consumer_name}
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
                        {tariff_code}
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
                        {pos_user}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pos_pass}
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