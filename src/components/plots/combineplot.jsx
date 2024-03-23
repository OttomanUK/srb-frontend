import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addGoToGraph } from '../../redux_store/reducer';

const CombinedPlot = ({ data, chartBy, anomaly1, plotType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [plotData, setPlotData] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      const anomalyDistribution = data.reduce((acc, entry) => {
        const key = entry[chartBy];
  
        if (!acc[key]) {
          acc[key] = 0;
        }
  
        acc[key] += entry.anomaly ? 1 : 0;
        return acc;
      }, {});
  
      let chartData;
      if (plotType === 'bar') {
        const sortedDistribution = Object.entries(anomalyDistribution)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10); // Select only the top 10 entries
  
        chartData = {
          labels: sortedDistribution.map(([key]) => key),
          values: sortedDistribution.map(([, value]) => value),
          type: plotType,
          name: `${anomaly1} Distribution by ${chartBy}`,
          textinfo: 'none', // Disable percentage labels for bar chart
        };
      } else {
        chartData = {
          labels: Object.keys(anomalyDistribution),
          values: Object.values(anomalyDistribution),
          type: plotType,
          name: `${anomaly1} Distribution by ${chartBy}`,
          textinfo: 'none', // Disable percentage labels for pie chart
          marker: { colorscale: 'Blues' }, // Colorscale for pie chart
        };
      }
  
      setPlotData([chartData]);
    }
  }, [data, chartBy, anomaly1, plotType]);
  

  const handleClick = (event) => {
    const point = event.points[0];
    const search = point.label || point.x;

    dispatch(addGoToGraph(true));

    let url = "/dashboard?";
    const params = { location: reduxLocation, ntn: reduxNtn, pos: reduxPos, date: reduxDate, anomaly: reduxAnomalous };

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
      <h2 className="text-3xl font-bold text-center dark:text-white">{anomaly1} {plotType === 'bar' ? 'Bar' : 'Pie'} Plot</h2>

      <Plot
        className='w-full'
        data={plotData}
        layout={{
          title: `${anomaly1} Distribution by ${chartBy}`,
          legend: true,
          paper_bgcolor: 'rgba(255, 255, 255, 0)',
          plot_bgcolor: 'rgba(255, 255, 255, 0)',
          margin: { t: 50, r: 50, l: 50, b: 50 },
          hovermode: 'closest',
          autosize: true,
          showlegend: true,
        }}
        onClick={handleClick}
      />
    </div>
  );
};

CombinedPlot.propTypes = {
  data: PropTypes.array.isRequired,
  chartBy: PropTypes.oneOf(['ntn', 'pos_id_id', "location", "description"]).isRequired,
  anomaly1: PropTypes.string.isRequired,
  plotType: PropTypes.oneOf(['bar', 'pie']).isRequired,
};

export default CombinedPlot;
