//app.js

const express = require('express');
const bodyParser = require('body-parser');
const egql = require('express-graphql');
const mongoose = require('mongoose'); 


const OTPSchema = require('./graphql/schema');
const OTPResolvers = require('./graphql/resolvers');

const app = express();



app.use(bodyParser.json());


app.use('/api', egql({
	schema: OTPSchema,
	rootValue: OTPResolvers,  
	graphiql: true
}));


mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@otp-cluster-syomc.gcp.mongodb.net/` +
  `${process.env.MONGO_DB}?authSource=admin&retryWrites=true&w=majority`
).then(() => {
	app.listen(4000);
}).catch((err) => {
	console.log(err);
});

