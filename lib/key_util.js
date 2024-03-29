const isWeakPrivateKey = (privKey) => {
  if (!privKey) return true
  let res = false
  for (let i = 0; i < privKey.length; i++) {
    const start = privKey[i]
    let neighbor1, neighbor2
    i + 1 < privKey.length ? neighbor1 = privKey[i + 1] : false
    i + 2 < privKey.length ? neighbor2 = privKey[i + 2] : false
    if (start === neighbor1 && neighbor1 === neighbor2) {
      res = true
      break
    }
  }
  return res
}

const isWeakPrivateKeyReg = (privKey) => {
  if (!privKey) return true
  const reg2 = /(\w)\1{2}/g;
  res = privKey.match(reg2)
  return res != null
}

export default {
  isWeakPrivateKey,
  isWeakPrivateKeyReg
}