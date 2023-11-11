import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import { DatabaseService } from './database/database.service.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const databaseService = new DatabaseService();

// Connect to the MongoDB cluster when the gateway starts
databaseService.connection.once('open', () => {
	console.log('Connected to MongoDB cluster');
});

const PORT = process.env.PORT || 8800;

const routes = [
	{
		path: '/api/auth/',
		target: process.env.AUTHEN_SERVICES_DOMAIN
	}
];

// Set up proxy middleware for each route
routes.forEach(({ path, target }) => {
	app.use(path, proxy(target, { proxyReqPathResolver: req => req.url }));
});

// Set up proxy middleware for each route
// routes.forEach(({ path, target, identifier }) => {
// 	app.use(path, proxy(target, {
// 		proxyReqPathResolver: req => req.url,
// 		userResDecorator: async (proxyRes, proxyResData, userReq, userRes) => {
// 			// Example: Modify the response data before sending it to the client
// 			const modifiedData = JSON.parse(proxyResData.toString('utf8'));
//
// 			// Get the model for the current microservice
// 			const model = databaseService.getModelForMicroservice(identifier);
//
// 			// Fetch additional data from the microservice's specific model
// 			const additionalData = await databaseService.getDataFromModel(model);
//
// 			// Add the additional data to the response
// 			modifiedData.additionalData = additionalData;
//
// 			return JSON.stringify(modifiedData);
// 		}
// 	}));
// });

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
