<template>
  <div class="idx">
    <template v-if="hasMetamask">
      <Net />
    </template>
    <template v-else>
      <Plugin />
    </template>
  </div>
</template>

<script>
import Plugin from '@/components/Plugin'
import Net from '@/components/Net'
export default {
  components: { Plugin, Net },
  data() {
    return {
      hasMetamask: false,
    }
  },
  mounted() {
    this.hasMetamask = this.$metamask.using()
  },
  methods: {
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
