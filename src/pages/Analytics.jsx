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

// Adjust the path based on your project structure
// import PiePlot from './pie_plots';
function useQuery() {
  return new URLSearchParams(useLocation().search);}

const Analytics = () => {
  const customGreeting = 'Analytics'
  const customText = 'Gather insights'
    const dispatch=useDispatch()
    const {isLoading,graphData,anomaly}=useSelector(state=>state.centralStore)
   const query=useQuery()
   const page=query.get('page')||1
   const search=query.get('search')
   const [results, setResults] = useState([]);
   const [nextPage, setNextPage] = useState(null);
  //  const [data, setData] = useState([]);
   const [dummyData, setDummyData] = useState([]);
   const [sidebarOpen, setSidebarOpen] = useState(false);


 
   useEffect(() => {
     const fetchData = async () => {
       // Extracting required information
       const { results: initialResults, next } = graphData;
       setResults(initialResults);
       setNextPage(next);
       let pageCount = 1;
       while (nextPage && pageCount < 5) {
        const parsedUrl = new URL(next);

// Extract the pathname
          const pathWithQuery = parsedUrl.pathname + parsedUrl.search
         const {data:nextResponse} = await API.get(pathWithQuery);
         const { results: nextResults, next: newNextPage } = nextResponse;
         setResults((prevResults) => [...prevResults, ...nextResults]);
         setNextPage(newNextPage);
         pageCount++;
        }
     };
 
     fetchData();

   }, [])

   if(results.length===0){
    return <div>Loading...</div>
   }
  

  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner greeting={customGreeting} text={customText}/>
              {/* Other components */}
            <TimeSeriesPlot data={results} showAnomalyCount={true} anomaly1={anomaly}/>
            <TimeSeriesPlot data={results} showAnomalyCount={false} anomaly1={anomaly}/>

            <PiePlot anomaly1={anomaly} data={results} chartBy="ntn"/>
            <BarPlot anomaly1={anomaly} data={results} chartBy="ntn"/>
            {/* or */}
            <PiePlot anomaly1={anomaly} data={results} chartBy="pos_id"/>
            <BarPlot anomaly1={anomaly} data={results} chartBy="pos_id"/>
          </div>
        </div>
    </div>
  );
};

export default Analytics;
