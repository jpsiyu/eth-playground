const ethers = require('ethers')
const consola = require('consola')
const SimpleStorage = require('../build/contracts/SimpleStorage.json')

const deploy = _ => {
  const url = 'http://localhost:9545'
  const provider = new ethers.providers.JsonRpcProvider(url)
  const privKey = 'b4385156bdc2db68fda97b16762140c1c0089b7710cebf4a50d8163debd94bd0'
  const wallet = new ethers.Wallet(privKey, provider)
  const factory = new ethers.ContractFactory(SimpleStorage.abi, SimpleStorage.bytecode, wallet)
  let contract
  factory.deploy("Hello World")
    .then(_contract => {
      contract = _contract
      return contract.deployed()
    })
    .then( _ => {
      contract.on('ValueChanged', (author, oldValue, newValue, event) => {
        consola.info(`value change event: from ${oldValue} to ${newValue}`)
      })
    })
    .then(_ => {
      consola.info(`contract deployed at ${contract.address}`)
    })
    .then( _ => {
      return contract.getValue()
    })
    .then(value => {
      consola.info(`contract value is ${value}`)
    })
    .then( _ => {
      return contract.setValue('I love u')
    })
    .then(tx => {
      consola.info(`get tx: ${tx.hash}`)
      return tx.wait()
    })
    .then( _ => {
      return contract.getValue()
    })
    .then(value => {
      consola.info(`contract value is ${value}`)
    })
}

deploy()