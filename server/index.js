import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import buildingsRoutes from './routes/Buildings.js';
import userRoutes from './routes/Users.js';
import leaseRoutes from './routes/Leases.js'

// import Stripe from 'stripe';

// const stripe = new Stripe('pk_live_51NPxo3HH0CZoQYbB3sTE5HUx2kiToUQ0Jq7MP1zEZBzh0APQvZbkTZaxqquTJgj7M6WPXiknPzVOnqk6HuNqrpcM00JbBiHO4o'
// , {
//   apiVersion: '2020-08-27',
// });

// const YOUR_DOMAIN = 'http://localhost:3000';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());




app.use('/buildings', buildingsRoutes);
app.use('/users', userRoutes);
app.use('/leases', leaseRoutes);





app.get('/', (req, res) => res.send('get'));




const CONNECTION_URL = 'mongodb+srv://user:userPass123@cluster0.nb6xkrq.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 3001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));



