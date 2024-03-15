import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const MissingBarPlot = ({ data, chartBy="null", anomaly1 }) => {
  const [topAnomalyData, setTopAnomalyData] = useState([]);

  
  useEffect(() => {
    const generateTopAnomalyData = () => {
        const invoicesDistribution = data.reduce((acc, entry) => {
          const key = entry.date; // Assuming the date is the property to group by
  
          if (!acc[key]) {
            acc[key] = 0;
          }
  
          // Check if entry.invoices is not null before splitting
          if (entry.invoices) {
            acc[key] += entry.invoices.split(',').length;
          }
  
          return acc;
        }, {});
  
        const sortedTopAnomalies = Object.keys(invoicesDistribution)
          .map((key) => ({ date: key, invoices: invoicesDistribution[key],ntn: data.find((entry) => entry.date === key)?.ntn || null }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
          .slice(0, 5);
  
        const topAnomalyChartData = {
          type: 'bar',
          x: sortedTopAnomalies.map((entry) => entry.date),
          y: sortedTopAnomalies.map((entry) => entry.invoices),
          text: sortedTopAnomalies.map((entry) => "ntn: "+entry.ntn),  
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
    }, [data]);

  return (
    <div>
      <h2>Top 5 {anomaly1} by {chartBy}</h2>

      <Plot
      className='w-full'
        data={topAnomalyData}
        layout={{
          title: `Top 5 ${anomaly1} by ${chartBy}`,
          xaxis: { title: 'Date' },
          yaxis: { title: 'Total Invoices' },
          paper_bgcolor: '#EEEEEE',
          plot_bgcolor: '#EEEEEE',
        }}
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
      anomaly: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    })
  ).isRequired,
  chartBy: PropTypes.oneOf(['ntn', 'pos_id']).isRequired,
  anomaly1: PropTypes.string.isRequired,
};

export default MissingBarPlot;
