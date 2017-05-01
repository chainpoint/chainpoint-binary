/* global describe, it */

const should = require('should')
const cb = require('../index')
const fs = require('fs')

describe('A valid proof converted to binary and back ', function () {
  describe('Using test1.json', function () {
    it('should return proof equal to original JSON', function (done) {
      fs.readFile('./docs/samples/chainpoint-proof-v3.json', 'utf-8', function (err, jsonSample) {
        should.not.exist(err)
        should.exist(jsonSample)
        cb.objectToBinary(jsonSample, function (err, proofBinary) {
          should.not.exist(err)
          should.exist(proofBinary)
          cb.binaryToObject(proofBinary, function (err, proofObject) {
            should.not.exist(err)
            should.exist(proofObject)
            jsonSample = jsonSample.replace(/(\r\n|\n|\r| )/gm, '') // remove any whitespace/cf/lf
            let resultJSON = JSON.stringify(proofObject)
            resultJSON.should.equal(jsonSample)
            done()
          })
        })
      })
    })
  })
})
