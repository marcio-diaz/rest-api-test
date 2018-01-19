'use strict';

process.env.NODE_ENV = 'test';


const User = require('../api/models/userModel')

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const mongoose = require('mongoose');
const should = chai.should();
chai.use(chaiHttp);

const myDate = new Date('1970-10-02');
const myDateStr = myDate.toISOString();

const user1 = {
    'name': 'marcio',
    'date_of_birth': myDateStr,
    'address': 'cosenza 1849',
    'description': 'mi descripcion',
};

const user2 = {
    'name': 'jose',
    'date_of_birth': myDateStr,
    'address': 'cosenza 0000',
    'description': 'mi descripcion 2',
};

const user3 = Object.assign(user1, {
    'name': 'batman',
    'description': 'caballero de la noche',
});

function checkUser(res_user, user) {
    Object.keys(user).forEach(key => {
	res_user.should.have.property(key);
	res_user[key].should.equal(user[key]);	
    });
}

describe('Users', () => {

    User.collection.drop();
    
    beforeEach(done => {
	const newUser = new User(user1);
	newUser.save(err => { done(); });
    });

    afterEach(done => { User.collection.drop; done(); });
    
    it('should list ALL users on /users GET', done => {
	chai.request(server)
	    .get('/users')
	    .end((err, res) => {
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('array');
		checkUser(res.body[0], user1);
		done();
	    });
    });
    
    it('should add a SINGLE user on /users POST', done => {
	chai.request(server)
	    .post('/users')
	    .send(user2)
	    .end((err, res) => {
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		checkUser(res.body, user2);
		done();
	    })
    });
    
    it('should list a SINGLE user on /users/<name> GET', done => {
	chai.request(server)
	    .get('/users/' + user1.name)
	    .end((err, res) => {
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		checkUser(res.body, user1);
		done();
	    });	
    });
    
    it('should update a SINGLE user on /users/<name> PUT', done => {
	chai.request(server)
	    .put('/users/' + user1.name)
	    .send(user3)
	    .end((error, res) => {
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		checkUser(res.body, user3);
		done();
	    });
    });
    
    it('should delete a SINGLE user on /users/<name> DELETE', done => {
	chai.request(server)
	    .delete('/users/' + user3.name)
	    .end((error, res) => {
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		checkUser(res.body, user3);
		done();
	    });
    });
});
