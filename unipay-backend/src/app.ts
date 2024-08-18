import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import paymentRoutes from './routes/paymentRoutes';
import cors from 'cors';

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
  
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/payments', paymentRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Unified Payment Gateway API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
