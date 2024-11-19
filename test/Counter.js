const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', function () {

    let counter;

    beforeEach(async () => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy('My Counter', 1)
    })

   describe('Deployment', () => { 
        it('Set the initial a name', async() => {
            expect(await counter.count()).to.equal(1)
        })
    
        it('Set the initial a count', async() => {
            expect(await counter.name()).to.equal('My Counter')
        })
    })

    describe('Counting', () => {
        let transaction;
        it('Increments the count', async() => {
            transaction = await counter.increment()
            await transaction.wait()
            expect(await counter.count()).to.equal(2)

            transaction = await counter.increment()
            await transaction.wait()
            expect(await counter.count()).to.equal(3)
        })

        it('Decrements the count', async() => {
            transaction = await counter.decrement()
        
            await transaction.wait()
            expect(await counter.count()).to.equal(0)

            await expect(counter.decrement()).to.be.reverted
        })
    })

    // describe('Counting', () => {
    //     it('Reads ')
    // })
})