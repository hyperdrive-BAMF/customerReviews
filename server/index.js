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

var apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Default Route
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(publicDir, 'index.html'));
});

// 404 if all of the other handlers have fallen through
app.get('*', (req, res) => {
  res.status(404).json({message: "File Not Found"});
});

// Start receiving requests
app.listen(process.env.PORT || 3003);
