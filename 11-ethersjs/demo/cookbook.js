const ethers = require('ethers')
const utils = ethers.utils
const consola = require('consola')

const randomMnemonic = _ => {
  let wallet = ethers.Wallet.createRandom()
  consola.info(`random from wallet: ${wallet.mnemonic}`)

  let mnemonic = utils.HDNode.entropyToMnemonic(utils.randomBytes(16), ethers.wordlists.zh_cn)
  consola.info(`complex verson: ${mnemonic}`)
}

const main = () => {
  Promise.resolve()
    .then(_ => randomMnemonic())
}

main()