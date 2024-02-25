import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Sidebar from '../components/resuseable_components/Sidebar';
import Header from '../components/resuseable_components/Header';
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner';
import DashboardAvatars from '../components/dashboard_components/DashboardAvatars';
import DashoardCardHeader from '../components/dashboard_components/DashboardCardHeader';
import FilterButton from '../components/resuseable_components/DropdownFilter';
import Datepicker from '../components/resuseable_components/Datepicker';
import MembersTable from '../components/dashboard_components/DashboardTable';
import {  useNavigate,useLocation } from 'react-router-dom';
import { getAllInvoice,getNtnInvoice,getPosInvoice } from '../action/action.js';
import Footer from '../components/dashboard_components/DashboardFooter';
import {dummy} from "../data/dummyData.js"
import {addData,addGraphData} from "../redux_store/reducer.js"
import Loader from "../components/utils/Loader"
import DashboardCard from '../components/dashboard_components/DashboardCard'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);}


function Dashboard() {
  const customGreeting = 'Good Morning, SRB👋'
  const customText = 'Here is the latest sales data with anomalies:'

  const {isLoading,data,graphData}=useSelector(state=>state.centralStore)
  // const [data,setData]=useState([])
  const [anomalous,setAnomalous]=useState("True")
  const [totalPos,setTotalPos]=useState(0)
  const [totalNtn,setTotalNtn]=useState(0)
  const [totalAnomaly,setTotalAnomaly]=useState(0)
  const [count,setCount]=useState("True")
  const [limit,setLimit]=useState(1)
  // const [pageno,setPageno]=useState(1)
  const [search,setSearch]=useState([])
  const query=useQuery()
  const offset=parseInt(query.get('offset'))||1
  const ntn=query.get('ntn')||null
  const pos=query.get('pos')||null
    const dispatch=useDispatch()
   
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          let results
           if(pos!=null && ntn!=null){   
            results = await dispatch(getPosInvoice(pos,ntn,offset,anomalous))
          }
          else if(ntn!=null){
            results = await dispatch(getNtnInvoice(ntn,offset,anomalous))
      }
     else if(ntn==null){
         results = await dispatch(getAllInvoice(offset,anomalous));  
      }
      dispatch(addData(results.results))
      dispatch(addGraphData(results))
      dispatch(addGraphData(results))
      dispatch(addGraphData(results))
      setSearch(results.results);
      const limitMatch =results.next?.match(/limit=(\d+)/);
      setLimit( limitMatch ? parseInt(limitMatch[1], 10) : 1)
      setCount(results.count)
      const uniqueNtnIds = new Set(results?.results.map(item => item.ntn_id));
      const totalUniqueNtnIds = uniqueNtnIds.size;
      setTotalNtn(totalUniqueNtnIds)
      // Count unique pos_id values
      setTotalAnomaly(results.count)
      const uniquePosIds = new Set(results.results?.map(item => item.pos_id));
      const totalUniquePosIds = uniquePosIds.size;
      setTotalPos(totalUniquePosIds)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, [anomalous,offset]);
    

if(isLoading  ){ 
  return <><Loader/></>
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
            <WelcomeBanner greeting={customGreeting} text={customText} ntn={ntn} pos={pos}/>
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                <Datepicker />
              </div>

            </div>
            {/* Cards */}
            <div>
              <div className='flex flex-row space-x-4'>
              <DashboardCard title={'Total Anomaly'} value={totalAnomaly}/>
              <DashboardCard title={'Total POS'} value={totalPos}/>
              <DashboardCard title={'Total NTN'} value={totalNtn}/>
              </div>
              {/* Line chart (Acme Plus) */}
              <DashoardCardHeader setAnomalous={setAnomalous} searchData={search} setSearchData={setSearch} anomalous={anomalous}/>
              <MembersTable tableData={search}/>
              <Footer pos={pos} ntn={ntn} offset={offset} total={ limit ? Math.ceil(limit/count ) : 1}/>
              {/* Line chart (Acme Advanced) */} 
            </div>

          </div>
        </main>

      

      </div>
    </div>
  );
}

export default Dashboard;