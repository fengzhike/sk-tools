const supertest = require('supertest');

function request(){
    return supertest('http://localhost:3000');
}

describe('GET /getData',function(){
    it('respond with json', function(done){
        request()
            .get('/getdata')
            .expect(200)
            .end(function(err, res){
                console.log(res.body)
                if (err) throw err;
                done();
            })
    });
});