import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import colors from 'colors';
import connectDB from './config/mongodb.js';
import { pool, client } from './config/sqldb.js';
import userRoutes from './routes/userRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

config();
connectDB();
pool.connect();

const app = express();
app.use(cors());
// app.use(helmet());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/upload', uploadRoutes);

//path.join(__dirname, '../client/build/index.html')
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use(express.static('/uploads'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
  app.use(morgan('dev'));
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
