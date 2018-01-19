const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser'),
    config = require('./_config.js');


mongoose.Promise = global.Promise;

function handleDBConnection(err, res) {
    if (err) {
	console.log('Error connecting to the database. ' + err);
    } else {
	console.log('Connected to Database: '
		    + config.mongoURI[app.settings.env]);
    }
}

mongoose.connect(config.mongoURI[app.settings.env],
		 { useMongoClient: true },
		 handleDBConnection);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const routes = require('./api/routes/userRoutes');

routes(app);

app.listen(port);

console.log('User RESTful API server started on: ' + port);

module.exports = app;
