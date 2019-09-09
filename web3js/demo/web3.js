const Web3 = require('web3')
const consola = require('consola')

const main = () => {
  consola.info('version', Web3.version)
  consola.info('providers', Web3.providers)
  consola.info('modules', Object.keys(Web3.modules))

  const url = 'http://localhost:9545'
  const web3 = new Web3(url)
  web3.eth.net.getId()
    .then(id => consola.info('networkd id', id))
    .then(_ => web3.eth.getAccounts())
    .then(accounts => consola.info('accounts', accounts))
}

main()