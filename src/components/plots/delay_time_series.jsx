import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const DelayTimeSeriesPlot = ({ data, anomaly1 }) => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [dailyCountData, setDailyCountData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const timeSeries = data.map((entry) => {
        const createdDate = new Date(entry.created_date_time);
        const invoiceDate = new Date(entry.invoice_date);
        const delay = (createdDate - invoiceDate) / (1000 ); // Calculate delay in days

        return {
          x: createdDate,
          y: delay,
          text: `Invoice Number: ${entry.srb_invoice_id}, NTN: ${entry.ntn}, POS ID: ${entry.pos_id}, Anomaly: ${entry.description}`,
        };
      });

      const dailyCounts = data.reduce((acc, entry) => {
        const date = new Date(entry.created_date_time).toLocaleDateString();

        if (!acc[date]) {
          acc[date] = 0;
        }

        acc[date] += 1; // Count each entry for daily counts
        return acc;
      }, {});

      const dailyCountArray = Object.keys(dailyCounts).map((date) => {
        return {
          x: new Date(date),
          y: dailyCounts[date],
          text: `Number of Invoices: ${dailyCounts[date]}`,
        };
      });

      setTimeSeriesData(timeSeries);
      setDailyCountData(dailyCountArray);
    }
  }, [data]);

  const handlePointClick = (event) => {
    const pointData = event.points[0];
    if (pointData) {
      const invoiceId = pointData.customdata[0];
      const delay = pointData.customdata[1];
      const ntn = pointData.text.split('NTN: ')[1].split(', ')[0];
      const posId = pointData.text.split('POS ID: ')[1].split(', ')[0];
      const anomalyDescription = pointData.text.split('Anomaly: ')[1];

      console.log('Clicked Invoice ID:', invoiceId);
      console.log('Delay:', delay);
      console.log('NTN:', ntn);
      console.log('POS ID:', posId);
      console.log('Anomaly Description:', anomalyDescription);

      // You can perform further actions with the clicked data here
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2>{anomaly1} Delay Time Series Plot</h2>

      <Plot
        data={[
          {
            type: 'scatter',
            mode: 'markers',
            x: timeSeriesData.map((entry) => entry.x),
            y: timeSeriesData.map((entry) => entry.y),
            text: timeSeriesData.map((entry) => entry.text),
            name: `${anomaly1} Delay over Time`,
            customdata: timeSeriesData.map((entry) => [entry.x, entry.y]),
          },
        ]}
        layout={{
          title: `${anomaly1} Delay over Time`,
          xaxis: { title: 'Time' },
          yaxis: { title: `${anomaly1} Delay (Minutes)` },
          paper_bgcolor: '#EEEEEE',
          plot_bgcolor: '#EEEEEE',
        }}
        config={{
          displayModeBar: true,
        }}
        onClick={handlePointClick}
      />

      
    </div>
  );
};

export default DelayTimeSeriesPlot;
