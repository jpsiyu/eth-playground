1. 编译: truffle compile (network字段为{})
2. 部署: truffle migrate (network字段包含地址)
3. 运行合约: 
  * truffle develop 进入终端，自动加载了所有的合约
  * truffle migrate -f 2 部署编号为2的合约，HelloWorld
  * 创建合约实例: let hello = await HelloWorld.deployed()
  * 调用: hello.greet()
4. 测试: 
  * 必须连接 truffle develop 启动的节点，才能运行通过！！！
  * 命令需要指定network字段，truffle test test/helloworld.js --network develop  