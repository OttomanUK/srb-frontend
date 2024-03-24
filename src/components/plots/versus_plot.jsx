import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';

const VersusPlot = ({ data, showAnomalyCount, anomaly1, x_axis, y_axis }) => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [dailyCountData, setDailyCountData] = useState([]);
  const navigate=useNavigate()

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
  const handlePointClick = (event) => {
    console.log(invoiceId)
    if (invoiceId) {
      navigate(`/InvoiceDetails/${invoiceId}`)
      // You can perform further actions with the invoice ID here
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center dark:text-white">{showAnomalyCount ? `${anomaly1}` : `${y_axis} vs ${x_axis} Plot`}</h2>

      <Plot
      className='w-full'
        data={[
          {
            type: 'scatter',
            mode: 'markers',
            marker: {
              color: 'rgba(37, 147, 255,0.6)',
              line: {
                color: 'rgba(37, 147, 255,1.0)',
                width: 1,
              },},
            x: timeSeriesData.map((entry) => entry.x),
            y: timeSeriesData.map((entry) => entry.y),
            text: timeSeriesData.map((entry) => entry.text),
            name: `${y_axis} vs ${x_axis}`,
            customdata: timeSeriesData.map((entry) => entry.text.split(":")[1])
          },
        ]}
        layout={{
          title: `${y_axis} vs ${x_axis} Time Series Plot`,
          xaxis: { title: `${x_axis}` },
          yaxis: { title: `${y_axis}` },
          paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
    plot_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent background
    margin: { t: 50, r: 50, l: 50, b: 50 }, // Adjust margins as needed
    hovermode: 'closest', // Adjust hovermode as needed
    autosize: true, // Adjust autosize as needed
    showlegend: true, // Adjust showlegend as needed
        }}
        config={{
          displayModeBar: true,
        }}
        
        onClick={handlePointClick}
      />

    </div>
  );
};

export default VersusPlot;
