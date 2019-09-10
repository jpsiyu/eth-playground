const consola = require('consola')
const ethers = require('ethers')
const HDNode = ethers.utils.HDNode
const utils = ethers.utils

const main = () => {
  const url = 'http://localhost:9545'
  const provider = new ethers.providers.JsonRpcProvider(url)
  let nodeX, nodeY
  Promise.resolve()
    .then(_ => provider.getNetwork())
    .then(net => consola.info(`connect to network with chainId ${net.chainId}`))
    .then(_ => {
      const password = 'hejife37249238jfij23'
      const mnemonic = 'radar blur cabbage chef fix engine embark joy scheme fiction master release'
      const master = HDNode.fromMnemonic(mnemonic, ethers.wordlists.en, password)
      const eth = master.derivePath("m/44'/60'/0'/0")
      nodeX = eth.derivePath('3/2')
      nodeX = nodeX.neuter()
      consola.info('create an node, x, and neuter it')
      console.table(nodeX)

      nodeY = nodeX.derivePath('4')
      consola.info('create an node, y, derive from the neuter x')
      console.table(nodeY)
    })
    .then(_ => {
      return Promise.all([
        provider.getBalance(nodeX.address),
        provider.getBalance(nodeY.address)
      ])
    })
    .then(res => {
      const [balanceX, balanceY] = res
      consola.info('at the beginning, their balance should be 0')
      console.table({
        'balance of x': utils.formatEther(utils.bigNumberify(balanceX)),
        'balance of y': utils.formatEther(utils.bigNumberify(balanceY))
      })
    })
    .then(_ => {
      const truffleKey = 'b4385156bdc2db68fda97b16762140c1c0089b7710cebf4a50d8163debd94bd0'
      const truffleWallet = new ethers.Wallet(truffleKey, provider)
      return truffleWallet.sendTransaction({
        to: nodeX.address,
        value: utils.parseEther('1')
      })
    })
    .then(tx => {
      return tx.wait()
    })
    .then(_ => {
      return Promise.all([
        provider.getBalance(nodeX.address),
        provider.getBalance(nodeY.address)
      ])
    })
    .then(res => {
      const [balanceX, balanceY] = res
      consola.info('truffle account to balanceX')
      console.table({
        'balance of x': utils.formatEther(utils.bigNumberify(balanceX)),
        'balance of y': utils.formatEther(utils.bigNumberify(balanceY))
      })
    })
    .then(_ => {
      const wallet = new ethers.Wallet(nodeX.privateKey, provider)
      return wallet.sendTransaction({
        to: nodeY.address,
        value: utils.parseEther('0.5')
      })
    })
    .then(tx => {
      return tx.wait()
    })
    .then(_ => {
      return Promise.all([
        provider.getBalance(nodeX.address),
        provider.getBalance(nodeY.address)
      ])
    })
    .then(res => {
      const [balanceX, balanceY] = res
      consola.info('balanceX to balanceY')
      console.table({
        'balance of x': utils.formatEther(utils.bigNumberify(balanceX)),
        'balance of y': utils.formatEther(utils.bigNumberify(balanceY))
      })
    })
}

main()