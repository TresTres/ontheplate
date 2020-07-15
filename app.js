//app.js

const fs = require('fs');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const egql = require('express-graphql');
const mongoose = require('mongoose'); 


const OTPSchema = require('./graphql/schema');
const OTPResolvers = require('./graphql/resolvers');
const authcheck = require('./middleware/authcheck');


const key = fs.readFileSync('./server.key');
const cert = fs.readFileSync('./server.cert');

const app = express();
const server = https.createServer({key : key, cert: cert}, app);

app.use(bodyParser.json());

app.use((req, res, next) => {
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

	if(req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.use(authcheck);

app.use('/api', egql({
	schema: OTPSchema,
	rootValue: OTPResolvers,  
	graphiql: true
}));


mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@otp-cluster-syomc.gcp.mongodb.net/` +
  `${process.env.MONGO_DB}?authSource=admin&retryWrites=true&w=majority`
).then(() => {
	server.listen(4000);
}).catch((err) => {
	console.log(err);
});

