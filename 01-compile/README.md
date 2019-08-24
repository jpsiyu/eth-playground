### 编译
 - 执行 compile.sh
 - 结果生成bin目录，xxx.bin是节点可运行程序，xxx.abi为合约程序接口

### 手工部署
 - 连接节点: connect.sh
 - 解锁账号: personal.unlockAccount(eth.coinbase, '123456', 0)
 - 定义bytecode: bytecode = 'bin/xxx.bin的内容'
 - 发送交易:tx = eth.sendTransaction({from: eth.coinbase, data: '0x'+bytecode, gas:1000e3})
 - 查看等待打包的交易: eth.pendingTransactions
 - 查看交易详情: eth.getTransactionReceipt(tx)
 - 获取合约地址: address = eth.getTransactionReceipt(tx).contractAddress

### 执行合约
 - 定义abi: abi = bin/xxx.abi的内容 (是列表，不是字符串)
 - 创建合约实例: HelloWorld = eth.contract(abi).at(address)
 - 执行合约函数:  HelloWorld.greet()
