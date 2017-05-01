/* global describe, it */

const should = require('should')
const cb = require('../index')
const fs = require('fs')

describe('Working with .JSON files ', function () {
  describe('Using a null proof object ', function () {
    it('should return the proper error message', function (done) {
      cb.objectToBinary(null, function (err, proofBinary) {
        should.exist(err)
        err.should.equal('No proof Object or JSON string arg provided')
        done()
      })
    })
  })

  describe('Using a bad proof string ', function () {
    it('should return the proper error message', function (done) {
      cb.objectToBinary('this is not JSON', function (err, proofBinary) {
        should.exist(err)
        err.should.equal('Invalid JSON string proof provided')
        done()
      })
    })
  })

  describe('Using a bad proof neither object nor string ', function () {
    it('should return the proper error message', function (done) {
      cb.objectToBinary(127, function (err, proofBinary) {
        should.exist(err)
        err.should.equal('Chainpoint v3 schema validation error')
        done()
      })
    })
  })

  describe('Using a bad proof non compliant string', function () {
    it('should return the proper error message', function (done) {
      cb.objectToBinary('{ "not": "CHPv3" }', function (err, proofBinary) {
        should.exist(err)
        err.should.equal('Chainpoint v3 schema validation error')
        done()
      })
    })
  })

  describe('Using a bad proof non compliant JSON', function () {
    it('should return the proper error message', function (done) {
      cb.objectToBinary({ not: 'CHPv3' }, function (err, proofBinary) {
        should.exist(err)
        err.should.equal('Chainpoint v3 schema validation error')
        done()
      })
    })
  })

  describe('Using a valid chainpoint v3 JSON file', function () {
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

describe('Working with .CHP files ', function () {
  describe('Using a null proof object ', function () {
    it('should return the proper error message', function (done) {
      cb.binaryToObject(null, function (err, proofBinary) {
        should.exist(err)
        err.should.equal('No proof Buffer or Hex string arg provided')
        done()
      })
    })
  })

  describe('Using a non-hex proof string ', function () {
    it('should return the proper error message', function (done) {
      cb.binaryToObject('this is not JSON', function (err, proofBinary) {
        should.exist(err)
        err.should.equal('Invalid Hex string')
        done()
      })
    })
  })

  describe('Using a bad proof neither object nor hex string ', function () {
    it('should return the proper error message', function (done) {
      cb.binaryToObject(127, function (err, proofBinary) {
        should.exist(err)
        err.should.equal('Invalid Hex string')
        done()
      })
    })
  })

  describe('Using a bad proof non compliant hex string', function () {
    it('should return the proper error message', function (done) {
      cb.binaryToObject('aabb1234', function (err, proofBinary) {
        should.exist(err)
        err.should.equal('Could not parse Chainpoint v3 binary')
        done()
      })
    })
  })

  describe('A valid proof converted from binary to JSON and back ', function () {
    describe('Using good1.chp', function () {
      it('should return proof equal to original binary', function (done) {
        fs.readFile('./test/good1.chp', function (err, proofBinary) {
          should.not.exist(err)
          should.exist(proofBinary)
          cb.binaryToObject(proofBinary, function (err, jsonSample) {
            should.not.exist(err)
            should.exist(jsonSample)
            cb.objectToBinary(jsonSample, function (err, proofObject) {
              should.not.exist(err)
              should.exist(proofObject)
              let binariesEqual = proofObject.equals(proofBinary)
              binariesEqual.should.equal(true)
              done()
            })
          })
        })
      })
    })
  })
})
