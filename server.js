const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static assets from the current directory
app.use(express.static(__dirname));

// Serve index.html for all routes to support SPA behavior if tabs are linked
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Epicure server is running on port ${PORT}`);
});
