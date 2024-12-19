const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;

  beforeEach(async () => {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy("My Counter", 1);
  });

  describe("Deployment", () => {
    it("Set the initial a name", async () => {
      expect(await counter.count()).to.equal(1);
    });

    it("Set the initial a count", async () => {
      expect(await counter.name()).to.equal("My Counter");
    });
  });

  describe("Counting", () => {
    let transaction;

    it('reads the count from the "Count" public variable', async () => {
      expect(await counter.count()).to.equal(1);
    });

    it('reads the count from the "getCount" function', async () => {
      expect(await counter.getCount()).to.equal(1);
    });

    it("Increments the count", async () => {
      transaction = await counter.increment();
      await transaction.wait();
      expect(await counter.count()).to.equal(2);

      transaction = await counter.increment();
      await transaction.wait();
      expect(await counter.count()).to.equal(3);
    });

    it("Decrements the count", async () => {
      transaction = await counter.decrement();

      await transaction.wait();
      expect(await counter.count()).to.equal(0);

      await expect(counter.decrement()).to.be.reverted;
    });

    it('reads the count from the "Name" public variable', async () => {
      expect(await counter.name()).to.equal("My Counter");
    });

    it('reads the count from the "getName" function', async () => {
      expect(await counter.getName()).to.equal("My Counter");
    });

    it("Update the name of the counter", async () => {
      transaction = await counter.setName("New Counter");
      await transaction.wait();
      expect(await counter.name()).to.equal("New Counter");
    });
  });

  // describe('Counting', () => {
  //     it('Reads ')
  // })
});
