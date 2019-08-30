const BBB = artifacts.require("TokenBeiBaoBiV2")
const BN = require('bignumber.js')

contract("BBB", accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]

  it("owner should has balance 4.75e25", () => {
    return BBB.deployed()
      .then(instance => {
        return instance.balanceOf.call(owner)
      })
      .then(balance => {
        console.log('owner balance', BN(balance).toString())
        assert.equal(balance.valueOf(), 4.75e25)
      })
  })

  it("someoneB should has balance 0", () => {
    return BBB.deployed()
      .then(instance => {
        return instance.balanceOf.call(someoneB)
      })
      .then(balance => {
        console.log('someoneB balance', BN(balance).toString())
        assert.equal(balance.valueOf(), 0)
      })
  })
})