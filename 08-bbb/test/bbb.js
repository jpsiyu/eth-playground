const BBB = artifacts.require("TokenBeiBaoBi")
const BN = require('bignumber.js')

contract("BBB", accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someone = accounts[2]

  it("someone should has balance 12345", () => {
    return BBB.deployed()
      .then(instance => {
        return instance.balanceOf.call(someone)
      })
      .then(balance => {
        console.log(someone, 'balance', BN(balance).toString())
        assert.equal(balance.valueOf(), 12345)
      })
  })
})