const ethers = require('ethers')
const consola = require('consola')
const path = require('path')
const fs = require('fs')
const security = require('../../config/security.js')

const walletFromKey = _ => {
  const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
  const wallet = new ethers.Wallet(privateKey)
  consola.info(`create wallet with private key, address: ${wallet.address}`)
}

const walletFromRandom = _ => {
  const wallet = ethers.Wallet.createRandom()
  consola.info(`create wallet randomly, address: ${wallet.address}`)
}

const walletFromJson = _ => {
  const keyPath = path.resolve(__dirname, '../../config/privkey/UTC--2019-08-24T01-40-47.882911000Z--a370bfe70687e3d2f17d4723d7d5bfec8806a63b')
  const keyData = fs.readFileSync(keyPath, 'utf8')

  return ethers.Wallet.fromEncryptedJson(keyData, security.password)
    .then(wallet => {
      consola.info(`create wallet from json, address: ${wallet.address}`)
    })
    .catch(err => {
      consola.error(err)
    })
}

const walletFromMnemonic = _ => {
  const mnemonic = 'radar blur cabbage chef fix engine embark joy scheme fiction master release'
  const path = "m/44'/60'/1'/0/0"
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, path)
  consola.info(`create wallet from mnemonic, address: ${wallet.address}`)
}

const sign = _ => {
  const privateKey = '0x3141592653589793238462643383279502884197169399375105820974944592'
  const wallet = new ethers.Wallet(privateKey)
  const transaction = {
    nonce: 0,
    gasLimit: 21000,
    gasPrice: ethers.utils.bigNumberify("20000000000"),
    to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",
    value: ethers.utils.parseEther("1.0"),
    data: "0x",
    chainId: ethers.utils.getNetwork('homestead').chainId
  }
  return wallet.sign(transaction)
    .then(signedTx => {
      consola.info('signed transaction', signedTx)
    })
}

const main = async () => {
  return Promise.resolve()
    .then(_ => walletFromKey())
    .then(_ => walletFromRandom())
    .then(_ => walletFromJson())
    .then(_ => walletFromMnemonic())
    .then( _ => sign())
}

main()
