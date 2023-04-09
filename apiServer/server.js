const express = require('express');
const { getmember } = require('./services/getmember');

const app = express();

app.listen(7777, () => {
  console.log('API Server is listening on 7777 PORT');
});

app.get('/', (req, res) => {
  res.status(200).send('API Server running');
});

app.get('/getmember/:business', async (req, res) => {
  await getmember(req, res);
});
