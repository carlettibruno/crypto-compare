var expect  = require('chai').expect;
var axios = require('axios');

//TODO as part of issue #2
it('Main page content', function(done) {
    axios.get(`http://localhost/pairs`)
    .then(function (response) {
        expect(response).to.equal(200);
        done();
    })
    .catch(function (error) {
        done();
    });
});