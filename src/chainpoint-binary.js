let chpSchema = require('chainpoint-proof-json-schema')
let mpack = require('msgpack-lite')
let pako = require('pako')

var ChainpointBinary = function () {
  // in case 'new' was omitted
  if (!(this instanceof ChainpointBinary)) {
    return new ChainpointBinary()
  }

  ChainpointBinary.prototype.fromJSON = function (proofJSON, callback) {
    var proofObject = null
    try {
      proofObject = JSON.parse(proofJSON)
    } catch (err) {
      return callback('Could not parse Chainpoint v3 JSON')
    }
    this.fromObject(proofObject, function (err, result) {
      return callback(err, result)
    })
  }

  ChainpointBinary.prototype.fromObject = function (proofObject, callback) {
    if (!proofObject) return callback('Could not parse Chainpoint v3 object')

    let validateResult = chpSchema.validate(proofObject)
    if (!validateResult.valid) return callback('Could not parse Chainpoint v3 object')

    _createBinary(proofObject, function (err, result) {
      return callback(err, result)
    })
  }

  ChainpointBinary.prototype.toJSON = function (proof, callback) {
    this.toObject(proof, function (err, result) {
      if (err) {
        callback(err)
      } else {
        callback(null, JSON.stringify(result))
      }
    })
  }

  ChainpointBinary.prototype.toObject = function (proof, callback) {
    try {
      _parseBinary(proof, function (err, result) {
        let validateResult = chpSchema.validate(result)
        if (!validateResult.valid) return callback('Could not parse Chainpoint v3 binary')
        return callback(err, result)
      })
    } catch (e) {
      return callback('Could not parse Chainpoint v3 binary')
    }
  }

  function _createBinary (proofObject, callback) {
    let packedProof = mpack.encode(proofObject)
    let deflatedProof = pako.deflate(packedProof)
    return callback(null, Buffer.from(deflatedProof))
  }

  function _parseBinary (proof, callback) {
    let inflatedProof = pako.inflate(proof)
    let unpackedProof = mpack.decode(inflatedProof)
    return callback(null, unpackedProof)
  }
}

module.exports = ChainpointBinary
module.exports.getInstance = function () {
  return new ChainpointBinary()
}
