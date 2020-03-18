const { expect } = require("chai");
const { db, User } = require(".");

describe("User model", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("column definitions and validations", () => {
    it("has an email, password, username, createdAt, and isAdmin property", () => {
      return User.create({
        email: "johnsmith@gmial.com",
        password: "password",
        username: "user1",
        createdAt: new Date(),
        isAdmin: false
      }).then(user => {
        expect(user.email).to.equal("johnsmith@gmial.com");
        expect(user.password).to.equal("password");
        expect(user.username.to.equal("user1");
        expect(user.createdAt).to.equal(new Date());
        expect(user.isAdmin).to.equal(false);
      });
    });
  });
});
