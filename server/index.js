import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import itemRoutes from './routes/singleItem.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/items', itemRoutes);

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
