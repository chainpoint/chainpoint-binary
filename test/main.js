/* global describe, it */

var should = require('should')
var ChainpointBinary = require('../src/chainpoint-binary')
var fs = require('fs')

describe('Testing valid format receipts should convert to CHP and back to same source JSON ', function () {
  describe('Using test1.json - ', function () {
    var cb = new ChainpointBinary()
    it('JSON >> CHP >> JSON should return result equal to origin JSON', function (done) {
      fs.readFile('./test/json/test1.json', 'utf-8', function (err, sourceFileJSON) {
        should.not.exist(err)
        should.exist(sourceFileJSON)
        cb.fromJSON(sourceFileJSON, function (err, chpData) {
          should.not.exist(err)
          should.exist(chpData)
          cb.toJSON(chpData, function (err, resultJSON) {
            should.not.exist(err)
            should.exist(resultJSON)
            sourceFileJSON = sourceFileJSON.replace(/(\r\n|\n|\r| )/gm, '') // remove any whitespace/cf/lf
            resultJSON.should.equal(sourceFileJSON)
            done()
          })
        })
      })
    })
  })
})
