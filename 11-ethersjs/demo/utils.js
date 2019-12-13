const consola = require('consola')
const ethers = require('ethers')
const utils = ethers.utils

const addrFormat = _ => {
  const addr = '0xd115bffabbdd893a6f7cea402e7338643ced44a6'
  consola.info(utils.getAddress(addr), utils.getAddress(addr, true))
}

const bn = _ => {
  consola.info(utils.bigNumberify('100000000000000000000'))
}

const bytes32str = _ => {
  const text = 'Hello World'
  const bytes32 = utils.formatBytes32String(text)
  const origin = utils.parseBytes32String(bytes32)
  consola.info(bytes32, origin)
}

const constants = _ => {
  consola.info('address zer', ethers.constants.AddressZero)
  consola.info('hash zero', ethers.constants.HashZero)
  consola.info('max uint256', ethers.constants.MaxUint256.toString())
  consola.info('wei per ether', ethers.constants.WeiPerEther.toString())
  consola.info('ether symbol', ethers.constants.EtherSymbol)
}

const hash = _ => {
  consola.info('keccak256', utils.keccak256([0x42]))
  consola.info('sha256', utils.sha256([0x45]))
}

const random = _ => {
  consola.info('random', utils.bigNumberify(utils.randomBytes(1)).toString())
}

const main = () => {
  Promise.resolve()
    .then(_ => addrFormat())
    .then(_ => bn())
    .then(_ => bytes32str())
    .then(_ => constants())
    .then(_ => hash())
    .then(_ => random())
}

main()