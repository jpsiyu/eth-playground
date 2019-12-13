const ShapeCalculator = artifacts.require("ShapeCalculator")

contract("ShapeCalculator", accounts => {
  let ins
  beforeEach(() => {
    return ShapeCalculator.new()
      .then(_ins => {
        ins = _ins
      })
  })

  describe('Initialize', () => {
    const w = 10
    const h = 20
    it(`cal retangle with w:${w}, h:${h}`, () => {
      return ins.rectangle(w, h)
        .then(res => {
          const { s, p } = res
          assert.equal(w * h, s)
          assert.equal((w + h) * 2, p)
        })
    })
  })
})