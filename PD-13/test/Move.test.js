const Move = artifacts.require('./Move.sol')

require('chai')
	.use(require('chai-as-promised'))
	.should()

// @accounts that are passed from ganache
contract('Move', (accounts) => {
	let contract

	before(async() => {
		contract = await Move.deployed()
	})

	// describe is a container for all the test examples
	describe('deployment', async () => {
		
		// 'it' containes test examples

		// smoke test if it deploys succesfully
		it('deploys succesfully', async() =>{
			const address = contract.address
			assert.notEqual(address, '')
			assert.notEqual(address, 0x0)
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		// tests of the name of the token is Move
		it('has a name', async() => {
			const name = await contract.name()
			assert.equal(name, 'Move')
		})

		// tests of the Symbol of the token is MOVE
		it('has a symbol', async() => {
			const symbol = await contract.symbol()
			assert.equal(symbol, 'MOVE')
		})
	})

	describe('minting', async () => {

		// tests if a new token is created
		it('creates a new token', async() =>{
	  		const result = await contract.mint('1000xc30Ec9b5bd2e7433C12C3c8FFc875b1eA80347C1')
	  		const totalSupply = await contract.totalSupply()
	  		
	  		assert.equal(totalSupply,1)
	  		const event = result.logs[0].args
	  		assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
	  		assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
	  		assert.equal(event.to, accounts[0], 'to is correct')

	  })

	  	// tests if the token can be created twice
	  	it('cannot create the same token twice', async() =>{
			await contract.mint('1000xc30Ec9b5bd2e7433C12C3c8FFc875b1eA80347C1').should.be.rejected;
			const totalSupply = await contract.totalSupply()

			assert.equal(totalSupply,1)
		  })
	})
})