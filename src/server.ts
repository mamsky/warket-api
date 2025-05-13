import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import config from './config/config';

app.listen(config.port, () => {
  console.log(`server running at http://localhost:${config.port}`);
  console.log(`local server ${process.env.LOCAL_NETWORK}:${config.port}`);
});
