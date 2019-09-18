const ErrType = {
  revert: "revert",
  outOfGas: "out of gas",
  invalidJump: "invalid JUMP",
  invalidOpcode: "invalid opcode",
  stackOverflow: "stack overflow",
  stackUnderflow: "stack underflow",
  staticStateChange: "static state change",
  invalidAddr: "invalid address"
}

const ErrPrefix = 'Returned error: VM Exception while processing transaction: '

const head = (errtype) => {
  return ErrPrefix + errtype
}

module.exports = {
  ErrType,
  ErrPrefix,
  head
}