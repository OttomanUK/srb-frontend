import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const MissingBarPlot = ({ data, chartBy = "null", anomaly1 }) => {
  const [topAnomalyData, setTopAnomalyData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const generateTopAnomalyData = () => {
      if (!data || data.length === 0) {
        setTopAnomalyData([]);
        return;
      }

      const distributionByChartBy = data.reduce((acc, entry) => {
        const key = entry[chartBy];

        if (!acc[key]) {
          acc[key] = 0;
        }

        if (entry.anomaly) {
          acc[key] += 1;
        }

        return acc;
      }, {});

      const sortedTopAnomalies = Object.keys(distributionByChartBy)
        .map((key) => ({ chartByValue: key, anomalies: distributionByChartBy[key] }))
        .sort((a, b) => b.anomalies - a.anomalies)
        .slice(0, 5);

      const topAnomalyChartData = {
        type: 'bar',
        x: sortedTopAnomalies.map((entry) => entry.chartByValue),
        y: sortedTopAnomalies.map((entry) => entry.anomalies),
        text: sortedTopAnomalies.map((entry) => `${chartBy}: ${entry.chartByValue}`),
        marker: {
          color: 'rgba(37, 147, 255,0.6)',
          line: {
            color: 'rgba(37, 147, 255,1.0)',
            width: 2,
          },
        },
        paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
        plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
        margin: { t: 50, r: 50, l: 50, b: 50 }, // Adjust margins as needed
        hovermode: 'closest', // Adjust hovermode as needed
        autosize: true, // Adjust autosize as needed
        showlegend: true, // Adjust showlegend as needed
      };

      setTopAnomalyData([topAnomalyChartData]);

      // Generate pie chart data
      const pieChartValues = Object.values(distributionByChartBy);
      const pieChartData = {
        type: 'pie',
        values: pieChartValues,
        labels: Object.keys(distributionByChartBy),
        textinfo: 'label+percent',
        insidetextorientation: 'radial',
        hoverinfo: 'percent+label',
        marker: {
          colors: pieChartValues.map((value) => `rgba(37, 147, 255, ${value / pieChartValues.length})`),
        },
        paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
        plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
        margin: { t: 50, r: 50, l: 50, b: 50 }, // Adjust margins as needed
        hovermode: 'closest', // Adjust hovermode as needed
        autosize: true, // Adjust autosize as needed
        showlegend: true, // Adjust showlegend as needed
      };

      setPieChartData([pieChartData]);
    };

    generateTopAnomalyData();
  }, [data, chartBy]);

  const handlePieClick = (event) => {
    const chartByValue = event.points[0]?.label;
    if (chartByValue) {
      console.log(`${chartBy} clicked:`, chartByValue);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center dark:text-white">Top 5 {anomaly1} by {chartBy}</h2>

      <Plot
        className='w-full'
        data={topAnomalyData}
        layout={{
          title: `Top 5 ${anomaly1} by ${chartBy}`,
          xaxis: { title: `${chartBy.charAt(0).toUpperCase() + chartBy.slice(1)}` }, // Capitalize the first letter of chartBy for axis title
          yaxis: { title: 'Total Anomalies' },
          paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
          plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
          margin: { t: 50, r: 50, l: 50, b: 50 }, // Adjust margins as needed
          hovermode: 'closest', // Adjust hovermode as needed
          autosize: true, // Adjust autosize as needed
          showlegend: true, // Adjust showlegend as needed
        }}
      />

      <h2 className="text-3xl font-bold text-center dark:text-white">Anomaly Distribution by {chartBy}</h2>

      <Plot
        className='w-full'
        data={pieChartData}
        layout={{
          title: `Anomaly Distribution by ${chartBy}`,
          paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
          plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
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

MissingBarPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      invoices: PropTypes.string,
      date: PropTypes.string,
      ntn: PropTypes.number,
      pos_id: PropTypes.number,
      anomaly: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    })
  ).isRequired,
  chartBy: PropTypes.oneOf(['ntn', 'pos_id']).isRequired,
  anomaly1: PropTypes.string.isRequired,
};

export default MissingBarPlot;
