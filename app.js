const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mongodb:mongodb@shop-api-snp1z.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect('mongodb+srv://mongodb:mongodb@shop-api-snp1z.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true }, {useMongoClient: true});
//mongoose.connect('mongodb+srv://mongodb:mongodb@shop-api-snp1z.mongodb.net/test?retryWrites=true');
// mlabs 
// mongoose.connect('mongodb://mongodb:mongodb1@ds019990.mlab.com:19990/restapi',  {useMongoClient: true});
//{useMongoClient: true}
//{ useNewUrlParser: true },

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH', 'DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
