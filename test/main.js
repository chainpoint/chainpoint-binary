var should = require('should');
var chainpointBinary = require('../src/chainpoint-binary');
var rgxs = require('../src/rgxs');
var fs = require('fs');

describe("Testing valid format receipts should convert to CHP and back to same source JSON ", function () {

    describe("Using test1.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/valid/test1.json', 'utf-8', function (err, sourceFileJSON) {
                should.not.exist(err);
                should.exist(sourceFileJSON);
                cb.fromJSON(sourceFileJSON, function (err, chpData) {
                    should.not.exist(err);
                    should.exist(chpData);
                    cb.toJSON(chpData, function (err, resultJSON) {
                        should.not.exist(err);
                        should.exist(resultJSON);
                        sourceFileJSON = sourceFileJSON.replace(/(\r\n|\n|\r| )/gm, ''); // remove any whitespace/cf/lf
                        resultJSON.should.equal(sourceFileJSON);
                        done();
                    });
                });
            });
        });

    });

    describe("Using test2.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/valid/test2.json', 'utf-8', function (err, sourceFileJSON) {
                should.not.exist(err);
                should.exist(sourceFileJSON);
                cb.fromJSON(sourceFileJSON, function (err, chpData) {
                    should.not.exist(err);
                    should.exist(chpData);
                    cb.toJSON(chpData, function (err, resultJSON) {
                        resultJSON.should.equal(resultJSON);
                        should.not.exist(err);
                        should.exist(resultJSON);
                        sourceFileJSON = sourceFileJSON.replace(/(\r\n|\n|\r| )/gm, ''); // remove any whitespace/cf/lf
                        resultJSON.should.equal(sourceFileJSON);
                        done();
                    });
                });
            });
        });

    });

    describe("Using test3.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/valid/test3.json', 'utf-8', function (err, sourceFileJSON) {
                should.not.exist(err);
                should.exist(sourceFileJSON);
                cb.fromJSON(sourceFileJSON, function (err, chpData) {
                    should.not.exist(err);
                    should.exist(chpData);
                    cb.toJSON(chpData, function (err, resultJSON) {
                        should.not.exist(err);
                        should.exist(resultJSON);
                        sourceFileJSON = sourceFileJSON.replace(/(\r\n|\n|\r| )/gm, ''); // remove any whitespace/cf/lf
                        resultJSON.should.equal(sourceFileJSON);
                        done();
                    });
                });
            });
        });

    });

    describe("Using test4.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/valid/test4.json', 'utf-8', function (err, sourceFileJSON) {
                should.not.exist(err);
                should.exist(sourceFileJSON);
                cb.fromJSON(sourceFileJSON, function (err, chpData) {
                    should.not.exist(err);
                    should.exist(chpData);
                    cb.toJSON(chpData, function (err, resultJSON) {
                        should.not.exist(err);
                        should.exist(resultJSON);
                        sourceFileJSON = sourceFileJSON.replace(/(\r\n|\n|\r| )/gm, ''); // remove any whitespace/cf/lf
                        resultJSON.should.equal(sourceFileJSON);
                        done();
                    });
                });
            });
        });

    });

    describe("Using test5.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/valid/test5.json', 'utf-8', function (err, sourceFileJSON) {
                should.not.exist(err);
                should.exist(sourceFileJSON);
                cb.fromJSON(sourceFileJSON, function (err, chpData) {
                    should.not.exist(err);
                    should.exist(chpData);
                    cb.toJSON(chpData, function (err, resultJSON) {
                        should.not.exist(err);
                        should.exist(resultJSON);
                        sourceFileJSON = sourceFileJSON.replace(/(\r\n|\n|\r| )/gm, ''); // remove any whitespace/cf/lf
                        resultJSON.should.equal(sourceFileJSON);
                        done();
                    });
                });
            });
        });

    });

});

