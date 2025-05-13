import express from 'express';

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
  res.send('Hallo World');
});

export default app;
