const chai = require('chai');
const expect = chai.expect;
const Tools = require('../controllers/Tools');

describe('Test Suite Tools', () => {

    var T = new Tools();
    it('test instance', (done) => {
        //test addition
        expect(T).to.be.instanceOf(Tools);
        done();
    });
    it('test addition', (done) => {
        //test addition
        expect(T.addition(1,1)).to.be.equal(2);
        expect(T.addition(1,2)).to.be.equal(3);
        expect(T.addition(3,1)).to.be.equal(4);
        done();
    });
it('test quoi', (done) => {
        //test addition
        expect(T.quoi('blabla')).to.be.equal('labla');
        done();
    });

});