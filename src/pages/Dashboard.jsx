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
import {
  addData
} from "../redux_store/reducer.js";


function useQuery() {
  return new URLSearchParams(useLocation().search);}


function Dashboard() {

  // const [data,setData]=useState([])
  const [anomalous,setAnomalous]=useState("True")
  const [count,setCount]=useState("True")
  const [limit,setLimit]=useState(1)
  // const [pageno,setPageno]=useState(1)
  const [search,setSearch]=useState([])
  const query=useQuery()
  const offset=parseInt(query.get('offset'))||1
  const ntn=query.get('ntn')||null
  const pos=query.get('pos')||null
    const dispatch=useDispatch()
    const {isLoading,data}=useSelector(state=>state.centralStore)
   
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          let results
          if(ntn!=null){
            results = await dispatch(getNtnInvoice(ntn,offset,anomalous))
      }
      if(pos!=null && ntn!=null){   
         results = await dispatch(getPosInvoice(pos,ntn,offset,anomalous))
      }
      if(ntn==null){
         results = await dispatch(getAllInvoice(offset,anomalous));  
      }
      dispatch(addData(results.results))
      setSearch(results.results);
      const limitMatch = results.next.match(/limit=(\d+)/);
      setLimit( limitMatch ? parseInt(limitMatch[1], 10) : 1)
      setCount(results.count)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, [anomalous,offset]);
    

if(isLoading  ){ 
  return <><h1>fhj</h1></>
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
            <WelcomeBanner />
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                <Datepicker />
              </div>

            </div>

            <div></div>

            {/* Cards */}
            <div>
              {/* Line chart (Acme Plus) */}
              <DashoardCardHeader setAnomalous={setAnomalous} searchData={search} setSearchData={setSearch} anomalous={anomalous}/>
              <MembersTable tableData={search}/>
              <Footer pos={pos} ntn={ntn} offset={offset} total={ limit ? Math.ceil(limit/count ) : null}/>
              {/* Line chart (Acme Advanced) */} 
            </div>

          </div>
        </main>

      

      </div>
    </div>
  );
}

export default Dashboard;