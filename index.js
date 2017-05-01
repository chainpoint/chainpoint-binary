const chpSchema = require('chainpoint-proof-json-schema')
const mpack = require('msgpack-lite')
const pako = require('pako')

let isValidHex = function (hex) {
  var hexRegex = /^[0-9A-Fa-f]{2,}$/
  var hasHexChars = hexRegex.test(hex)
  var hasEvenLen = hex.length % 2 === 0

  if (hasHexChars && hasEvenLen) return true
  return false
}

exports.objectToBinary = function (proofObj, cb) {
  if (!proofObj) return cb('No proof Object or JSON string arg provided')

  // Handle a JSON String arg
  if (typeof proofObj === 'string') {
    try {
      proofObj = JSON.parse(proofObj)
    } catch (err) {
      return cb('Invalid JSON string proof provided')
    }
  }

  // A well-formed, schema compliant Chainpoint proof?
  let validateResult = chpSchema.validate(proofObj)
  if (!validateResult.valid) return cb('Chainpoint v3 schema validation error')

  let deflatedProof = pako.deflate(mpack.encode(proofObj))
  return cb(null, Buffer.from(deflatedProof))
}

exports.binaryToObject = function (proof, cb) {
  if (!proof) return cb('No proof Buffer or Hex string arg provided')

  try {
    // Handle a Hexadecimal String arg in addition to a Buffer
    if (!Buffer.isBuffer(proof)) {
      if (isValidHex(proof)) {
        proof = new Buffer(proof, 'hex')
      } else {
        return cb('Invalid Hex string')
      }
    }

    let unpackedProof = mpack.decode(pako.inflate(proof))
    if (!chpSchema.validate(unpackedProof).valid) return cb('Chainpoint v3 schema validation error')
    return cb(null, unpackedProof)
  } catch (e) {
    return cb('Could not parse Chainpoint v3 binary')
  }
}
