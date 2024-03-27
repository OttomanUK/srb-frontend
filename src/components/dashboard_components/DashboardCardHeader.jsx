import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setAnomaly } from "../../redux_store/reducer";
import Select from "react-select";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#1a202c" : isFocused ? "#e2e8f0" : "white",
    color: isSelected ? "#fff" : "#4a5568",
    fontWeight: "bold",
    fontStyle: "italic",
    borderRadius: "0.375rem",
    border: "1px solid #cbd5e0",
    "&:hover": {
      backgroundColor: "#1a202c",
      color: "#fff",
    },
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (styles) => ({ ...styles, width: 200 }),
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const DashboardCardHeader = ({ searchData, setSearchData, anomalous }) => {
  const sortOptions = [
    { value: "All", label: "All" },
    { value: "rate_value", label: "Rate Value" },
    { value: "sales_value", label: "Sales Value" },
    { value: "sales_tax", label: "Sales Tax" },
    { value: "ntn", label: "NTN" },
    { value: "pos_id", label: "pos_id ID" },
  ];
  const query = useQuery();
  const navigate = useNavigate();
  const page = parseInt(query.get("page")) || 1;
  const date = query.get("date") || "None";
  const ntn = query.get("ntn") || "None";
  const pos_id = query.get("pos_id") || "None";
  const anomalyParam = query.get("anomaly");
  const anomaly = isNaN(parseInt(anomalyParam)) ? 10 : parseInt(anomalyParam);
  const location = query.get("location") || "None";
  const dispatch = useDispatch();
  const { isLoading, data, anomalyHashMap, allLocation, allNtn } = useSelector(
    (state) => state.centralStore
  );
  const initialSearchResult = isLoading ? [] : data;
  const [filteredData, setFilteredData] = useState(initialSearchResult);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPos, setSearchPos] = useState("");
  const [sortProperty, setSortProperty] = useState("rate_value");
  const [sortedData, setSortedData] = useState(data);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedNtn, setSelectedNtn] = useState("All");
  const TABS = [
    { label: "Anomalous", value: 10 },
    { label: "Non Anomalous", value: 0 },
  ];
  const location2 = useLocation();
  const anomalyFromUrl = new URLSearchParams(location2.search).get("anomaly");
  const location1 = ["New York", "Chicago"];
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      // Filter data based on search term, selected anomaly, and selected location
      const searchResult = data.filter((item) => {
        const propertiesToSearch = [
          "rate_value",
          "sales_value",
          "sales_tax",
          "ntn",
          "pos_id",
        ];

        return propertiesToSearch.some((property) =>
          String(item[property])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });

      setSearchData(searchResult);
      setFilteredData(searchResult);
    }
  }, [searchTerm, data, setSearchData, selectedDropdownValue]);

  const handleSortChange = (e) => {
    setSortProperty(e.value);
    if (e.value === "All") {
      setFilteredData([...newData]);
      setSearchData([...data]);
      return;
    }
    const newData = sortDataByProperty(e.value);

    setSearchData([...newData]);
    setFilteredData([...newData]);
  };
  const sortDataByProperty = (property) => {
    const newData = [...filteredData].sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      } else {
        return valueB - valueA;
      }
    });

    return newData;
  };

  if (data.length === 0) {
    return null; // Adjusted to return null instead of an empty div
  }

  if (data.length === 0) {
    return;
  }

  useEffect(() => {
    if (anomalyFromUrl !== null) {
      setSelectedDropdownValue(anomalyFromUrl);
    }
  }, [anomalyFromUrl]);

  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className=" dark:border-slate-700 dark:bg-slate-800 flex justify-evenly">
        <div className="mb-5">
          <Typography color="gray" className="mt-1 font-normal dark:text-white">
            Filter anomalous data based on your preference
          </Typography>
        </div>
      </div>
      <div>
        <div className=" dark:border-slate-700 dark:bg-slate-800 flex flex-col items-center justify-around gap-4 md:flex-row">
          <Tabs
            value={anomaly}
            className="dark:border-slate-700 dark:bg-slate-800 w-full md:w-max"
          >
            <TabsHeader
              className="rounded-none bg-transparent p-0 dark:text-white"
              indicatorProps={{
                className:
                  "bg-transparent border-b-4 border-gray-900 shadow-none rounded-none",
              }}
            >
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    if (value === 0) {
                      dispatch(setAnomaly("Non-Anomaly"));
                    } else {
                      dispatch(setAnomaly("Anomaly"));
                    }
                    navigate(
                      `/dashboard?anomaly=${value}&ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}`
                    );
                  }}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="dark:border-slate-500 dark:bg-slate-800 dark:text-white rounded flex items-center justify-center gap-5">
            <Input
              placeholder="Search Here"
              icon={<MagnifyingGlassIcon className="h-10 w-5" />}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-10 rounded px-5"
            />
            <Input
              type="number"
              placeholder="Search Pos Here"
              icon={<MagnifyingGlassIcon className="h-10 w-5" />}
              onChange={(e) => setSearchPos(e.target.value)}
              className="h-10 w-5 rounded px-5"
            />
            <Button
              variant="primary"
              onClick={() => {
                navigate(
                  `/dashboard?anomaly=${anomaly}&ntn=${ntn}&pos_id=${searchPos}&page=${page}&date=${date}&location=${location}`
                );
              }}
            ></Button>
          </div>
        </div>
        <div className="flex gap-2 dark:border-slate-800 dark:bg-slate-800 dark:text-white justify-center items-center py-5">
          <div className="flex flex-col px-2">
            <label className="text-gray-700 dark:text-white ">
              Filter by Location
            </label>
            <Select
              className="dark:text-black"
              value={{ label: selectedLocation, value: selectedLocation }}
              onChange={(selectedOption) => {
                setSelectedLocation(selectedOption.value);
                navigate(
                  `/dashboard?anomaly=${anomaly}&ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${selectedOption.value}`
                );
              }}
              menuPortalTarget={document.body}
              styles={colourStyles}
              options={allLocation.map((location) => ({
                label: location.location,
                value: location.location,
              }))}
            />
          </div>
          <div className="flex flex-col px-2">
            <label className="text-gray-700 dark:text-white ">
              Filter by Location
            </label>
            <Select
              value={{ value: selectedNtn, label: selectedNtn }}
              onChange={(selectedOption) => {
                setSelectedNtn(selectedOption.value);
                navigate(
                  `/dashboard?anomaly=${anomaly}&ntn=${selectedOption.value}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}`
                );
              }}
              menuPortalTarget={document.body}
              styles={colourStyles}
              options={allNtn.map((ntn) => ({
                value: ntn,
                label: ntn,
              }))}
            />
          </div>
          <div className="flex flex-col px-2 ">
            <label className="text-gray-700 dark:text-white">
              Filter by Anomaly:
            </label>

            <Select
              value={{
                value: selectedDropdownValue,
                label: anomalyHashMap[selectedDropdownValue] || "All",
              }}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption.value;
                setSelectedDropdownValue(selectedValue);
                dispatch(setAnomaly("Anomaly"));
                navigate(
                  `/dashboard?ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}&anomaly=${selectedValue}`
                );
              }}
              styles={colourStyles}
              menuPortalTarget={document.body}
              options={[
                { value: "10", label: "All" },
                ...Object.keys(anomalyHashMap).map((value) => ({
                  value,
                  label: anomalyHashMap[value],
                })),
              ]}
            />
          </div>
          <div className="flex flex-col px-2  mr-20">
            <label
              lassName="text-gray-700 dark:text-white"
              htmlFor="sortProperty"
            >
              Sort by:
            </label>

            <Select
              menuPortalTarget={document.body}
              value={sortOptions.find(
                (option) => option.value === sortProperty
              )}
              onChange={handleSortChange}
              options={sortOptions}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              styles={colourStyles}
            />
          </div>
        </div>
      </div>
    </CardHeader>
  );
};
export default DashboardCardHeader;
