var request = require('request');

describe("mn-requests", function() {
  it("should respond with nothing", function(done) {
    request("http://localhost:8080", function(error, response, body) {
      expect(error).toBe(null);
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
