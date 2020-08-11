import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json('Sucess');
});

app.listen(3333);
