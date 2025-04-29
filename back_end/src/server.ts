import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'
import expressListEndpoints from 'express-list-endpoints';

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('✅ Available routes:');
    console.table(expressListEndpoints(app));
  });
})
.catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});
