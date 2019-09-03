const isWeakPrivateKey = (privKey) => {
  let res = false
  for (let i = 0; i < privKey.length; i++) {
    const start = privKey[i]
    let neighbor
    i + 1 < privKey.length ? neighbor = privKey[i + 1] : false
    if ((start === '0') || (neighbor === '0') || (start === neighbor)) {
      res = true
      break
    }
  }
  return res
}

const test = () => {
  const keys = [
    '1234',
    '0123',
    '1023',
    '1203',
    '1230',
    '1123',
    '1223',
    '1233',
    '1112',
  ]
  console.log('\n')
  keys.forEach(e => {
    const res = isWeakPrivateKey(e)
    console.log(`is ${e} weak private key? ${res}`)
  })
  console.log('\n')
}

test()