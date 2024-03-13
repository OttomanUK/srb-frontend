import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const VersusPlot = ({ data, showAnomalyCount, anomaly1, x_axis, y_axis }) => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [dailyCountData, setDailyCountData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const timeSeries = data.map((entry) => ({
        x: entry[x_axis],
        y: entry[y_axis],
        text: `Invoice Number: ${entry.srb_invoice_id}, Ntn : ${entry.ntn}, pos_id ID: ${entry.pos_id}, Anomaly: ${entry.description}`,
      }));

      const dailyCounts = data.reduce((acc, entry) => {
        const key = parseFloat(entry[x_axis]).toFixed(2); // Ensure key is numeric
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += parseFloat(entry[y_axis]); // Convert y_axis value to numeric
        return acc;
      }, {});

      const dailyCountArray = Object.keys(dailyCounts).map((key) => ({
        x: parseFloat(key),
        y: dailyCounts[key],
        text: `Total ${y_axis}: ${dailyCounts[key].toFixed(2)}`,
      }));

      setTimeSeriesData(timeSeries);
      setDailyCountData(dailyCountArray);
    }
  }, [data]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2>{showAnomalyCount ? `${anomaly1}` : `${y_axis} vs ${x_axis} Plot`}</h2>

      <Plot
        data={[
          {
            type: 'scatter',
            mode: 'markers',
            x: timeSeriesData.map((entry) => entry.x),
            y: timeSeriesData.map((entry) => entry.y),
            text: timeSeriesData.map((entry) => entry.text),
            name: `${y_axis} vs ${x_axis}`,
          },
        ]}
        layout={{
          title: `${y_axis} vs ${x_axis} Time Series Plot`,
          xaxis: { title: `${x_axis}` },
          yaxis: { title: `${y_axis}` },
          paper_bgcolor: '#EEEEEE',
          plot_bgcolor: '#EEEEEE',
        }}
        config={{
          displayModeBar: true,
        }}
      />

    </div>
  );
};

export default VersusPlot;