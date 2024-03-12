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
import {useNavigate,useLocation} from 'react-router-dom'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useDispatch,useSelector} from 'react-redux'
import { setAnomaly } from '../../redux_store/reducer';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const DashboardCardHeader = ({searchData,setSearchData,anomalous}) => {
  const query = useQuery();
  const navigate=useNavigate()
  const page = parseInt(query.get("page")) || 1;
  const date = query.get("date") || "None";
  const ntn = query.get("ntn") || "None";
  const pos = query.get("pos") || "None";
  const anomalyParam = query.get("anomaly");
  const anomaly = isNaN(parseInt(anomalyParam)) ? 10 : parseInt(anomalyParam);
  const location = query.get("location") || "None";
  const dispatch = useDispatch();
  const { isLoading, data,anomalyHashmap,allLocation } = useSelector(state => state.centralStore);
  const initialSearchResult = isLoading ? [] : data;
  const [filteredData, setFilteredData] = useState(initialSearchResult);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortProperty, setSortProperty] = useState('rate_value');
  const [sortedData, setSortedData] = useState(data);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All'); 
  const TABS = [
  { label: "Anomalous", value: 10 },
  { label: "Non Anomalous", value: 0 },
  ];
const location1=["New York","Chicago"]
  useEffect(() => {
  if (Array.isArray(data) && data.length > 0) {
    // Filter data based on search term, selected anomaly, and selected location
    const searchResult = data.filter((item) => {
      const propertiesToSearch = ['rate_value', 'sales_value', 'sales_tax', 'ntn', 'pos_id'];
    
      return propertiesToSearch.some((property) =>
        String(item[property]).toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    });
    
    setSearchData(searchResult);
    setFilteredData(searchResult);
  }
  }, [searchTerm, data, setSearchData, selectedDropdownValue, selectedLocation]);

const handleSortChange = (e) => {
  setSortProperty(e.target.value);
  if(e.target.value==="All"){
    setFilteredData([...newData]);
    setSearchData([...data]);
    return 
  }
  const newData = sortDataByProperty(e.target.value);

  setSearchData([...newData]);
  setFilteredData([...newData]);
};
const sortDataByProperty = (property) => {
  const newData = [...filteredData].sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
    } else {
      return valueB - valueA;
    }
  });

  return newData;
};

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
        <Tabs value={anomaly} className="dark:border-slate-700 dark:bg-slate-800 w-full md:w-max">
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
                  if(value===0){
                    dispatch(setAnomaly("Non-Anomaly"))
                  }else{
                    dispatch(setAnomaly("Anomaly"))
                    
                  }
                  navigate(`/dashboard?anomaly=${value}&ntn=${ntn}&pos=${pos}&page=${page}&date=${date}&location=${location}`)
                }}
              >
                {label} 
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
<div className="mt-1 mb-3 flex gap-4 mx-3 dark:border-slate-500 dark:bg-slate-800 dark:text-white rounded " >
  <Input
placeholder='Search Here'

    icon={<MagnifyingGlassIcon className="h-10 w-5" />}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="h-10 w-40 rounded px-5"
  />

  <label className="text-gray-700 dark:text-white">Filter by Location:</label>
  <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="border rounded-md dark:text-black"
    >
      {allLocation.map((location, index) => (
        <option key={index} value={location.location}>
          {location.location}
        </option>
      ))}
    </select>
  <label className="text-gray-700 dark:text-white">Filter by Anomaly:</label>
  <div >

  <select
  className="border rounded-md dark:text-black w-20"
  value={selectedDropdownValue}
  onChange={(e) => {
    e.preventDefault()
    setSelectedDropdownValue(e.target.value)
    dispatch(setAnomaly("Anomaly"))
    
    navigate(`/dashboard?ntn=${ntn}&pos=${pos}&page=${page}&date=${date}&location=${location}&anomaly=${e.target.value}`)}}
    >
    <option value="10">All</option>
    {[1, 2, 3, 5, 6, 7, 8].map((value) => (
      <option key={value} value={value}>
        {anomalyHashmap[value]}
      </option>
    ))}
  </select>
    </div>
</div>
<div>
      <label htmlFor="sortProperty">Sort by:</label>
      <select id="sortProperty" value={sortProperty} onChange={handleSortChange}>
        <option value="All">All</option>
        <option value="rate_value">Rate Value</option>
        <option value="sales_value">Sales Value</option>
        <option value="sales_tax">Sales Tax</option>
        <option value="ntn">NTN</option>
        <option value="pos_id">POS ID</option>
      </select>

    </div>
        </div>
      
      
    </CardHeader>
  );
  }
  export default DashboardCardHeader;