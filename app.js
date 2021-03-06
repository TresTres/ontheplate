//app.js

const fs = require('fs');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); 
const jwt = require('jsonwebtoken');


const OTPSchema = require('./graphql/schema');
const OTPResolvers = require('./graphql/resolvers');

const key = fs.readFileSync('./server.key');
const cert = fs.readFileSync('./server.cert');


const app = express();
const server = https.createServer({key : key, cert: cert}, app);
app.use(bodyParser.json());
app.use(cookieParser(), 
	async (req, _, next) => {
		try {
			if(req.cookies.id) {
				const { userID } = jwt.verify(req.cookies.id, process.env.JWT_SECRET);
				req.userID = userID;
			}
		} catch (err) {
			console.log(err);
		}
		return next();
});
app.use('/api',
	graphqlHTTP((req, res) => ({
		schema: OTPSchema,
		rootValue: OTPResolvers,  
		graphiql: true,
		context: { res, userID: req.userID }
	}))
);
app.use('/signout',
	async (_, res, next) => {
		try {
			res.clearCookie('id');
		} catch (err) {
			console.log(err);
		}
		return next();
});




mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@otp-cluster-syomc.gcp.mongodb.net/` +
  `${process.env.MONGO_DB}?authSource=admin&retryWrites=true&w=majority`
).then(() => {
	server.listen(4000);
}).catch((err) => {
	console.log(err);
});

