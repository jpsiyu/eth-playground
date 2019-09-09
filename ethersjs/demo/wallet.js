const ethers = require('ethers')
const consola = require('consola')
const path = require('path')
const fs = require('fs')
const security = require('../../config/security.js')

const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
const wallet = new ethers.Wallet(privateKey)
consola.info(`create wallet with private key, address: ${wallet.address}`)

const defaultProvider = ethers.getDefaultProvider()
consola.info(`default priveder is ${defaultProvider.network.name}`)

const rwallet = ethers.Wallet.createRandom()
consola.info(`create wallet randomly, address: ${rwallet.address}`)

const keyPath = path.resolve(__dirname, '../../config/privkey/UTC--2019-08-24T01-40-47.882911000Z--a370bfe70687e3d2f17d4723d7d5bfec8806a63b')
const keyData = fs.readFileSync(keyPath, 'utf8')

ethers.Wallet.fromEncryptedJson(keyData, security.password)
  .then(wallet => {
    consola.info(`create wallet from json, address: ${wallet.address}`)
  })
  .catch(err => {
    consola.error(err)
  })