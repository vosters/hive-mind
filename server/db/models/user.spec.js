const { expect } = require("chai");
const { db, Users } = require("../models");

describe("User model", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("column definitions and validations", () => {
    it("has a facebookId`, `email`, `password`, `username`, `photo`, `loacation`,`gender`, `age`, `createdAt`, and `isAdmin` property", () => {
      return Users.create({
        facebookId: "abcdefg",
        email: "johnsmith@gmial.com",
        password: "password",
        username: "user1",
        photo: "www.picture.com",
        loacation: 12345,
        gender: "Male",
        age: 21,
        createdAt: new Date(),
        isAdmin: false
      }).then(user => {
        expect(user.facebookId).to.equal("abcdefg");
        expect(user.email).to.equal("johnsmith@gmial.com");
        expect(user.password).to.equal("password");
        expect(payment.username).to.equal("user1");
        expect(user.photo).to.equal("www.picture.com");
        expect(user.loacation).to.equal(12345);
        expect(user.gender).to.equal("Male");
        expect(user.age).to.equal(21);
        expect(user.createdAt).to.equal(new Date());
        expect(user.isAdmin).to.equal(false);
      });
    });
  });
});
