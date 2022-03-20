const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const should = chai.should();
const expect = chai.expect;


chai.use(chaiHttp);

describe('/GET cars', () => {
    it('it should return status 200', (done) => {
        chai.request(process.env.SERVER)
            .get('/cars')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
    });

    it('body should contain cars and weather Munich', (done) => {
        chai.request(process.env.SERVER)
            .get('/cars')
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('cars');
                res.body.should.have.property('weatherMunich');
                done();
        });
    });
});

describe('/POST cars', () => {
    it('it should return status 201', (done) => {
        let car = {
            plate: 'tes0001',
            color:  'test'
        }
        chai.request(process.env.SERVER)
            .post('/cars')
            .send(car)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('data');
                done();
            });
    });
    it('if car exists it should say so', (done) => {
        let car = {
            plate: 'tes0001',
            color:  'test'
        }
        chai.request(process.env.SERVER)
            .post('/cars')
            .send(car)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.should.have.property('msg').eql("car with this plate already exists!");
                done();
            });
    });
});

describe('/GET car by ID', () => {
    it('it should return status 200', (done) => {
        chai.request(process.env.SERVER)
            .get('/cars/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('car');
                done();
            });
    });
});

describe('/PUT car by ID', () => {
    it('it should return status 200', (done) => {

        chai.request(process.env.SERVER)
            .get('/cars/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('car');
                done();
            });
    });
});
