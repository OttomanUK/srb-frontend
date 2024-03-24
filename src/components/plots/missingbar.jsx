import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const MissingBarPlot = ({ data, chartBy = "ntn", anomaly1 }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const generateChartData = () => {
      if (!data || data.length === 0) {
        setChartData([]);
        return;
      }

      const distributionByChartBy = data[0].reduce((acc, entry) => {
        const key = entry[chartBy];

        if (!acc[key]) {
          acc[key] = {
            missingInvoices: 0,
          };
        }

        acc[key].missingInvoices += calculateMissingInvoiceCount(entry.invoices);

        return acc;
      }, {});

      const sortedChartData = Object.keys(distributionByChartBy)
        .map((key) => ({ chartByValue: key, missingInvoices: distributionByChartBy[key].missingInvoices }))
        .sort((a, b) => b.missingInvoices - a.missingInvoices);

      setChartData(sortedChartData);
    };

    generateChartData();
  }, [data, chartBy]);

  const calculateMissingInvoiceCount = (invoices) => {
    if (!invoices) {
      return 0;
    }
    const invoiceRanges = invoices.split(',');
    let missingCount = 0;
    invoiceRanges.forEach((range) => {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number);
        missingCount += end - start + 1;
      } else {
        missingCount++;
      }
    });
    return missingCount;
  };

  const handleClick = (event) => {
    const point = event.points[0];
    const search = point.label || point.x;

    dispatch(addGoToGraph(true));

    let url = "/dashboard?";
    const params = { location: reduxLocation, ntn: reduxNtn, pos: reduxPos, date: reduxDate, anomaly: reduxAnomalous };

    if (chartBy === "description") {
      params.anomaly = getKeyByValue(anomalyHashMap, search);
    } else {
      params[chartBy] = search;
    }

    url += Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
    navigate(url);
  };


  return (
    <div>
      <h2 className="text-3xl font-bolds text-center dark:text-white">Top 10 Missing{anomaly1} by {chartBy}</h2>

      <Plot
        className='w-full'
        data={[
          {
            type: 'bar',
            x: chartData.slice(0, 10).map((entry) => entry.chartByValue),
            y: chartData.slice(0, 10).map((entry) => entry.missingInvoices),
            text: chartData.map((entry) => `${chartBy}: ${entry.chartByValue}`),
            marker: {
              color: 'rgba(37, 147, 255,0.6)',
              line: {
                color: 'rgba(37, 147, 255,1.0)',
                width: 2,
              },
            }
          }
        ]}
        layout={{
          title: `Top 10 ${anomaly1} by ${chartBy}`,
          xaxis: { title: `${chartBy.charAt(0).toUpperCase() + chartBy.slice(1)}` },
          yaxis: { title: 'Total Missing Invoices' },
          paper_bgcolor: 'rgba(255, 255, 255, 0)',
          plot_bgcolor: 'rgba(255, 255, 255, 0)',
          margin: { t: 50, r: 50, l: 50, b: 50 },
          hovermode: 'closest',
          autosize: true,
          showlegend: true,
        }}
        onClick={handleClick}

      />

      <h2 className="text-3xl font-bold text-center dark:text-white">Missing Anomaly Distribution by {chartBy}</h2>

      <Plot
        className='w-full'
        data={[
          {
            type: 'pie',
            values: chartData.map((entry) => entry.missingInvoices),
            labels: chartData.map((entry) => entry.chartByValue),
            hoverinfo: 'percent+label',
            textinfo: 'none',
          }
        ]}
        layout={{
          title: `Anomaly Distribution by ${chartBy}`,
          paper_bgcolor: 'rgba(255, 255, 255, 0)',
          plot_bgcolor: 'rgba(255, 255, 255, 0)',
          margin: { t: 50, r: 50, l: 50, b: 50 },
          hovermode: 'closest',
          autosize: true,
          showlegend: true,
        }}
        onClick={handleClick}
      />
    </div>
  );
};

MissingBarPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        invoices: PropTypes.string,
        date: PropTypes.string,
        ntn: PropTypes.number,
        pos_id: PropTypes.number,
        anomaly: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
      })
    )
  ).isRequired,
  chartBy: PropTypes.oneOf(['ntn', 'pos_id']).isRequired,
  anomaly1: PropTypes.string.isRequired,
};

export default MissingBarPlot;
