const ethers = require('ethers')
const consola = require('consola')

const defaultProvider = _ => {
  let provider = ethers.getDefaultProvider('homestead')
  consola.info(`default provider, name: ${provider.network.name}, chainId: ${provider.network.chainId}`)

  provider = ethers.getDefaultProvider('rinkeby')
  consola.info(`default provider, name: ${provider.network.name}, chainId: ${provider.network.chainId}`)

  provider = ethers.getDefaultProvider('ropsten')
  consola.info(`default provider, name: ${provider.network.name}, chainId: ${provider.network.chainId}`)
}

const rpcProvider = _ => {
  const url = 'http://localhost:9545'
  const provider = new ethers.providers.JsonRpcProvider(url)
  return provider.getNetwork()
    .then(net => {
      consola.info(`default provider, name: ${net.name}, chainId: ${net.chainId}`)
    })
    .catch(err => {
      consola.error(err.message)
    })
}

const getBalance = _ => {
  const url = 'http://localhost:9545'
  const acc = '0x97ef02e7e33f7c6fd1be5b2694de97a07e47bca0'
  const provider = new ethers.providers.JsonRpcProvider(url)
  return provider.getBalance(acc)
    .then(balance => {
      const balanceInEther = ethers.utils.formatEther(balance)
      consola.info(`balance of ${acc} is: ${balanceInEther}`)
    })
}

const getBlockNumber = _ => {
  const url = 'http://localhost:9545'
  const provider = new ethers.providers.JsonRpcProvider(url)
  return provider.getBlockNumber()
    .then(number => {
      consola.info(`block number is: ${number}`)
    })
}

const event = _ => {
  const url = 'http://localhost:9545'
  const provider = new ethers.providers.JsonRpcProvider(url)
  provider.on('0x97ef02e7e33f7c6fd1be5b2694de97a07e47bca0', balance => {
    consola.info(`balance change: ${balance}`)
  })
}

const main = async () => {
  return Promise.resolve()
    .then(_ => defaultProvider())
    .then(_ => rpcProvider())
    .then(_ => getBalance())
    .then(_ => getBlockNumber())
}

main()