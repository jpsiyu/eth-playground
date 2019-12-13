<template>
  <div class="net">
    <el-row>
      <span>NetId:</span>
      <span class="net-id">{{netId}}</span>
    </el-row>
    <el-row>
      <span>Listening:</span>
      <template v-if="listening">
        <i class="el-icon-success"></i>
      </template>
      <template v-else>
        <i class="el-icon-error"></i>
      </template>
    </el-row>
    <el-row>
      <span>Peer Count:</span>
      <el-badge :value="peerCount"></el-badge>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      netId: 0,
      listening: false,
      peerCount: 0
    }
  },
  mounted() {
    this.getNetInfo()
  },
  methods: {
    getNetInfo() {
      return Promise
        .all([
          this.$web3.eth.net.getId(),
          this.$web3.eth.net.isListening(),
          this.$web3.eth.net.getPeerCount()
        ])
        .then(res => {
          const [netId, listening, peerCount] = res
          this.netId = netId
          this.listening = listening
          this.peerCount = peerCount
        })
    }
  },
}
</script>

<style scoped>
.net {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.net-id{
  font-weight: 600;  
  font-style: italic;
  color: #409EFF;
  text-decoration: underline;
}

.el-icon-success{
  color: #67C23A;
  font-size: 20px;
}

.el-icon-error{
  color: #E6A23C;
  font-size: 20px;
}

.net >>> .el-badge__content{
  background-color: #409EFF;
}

.el-row{
  margin-right: 30px;
}
</style>