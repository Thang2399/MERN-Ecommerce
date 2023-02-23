import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import itemRoutes from './routes/singleItem.route.js';
import invoiceRoutes from './routes/invoice.route.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = 8800;

mongoose
	.connect(process.env.MONGOOSE_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`listening on port ${PORT}`);
		})
	)
	.catch(err => console.log(err));
