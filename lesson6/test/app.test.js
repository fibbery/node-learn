var app = require('../app');
var should = require('should');

describe('test/app.test.js', function(){
    it('should equal 0 where n === 0', function(){
        app.fibonacci(0).should.equal(0);
    });

});