import React, { useState,useEffect } from 'react';
import {
  Card,
  CardHeader,
  Input,
  Typography,
Button,
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
  const sortOptions = [
    { value: 'All', label: 'All' },
    { value: 'rate_value', label: 'Rate Value' },
    { value: 'sales_value', label: 'Sales Value' },
    { value: 'sales_tax', label: 'Sales Tax' },
    { value: 'ntn', label: 'NTN' },
    { value: 'pos_id', label: 'pos_id ID' },
  ];
  const query = useQuery();
  const navigate=useNavigate()
  const page = parseInt(query.get("page")) || 1;
  const date = query.get("date") || "None";
  const ntn = query.get("ntn") || "None";
  const pos_id = query.get("pos_id") || "None";
  const anomalyParam = query.get("anomaly");
  const anomaly = isNaN(parseInt(anomalyParam)) ? 10 : parseInt(anomalyParam);
  const location = query.get("location") || "None";
  const dispatch = useDispatch();
  const { isLoading, data,anomalyHashMap,allLocation } = useSelector(state => state.centralStore);
  const initialSearchResult = isLoading ? [] : data;
  const [filteredData, setFilteredData] = useState(initialSearchResult);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchNtn, setSearchNtn] = useState('');
  const [sortProperty, setSortProperty] = useState('rate_value');
  const [sortedData, setSortedData] = useState(data);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All'); 
  const TABS = [
  { label: "Anomalous", value: 10 },
  { label: "Non Anomalous", value: 0 },
  ];
const location2= useLocation()
const anomalyFromUrl = new URLSearchParams(location2.search).get("anomaly");
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
    
  if(data.length===0 )
  {
  return 
  }

  useEffect(() => {
    if (anomalyFromUrl !== null) {
      setSelectedDropdownValue(anomalyFromUrl);
    }
  }, [anomalyFromUrl]);

      
  return (
  <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className=" dark:border-slate-700 dark:bg-slate-800 flex justify-evenly">
        <div className='mb-5'>
          <Typography color="gray" className="mt-1 font-normal dark:text-white">
            Filter anomalous data based on your preference
          </Typography>
        </div>
      </div>
      <div className=" dark:border-slate-700 dark:bg-slate-800 flex flex-col items-center justify-around gap-4 md:flex-row">
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
                  navigate(`/dashboard?anomaly=${value}&ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}`)
                }}
              >
                {label} 
              </Tab>
            ))}
   
          </TabsHeader>
        </Tabs>
        <div className='h-10 w-60  dark:border-slate-500 dark:bg-slate-800 dark:text-white rounded flex items-center justify-center'>
              <Input
              placeholder='Search Here'

                icon={<MagnifyingGlassIcon className="h-10 w-5" />}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-5 rounded px-5"
              />
              <Input
              type="number"
              placeholder='Search Ntn Here'

                icon={<MagnifyingGlassIcon className=" ml-2 h-10 w-3" />}
                onChange={(e) => setSearchNtn(e.target.value)}
                className="h-10 w-3 rounded px-3"
              />
              <Button variant="primary" onClick={()=>{
                navigate(`/dashboard?anomaly=${anomaly}&ntn=${searchNtn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}`)
              }}>Ntn</Button>

            </div>
        <div className="mt-1 mb-3 flex gap-2 mx-2 dark:border-slate-500 dark:bg-slate-800 dark:text-white rounded " >

          <div className='flex flex-col px-2'>
          <label className="text-gray-700 dark:text-white ">Filter by Location</label>
          <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value)
                navigate(`/dashboard?anomaly=${anomaly}&ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${e.target.value}`)
              }
            }
              className="border rounded  dark:text-black"
            >
              {allLocation.map((location, index) => (
                <option key={index} value={location.location} className="rounded  font-bold italic bg-grey-300 text-grey-100 hover:bg-darkblue  border border-grey-500 border-solid">
                  {location.location}
                </option>
              ))}
            </select>
          </div>
  <div className='flex flex-col px-2 '>
  <label className="text-gray-700 dark:text-white">Filter by Anomaly:</label>
  

  <select
          className="border rounded-md dark:text-black w-32"
          value={selectedDropdownValue}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setSelectedDropdownValue(selectedValue);
            dispatch(setAnomaly("Anomaly"));
            navigate(`/dashboard?ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}&anomaly=${selectedValue}`);
          }}
        >
          <option value="10" className="rounded-md font-bold italic bg-grey-300 text-grey-200 hover:bg-darkblue  border border-grey-500 border-solid">All</option>
          {Object.keys(anomalyHashMap).map((value) => (
            <option key={value} value={value} className="rounded-md font-bold italic bg-grey-300 text-grey-200 hover:bg-darkblue  border border-grey-500 border-solid">
              {anomalyHashMap[value]}
            </option>
          ))}
        </select>
    </div>
    <div className='flex flex-col px-2  mr-20'>
    <label lassName="text-gray-700 dark:text-white" htmlFor="sortProperty">Sort by:</label>

      
    <select id="sortProperty" className="border rounded-md dark:text-black w-32" value={sortProperty} onChange={handleSortChange}>
  {sortOptions.map(option => (
    <option 
    key={option.value} 
    value={option.value} 
    className="rounded-md font-bold italic bg-grey-300 text-grey-200 hover:bg-darkblue  border border-grey-500 border-solid"
  >
    {option.label}
  </option>
  ))}
</select>
    </div>
</div>
        </div>
      
      
    </CardHeader>
  );
  }
  export default DashboardCardHeader;