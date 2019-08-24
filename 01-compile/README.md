### 编译
1. 执行 compile.sh
2. 结果生成bin目录，xxx.bin是节点可运行程序，xxx.abi为合约程序接口

### 手工部署
1. 连接节点: connect.sh
2. 解锁账号: personal.unlockAccount(eth.coinbase, '123456', 0)
3. 定义bytecode: bytecode = 'bin/xxx.bin的内容'
4. 发送交易:tx = eth.sendTransaction({from: eth.coinbase, data: '0x'+bytecode, gas:1000e3})
5. 查看等待打包的交易: eth.pendingTransactions
6. 查看交易详情: eth.getTransactionReceipt(tx)
7. 后去合约地址: address = eth.getTransactionReceipt(tx).contractAddress

### 执行合约
1. 定义abi: abi = bin/xxx.abi的内容 (是列表，不是字符串)
2. 创建合约实例: HelloWorld = eth.contract(abi).at(address)
3. 执行合约函数:  HelloWorld.greet()
