import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { tailwindConfig, hexToRGB } from '../utils/Utils';

const BarPlot = ({ data, chartBy,anomaly1 }) => {
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
    color: 'rgba(50,171,96,0.6)',
    line: {
      color: 'rgba(50,171,96,1.0)',
      width: 2,
    },
  },
};


      setTopAnomalyData([topAnomalyChartData]);
    };

    generateTopAnomalyData();
  }, [data, chartBy]);

  return (
    <div>
      <h2>Top 5 {anomaly1} by {chartBy}</h2>

      <Plot
        data={topAnomalyData}
        layout={{ title: `Top 5 ${anomaly1} by ${chartBy}`, xaxis: { title: chartBy }, yaxis: { title: `Total ${anomaly1}` }, paper_bgcolor: '#EEEEEE', plot_bgcolor: '#EEEEEE'  }}
      />
    </div>
  );
};
BarPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ntn: PropTypes.number,
      pos_id: PropTypes.number,
      anomaly: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]), // Accepts either number or boolean
    })
  ).isRequired,
  chartBy: PropTypes.oneOf(['ntn', 'pos_id']).isRequired,
};


export default BarPlot;
