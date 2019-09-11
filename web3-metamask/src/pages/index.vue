<template>
  <div class="idx">
    <template v-if="hasMetamask">
      <Net />
      <Account />
    </template>
    <template v-else>
      <Plugin />
    </template>
  </div>
</template>

<script>
import Plugin from '@/components/Plugin'
import Net from '@/components/Net'
import Account from '@/components/Account'
export default {
  components: { Plugin, Net, Account },
  data() {
    return {
      hasMetamask: false,
    }
  },
  mounted() {
    this.hasMetamask = this.$metamask.using()
  },
  methods: {
  },
}
</script>
