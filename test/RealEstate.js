const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealEstate", () => {
  let realestate, escrow;
  let deployer, seller;
  let nftID = 1;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    seller = deployer;
    buyer = accounts[1];

    const RealEstate = await ethers.getContractFactory("RealEstate");
    const Escrow = await ethers.getContractFactory("Escrow");

    realestate = await RealEstate.deploy();
    console.log("RealEstate Address:", realestate.address); // Debug log
    escrow = await Escrow.deploy(realestate.address, nftID, seller, buyer);
  });

  describe("Deployment", async () => {
    it("sends an NFT to the seller / deployer", async () => {
      expect(await realestate.ownerOf(nftID)).to.equal(seller.address);
    });
  });

  describe("Selling real estate", async () => {
    it("excutes q succeful transaction", async () => {
      expect(await realestate.ownerOf(nftID)).to.equal(seller.address);

      transaction = await escrow.connect(buyer).finalizeSale();
      await transaction.wait();
      console.log("Buyer finalizes sale " + transaction);

      expect(await realestate.ownerOf(nftID)).to.equal(buyer.address);
    });
  });
});
