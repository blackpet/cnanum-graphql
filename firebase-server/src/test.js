const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({k1:1, k2:'b'});
})

app.listen(5544, () => {
  console.log('wow~~~~~~');
});
