const express = require("express");
const app = express();

const PORT = 3000;

// Sample secure data
const secureData = {
  id: 1,
  message: "This is confidential information.",
};

// Middleware to check for the API key
function apiKeyMiddleware(req, res, next) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorized: API key is missing" });
  }

  if (apiKey !== "valid-api-key") {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }

  next();
}

// Protected route
app.get("/api/secure-data", apiKeyMiddleware, (req, res) => {
  res.status(200).json({ secureData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
