import React, { useEffect, useState } from 'react';
import TimeSeriesPlot from '../components/plots/time_series_plot.jsx';
import DelayTimeSeriesPlot from '../components/plots/delay_time_series.jsx';
import PiePlot from '../components/plots/pie_plots.jsx';
import BarPlot from '../components/plots/barplot.jsx';
import VersusPlot from '../components/plots/versus_plot.jsx';
import Sidebar from '../components/resuseable_components/Sidebar.jsx';  
import Header from '../components/resuseable_components/Header.jsx';
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner.jsx';
import {useDispatch,useSelector} from 'react-redux'
import {useLocation,useNavigate} from 'react-router-dom'
import {getAnomalyDescription, getMissingInvoice} from "../action/action.js"
import Loader from '../components/utils/Loader.jsx';
import DashboardCard from '../components/dashboard_components/DashboardCard.jsx';
import MissingBarPlot from '../components/plots/missingbar.jsx';
import {analytics,missingAnalytics} from "../action/action.js"
import PleaseReload from './PleaseReload.jsx';


const Analytics = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const customGreeting = 'Analytics'
  const customText = 'Gather insights'
    const {isLoading,reduxNtn,reduxPos,anomaly,reduxLocation,reduxDate,reduxAnomalous}=useSelector(state=>state.centralStore)
   const [resultsfinal, setResultsFinal] = useState([]);
   const [error,setError]=useState(false)
   const [missing, setMissing] = useState([]);
   const [delayAverage, setDelayAverage] = useState(0);
   const [averageRate, setAverageRate] = useState(0);
   const [totalSales,setTotalSales] = useState(0);
   
   const [sidebarOpen, setSidebarOpen] = useState(false);


   useEffect(() => {
     const fetchData = async () => {
       try{
        setError(false)
      const data = await dispatch(analytics(reduxPos,reduxNtn,1,reduxAnomalous,reduxDate,reduxLocation))
      const {
        averageSalesTax,
        totalSales,
        averageRate,
        averageDelayMinutes
      } = calculateStatistics(data);
      setAverageRate(averageRate);
      setDelayAverage(averageDelayMinutes);
      setTotalSales(totalSales);
      setResultsFinal(data)
      

    }catch(error){
      console.log("There is some error that is "+error)
      setError(true)
    } 
    };
    fetchData();
  }, []);

  useEffect(() => {
    
    const fetchData1=async()=>{
    try{
    const data=await dispatch(missingAnalytics(reduxNtn))
    
    setMissing(data)
  }catch(error){
    // setError(true)
  }
  }
fetchData1()
    
  },[])
  if(error){
    return <PleaseReload/>

  }
     if(isLoading){
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
          <div className="px-4 sm:px-4 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner greeting={customGreeting} text={customText} show={true} ntn={reduxNtn} pos={reduxPos} location={reduxLocation} date={reduxDate}  anomaly={reduxAnomalous}/>
            <div className='flex flex-row space-x-4'>
              <DashboardCard title={'Total Anomaly'} value={resultsfinal.length}/>
              <DashboardCard title={'Avg Delay(Minutes)'} value={delayAverage}/>
              <DashboardCard title={'Total Sales'} value={totalSales}/>
              <DashboardCard title={'Average Rate'} value={averageRate}/>
              </div>
              {/* Other components */}
              <div className='flex flex-col items-center justify-center mr-4'>
              <BarPlot anomaly1={anomaly} data={resultsfinal} chartBy='ntn'/>
              <BarPlot anomaly1={anomaly} data={resultsfinal} chartBy="location" />
              <BarPlot anomaly1={anomaly} data={resultsfinal} chartBy="description" />
              <BarPlot anomaly1={anomaly} data={resultsfinal} chartBy="pos_id"/>
              <PiePlot anomaly1={anomaly} data={resultsfinal} chartBy="ntn"/>
              <PiePlot anomaly1={anomaly} data={resultsfinal} chartBy="pos_id"/>
              <PiePlot anomaly1={anomaly} data={resultsfinal} chartBy="location"/>

            <TimeSeriesPlot data={resultsfinal} showAnomalyCount={true} anomaly1={anomaly} chartBy={"anomaly"}/>
            <TimeSeriesPlot data={resultsfinal} showAnomalyCount={false} anomaly1={anomaly} chartBy={"sales_value"}/>
            <TimeSeriesPlot data={resultsfinal} showAnomalyCount={false} anomaly1={anomaly} chartBy={"rate_value"}/>
            <VersusPlot data={resultsfinal} showAnomalyCount={false} anomaly1={anomaly} x_axis={"sales_tax"} y_axis={"sales_value"}/>

            <DelayTimeSeriesPlot data={resultsfinal}  anomaly1={anomaly} />
       
            <MissingBarPlot anomaly1={anomaly} data={missing} chartBy="ntn"/>
              </div>
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

  const averageRate = (totalRate / totalInvoices).toFixed(1);
  const averageSalesTax = (totalSalesTax / totalInvoices).toFixed(1);

  const averageDelayMinutes = (invoices.reduce((sum, invoice) => {
    const createdTime = new Date(invoice.created_date_time);
    const invoiceTime = new Date(invoice.invoice_date);
    const delayInMinutes = (createdTime - invoiceTime) / (1000 * 60); // Convert milliseconds to minutes
    return sum + delayInMinutes;
  }, 0) / totalInvoices).toFixed(1);

  return {
    averageRate: parseFloat(averageRate),
    averageSalesTax: parseFloat(averageSalesTax),
    totalSales:parseFloat(totalSales).toFixed(1),
    averageDelayMinutes: parseFloat(averageDelayMinutes)
  };
};

