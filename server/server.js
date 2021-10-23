import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
import connectDB from './config/mongodb.js';
import { pool, client } from './config/sqldb.js'
import userRoutes from './routes/userRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cors from 'cors';

config();
connectDB();
pool.connect();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
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
