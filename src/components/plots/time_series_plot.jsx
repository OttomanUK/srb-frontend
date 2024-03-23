import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const TimeSeriesPlot = ({ data, showAnomalyCount, anomaly1, chartBy, hue = "ntn" }) => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [dailyCountData, setDailyCountData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const timeSeries = data.map((entry) => ({
        x: new Date(entry.created_date_time),
        y: showAnomalyCount ? entry.anomaly : entry[chartBy],
        text: `Invoice Number: ${entry.srb_invoice_id}, Ntn : ${entry.ntn} ,pos_id ID: ${entry.pos_id}, Anomaly: ${entry.description}`,
        marker: { color: hue ? entry[hue] : 'rgba(37, 147, 255, 0.6)' } // Conditional coloring
      }));

      const dailyCounts = data.reduce((acc, entry) => {
        const date = new Date(entry.created_date_time).toLocaleDateString();

        if (!acc[date]) {
          acc[date] = 0;
        }

        acc[date] += showAnomalyCount ? (entry.anomaly ? 1 : 0) : entry[chartBy];
        return acc;
      }, {});

      const dailyCountArray = Object.keys(dailyCounts).map((date) => ({
        x: new Date(date),
        y: dailyCounts[date],
        text: `Invoice Number: ${data.find(entry => new Date(entry.created_date_time).toLocaleDateString() === date)?.srb_invoice_id},Ntn : ${data.find(entry => new Date(entry.created_date_time).toLocaleDateString() === date)?.ntn} ,pos_id ID: ${data.find(entry => new Date(entry.created_date_time).toLocaleDateString() === date)?.pos_id}`,
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
    <div>
      <h2 className="text-3xl font-bold text-center dark:text-white">{showAnomalyCount ? `${anomaly1}` : `${chartBy}`} Time Series Plot</h2>

      <Plot
        className='w-full'
        data={[
          {
            type: 'scatter',
            mode: 'markers',
            marker: {
              color: timeSeriesData.map((entry) => entry.marker.color),
              line: {
                color: 'rgba(37, 147, 255,1.0)',
                width: 1,
              },
            },
            x: timeSeriesData.map((entry) => entry.x),
            y: timeSeriesData.map((entry) => entry.y),
            text: timeSeriesData.map((entry) => entry.text),
            name: `Total ${showAnomalyCount ? anomaly1 : `${chartBy}`} over Time`,
            customdata: timeSeriesData.map((entry) => entry.customdata), // Add custom data to capture invoice ID
          },
        ]}
        layout={{
          title: `Total ${showAnomalyCount ? anomaly1 : `${chartBy}`} over Time`,
          xaxis: { title: 'Time' },
          yaxis: { title: `Total ${showAnomalyCount ? anomaly1 : `${chartBy}`}` },
          paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
          plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
          margin: { t: 50, r: 50, l: 50, b: 50 }, // Adjust margins as needed
          hovermode: 'closest', // Adjust hovermode as needed
          autosize: true, // Adjust autosize as needed
          showlegend: true, // Adjust showlegend as needed
          legend: { title: { text: "Legend Title" }, traceorder: 'reversed' } // Customize legend
        }}
        config={{
          displayModeBar: true,
        }}
        onClick={handlePointClick}
      />
      {chartBy !== "rate_value" &&

        <Plot
          className='w-1/2 md:w-full'
          data={[
            {
              type: 'bar',
              x: dailyCountData.map((entry) => entry.x),
              y: dailyCountData.map((entry) => entry.y),
              // text: dailyCountData.map((entry) => entry.text),
              name: `Total ${showAnomalyCount ? anomaly1 : `${chartBy}`} per Day`,
              customdata: timeSeriesData.map((entry) => entry.customdata),
              marker: {
                color: 'rgba(37, 147, 255,0.6)',
                line: {
                  color: 'rgba(37, 147, 255,1.0)',
                  width: 1,
                },
              },
            },
          ]}
          layout={{
            title: `Total ${showAnomalyCount ? anomaly1 : `${chartBy}`} per Day`,
            xaxis: { title: 'Day' },
            yaxis: { title: `Total ${showAnomalyCount ? anomaly1 : `${chartBy}`}` },
            paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
            plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
            marker: {
              color: 'rgba(37, 147, 255,0.6)',
              line: {
                color: 'rgba(37, 147, 255,1.0)',
                width: 2,
              },
            },
            margin: { t: 50, r: 50, l: 50, b: 50 }, // Adjust margins as needed
            hovermode: 'closest', // Adjust hovermode as needed
            autosize: true, // Adjust autosize as needed
            showlegend: true, // Adjust showlegend as needed
            legend: { title: { text: "Legend Title" }, traceorder: 'reversed' } // Customize legend
          }}
        />
      }
    </div>
  );
};

export default TimeSeriesPlot;
