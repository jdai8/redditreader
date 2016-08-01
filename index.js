const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile('dist/index.html');
});

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Express started on port ${port}.`));
