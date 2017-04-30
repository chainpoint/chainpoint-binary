/* global describe, it */

const should = require('should')
const ChainpointBinary = require('../src/chainpoint-binary')
const fs = require('fs')

describe('Testing valid format receipts should convert to CHP and back to same source JSON ', function () {
  describe('Using test1.json - ', function () {
    let cb = new ChainpointBinary()
    it('JSON >> CHP >> JSON should return result equal to origin JSON', function (done) {
      fs.readFile('./test/json/test1.json', 'utf-8', function (err, sourceFileJSON) {
        should.not.exist(err)
        should.exist(sourceFileJSON)
        cb.objectToBinary(sourceFileJSON, function (err, chpData) {
          should.not.exist(err)
          should.exist(chpData)
          cb.binaryToObject(chpData, function (err, resultObject) {
            should.not.exist(err)
            should.exist(resultObject)
            sourceFileJSON = sourceFileJSON.replace(/(\r\n|\n|\r| )/gm, '') // remove any whitespace/cf/lf
            let resultJSON = JSON.stringify(resultObject)
            resultJSON.should.equal(sourceFileJSON)
            done()
          })
        })
      })
    })
  })
})
