import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const PiePlot = ({ data, chartBy, anomaly1 }) => {
  const [pieData, setPieData] = useState([]);

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
    const clickedLabel = event.points[0].label;
    console.log(`Clicked label: ${clickedLabel}`);
  };



  return (
    <div className='flex flex-col items-center justify-center'>
      <h2>{anomaly1} Pie Plot</h2>

      <Plot
        data={pieData}
        layout={{
          title: `${anomaly1} Distribution by ${chartBy}`,
          legend:true,
          paper_bgcolor: '#EEEEEE',
          plot_bgcolor: '#EEEEEE',
        }}
        onClick={handlePieClick}

      />
    </div>
  );
};

export default PiePlot;
