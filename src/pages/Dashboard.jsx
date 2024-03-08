import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/resuseable_components/Sidebar";
import Header from "../components/resuseable_components/Header";
import WelcomeBanner from "../components/dashboard_components/WelcomeBanner";
import DashboardAvatars from "../components/dashboard_components/DashboardAvatars";
import DashoardCardHeader from "../components/dashboard_components/DashboardCardHeader";
import FilterButton from "../components/resuseable_components/DropdownFilter";
import Datepicker from "../components/resuseable_components/Datepicker";
import MembersTable from "../components/dashboard_components/DashboardTable";
import { useNavigate, useLocation } from "react-router-dom";
import {pageLimit} from '../api/data.js'
import {
  getAllInvoice,
  getNtnInvoice,
  getPosInvoice,
} from "../action/action.js";
import Footer from "../components/dashboard_components/DashboardFooter";
import { dummy } from "../data/dummyData.js";
import {
  addData,
  addGraphData,
  addNtn,
  addDate,
  addPos,
  addLocation,
  addGoToGraph,
  addAnomalous
} from "../redux_store/reducer.js";
import Loader from "../components/utils/Loader";
import DashboardCard from "../components/dashboard_components/DashboardCard";
import { Card, CardBody } from "@material-tailwind/react";
import PleaseReload from '../pages/PleaseReload.jsx'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Dashboard() {
  const customGreeting = "Good Morning, SRB👋";
  const customText = "Here is the latest sales data with anomalies:";

  const { isLoading, goToGraph } = useSelector(
    (state) => state.centralStore
  );
  const [loading,setLoading]=useState(true)
  const [anomalous, setAnomalous] = useState(10);
  const [totalPos, setTotalPos] = useState(0);
  const [totalNtn, setTotalNtn] = useState(0);
  const [totalAnomaly, setTotalAnomaly] = useState(0);
  const [count, setCount] = useState("True");
  const [limit, setLimit] = useState(1);
  // const [pageno,setPageno]=useState(1)
  const [error,setError]=useState(false)
  const [search, setSearch] = useState([]);
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const date = query.get("date") || "None";
  const ntn = query.get("ntn") || "None";
  const pos = query.get("pos") || "None";
  const location = query.get("location") || "None";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(false)
        let results;
        results = await dispatch(getPosInvoice(pos, ntn, page, anomalous,date,location));
        dispatch(addData(results.results));
        dispatch(addGraphData(results));
        setSearch(results.results);
        setCount(results.count);
        const uniqueNtnIds = new Set(results?.results.map((item) => item.ntn));
        const totalUniqueNtnIds = uniqueNtnIds.size;
        setTotalNtn(totalUniqueNtnIds);
        // Count unique pos_id values
        setTotalAnomaly(results.count);
        const uniquePosIds = new Set(
          results.results?.map((item) => item.pos_id)
          );
          const totalUniquePosIds = uniquePosIds.size;
          setTotalPos(totalUniquePosIds);
          dispatch(addNtn(ntn));
          dispatch(addPos(pos));
          dispatch(addDate(date));
          dispatch(addLocation(location));
          dispatch(addAnomalous(anomalous));
          if(goToGraph){
            dispatch(addGoToGraph(false))
            navigate("/Analytics")
          }
          setLoading(false)
        } catch (error) {
          setError(true)
      }
    };

    fetchData();
  }, [anomalous, page, ntn, pos, date,location]);

  if(error){
    return <PleaseReload/>
  }
  if (loading) {
    return <Loader /> 
  }
  if (isLoading) {
    return <Loader /> 
  }


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner
            
              text={customText}
              ntn={ntn}
              pos={pos}
              location={location}
              show={true}
            />
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                <Datepicker string="dashboard" ntn={ntn} pos={pos} />
              </div>
            </div>
            {/* Cards */}
            <div>
              <div className="flex flex-row space-x-4">
                <DashboardCard title={"Total Anomaly"} value={totalAnomaly} />
                <DashboardCard title={"Total POS"} value={totalPos} />
                <DashboardCard title={"Total NTN"} value={totalNtn} />
                {ntn != "None" && (
                  <Card className="dark:border-slate-700 dark:bg-slate-800 w-full min-w-max ">
                    <CardBody className="dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center h-24">
                      <div
                        className="text-xl font-bold flex flex-row dark:text-white"
                        onClick={() => navigate(`/missing/?ntn=${ntn}`)}
                      >
                        Missing Invoice
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
              {/* Line chart (Acme Plus) */}
              <DashoardCardHeader
                setAnomalous={setAnomalous}
                searchData={search}
                setSearchData={setSearch}
                anomalous={anomalous}
              />
              <MembersTable tableData={search} />
              <Footer
                pos={pos}
                ntn={ntn}
                page={page}
                location={location}
                total={Math.ceil(count / pageLimit)}
                string="dashboard"
                date={date}
              />
              {/* Line chart (Acme Advanced) */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
