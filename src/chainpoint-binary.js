let chpSchema = require('chainpoint-proof-json-schema')
let mpack = require('msgpack-lite')
let pako = require('pako')

var ChainpointBinary = function () {
  // in case 'new' was omitted
  if (!(this instanceof ChainpointBinary)) {
    return new ChainpointBinary()
  }

  ChainpointBinary.prototype.objectToBinary = function (proofObject, callback) {
    if (!proofObject) return callback('Could not parse Chainpoint v3 object')
    // if the proof supplied is a string, convert it to an object before conversion
    if (typeof proofObject === 'string') {
      try {
        proofObject = JSON.parse(proofObject)
      } catch (err) {
        return callback('Could not parse Chainpoint v3 object')
      }
    }

    // ensure the object is a well formatted, schema compliant Chainpoint proof
    let validateResult = chpSchema.validate(proofObject)
    if (!validateResult.valid) return callback('Could not parse Chainpoint v3 object')

    // convert to binary form
    _createBinary(proofObject, function (err, result) {
      return callback(err, result)
    })
  }

  ChainpointBinary.prototype.binaryToObject = function (proof, callback) {
    try {
      // if the proof supplied is not a Buffer, attempt to parse it as a hexadecimal string
      if (!Buffer.isBuffer(proof)) proof = new Buffer(proof, 'hex')

      // convert to object form
      _parseBinary(proof, function (err, result) {
        // ensure the result is a well formatted, schema compliant Chainpoint proof
        let validateResult = chpSchema.validate(result)
        if (!validateResult.valid) return callback('Could not parse Chainpoint v3 binary')
        return callback(err, result)
      })
    } catch (e) {
      return callback('Could not parse Chainpoint v3 binary')
    }
  }

  function _createBinary (proofObject, callback) {
    // compress with MessagePack and zlib
    let packedProof = mpack.encode(proofObject)
    let deflatedProof = pako.deflate(packedProof)
    return callback(null, Buffer.from(deflatedProof))
  }

  function _parseBinary (proof, callback) {
  function _createBinary (proofObject, callback) {
    // decompress from zlib and MessagePack
    let inflatedProof = pako.inflate(proof)
    let unpackedProof = mpack.decode(inflatedProof)
    return callback(null, unpackedProof)
  }
}

module.exports = ChainpointBinary
module.exports.getInstance = function () {
  return new ChainpointBinary()
}
