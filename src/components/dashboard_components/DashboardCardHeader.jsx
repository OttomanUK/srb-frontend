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

  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(state => state.centralStore);
  const initialSearchResult = isLoading ? [] : data;
  const [filteredData, setFilteredData] = useState(initialSearchResult);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All'); 
  const TABS = [
  { label: "Anomalous", value: 10 },
  { label: "Non Anomalous", value: 0 },
  ];

  useEffect(() => {
  if (Array.isArray(data) && data.length > 0) {
    // Filter data based on search term, selected anomaly, and selected location
    const searchResult = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (selectedDropdownValue === 'All' || item.anomaly === parseInt(selectedDropdownValue)) &&
      (selectedLocation === 'All' || item.location.toLowerCase() === selectedLocation.toLowerCase())
    );

    setSearchData(searchResult);
    setFilteredData(searchResult);
  }
  }, [searchTerm, data, setSearchData, selectedDropdownValue, selectedLocation]);


  if (data.length === 0) {
  return null; // Adjusted to return null instead of an empty div
  }
    
  if(data.length===0)
  {
  return 
  }


      
  return (
  <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className=" dark:border-slate-700 dark:bg-slate-800 flex justify-evenly">
        <div className='mb-5'>
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
        <label className="text-gray-700 dark:text-white">Filter by Location:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border rounded-md dark:text-black"
        >
          <option value="All" selected>All</option>
          {/* Add other location options as needed */}
          <option value="New York">New York</option>
          <option value="London">London</option>
        </select>
            <label className="text-gray-700 dark:text-white">Filter by Anomaly:</label>
            <select
          value={selectedDropdownValue}
          onChange={(e) => setSelectedDropdownValue(e.target.value)}
          className="border rounded-md dark:text-black"
        >
          <option value="All">All</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        </div>
      </div>
      
    </CardHeader>
  );
  }
  export default DashboardCardHeader;