import React, { useEffect, useState } from 'react';
import TimeSeriesPlot from '../components/plots/time_series_plot.jsx';
import PiePlot from '../components/plots/pie_plots.jsx';
import BarPlot from '../components/plots/barplot.jsx';
import Card from "../components/resuseable_components/card.jsx";
import jsonData from '../components/plots/dummyData.json';
import Sidebar from '../components/resuseable_components/Sidebar.jsx';  
import Header from '../components/resuseable_components/Header.jsx';
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner.jsx';

// Adjust the path based on your project structure
// import PiePlot from './pie_plots';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [dummyData, setDummyData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const generateDummyData = () => {
      const startDate = new Date('2023-11-01T00:00:00');
      const endDate = new Date('2023-11-30T23:59:59');
      const dateRange = endDate - startDate;

      const dummyData = Array.from({ length: 100 }, (_, index) => {
        const randomDate = new Date(startDate.getTime() + Math.random() * dateRange);
        return {
          pos_id: Math.floor(Math.random() * 10),
          ntn: Math.floor(Math.random() * 5),
          anomaly: Math.floor(Math.random() * 10),
          created_date_time: randomDate.toISOString(),
        };
      });

      setDummyData(dummyData);
    };
    generateDummyData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner/>
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

export default Analytics;
