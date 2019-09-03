const BN = require('bignumber.js')
const BBB = artifacts.require("TokenBeiBaoBi")

contract("BBB", accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]

  /*
  it("Every account should has balance 0 after deployed!", () => {
    return BBB.deployed()
      .then(instance => {
        const r = Math.floor(Math.random() * accounts.length)
        return instance.balanceOf.call(accounts[r])
      })
      .then(balance => {
        //console.log(someoneA, 'balance', BN(balance).toString())
        assert.equal(balance.valueOf(), 0)
      })
  })
  */

  /*
  it('Only owner can call loadUserAmount', () => {
    return BBB.deployed()
      .then(instance => {
        return instance.loadUserAmount(someoneA, 100, {from: owner})
      })
  })
  */

  it('loadOldTokenUserAmount', () => {
    let instance
    return BBB.deployed()
      .then(_instance => {
        instance = _instance
      })
      .then(() => {
        const amounts = [10, 20].map(e => BN(e))
        return instance.loadOldTokenUserAmount.call([someoneA, someoneB], amounts)
        //return instance.batchTransfer1.call([someoneA, someoneB], 20)
        //return instance.loadUserAmount(someoneA, 1000)
      })
      .then((res) => {
        console.log(res)
        //return instance.balanceOf.call(someoneA)
        return Promise.all([
          instance.balanceOf.call(someoneA),
          instance.balanceOf.call(someoneB),
        ])
      })
      .then(res => {
        const [balanceOfA, balanceOfB] = res
        assert.equal(balanceOfA, 1000)
        assert.equal(balanceOfB, 0)
      })
  })
})