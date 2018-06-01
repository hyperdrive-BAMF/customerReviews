// Init express
const express = require ('express');
const app = express();

// Paths
const path = require('path');
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'client', 'dist');

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(publicDir));
app.use(express.static(distDir));

// Routes
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(publicDir, 'index.html'));
});

// Start receiving requests
app.listen(process.env.PORT || 3003);