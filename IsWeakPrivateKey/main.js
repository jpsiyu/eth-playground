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
    '0001',
    '3333',
    '',
  ]
  console.log('\n')
  keys.forEach(e => {
    const res = isWeakPrivateKey(e)
    console.log(`is ${e} weak private key? ${res}`)
  })
  console.log('\n')
}

test()