import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { addGoToGraph } from '../../redux_store/reducer';

const PiePlot = ({ data, chartBy, anomaly1 }) => {
  const [pieData, setPieData] = useState([]);
  const dispatch=useDispatch()
  const {isLoading,reduxNtn,reduxPos_id,anomaly,reduxLocation,reduxDate,reduxAnomalous,anomalyHashMap}=useSelector(state=>state.centralStore)
  const navigate=useNavigate()
  useEffect(() => {
    if (data.length > 0) {
      const anomalyDistribution = data.reduce((acc, entry) => {
        const key = entry[chartBy];

        if (!acc[key]) {
          acc[key] = 0;
        }

        acc[key] += entry.anomaly?1:0;
        return acc;
      }, {});

      const pieChartData = {
        // Remove labels property to avoid displaying percentages
        labels: Object.keys(anomalyDistribution),
        values: Object.values(anomalyDistribution),
        type: 'pie',
        name: `${anomaly1} Distribution by ${chartBy}`,
        
        // Set textinfo to 'none' to disable percentage labels
        textinfo: 'none',
      };

      setPieData([pieChartData]);
    }
  }, [data, chartBy, anomaly1]);
  const handlePieClick = (event) => {
    const search = event.points[0].label;
    dispatch(addGoToGraph(true))
    let url = "/dashboard?";
const params = { location: reduxLocation, ntn: reduxNtn, pos_id: reduxPos_id, date: reduxDate, anomaly: reduxAnomalous };

if (chartBy === "description") {
  params.anomaly = getKeyByValue(anomalyHashMap, search);
} else {
  params[chartBy] = search;
}

url += Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
navigate(url);

    
  };



  return (
    <div>
      <h2 className="text-3xl font-bold text-center dark:text-white">{anomaly1} Pie Plot</h2>

      <Plot
      className='w-full'
        data={pieData}
        layout={{
          title: `${anomaly1} Distribution by ${chartBy}`,
          legend:true,
          paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
    plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
    marker: { colorscale: 'Blues' },
    margin: { t: 50, r: 50, l: 50, b: 50 }, // Adjust margins as needed
    hovermode: 'closest', // Adjust hovermode as needed
    autosize: true, // Adjust autosize as needed
    showlegend: true, // Adjust showlegend as needed
        }}
        onClick={handlePieClick}

      />
    </div>
  );
};

export default PiePlot;
