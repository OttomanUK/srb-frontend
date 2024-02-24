import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { tailwindConfig, hexToRGB } from '../utils/Utils';

const BarPlot = ({ data, chartBy }) => {
  const [topAnomalyData, setTopAnomalyData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0 || !chartBy) {
      console.error('Invalid data or chartBy prop provided.');
      return;
    }

    const generateTopAnomalyData = () => {
      const anomalyDistribution = data.reduce((acc, entry) => {
        const key = entry[chartBy];

        if (!acc[key]) {
          acc[key] = 0;
        }

        acc[key] += entry.anomaly;
        return acc;
      }, {});

      const sortedTopAnomalies = Object.keys(anomalyDistribution)
        .map((key) => ({ key, anomaly: anomalyDistribution[key] }))
        .sort((a, b) => b.anomaly - a.anomaly)
        .slice(0, 5);

      const topAnomalyChartData = {
        type: 'bar',
        x: sortedTopAnomalies.map((entry) => entry.key),
        y: sortedTopAnomalies.map((entry) => entry.anomaly),
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
      <h2>Top 5 Anomalies by {chartBy}</h2>

      <Plot
        data={topAnomalyData}
        layout={{ title: `Top 5 Anomalies by ${chartBy}`, xaxis: { title: chartBy }, yaxis: { title: 'Total Anomaly' }, paper_bgcolor: '#EEEEEE', plot_bgcolor: '#EEEEEE'  }}
      />
    </div>
  );
};

BarPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ntn: PropTypes.number,
      pos_id: PropTypes.number,
      anomaly: PropTypes.number,
    })
  ).isRequired,
  chartBy: PropTypes.oneOf(['ntn', 'pos_id']).isRequired,
};

export default BarPlot;
