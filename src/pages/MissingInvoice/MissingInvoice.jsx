import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Radio } from "@material-tailwind/react";
import Sidebar from "../../components/resuseable_components/Sidebar";
import Header from "../../components/resuseable_components/Header";
import WelcomeBanner from "../../components/dashboard_components/WelcomeBanner";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMissingInvoice } from "../../action/action";
import Loader from "../../components/utils/Loader";
import Footer from "../../components/dashboard_components/DashboardFooter";
import "./MissingInvoice.css";
import { pageLimit } from "../../api/data";
import PleaseReload from "../PleaseReload";
import Datepicker from "../../components/resuseable_components/Datepicker";
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
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MissingInvoice() {
  const navigate = useNavigate();
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const date = query.get("date") || "None";
  const ntn = query.get("ntn") || "all";
  const pos_id = query.get("pos_id") || "None";
  const location = query.get("location") || "None";
  const dispatch = useDispatch();
  const { allLocation, allNtn } = useSelector((state) => state.centralStore);

  const { id } = useParams();
  const { isLoading } = useSelector((state) => state.centralStore);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const customGreeting = "Missing Invoices";
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedNtn, setSelectedNtn] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // State variable for sorting order

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        const a = await dispatch(
          getMissingInvoice(ntn, page, date, pos_id, location)
        );
        setData(a.results);
        setCount(a.count);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchData();
  }, [page, ntn, date, pos_id, location]);

  useEffect(() => {
    try {
      setError(false);
      const filteredResults = data.filter((item) => {
        const dateString = String(item.date);
        return dateString.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredData(filteredResults);
    } catch (error) {
      setError(true);
    }
  }, [searchInput, data]);

  const handleSort = (order) => {
    const sortedData = [...filteredData];
    if (order === "asc") {
      sortedData.sort(
        (a, b) =>
          calculateMissingInvoiceCount(a.invoices) -
          calculateMissingInvoiceCount(b.invoices)
      );
      setSortOrder("asc");
    } else {
      sortedData.sort(
        (a, b) =>
          calculateMissingInvoiceCount(b.invoices) -
          calculateMissingInvoiceCount(a.invoices)
      );
      setSortOrder("desc");
    }
    setFilteredData(sortedData);
  };
  if (error) {
    return <PleaseReload />;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (data == null) {
    return (
      <>
        <h1>No Data</h1>
      </>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <WelcomeBanner greeting={customGreeting} />
          <div className="mb-4">
            <div className="flex justify-between">
              <div className="mt-3">
                <Datepicker
                  string={"Missing"}
                  style={{ display: "inline-block" }}
                />
              </div>
              <div className="flex justify-end items-end gap-2">
                <div className="flex flex-col">
                  <label className="text-gray-700 dark:text-white ">
                    Filter by Location
                  </label>
                  <Select
                    value={{ value: selectedLocation, label: selectedLocation }}
                    onChange={(selectedOption) => {
                      setSelectedLocation(selectedOption.value);
                      navigate(
                        `/Missing?&ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${selectedOption.value}`
                      );
                    }}
                    options={allLocation.map((location) => ({
                      value: location.location,
                      label: location.location,
                    }))}
                    className="border rounded  dark:text-black w-64"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 dark:text-white ">
                    Filter by Ntn
                  </label>
                  <Select
                    value={{ value: selectedNtn, label: selectedNtn }}
                    onChange={(selectedOption) => {
                      setSelectedNtn(selectedOption.value);
                      navigate(
                        `/Missing?&ntn=${selectedOption.value}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}`
                      );
                    }}
                    options={allNtn.map((ntn) => ({ value: ntn, label: ntn }))}
                    className="border rounded  dark:text-black w-32"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
          
            <div className="flex items-center">
            <label className="text-gray-700 dark:text-white">
              Sort by Missing Count:
            </label>
              <Radio
                className="px-0"
                id="asc"
                color="lightBlue"
                checked={sortOrder === "asc"}
                onChange={() => handleSort("asc")}
              />
              <label htmlFor="asc" className="text-gray-700 dark:text-white">
                Ascending
              </label>
              <Radio
                id="desc"
                color="lightBlue"
                checked={sortOrder === "desc"}
                onChange={() => handleSort("desc")}
              />
              <label htmlFor="desc" className="text-gray-700 dark:text-white">
                Descending
              </label>
            </div>
          </div>
          <Card className="dark:border-slate-700 dark:bg-slate-800">
            <CardBody className="overflow-auto px-0 dark:border-slate-700 dark:bg-slate-800">
              <table className="w-full overflow-scroll h-[700px] ">
                <thead>
                  <tr>
                    <th className="text-gray-700 dark:text-white font-bold">
                      Date
                    </th>
                    <th className="text-gray-700 dark:text-white font-bold">
                      NTN{" "}
                    </th>
                    <th className="text-gray-700 dark:text-white font-bold">
                      Pos
                    </th>
                    <th className="text-gray-700 dark:text-white font-bold">
                      Location
                    </th>
                    <th className="text-gray-700 dark:text-white font-bold">
                      Invoices
                    </th>
                    <th className="text-gray-700 dark:text-white font-bold">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="text-center text-gray-700 dark:text-white border "
                    >
                      <td>{item.date}</td>

                      <td>{item.ntn}</td>
                      <td>{item.pos_id}</td>
                      <td>{item.location}</td>
                      <td>{item.invoices}</td>
                      <td>{calculateMissingInvoiceCount(item.invoices)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
          <Footer string="missing" total={Math.ceil(count / pageLimit)} />
        </div>
      </div>
    </div>
  );
}

export default MissingInvoice;
const calculateMissingInvoiceCount = (invoices) => {
  if (!invoices) {
    return 0;
  }
  const invoiceRanges = invoices.split(",");
  let missingCount = 0;
  invoiceRanges.forEach((range) => {
    if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      missingCount += end - start + 1;
    } else {
      missingCount++;
    }
  });
  return missingCount;
};
