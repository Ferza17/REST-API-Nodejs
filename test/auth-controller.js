const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../models/user");

const UserController = require("../controller/user");
describe("User Controller - Login", function () {
  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "fery@gmail.com",
        password: "inipassword",
      },
    };

    UserController.login(req, {}, () => {}).then((result) => {
      console.log(result);
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne().restore();
  });
});
