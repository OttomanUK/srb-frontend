import React, { useEffect, useState } from 'react';
import TimeSeriesPlot from '../components/plots/time_series_plot.jsx';
import PiePlot from '../components/plots/pie_plots.jsx';
import BarPlot from '../components/plots/barplot.jsx';
import Card from "../components/resuseable_components/card.jsx";
// import jsonData from  '../data/dummyData.json';
import Sidebar from '../components/resuseable_components/Sidebar.jsx';  
import Header from '../components/resuseable_components/Header.jsx';
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner.jsx';
import {useDispatch,useSelector} from 'react-redux'
import {useLocation,useNavigate} from 'react-router-dom'
import {API} from "../api/index.js"
import {getMissingInvoice} from "../action/action.js"
import { startLoading,endLoading } from '../redux_store/reducer.js';
import Loader from '../components/utils/Loader.jsx';
import DashboardCard from '../components/dashboard_components/DashboardCard.jsx';
import MissingBarPlot from '../components/plots/missingbar.jsx';
// Adjust the path based on your project structure
// import PiePlot from './pie_plots';


const Analytics = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const customGreeting = 'Analytics'
  const customText = 'Gather insights'
    const {isLoading,reduxNtn,reduxPos,anomaly,graphData}=useSelector(state=>state.centralStore)
   const [resultsfinal, setResultsFinal] = useState([]);
   const [loading,setLoading]=useState(false)
   const [nextPage, setNextPage] = useState(1);
   const [missing, setMissing] = useState([]);
   const [delayAverage, setDelayAverage] = useState(0);
   const [averageRate, setAverageRate] = useState(0);
   const [totalSales,setTotalSales] = useState(0);
   
   const [sidebarOpen, setSidebarOpen] = useState(false);


   useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setResultsFinal([])
      
      const storedData = localStorage.getItem('nextUrl');
      let nextUrl = JSON.parse(storedData);
      let page = 1;
      
      while (page <= 10) {
        try {
          const modifiedUrl = new URL(nextUrl);
          modifiedUrl.searchParams.set('page', page.toString());
          
          const { data } = await API.get(`/filter/${modifiedUrl.search}`);
          setResultsFinal((prevResults) => [...prevResults, ...data.results]);
          
          if (data.next) {
            nextUrl = data.next;
            setNextPage(data.next);
            ++page;
          } else {
            break;
          }
        } catch (error) {
          navigate('/NotFound')
          break; // Break the loop if an error occurs
        }
      }
      if(page===1){
        setResultsFinal(graphData.results)
    }
    setLoading(false)
    };
    setLoading(true)
    console.log('i fire once');
    fetchData();
    
     
      setLoading(false)
  }, []);
  useEffect(() => {

    setLoading(true)
    const fetch=async()=>{
      
        let page = 1;
        while (page <= 10) {
          try {
            const data=await dispatch(getMissingInvoice(reduxNtn,page))
            // console.log(results+"oikoio")
          setMissing(((prevResults) => [...prevResults, ...data.results]))
          if (data.next) {
            ++page;
          } else {
            break;
          }
        } catch (error) {
          break; // Break the loop if an error occurs
        }
      }
    }
    fetch()
    const {
      averageRate,
      averageSalesTax,
      totalSales,
      averageDelayMinutes
    } = calculateStatistics(resultsfinal);
    setAverageRate(averageRate);
    setDelayAverage(delayAverage);
    setTotalSales(totalSales);
    setLoading(false)
  },[])
  
     if(loading){
        return <Loader/>
}
   if(resultsfinal.lenght===0){
    
    return <Loader/>
   }
  

  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner greeting={customGreeting} text={customText} show={true} ntn={reduxNtn} pos={reduxPos}/>
            <div className='flex flex-row space-x-4'>
              <DashboardCard title={'Total Anomaly'} value={resultsfinal.length}/>
              <DashboardCard title={'Avg Delay(Minutes)'} value={delayAverage}/>
              <DashboardCard title={'Total Sales'} value={totalSales}/>
              <DashboardCard title={'Average Rate'} value={averageRate}/>
              </div>
              {/* Other components */}
            <TimeSeriesPlot data={resultsfinal} showAnomalyCount={true} anomaly1={anomaly}/>
            <TimeSeriesPlot data={resultsfinal} showAnomalyCount={false} anomaly1={anomaly}/>

            <PiePlot anomaly1={anomaly} data={resultsfinal} chartBy="ntn"/>
            <BarPlot anomaly1={anomaly} data={resultsfinal} chartBy="ntn"/>
            {/* or */}
            <PiePlot anomaly1={anomaly} data={resultsfinal} chartBy="pos_id"/>
            <BarPlot anomaly1={anomaly} data={resultsfinal} chartBy="pos_id"/>
            <MissingBarPlot anomaly1={anomaly} data={missing} chartBy="ntn"/>
          </div>
        </div>
    </div>
  );
};

export default Analytics;
const calculateStatistics = (invoices) => {
  const totalInvoices = invoices.length;
  const totalSales = invoices.reduce((sum, invoice) => sum + invoice.sales_value, 0);
  const totalRate = invoices.reduce((sum, invoice) => sum + invoice.rate_value, 0);
  const totalSalesTax = invoices.reduce((sum, invoice) => sum + invoice.sales_tax, 0);

  const averageRate = totalRate / totalInvoices;
  const averageSalesTax = totalSalesTax / totalInvoices;

  const averageDelayMinutes = invoices.reduce((sum, invoice) => {
    const createdTime = new Date(invoice.created_date_time);
    const invoiceTime = new Date(invoice.invoice_date);
    const delayInMinutes = (createdTime - invoiceTime) / (1000 * 60); // Convert milliseconds to minutes
    return sum + delayInMinutes;
  }, 0) / totalInvoices;
  return {
    averageRate,
    averageSalesTax,
    totalSales,
    averageDelayMinutes
  };
};
