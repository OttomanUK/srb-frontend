import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const TimeSeriesPlot = ({ data }) => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [dailyAnomalyData, setDailyAnomalyData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // Assuming your data has 'created_date_time' and 'anomaly' fields
      const timeSeries = data.map((entry) => ({
        x: new Date(entry.created_date_time),
        y: entry.anomaly,
      }));

      const dailyAnomalies = data.reduce((acc, entry) => {
        const date = new Date(entry.created_date_time).toLocaleDateString();

        if (!acc[date]) {
          acc[date] = 0;
        }

        acc[date] += entry.anomaly;
        return acc;
      }, {});

      const dailyAnomalyArray = Object.keys(dailyAnomalies).map((date) => ({
        x: new Date(date),
        y: dailyAnomalies[date],
      }));

      setTimeSeriesData(timeSeries);
      setDailyAnomalyData(dailyAnomalyArray);
    }
  }, [data]);

  return (
    <div>
      <h2>Anomaly Time Series Plot</h2>

      <Plot
        data={[
          {
            type: 'scatter',
            mode: 'markers',
            x: timeSeriesData.map((entry) => entry.x),
            y: timeSeriesData.map((entry) => entry.y),
            name: 'Total Anomaly over Time',
          },
        ]}
        layout={{ title: 'Total Anomaly over Time', xaxis: { title: 'Time' }, yaxis: { title: 'Total Anomaly' }, paper_bgcolor: '#EEEEEE', plot_bgcolor: '#EEEEEE'}}
      />

      <Plot
        data={[
          {
            type: 'bar',
            x: dailyAnomalyData.map((entry) => entry.x),
            y: dailyAnomalyData.map((entry) => entry.y),
            name: 'Total Anomaly per Day',
          },
        ]}
        layout={{ title: 'Total Anomaly per Day', xaxis: { title: 'Day' }, yaxis: { title: 'Total Anomaly' }, paper_bgcolor: '#EEEEEE', plot_bgcolor: '#EEEEEE'}}
      />
    </div>
  );
};

export default TimeSeriesPlot;
