import Web3 from 'web3'

class Metamask {
  constructor() {
    this.ethereum = window.ethereum
    this.isEnable = false
    this.accounts = []
  }

  using() {
    return (typeof this.ethereum !== 'undefined') && (this.ethereum.isMetaMask)
  }

  async enable() {
    return this.ethereum.enable()
      .then(accounts => {
        this.isEnable = true
        this.accounts = accounts
      })
      .catch(err => {
        throw err
      })
  }
}


export default {
  install(Vue, options) {
    const mm = new Metamask()
    const web3 = mm.using()
      ? new Web3(mm.ethereum)
      : null
    Vue.prototype.$metamask = mm
    Vue.prototype.$web3 = web3
  }
}