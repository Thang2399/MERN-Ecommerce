import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import axios from 'axios';
import { USER_ROLE } from './constant/index.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8800;

const routes = [
	{
		path: '/api/auth/',
		target: process.env.AUTHEN_SERVICES_DOMAIN
	},
	{
		path: '/api/',
		target: process.env.BASE_SERVICES_DOMAIN
	}
];

// Set up proxy middleware for each route
// routes.forEach(({ path, target }) => {
// 	app.use(path, proxy(target, { proxyReqPathResolver: req => req.url }));
// });

// Setup authorization with microservices
routes.forEach(({ path, target }) => {
	app.use(path, async (req, res, next) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `${req.headers.authorization}`
			};
			const response = await axios.post(`${process.env.AUTHEN_SERVICES_DOMAIN}me`, {}, {
				headers
			});
			const data = response?.data;
			// console.log('data', data);
			const { _id, userName, email, role } = data;
			if (_id) {
				// Include user information in the headers when forwarding the request to the main service
				req.headers['x-user-id'] = _id || '';
				req.headers['x-user-name'] = userName || '';
				req.headers['x-user-email'] = email || '';
				req.headers['x-user-role'] = role || USER_ROLE.USER;
			}
			// Forward the modified request to the main service
			proxy(target, { proxyReqPathResolver: req => req.url })(req, res, next);
		} catch (err) {
			console.error('Error:', err);
			proxy(target, { proxyReqPathResolver: req => req.url })(req, res, next);
		}
	});
});

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
