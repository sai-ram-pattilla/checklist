const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware for CORS
app.use(cors());

// Endpoint to fetch data from the external API
app.get("/api/application", async (req, res) => {
  try {
    const apiUrl =
      "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";
    const response = await axios.get(apiUrl);

    // Pass data from the external API to the frontend
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
