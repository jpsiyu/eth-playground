const ethers = require('ethers')
const HDNode = ethers.utils.HDNode
const consola = require('consola')

const main = () => {
  const mnemonic = 'radar blur cabbage chef fix engine embark joy scheme fiction master release'
  const masterNode = HDNode.fromMnemonic(mnemonic, ethers.wordlists.en, 'heloji')
  const ethNode = masterNode.derivePath("m/44'/60'/0'/0/0")
  const xpriv = ethNode.extendedKey
  const xpub = ethNode.neuter().extendedKey
  consola.info(`master node info, priv: ${xpriv}, pub: ${xpub}`)
}
main()