<template>
  <div class="acc">
    <h1>Account</h1>
    <el-button v-if="!metamaskEnable" @click="enable">Login MetaMask</el-button>
    <div class="list">
      <span v-for="(item, index) in accounts" :key="index">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [],
      metamaskEnable: false
    }
  },
  mounted() {
    this.metamaskEnable = this.$metamask.isEnabled()
  },
  methods: {
    enable() {
      this.$metamask.enable()
        .then(_ => {
          this.metamaskEnable = this.$metamask.isEnabled()
          if(this.metamaskEnable){
            this.accounts = this.$metamask.accounts
          }
        })
    }
  },
}
</script>