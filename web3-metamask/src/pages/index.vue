<template>
  <div class="idx">
    <template v-if="hasMetamask">
      <div class="idx-main">
        <span>Network id: {{netId}}</span>
      </div>
    </template>
    <template v-else>
      <div class="idx-plugin">
        <h2>MetaMask插件</h2>
        <a href="https://metamask.io/" target="_blank">
          <span>请到MetaMask官网安装插件</span>
          <i class="el-icon-back"></i>
        </a>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  data() {
    return {
      hasMetamask: false,
      netId: null,
    }
  },
  mounted() {
    this.hasMetamask = this.$metamask.using()
    if(!this.hasMetamask) return
    this.getNetId()
  },
  methods: {
    getNetId() {
      return this.$web3.eth.net.getId()
        .then(netId => {
          this.netId = netId
        })
        .catch(err => {
          throw err
        })
    },
    test() {
      if (this.$metamask.using()) {
        Promise.resolve()
          .then(_ => {
            return this.$web3.eth.net.getId()
          })
          .then(netId => {
            console.log(netId)
          })
          .then(_ => {
            return this.$metamask.enable()
          })
          .then(_ => {
          })
          .finally(_ => {
            console.log('finally', this.$metamask.accounts)
          })
      }
    }
  },
}
</script>

<style scoped>
.idx-plugin {
  margin-top: 100px;
}

.idx-plugin a {
  text-decoration: none;
}

.idx-plugin i {
  transform: rotateZ(180deg);
}

.idx-plugin span {
  letter-spacing: 1.5px;
}
</style>