import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from "react-redux";
import { tailwindConfig, hexToRGB } from '../utils/Utils';
import { useNavigate } from 'react-router-dom';
import {addGoToGraph} from "../../redux_store/reducer.js"
const BarPlot = ({ data, chartBy,anomaly1} ) => {
  const dispatch=useDispatch()
  const {reduxNtn,reduxpos_id,reduxLocation,reduxDate,reduxAnomalous,anomalyHashMap}=useSelector(state=>state.centralStore)
  const navigate=useNavigate()
  const [topAnomalyData, setTopAnomalyData] = useState([]);

  useEffect(() => {
    const generateTopAnomalyData = () => {
      const anomalyDistribution = data.reduce((acc, entry) => {
        const key = entry[chartBy];

        if (!acc[key]) {
          acc[key] = 0;
        }

        acc[key] += entry.anomaly?1:0;
        return acc;
      }, {});

      const sortedTopAnomalies = Object.keys(anomalyDistribution)
  .map((key) => ({ key, anomaly: anomalyDistribution[key] }))
  .sort((a, b) => b.anomaly - a.anomaly)
  .slice(0, 5);

const topAnomalyChartData = {
  type: 'bar',
  x: sortedTopAnomalies.map((entry) => entry.key),
  y: sortedTopAnomalies.map((entry) => entry.anomaly), // Use the actual count, not 1 or 0
  marker: {
    color: 'rgba(37, 147, 255,0.6)',
    line: {
      color: 'rgba(37, 147, 255,1.0)',
      width: 2,
    },
  },
};


      setTopAnomalyData([topAnomalyChartData]);
    };

    generateTopAnomalyData();
  }, [data, chartBy]);
  const getKeyByValue = (obj, value) => {
    for (const key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
    return 10; // Return null if the value is not found
  };
  const handleClick = (event) => {
    const point = event.points[0]; // Get the clicked point
    const search = point.x; // Assuming x-axis corresponds to anomaly IDs
    dispatch(addGoToGraph(true))
    let url = "/dashboard?";
const params = { location: reduxLocation, ntn: reduxNtn, pos_id: reduxpos_id, date: reduxDate, anomaly: reduxAnomalous };

if (chartBy === "description") {
  params.anomaly = getKeyByValue(anomalyHashMap, search);
} else {
  params[chartBy] = search;
}

url += Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
navigate(url);

  };
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Top 5 {anomaly1} by {chartBy}</h2>

      <Plot
        data={topAnomalyData}
        layout={{ title: `Top 5 ${anomaly1} by ${chartBy}`, xaxis: { title: chartBy }, yaxis: { title: `Total ${anomaly1}` }, paper_bgcolor: '#EEEEEE', plot_bgcolor: '#EEEEEE'  }}
        onClick={handleClick}
      />
    </div>
  );
};
BarPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ntn: PropTypes.number,
      pos_id_id: PropTypes.number,
      anomaly: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]), // Accepts either number or boolean
    })
  ).isRequired,
  chartBy: PropTypes.oneOf(['ntn', 'pos_id_id',"location","description"]).isRequired,
};


export default BarPlot;