describe("Testing valid format receipts should convert to JSON and back to same source CHP ", function () {

    describe("Using test1.chp - ", function () {

        var cb = new chainpointBinary();
        it("CHP >> JSON >> CHP should return result equal to origin CHP", function (done) {
            fs.readFile('./test/chp/valid/test1.chp', function (err, sourceFileCHP) {
                should.not.exist(err);
                should.exist(sourceFileCHP);
                cb.toJSON(sourceFileCHP, function (err, json) {
                    should.not.exist(err);
                    should.exist(json);
                    cb.fromJSON(json, function (err, resultCHP) {
                        should.not.exist(err);
                        should.exist(resultCHP);
                        resultCHP.should.deepEqual(sourceFileCHP);
                        done();
                    });
                });
            });
        });

    });

    describe("Using test2.chp - ", function () {

        var cb = new chainpointBinary();
        it("CHP >> JSON >> CHP should return result equal to origin CHP", function (done) {
            fs.readFile('./test/chp/valid/test2.chp', function (err, sourceFileCHP) {
                should.not.exist(err);
                should.exist(sourceFileCHP);
                cb.toJSON(sourceFileCHP, function (err, json) {
                    should.not.exist(err);
                    should.exist(json);
                    cb.fromJSON(json, function (err, resultCHP) {
                        should.not.exist(err);
                        should.exist(resultCHP);
                        resultCHP.should.deepEqual(sourceFileCHP);
                        done();
                    });
                });
            });
        });

    });

});

describe("Testing invalid format receipts", function () {

    describe("Using empty proof - 1", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad1.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 JSON');
                    done();
                });
            });
        });

    });

    describe("Using non-json proof - 2", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad2.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 JSON');
                    done();
                });
            });
        });

    });

    describe("Using bad-json proof - 3", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad3.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 JSON');
                    done();
                });
            });
        });

    });

    describe("Using missing context - 4", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad4.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using bad context - 5", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad5.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using missing operations - 6", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad6.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using bad operations - 7", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad7.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using missing target - 8", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad8.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using empty target - 9", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad9.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using non hex target - 10", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad10.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using empty right - 11", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad11.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using non hex right - 12", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad12.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using empty left - 13", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad13.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using non hex left - 14", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad14.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using empty op - 15", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad15.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using invalid op - 16", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad16.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using bad anchor type - 17", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad17.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using bad anchor - 18", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad18.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using empty anchor - 19 ", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad19.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using btcopreturn missing source - 20", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad20.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using btcopreturn bad source - 21", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad21.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using btcopreturn non hex source - 22", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad22.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using ethdata missing source - 23", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad23.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using ethdata bad source - 24", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad24.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using ethdata non hex source - 25", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad25.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using BTCBlockHeader missing source - 26", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad26.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using BTCBlockHeader non int source - 27", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad27.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    
                    done();
                });
            });
        });

    });

    describe("Using Tierion Calendar missing source - 28", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad28.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });

    describe("Using Tierion Calendar bad source - 29", function () {

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            fs.readFile('./test/json/bad/bad29.json', function (err, badJSON) {
                should.not.exist(err);
                should.exist(badJSON);
                cb.fromJSON(badJSON, function (err, resultCHP) {
                    should.exist(err);
                    should.not.exist(resultCHP);
                    err.should.equal('Could not parse Chainpoint v3 object');
                    done();
                });
            });
        });

    });
});

describe("Testing Regex functions ", function () {

    describe("isHex - ", function () {

        it("aba false", function (done) {
            var value = 'aba';
            rgxs.isHex(value).should.equal(false);
            done();
        });

        it("qweqwe123 false", function (done) {
            var value = 'qweqwe123';
            rgxs.isHex(value).should.equal(false);
            done();
        });

        it("AB true", function (done) {
            var value = 'AB';
            rgxs.isHex(value).should.equal(true);
            done();
        });

        it("ab true", function (done) {
            var value = 'ab';
            rgxs.isHex(value).should.equal(true);
            done();
        });

    });

    describe("isInt - ", function () {

        it("qweqwe123 false", function (done) {
            var value = 'qweqwe123';
            rgxs.isInt(value).should.equal(false);
            done();
        });

        it("012 false", function (done) {
            var value = '012';
            rgxs.isInt(value).should.equal(false);
            done();
        });

        it("3.1315 false", function (done) {
            var value = 3.1315;
            rgxs.isInt(value).should.equal(false);
            done();
        });

        it("123 true", function (done) {
            var value = '123';
            rgxs.isInt(value).should.equal(true);
            done();
        });

        it("0 true", function (done) {
            var value = '0';
            rgxs.isInt(value).should.equal(true);
            done();
        });

        it("123 true", function (done) {
            var value = 123;
            rgxs.isInt(value).should.equal(true);
            done();
        });

    });

});


