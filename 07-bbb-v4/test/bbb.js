const BN = require('bignumber.js')
const vmerror = require('../lib/vmerror.js')
const BBB = artifacts.require("TokenBeiBaoBi")

contract('BBB', accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]
  const someoneC = accounts[4]

  let ins
  beforeEach(() => {
    return BBB.new(owner, admin)
      .then(_ins => {
        ins = _ins
      })
  })

  describe('Initialize', () => {
    it("Every account should has balance 0 after deployed!", () => {
      const r = Math.floor(Math.random() * accounts.length)
      return ins.balanceOf(accounts[r])
        .then(balance => {
          assert.equal(balance.valueOf(), 0)
        })
    })
  })

  describe('LoadUserAmount', () => {
    let amount = 100
    it(`Load one user amount: ${amount}`, () => {
      return ins.loadUserAmount(someoneA, amount)
        .then(() => {
          return ins.balanceOf(someoneA)
        })
        .then(balance => {
          assert.equal(balance, amount)
        })
    })

    it('Load multi user amount', () => {
      let amountA = 10
      let amountB = 20
      return ins.loadOldTokenUserAmount([someoneA, someoneB], [amountA, amountB])
        .then(() => {
          return Promise.all([
            ins.balanceOf.call(someoneA),
            ins.balanceOf.call(someoneB),
          ])
        })
        .then(res => {
          const [balanceA, balanceB] = res
          //console.log('balance:', BN(balanceOfB).toNumber())
          assert.equal(balanceA, amountA)
          assert.equal(balanceB, amountB)
        })
    })
    it('Only owner can load user amount', () => {
      return ins.loadUserAmount(someoneA, 10, { from: admin })
        .catch(err => {
          assert(err.message.startsWith(vmerror.head(vmerror.ErrType.revert)))
        })
    })
  })

  describe('Motivate', () => {
    const teamCycleMax = '10000000000000000000000000'
    const legalMax = '5000000000000000000000000'
    const commMax = '45000000000000000000000000'
    it(`Max motivate team amount: ${teamCycleMax}`, () => {
      return ins.motivateTeam(0, someoneA, teamCycleMax)
        .then(() => {
          return ins.balanceOf(someoneA)
        })
        .then(balance => {
          assert.equal(balance, teamCycleMax)
        })
    })
    it(`Max motivate leagal amount: ${legalMax}`, () => {
      return ins.motivateLegal(someoneA, legalMax)
        .then(() => {
          return ins.balanceOf(someoneA)
        })
        .then(balance => {
          assert.equal(balance, legalMax)
        })
    })
    it(`Max motivate community amount: ${commMax}`, () => {
      return ins.motivateCommunity(someoneA, commMax)
        .then(() => {
          return ins.balanceOf(someoneA)
        })
        .then(balance => {
          assert.equal(balance, commMax)
        })
    })
  })

  describe('BatchTransfer', () => {
    const amountA = 1000
    const amountB = 300
    const amountC = 500
    it(`Load someoneA ${amountA}, then someoneA batch transfer someoneB ${amountB} and someoneC ${amountC}`, () => {
      return ins.loadUserAmount(someoneA, amountA)
        .then(() => {
          return ins.batchTransfer2([someoneB, someoneC], [amountB, amountC], { from: someoneA })
        })
        .then(() => {
          return Promise.all([
            ins.balanceOf(someoneA),
            ins.balanceOf(someoneB),
            ins.balanceOf(someoneC)
          ])
        })
        .then(res => {
          const [balanceA, balanceB, balanceC] = res
          assert.equal(balanceA, amountA - amountB - amountC)
          assert.equal(balanceB, amountB)
          assert.equal(balanceC, amountC)
        })
    })
  })
})
