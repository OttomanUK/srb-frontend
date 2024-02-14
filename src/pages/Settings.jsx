// import DashboardCard01 from '../components/dashboard_components/DashboardCard01';
// import DashboardCard02 from '../components/dashboard_components/DashboardCard02';
// import DashboardCard03 from '../components/dashboard_components/DashboardCard03';
// import DashboardCard04 from '../components/dashboard_components/DashboardCard04';
// import DashboardCard05 from '../components/dashboard_components/DashboardCard05';
// // import DashboardCard06 from '../components/dashboard_components/DashboardCard06';
// import DashboardCard07 from '../components/dashboard_components/DashboardCard07';
import React, { useEffect, useState } from 'react';
import TimeSeriesPlot from '../components/plots/time_series_plot.jsx';
import PiePlot from '../components/plots/pie_plots.jsx';
import BarPlot from '../components/plots/barplot.jsx';
import Card from "../components/resuseable_components/card.jsx";
import jsonData from '../components/plots/dummyData.json';
import Sidebar from '../components/resuseable_components/Sidebar.jsx';  
import BarPlot from '../components/plots/barplot';
import Sidebar from '../components/resuseable_components/Sidebar';
import Analytics from './Analytics';


function Settings(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Other components */}
          {/* <Card title={"100"} content={"Anomaly"} /> */}
          <TimeSeriesPlot data={dummyData} />
          {/* <Card title={"100"} content={"Anomaly"} /> */}

          <PiePlot data={dummyData} chartBy="ntn" />
          <BarPlot data={dummyData} chartBy="ntn" />
          {/* or */}
          <PiePlot data={dummyData} chartBy="pos_id" />
          <BarPlot data={dummyData} chartBy="pos_id" />
        </div>
            </div> 
        </div>
    );


};

export default Settings