import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const TimeSeriesPlot = ({ data, showAnomalyCount, anomaly1 }) => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [dailyCountData, setDailyCountData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const timeSeries = data.map((entry) => ({
        x: new Date(entry.created_date_time),
        y: showAnomalyCount ? entry.anomaly : entry.sales_value,
        text: `Invoice Number: ${entry.srb_invoice_id}, Ntn : ${entry.ntn} ,POS ID: ${entry.pos_id}, Anomaly: ${entry.description}`,
      }));

      const dailyCounts = data.reduce((acc, entry) => {
        const date = new Date(entry.created_date_time).toLocaleDateString();

        if (!acc[date]) {
          acc[date] = 0;
        }

        acc[date] += showAnomalyCount ? (entry.anomaly ? 1 : 0) : entry.sales_value;
        return acc;
      }, {});

      const dailyCountArray = Object.keys(dailyCounts).map((date) => ({
        x: new Date(date),
        y: dailyCounts[date],
        text: `Invoice Number: ${data.find(entry => new Date(entry.created_date_time).toLocaleDateString() === date)?.srb_invoice_id},Ntn : ${data.find(entry => new Date(entry.created_date_time).toLocaleDateString() === date)?.ntn} ,POS ID: ${data.find(entry => new Date(entry.created_date_time).toLocaleDateString() === date)?.pos_id}`,
      }));

      setTimeSeriesData(timeSeries);
      setDailyCountData(dailyCountArray);
    }
  }, [data, showAnomalyCount]);
  const handlePointClick = (event) => {
    const invoiceId = event.points[0]?.customdata[0];
    if (invoiceId) {
      console.log('Clicked Invoice ID:', invoiceId);
      // You can perform further actions with the invoice ID here
    }
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2>{showAnomalyCount ? `${anomaly1}` : 'Sales'} Time Series Plot</h2>

      <Plot
        data={[
          {
            type: 'scatter',
            mode: 'markers',
            x: timeSeriesData.map((entry) => entry.x),
            y: timeSeriesData.map((entry) => entry.y),
            text: timeSeriesData.map((entry) => entry.text),
            name: `Total ${showAnomalyCount ? anomaly1 : 'Sales'} over Time`,
            customdata: timeSeriesData.map((entry) => entry.customdata), // Add custom data to capture invoice ID
          },
        ]}
        layout={{
          title: `Total ${showAnomalyCount ? anomaly1 : 'Sales'} over Time`,
          xaxis: { title: 'Time' },
          yaxis: { title: `Total ${showAnomalyCount ? anomaly1 : 'Sales'}` },
          paper_bgcolor: '#EEEEEE',
          plot_bgcolor: '#EEEEEE',
        }}
        config={{
          displayModeBar: true,
        }}
        onClick={handlePointClick}
        />

      <Plot
        data={[
          {
            type: 'bar',
            x: dailyCountData.map((entry) => entry.x),
            y: dailyCountData.map((entry) => entry.y),
            // text: dailyCountData.map((entry) => entry.text),
            name: `Total ${showAnomalyCount ? anomaly1 : 'Sales'} per Day`,
            customdata: timeSeriesData.map((entry) => entry.customdata)
          },
        ]}
        layout={{
          title: `Total ${showAnomalyCount ? anomaly1 : 'Sales'} per Day`,
          xaxis: { title: 'Day' },
          yaxis: { title: `Total ${showAnomalyCount ? anomaly1 : 'Sales'}` },
          paper_bgcolor: '#EEEEEE',
          plot_bgcolor: '#EEEEEE',
        }}
      />
    </div>
  );
};

export default TimeSeriesPlot;
