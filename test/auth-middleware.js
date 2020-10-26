const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
const authMiddleware = require("../middleware/auth");

describe("Auth Middleware", () => {
  it("should throw an error if no authorization header is present", () => {
    const req = {
      get: () => {
        return null;
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not Authenticated."
    );
  });

  it("should throw an error if the authorization header only one string", () => {
    const req = {
      get: (headerName) => {
        return "xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", () => {
    const req = {
      get: (headerName) => {
        return "Bearer dasdasd";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      userId: "abc",
    });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("should throw an error if the token cannot be verified", () => {
    const req = {
      get: (headerName) => {
        return "Bearer xyz";
      },
    };

    expect(authMiddleware.bind(this.req, {}, () => {})).to.throw;
  });
});
