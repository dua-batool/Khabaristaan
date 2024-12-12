// Step 1: Import Required Libraries
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // For CSV parsing
import Plot from 'react-plotly.js';
const csvPath = '/articles.csv';

const KeywordTrendFromCSV = () => {
  const [data, setData] = useState([]); // To hold parsed CSV data
  const [keyword, setKeyword] = useState("پاکستان"); // Default keyword
  const [trendData, setTrendData] = useState({});

  // Step 2: Load CSV File and Parse Data
  useEffect(() => {
    fetch(csvPath) 
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // Treat the first row as header
          complete: (result) => {
            setData(result.data); // Set the parsed data
          },
        });
      });
  }, []);

  // Step 3: Process Data for Trend Analysis
  useEffect(() => {
    if (data.length > 0) {
      const yearlyCounts = {};

      data.forEach((row) => {
        const content = row.content || ""; // Adjust column name if different
        const date = row.date || "Unknown Date";

        if (date !== "Unknown Date") {
          const year = new Date(date).getFullYear();
          const occurrences = (content.match(new RegExp(keyword, 'gi')) || []).length;
          yearlyCounts[year] = (yearlyCounts[year] || 0) + occurrences;
        }
      });

      setTrendData(yearlyCounts);
    }
  }, [data, keyword]);

  // Step 4: Prepare Data for Plotly
  const years = Object.keys(trendData).sort();
  const counts = years.map((year) => trendData[year]);

  return (
    <div>
      {/* Input Field for Keyword */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
      />

      {/* Trend Graph */}
      <Plot
        data={[
          {
            x: years,
            y: counts,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'orange' },
          },
        ]}
        layout={{
          title: `Keyword Trend: '${keyword}'`,
          xaxis: { title: 'Year' },
          yaxis: { title: 'Occurrences' },
          template: 'plotly_white',
        }}
      />
    </div>
  );
};

export default KeywordTrendFromCSV;
