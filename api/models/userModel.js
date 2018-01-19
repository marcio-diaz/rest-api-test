'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
	type: String,
	required: 'Enter your user name',
	unique: true,
    },
    date_of_birth: {
	type: Date,
	required: 'Enter your date of birth'
    },
    address: {
	type: String,
	required: 'Enter your address',
    },
    description: {
	type: String,
	required: 'Enter your description',
    },
    created_at: {
	type: Date,
	default: Date.now,
    }
});

module.exports = mongoose.model('Users', UserSchema);
