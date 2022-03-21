const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const should = chai.should();
const car_repo = require('../src/repositories/car_repository')


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
        const car = {
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
        const car = {
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
    it('it should GET a car by the given ID',  async () => {
        const car = {
            plate: 'tes0002',
            color: 'test'
        }
        // is that right?

        const car_id = await car_repo.postCars(car)
        chai.request(process.env.SERVER)
            .get('/cars/' + car_id[0]["car_id"])
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('car');
            });

    });
});


describe('/PUT car by ID', () => {
    it('it should update a car by the given ID',  async () => {
        const car = {
            plate: 'tes0003',
            color: 'tes'
        }
        // is that right?
        const car_id = await car_repo.postCars(car);
        chai.request(process.env.SERVER)
            .put('/cars/' + car_id[0]["car_id"])
            .send({
                plate: 'tes0003',
                color: 'put'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                // res.body.should.have.property('car_id').eql(car_id[0]["car_id"]);
            });

    });
});


describe('/DELETE car by ID', () => {
    it('it should delete a car by the given ID', async() => {
        const car = {
            plate: 'del0001',
            color: 'del'
        }
        // is that right?
        const car_id = await car_repo.postCars(car);
        chai.request(process.env.SERVER)
            .delete('/cars/' + car_id[0]["car_id"])
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql(
                    "Car with id=" + car_id[0]["car_id"] + " deleted successfully");
                res.body.should.have.property('data');
                // res.body.should.have.property('car_id').eql(car_id[0]["car_id"]);
            });
    });
});


describe('/GET Drivers', () => {
    it('it should return status 200', (done) => {
        chai.request(process.env.SERVER)
            .get('/drivers')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('body should contain drivers', (done) => {
        chai.request(process.env.SERVER)
            .get('/drivers')
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('drivers').eql([]);
                done();
            });
    });
});

describe('/POST Drivers', () => {
    it('it should return status 201',  async() => {
        const car = {
            plate: 'drv0000',
            color: 'testDriver'
        }
        // is that right?
        const car_id = await car_repo.postCars(car);
        // weird thing happened in this test.
        // It passed the test even though it should not (change driver last name to color)
        const driver = {
            first_name: 'George',
            color:  'Kyriazis',
            car_id: car_id[0]["car_id"]
        };
        chai.request(process.env.SERVER)
            .post('/drivers')
            .send(driver)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('data');
            });
    });
});

