const ethers = require('ethers')
const HDNode = ethers.utils.HDNode
const consola = require('consola')

const main = () => {
  const mnemonic = 'radar blur cabbage chef fix engine embark joy scheme fiction master release'
  const masterNode = HDNode.fromMnemonic(mnemonic, ethers.wordlists.en, 'heloji')
  consola.info('master node')
  console.table(masterNode)

  const masterEthNode = masterNode.derivePath("m/44'/60'/0'/0")
  console.table(masterEthNode)

  const p0 = masterEthNode.derivePath('0')
  consola.info('node 0')
  console.table(p0)

  const p1 = masterEthNode.derivePath('1')
  consola.info('node 1')
  console.table(p1)

  const p01 = masterEthNode.derivePath('0/1')
  consola.info('node 0/1')
  console.table(p01)

  const p11 = masterEthNode.derivePath('1/1')
  consola.info('node 1/1')
  console.table(p11)


}
main()