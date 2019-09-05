const BN = require('bignumber.js')
const BBB = artifacts.require("TokenBeiBaoBi")

contract('BBB', accounts => {
  it("Every account should has balance 0 after deployed!", () => {
    return BBB.deployed()
      .then(instance => {
        const r = Math.floor(Math.random() * accounts.length)
        return instance.balanceOf.call(accounts[r])
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 0)
      })
  })

})

contract('BBB loadUserAmount', accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]
  const someoneC = accounts[4]

  it('Only owner can call loadUserAmount', () => {
    let instance
    return BBB.deployed()
      .then(_instance => {
        instance = _instance
        return instance.loadUserAmount(someoneA, 100)
      })
      .then(_ => {
        return instance.balanceOf(someoneA)
      })
      .then(balance => {
        assert.equal(balance, 100)
      })
  })

  it('load multi user amount', () => {
    let instance
    return BBB.deployed()
      .then(_instance => {
        instance = _instance
      })
      .then(() => {
        return instance.loadOldTokenUserAmount([someoneB, someoneC], [10, 20])
      })
      .then((res) => {
        return Promise.all([
          instance.balanceOf.call(someoneB),
          instance.balanceOf.call(someoneC),
        ])
      })
      .then(res => {
        const [balanceOfB, balanceOfC] = res
        assert.equal(balanceOfB, 10)
        assert.equal(balanceOfC, 20)
      })
  })
})