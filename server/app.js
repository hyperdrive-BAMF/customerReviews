const express = require ('express');
const app = express();

const bodyParser = require('body-parser');

const path = require('path');
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');


app.use(bodyParser.json());
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(publicDir, 'index.html'));
});

app.listen(process.env.PORT);