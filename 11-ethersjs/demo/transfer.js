const consola = require('consola')
const ethers = require('ethers')
const HDNode = ethers.utils.HDNode
const utils = ethers.utils

const showBalance = async (provider, addrList) => {
  const promiseList = addrList.map(e => {
    return provider.getBalance(e)
  })
  return Promise.all(promiseList)
    .then(res => {
      const merge = addrList.map((e, index) => {
        return {
          addr: e,
          balance: utils.formatEther(utils.bigNumberify(res[index])),
        }
      })
      console.table(merge)
    })
}

const main = () => {
  const url = 'http://localhost:9545'
  const provider = new ethers.providers.JsonRpcProvider(url)
  let master, nodeX, nodeY
  Promise.resolve()
    .then(_ => provider.getNetwork())
    .then(net => consola.info(`connect to network with chainId ${net.chainId}`))
    .then(_ => {
      const password = 'hejife37249238jfij23'
      const mnemonic = 'radar blur cabbage chef fix engine embark joy scheme fiction master release'
      master = HDNode.fromMnemonic(mnemonic, ethers.wordlists.en, password)
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
      consola.info('at the beginning, their balance: ')
      return showBalance(provider, [nodeX.address, nodeY.address])
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
      consola.info('after truffle account transfer to nodeX')
      return showBalance(provider, [nodeX.address, nodeY.address])
    })
    .then(_ => {
      const node = master.derivePath(nodeX.path)
      consola.info('create a node with private key of nodeX')
      console.table(node)
      const wallet = new ethers.Wallet(node.privateKey, provider)
      return wallet.sendTransaction({
        to: nodeY.address,
        value: utils.parseEther('0.5')
      })
    })
    .then(tx => {
      return tx.wait()
    })
    .then(_ => {
      consola.info('after nodeX transfer to nodeY')
      return showBalance(provider, [nodeX.address, nodeY.address])
    })
}

main()