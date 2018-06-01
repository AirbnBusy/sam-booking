const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

const port = 3001;

app.listen(port, () => {
  console.log('Listening on port 3001...');
});
