import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes/index.js';
import { initDB } from './db/init.js';
import { PORT, FRONTEND_URL } from './config.js';

const app: Express = express();
const port = PORT;

const allowedOrigins = [FRONTEND_URL];
const options: cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.use('/api', routes);

await initDB();

app.listen(port, ()=> {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
