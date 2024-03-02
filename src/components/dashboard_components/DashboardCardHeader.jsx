import React, { useState,useEffect } from 'react';
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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useDispatch,useSelector} from 'react-redux'
import { setAnomaly } from '../../redux_store/reducer';
const DashboardCardHeader = ({ setAnomalous,searchData,setSearchData,anomalous}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const dispatch=useDispatch()
  const {isLoading,data}=useSelector(state=>state.centralStore)
  const TABS = [
    { label: "Anomalous", value: 10 },
    { label: "Non Anomalous", value: 0 },
  ];
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      // Filter data based on search term
      const searchResult = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(searchResult);
      setSearchData(searchResult);
    }
        }, [searchTerm,data]);
      
      
      if(data.lenght===0)
      {
        return 
      }
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" dark:border-slate-700 dark:bg-slate-800 flex justify-evenly">
          <div>
            <Typography color="gray" className="mt-1 font-normal dark:text-white">
              Filter anomalous data based on your preference
            </Typography>
          </div>
        </div>
        <div className=" dark:border-slate-700 dark:bg-slate-800 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={anomalous} className="dark:border-slate-700 dark:bg-slate-800 w-full md:w-max">
  <TabsHeader
    className="rounded-none bg-transparent p-0 dark:text-white" 
    indicatorProps={{
      className:"bg-transparent border-b-4 border-gray-900 shadow-none rounded-none",
    }}
  >
    {TABS.map(({ label, value }) => (
      <Tab 
        key={value} 
        value={value} 
        onClick={() => {
          if(value===10){
            dispatch(setAnomaly("Anomaly"))
          }else{
            dispatch(setAnomaly("Non-Anomaly"))

          }
          setAnomalous(value);
        }}
      >
        {label} 
      </Tab>
    ))}
  </TabsHeader>
</Tabs>

          <div className=" mb-8 flex gap-8 mx-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-10 w-10" /> }
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      
  );
}
export default DashboardCardHeader;