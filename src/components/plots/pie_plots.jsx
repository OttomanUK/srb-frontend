import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const PiePlot = ({ data, chartBy,anomaly1 }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const anomalyDistribution = data.reduce((acc, entry) => {
        const key = entry[chartBy];

        if (!acc[key]) {
          acc[key] = 0;
        }

        acc[key] += entry.anomaly;
        return acc;
      }, {});

      const pieChartData = Object.keys(anomalyDistribution).map((key) => ({
        labels: [key],
        values: [anomalyDistribution[key]],
        type: 'pie',
        name: `${chartBy} ${key}`,
      }));

      setPieData(pieChartData);
    }
  }, [data, chartBy]);

  return (
    <div>
      <h2>{anomaly1} Pie Plot</h2>

      <Plot 
        data={pieData}
        layout={{ title: `${anomaly1} Distribution by ${chartBy}`, showlegend: true, paper_bgcolor: '#EEEEEE', plot_bgcolor: '#EEEEEE'}}
      />
    </div>
  );
};

export default PiePlot;
