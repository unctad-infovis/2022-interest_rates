import React, { useState, useEffect } from 'react';

// Load helpers.
import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartBar from './components/ChartBar.jsx';

import '../styles/styles.less';

function Figure2() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => val);
    const values = Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val));
    return ({
      data: values.map((val, j) => ({
        name: labels[j],
        y: val
      })),
      labels,
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-interest_rates/' : './'}assets/data/2022-interest_rates_figure_2.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(transpose(body)))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartBar
        data={dataFigure}
        data_decimals={0}
        idx="2"
        note=""
        show_first_label
        source="SOURCE"
        subtitle="Number of central bank interest rate increases"
        suffix=""
        title="Interest rate hikes are hitting harder the developing economies"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure2;
