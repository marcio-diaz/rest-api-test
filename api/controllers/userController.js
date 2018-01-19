'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('Users');

function sendResponse(res) {
    return (err, user) => {
	if (err) res.send(err);
	res.json(user);	
    };
}

exports.list = (req, res) => {
    User.find({}, sendResponse(res));
};

exports.create = (req, res) => {
    const newUser = new User(req.body);
    newUser.save(sendResponse(res));
};

exports.read = (req, res) => {
    User.findOne({'name': req.params.userName},
		 sendResponse(res));
};

exports.update = (req, res) => {
    User.findOneAndUpdate({ name: req.params.userName},
			  req.body, { new: true },
			  sendResponse(res));
};

exports.delete = (req, res) => {
    User.findOneAndRemove({ name: req.params.userName },
			  sendResponse(res));
};
