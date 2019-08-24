1. 编译: truffle compile (network字段为{})
2. 部署: truffle migrate (network字段包含地址)
3. 运行合约: 
  3.1 truffle develop 进入终端，自动加载了所有的合约
  3.2 truffle migrate -f 2 部署编号为2的合约，HelloWorld
  3.2 创建合约实例: let hello = await HelloWorld.deployed()
  3.3 调用: hello.greet()
4. 测试: 必须连接 truffle develop 启动的节点，才能运行通过！！！