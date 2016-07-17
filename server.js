const express = require('express');
const request = require('request');

const app = express();

app.use('/', express.static('dist'));

app.use('/api', (req, res) => {
  console.log(req.path);
  request(`https://reddit.com${req.path}.json?limit=20`, (err, r, body) => {

    if (!err && r.statusCode === 200) {
      res.send(body);
    }
  });
});

const port = 80;
app.listen(port, () => console.log(`Express started on port ${port}.`));
