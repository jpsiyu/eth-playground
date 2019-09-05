const BN = require('bignumber.js')
const vmerror = require('../lib/vmerror.js')
const BBB = artifacts.require("TokenBeiBaoBi")

contract('BBB', accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const acc3 = accounts[2]
  const acc4 = accounts[3]
  const acc5 = accounts[4]
  const acc6 = accounts[5]
  const acc7 = accounts[6]
  const acc8 = accounts[7]

  let ins
  before(() => {
    return BBB.deployed()
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
      return ins.loadUserAmount(acc3, amount)
        .then(() => {
          return ins.balanceOf(acc3)
        })
        .then(balance => {
          assert.equal(balance, amount)
        })
    })

    it('Load multi user amount', () => {
      let amountB = 10
      let amountC = 20
      return ins.loadOldTokenUserAmount([acc4, acc5], [amountB, amountC])
        .then(() => {
          return Promise.all([
            ins.balanceOf.call(acc4),
            ins.balanceOf.call(acc5),
          ])
        })
        .then(res => {
          const [balanceOfB, balanceOfC] = res
          //console.log('balance:', BN(balanceOfB).toNumber())
          assert.equal(balanceOfB, amountB)
          assert.equal(balanceOfC, amountC)
        })
    })
    it('Only owner can load user amount', () => {
      return ins.loadUserAmount(acc3, 10, { from: admin })
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
      return ins.motivateTeam(0, acc6, teamCycleMax)
        .then(() => {
          return ins.balanceOf(acc6)
        })
        .then(balance => {
          assert.equal(balance, teamCycleMax)
        })
    })
    it(`Max motivate leagal amount: ${legalMax}`, () => {
      return ins.motivateLegal(acc7, legalMax)
        .then(() => {
          return ins.balanceOf(acc7)
        })
        .then(balance => {
          assert.equal(balance, legalMax)
        })
    })
    it(`Max motivate community amount: ${commMax}`, () => {
      return ins.motivateCommunity(acc8, commMax)
        .then(() => {
          return ins.balanceOf(acc8)
        })
        .then(balance => {
          assert.equal(balance, commMax)
        })
    })
  })
})
