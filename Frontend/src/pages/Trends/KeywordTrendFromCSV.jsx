import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // For CSV parsing
import Plot from 'react-plotly.js';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const csvPath = '/articles.csv';

const urduStopwords = [
    "کا", "کے", "کی", "گیا", "گئی", "ہے", "ہیں", "تھا", "تھی", "تھے", 
    "نے", "پر", "سے", "اور", "یہ", "وہ", "میں", "تم", "بھی", "کرنے", 
    "گے", "گا", "لیے", "اس", "جس", "کو", "کہا", "ہو", "کہ", "آپ", "ہم", 
    "ان", "جن", "جنہیں", "جو", "کیا", "کیوں", "یہی", "ہے", "ہے۔"
];

const KeywordTrendFromCSV = () => {
  const [data, setData] = useState([]); // To hold parsed CSV data
  const [keyword, setKeyword] = useState("پاکستان"); // Default keyword
  const [trendData, setTrendData] = useState({});
  const [keyword1, setKeyword1] = useState("پاکستان"); // Default first keyword
  const [keyword2, setKeyword2] = useState("پاکستان"); // Default second keyword
  const [trendData1, setTrendData1] = useState({});
  const [trendData2, setTrendData2] = useState({});
  const [topKeywordsByYear, setTopKeywordsByYear] = useState([]);
  const [keywordFrequencyData, setKeywordFrequencyData] = useState([]);
  const [keywordArticleCount, setKeywordArticleCount] = useState(0); // To hold the number of articles with the keyword
  const [topArticles, setTopArticles] = useState([]);
  const [expandedArticles, setExpandedArticles] = useState({});

  // Step 1: Load CSV File and Parse Data
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

  // Step 2: Process Data for Trend Analysis and Top Keywords
  useEffect(() => {
    if (data.length > 0) {
      const yearlyCounts = {};
      const yearlyCounts1 = {};
      const yearlyCounts2 = {};
      const yearlyKeywords = {};
      let articleCountWithKeyword = 0; // Counter for articles with the keyword
      const keywordArticleCounts = [];

      data.forEach((row) => {
        const content = row.content || ""; 
        const articleName = row.filename || "Unknown Article"; 
        const date = row.date || "Unknown Date";

        if (date !== "Unknown Date") {
          const year = new Date(date).getFullYear();

          // Count keyword occurrences for the trend graph
          const occurrences = (content.match(new RegExp(keyword, 'gi')) || []).length;
          if (occurrences > 0) {
            articleCountWithKeyword += 1; // Increment the counter if the keyword appears in the article
            keywordArticleCounts.push({ articleName, occurrences }); // Add to the frequency list
          }
          yearlyCounts[year] = (yearlyCounts[year] || 0) + occurrences;

          // Count occurrences for the first keyword (keyword1)
          const occurrences1 = (content.match(new RegExp(keyword1, 'gi')) || []).length;
          yearlyCounts1[year] = (yearlyCounts1[year] || 0) + occurrences1;

          // Count occurrences for the second keyword (keyword2)
          const occurrences2 = (content.match(new RegExp(keyword2, 'gi')) || []).length;
          yearlyCounts2[year] = (yearlyCounts2[year] || 0) + occurrences2;

          // Tokenize content and filter out stopwords for top keywords
          const tokens = content
            .split(/\s+/)
            .filter((word) => word && !urduStopwords.includes(word));
          
          if (!yearlyKeywords[year]) yearlyKeywords[year] = {};
          tokens.forEach((token) => {
            yearlyKeywords[year][token] = (yearlyKeywords[year][token] || 0) + 1;
          });
        }
      });

      // Process top 10 keywords for each year
      const topKeywords = Object.entries(yearlyKeywords).map(([year, counts]) => {
        const sortedKeywords = Object.entries(counts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10); // Get top 10 keywords
        return { year, keywords: sortedKeywords };
      });

      // Sort by frequency in descending order and select the top 10 articles
      const top10Articles = keywordArticleCounts
        .sort((a, b) => b.occurrences - a.occurrences)
        .slice(0, 10);

      setTopArticles(top10Articles);

      setTrendData(yearlyCounts);
      setTrendData1(yearlyCounts1);
      setTrendData2(yearlyCounts2);
      setTopKeywordsByYear(topKeywords);
      setKeywordFrequencyData(keywordArticleCounts);
      setKeywordArticleCount(articleCountWithKeyword);
    }
  }, [data, keyword, keyword1, keyword2]);

  // Step 3: Prepare Data for Trend Plotly Chart
  const years = Object.keys(trendData).sort();
  const counts = years.map((year) => trendData[year]);
  const counts1 = years.map((year) => trendData1[year]);
  const counts2 = years.map((year) => trendData2[year]);

  // Step 4: Prepare Data for Plotly Keyword Frequency Bar Chart
  const sortedKeywordFrequency = keywordFrequencyData
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, 10); // Limit to the top 10 articles
  const articleNames = sortedKeywordFrequency.map(item => item.articleName);
  const occurrences = sortedKeywordFrequency.map(item => item.occurrences);

  // Toggle expanded state for a specific article
  const handleExpand = (index) => {
    setExpandedArticles(prevState => ({
      ...prevState,
      [index]: !prevState[index] // Toggle the expansion state for the clicked article
    }));
  };

  return (
    <div>
      {/* Input Field for Keyword */}
      <Box className="input-container">
      <label className="custom-label" htmlFor="keyword1">
            لفظ درج کریں
        </label>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
        className="custom-input"
      />
      </Box>

      {/* Displaying the number of articles with the keyword */}
      <Box className="keyword-count">
        <Typography sx={{lineHeight: '48px'}} variant="body1">
          The keyword "{keyword}" was found in {keywordArticleCount} articles.
        </Typography>
      </Box>

      {/* Trend Graph */}
      <Box className="graph-container">
      <Plot
        data={[
          {
            x: years,
            y: counts,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'orange' },
            line: {
              shape: 'spline', // Spline for smoother curves
              smoothing: 1,    // Control the smoothing level (0 to 1)
            },
          },
        ]}
        layout={{
          title: `Keyword Trend (By Year): '${keyword}'`,
          xaxis: { title: 'Year' },
          yaxis: { title: 'Occurrences' },
          template: 'plotly_white',
          font: {
            family: 'Noto Nastaliq Urdu, serif', 
          },
        }}
      />
      </Box>

      {/* Top 10 Keywords by Year with Accordion */}
      <h2>Top 10 Keywords by Year</h2>
      {topKeywordsByYear.map(({ year, keywords }) => (
        <Accordion key={year}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{`Top 10 Keywords for ${year}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map(([keyword, count]) => (
                  <tr key={keyword}>
                    <td>{keyword}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Top 10 Articles with Accordion */}
      {/* <h2>Top 10 Articles for Keyword "{keyword}"</h2>
      {topArticles.map(({ articleName, occurrences, content }, index) => {
        const excerpt = content ? content.slice(0, 200) : ""; // Safely slice content if available
        const expanded = expandedArticles[index] || false; // Use the expanded state from the object

        return (
          <Accordion key={index} expanded={expanded} onChange={() => handleExpand(index)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{`${articleName} - Occurrences: ${occurrences}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', maxHeight: expanded ? 'none' : '150px', overflowY: 'auto' }}>
              
                {content ? (expanded ? content : `${excerpt}...`) : "No content available"}
              </Typography>
              {!expanded && (
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => handleExpand(index)}
                  sx={{ marginTop: '10px', textAlign: 'center', display: 'block' }}
                >
                  Read more
                </Link>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })} */}

      {/* Keyword Frequency Across Articles Bar Chart */}
      <Box sx={{marginTop: '32px'}} className="keyword-frequency-graph">
        <Plot
          data={[
            {
              x: articleNames,
              y: occurrences,
              type: 'bar',
              marker: { color: 'orange' },
              text: occurrences.map((count) => count.toString()),
              textposition: 'outside',
            },
          ]}
          layout={{
            title: `Keyword Frequency Across Articles: '${keyword}'`,
            xaxis: { title: 'Article', tickangle: 45 },
            yaxis: { title: 'Frequency' },
            template: 'plotly_white',
            margin: { l: 40, r: 40, t: 60, b: 100 },
            font: {
              family: 'Noto Nastaliq Urdu, serif', 
            },
          }}
        />
      </Box>

      {/* Keyword Trend Comparision */}
      <h2>Keyword Trend Comparision "{keyword}"</h2>
      <div className="keyword-analysis-section">
        <Box fullWidth sx={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', gap: '32px'}}>
          {/* Input Field for Keyword 1 */}
          <Box sx={{flexGrow: 1}} className="input-container">
          <label className="custom-label" htmlFor="keyword1">
            پہلا لفظ درج کریں
          </label>
            <input
              type="text"
              value={keyword1}
              onChange={(e) => setKeyword1(e.target.value)}
              placeholder="Enter first keyword"
              className="custom-input"
            />
          </Box>

          {/* Input Field for Keyword 2 */}
          <Box sx={{flexGrow: 1}} className="input-container">
          <label className="custom-label" htmlFor="keyword1">
          دوسرا لفظ درج کریں
          </label>
            <input
              type="text"
              value={keyword2}
              onChange={(e) => setKeyword2(e.target.value)}
              placeholder="Enter second keyword"
              className="custom-input"
            />
          </Box>
        </Box>

        {/* Trend Graph for Keyword Comparison */}
        <div className="graph-container">
          <Plot
            data={[
              {
                x: years,
                y: counts1,
                type: 'scatter',
                mode: 'lines+markers',
                name: keyword1, // Line for the first keyword
                marker: { color: 'orange' },
                line: {
                  shape: 'spline', // Spline for smoother curves
                  smoothing: 1,    // Control the smoothing level (0 to 1)
                },
              },
              {
                x: years,
                y: counts2,
                type: 'scatter',
                mode: 'lines+markers',
                name: keyword2, // Line for the second keyword
                marker: { color: 'blue' },
                line: {
                  shape: 'spline', // Spline for smoother curves
                  smoothing: 1,    // Control the smoothing level (0 to 1)
                },
              },
            ]}
            layout={{
              title: `Keyword Trend Comparison: '${keyword1}' vs '${keyword2}'`,
              xaxis: { title: 'Year' },
              yaxis: { title: 'Occurrences' },
              template: 'plotly_white',
              font: {
                family: 'Noto Nastaliq Urdu, serif', 
              },
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default KeywordTrendFromCSV;
