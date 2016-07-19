const express = require('express');
const request = require('request');

const app = express();

app.use('/', express.static('dist'));

app.use('/api', (req, res) => {
  console.log(req.path);

  const options = {
    uri: `https://reddit.com${req.path}.json`,
    headers: {
      'User-Agent': 'material reddit app',
    },
    qs: {
      'limit': 20,
      'raw_json': 1,
    },
  };

  request(options, (err, r, body) => {

    if (!err && r.statusCode === 200) {
      res.send(body);
    }
  });
});

const port = 80;
app.listen(port, () => console.log(`Express started on port ${port}.`));
