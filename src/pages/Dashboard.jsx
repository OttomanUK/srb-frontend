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


function useQuery() {
  return new URLSearchParams(useLocation().search);}


function Dashboard() {
  const customGreeting = 'Good Morning, SRB👋'
  const customText = 'Here is the latest sales data with anomalies:'

    const dispatch=useDispatch()
    const {isLoading}=useSelector(state=>state.centralStore)
    const [anomalous,setAnomalous]=useState(true)
    const [pageno,setPageno]=useState(1)
   const query=useQuery()
   const page=query.get('page')||1
   const ntn=query.get('ntn')||null
   const pos=query.get('pos')||null
   const [data,setData]=useState(null)
   const [search,setSearch]=useState(null)
   
    useEffect(()=>{
      if(ntn!=null){
        
        // data=dispatch(getNtnInvoice(ntn,anomalous))
      }
      if(pos!=null && ntn!=null){
        // data=dispatch(getPosInvoice(pos,anomalous))

      }
      if(ntn==null){

        // dispatch(getAllInvoice(anomalous))
      }
      setData(dummy)
  setSearch(dummy)
        // dispatch(getAllInvoice())
    },[page,anomalous])



  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <WelcomeBanner greeting={customGreeting} text={customText}/>
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
              <DashoardCardHeader setAnomalous={setAnomalous} setTableData={setData} tableData={data} searchData={search} setSearchData={setSearch}/>
              <MembersTable tableData={search}/>
              <Footer/>
              {/* Line chart (Acme Advanced) */} 
            </div>

          </div>
        </main>

      

      </div>
    </div>
  );
}

export default Dashboard;