const { expect } = require("chai");
const { db, Word, Round, Game } = require("../models");

describe("Class and prototype methods", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("Word alphabetization", () => {
    it("Words are returned alphabetically", async () => {
      await Word.create({ word: "Titanic" });
      await Word.create({ word: "Sea Sluts" });
      await Word.create({ word: "Aquaholic" });
      await Word.create({ word: "SeaWorthy" });

      const alphabetizedWords = await Word.alphabetize();

      expect(alphabetizedWords.map(word => word.word)).to.deep.equal([
        "Aquaholic",
        "Sea Sluts",
        "SeaWorthy",
        "Titanic"
      ]);
    });
  });
});

describe("Game >-< Round Association", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("Sequelize assocations", () => {
    it("a round belongs to exactly one game", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const game1 = await Game.create({
        date: new Date(),
        mode: "1v1"
      });
      const game2 = await Game.create({
        date: new Date(),
        mode: "competition"
      });
      await round.setGame(game1);
      await round.setGame(game2);
      round.getGame().then(game => {
        expect(game.id).to.equal(game2.id);
      });
    });
  });
});

// describe('User >-< Order Association', () => {
//   before(() => db.sync({ force: true }));
//   afterEach(() => db.sync({ force: true }));

// describe('Sequelize Models', () => {
//   it('a user may belong to many orders', async () => {
//     const user = await User.create({
//       username: 'nati',
//       email: 'natiwhitney@gmail.com',
//     });
//     const orderInProgress = await Order.create({ status: 'PENDING' });
//     const orderCompleted = await Order.create({ status: 'COMPLETED' });
//     await user.addOrder([orderInProgress, orderCompleted]);
//     const userOrders = await user.getOrders();
//     expect(userOrders.map(order => order.status)).to.deep.equal([
//       'PENDING',
//       'COMPLETED',
//     ]);
//   });
// });
// });

// describe('Boat >-< Order Association', () => {
//   let titanic;
//   before(() => db.sync({ force: true }));
//   beforeEach(() => {
//     titanic = {
//       name: 'RMS Titanic',
//       description: 'A ship that cannot be sunk',
//       cost: 1001,
//     };
//   });
//   afterEach(() => db.sync({ force: true }));

//   describe('Sequelize Models', () => {
//     it('a boat contains many orders', async () => {
//       const boat = await Boat.create(titanic);
//       const order = await Order.create({ status: 'PENDING' });
//       const order2 = await Order.create({ status: 'COMPLETED' });
//       await boat.addOrder(order);
//       await boat.addOrder(order2);

//       const orders = await boat.getOrders();
//       expect(orders.length).to.equal(2);
//     });

//     it('an order contains many boats', async () => {
//       const boat = await Boat.create(titanic);
//       const boat2 = await Boat.create(
//         Object.assign(titanic, { name: 'the sea sluts' })
//       );
//       const order = await Order.create({ status: 'PENDING' });

//       await order.addBoat(boat);
//       await order.addBoat(boat2);

//       const boats = await order.getBoats();
//       expect(boats.length).to.equal(2);
//     });
//   });

//   describe('OrderBoats', () => {
//     it('order boats contain a boat id, an order id, and a default quantity of 1', async () => {
//       const boat = await Boat.create(titanic);
//       const order = await Order.create({ status: 'PENDING' });

//       await boat.addOrder(order);

//       const boats = await Boat.findAll({ include: [Order] });
//       const boatsWithOrderItems = boats.filter(b => {
//         const orders = b.orders;
//         const ordersWithOrderItems = orders.filter(
//           o => o.order_boats.quantity === 1
//         );
//         return ordersWithOrderItems.length > 0;
//       });
//       expect(boatsWithOrderItems.length).to.equal(1);
//     });

//     it('you can set the quantity of an order item', async () => {
//       const boat = await Boat.create(titanic);

//       const order = await Order.create({ status: 'PENDING' });

//       await boat.addOrder(order, { through: { quantity: 12 } });

//       const boatOrders = await boat.getOrders();
//       const orderQuantity = boatOrders[0].order_boats.quantity;

//       expect(orderQuantity).to.equal(12);
//     });
//   });

//   describe('Order instance method', () => {
//     it('If an order has no boats, the total is 0.0', async () => {
//       const order = await Order.create({ status: 'PENDING' });

//       await order.calculateTotal();

//       expect(order.total).to.deep.equal(0.0);
//     });

//     it('If an order has several boats, the total is the sum of the boat costs', async () => {
//       const order = await Order.create({ status: 'COMPLETED' });

//       const boat = await Boat.create(titanic);

//       const titanic2 = { ...titanic, cost: 1002 };
//       const boat2 = await Boat.create(Object.assign(titanic2));

//       await order.addBoats([boat, boat2]);

//       await order.calculateTotal();

//       expect(order.total).to.deep.equal(boat.cost + boat2.cost);
//     });
//   });

//   describe('Boat alphabetize', () => {
//     it.only('Boats are returned alphabetically', async () => {
//       const boat = await Boat.create({ name: 'Titanic', cost: 0 });
//       const boat2 = await Boat.create({ name: 'Sea Sluts', cost: 0 });
//       const boat3 = await Boat.create({ name: 'Aquaholic', cost: 0 });
//       const boat4 = await Boat.create({ name: 'SeaWorthy', cost: 0 });

//       const alphabetizedBoats = await Boat.alphabetize();

//       expect(alphabetizedBoats.map(boat => boat.name)).to.deep.equal([
//         'Aquaholic',
//         'Sea Sluts',
//         'SeaWorthy',
//         'Titanic',
//       ]);
//     });
//   });
// });
