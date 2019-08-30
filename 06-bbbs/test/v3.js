const BBB = artifacts.require("TokenBeiBaoBiV3")
const BN = require('bignumber.js')

contract("BBB", accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]

  it("someoneA should has balance 100", () => {
    return BBB.deployed()
      .then(instance => {
        return instance.balanceOf.call(someoneA)
      })
      .then(balance => {
        //console.log(someoneA, 'balance', BN(balance).toString())
        assert.equal(balance.valueOf(), 100)
      })
  })

  it("someoneB should has balance 200", () => {
    return BBB.deployed()
      .then(instance => {
        return instance.balanceOf.call(someoneB)
      })
      .then(balance => {
        //console.log(someoneB, 'balance', BN(balance).toString())
        assert.equal(balance.valueOf(), 200)
      })
  })
})