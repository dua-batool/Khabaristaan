// src/services/chromaApi.js
const API_BASE_URL = 'http://localhost:8001';

export const fetchDataFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.text(); // Use .text() if the response is plain text
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    return "Error fetching data";
  }
};
