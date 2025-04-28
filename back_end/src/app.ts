import express, { Application }  from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import morgan from 'morgan';

const app: Application = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api',routes); 


app.get('/', (req, res) => {
  res.send('Healthcare API is running');
});


export default app;
