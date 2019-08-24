const HelloWorld = artifacts.require("HelloWorld")

contract("HelloWorld", accounts => {
  it("getNum() should return number 8", () => {
    HelloWorld.deployed()
      .then(instance => {
        return instance.getNum()
      })
      .then(num => {
        assert.equal(num, 8)
      })
  })
  it('greet() should return "Hello World"', () => {
    return HelloWorld.deployed()
      .then(instance => {
        return instance.greet()
      })
      .then(msg => {
        assert.equal(msg, 'Hello Worlddd')
      })
  })
})