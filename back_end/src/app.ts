import express, { Application }  from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app: Application = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api',routes); 




app.get('/', (req, res) => {
  res.send('Healthcare API is running');
});



export default app;
