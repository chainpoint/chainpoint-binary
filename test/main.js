var should = require('should');
var chainpointBinary = require('../src/chainpoint-binary');
var rgxs = require('../src/rgxs');
var vlq = require('../src/vlq');
var fs = require('fs');

describe("Testing valid format receipts should convert to CHP and back to same source JSON ", function () {

    describe("Using test1.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test1.json', 'utf-8', function (err, sourceFileJSON) {
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
            fs.readFile('./test/json/test2.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test3.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test3.json', 'utf-8', function (err, sourceFileJSON) {
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
            fs.readFile('./test/json/test4.json', 'utf-8', function (err, sourceFileJSON) {
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
            fs.readFile('./test/json/test5.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test6.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test6.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test7.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test7.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test8.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test8.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test9.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test9.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test10.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test10.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test11.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test11.json', 'utf-8', function (err, sourceFileJSON) {
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

    describe("Using test12.json - ", function () {

        var cb = new chainpointBinary();
        it("JSON >> CHP >> JSON should return result equal to origin JSON", function (done) {
            fs.readFile('./test/json/test12.json', 'utf-8', function (err, sourceFileJSON) {
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
            fs.readFile('./test/chp/test1.chp', function (err, sourceFileCHP) {
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

    describe("Using empty proof - ", function () {

        var json = '';

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Unable to parse the proof');
                done();
            });
        });

    });

    describe("Using non-json proof - ", function () {

        var json = 'sdfsdf';

        var cb = new chainpointBinary();
        it("should return unable to parse", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Unable to parse the proof');
                done();
            });
        });

    });

    describe("Using bad type - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointInvalidv2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using missing context - ", function () {

        var json = '{ "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using bad context - ", function () {

        var json = '{ "@context": "badvalue", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using missing target - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using bad target - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2e1", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using non hex target - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "ZZf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using missing mroot- ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using bad mroot- ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "53451296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using non hex mroot- ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "ZZ296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using missing proof object - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "badvalue": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using missing proof object - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using invalid proof object - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": "dfg", "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using bad right - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cbcb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using non hex right - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "zz0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using bad left - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "bbbdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using non hex left - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "zzf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using missing anchor - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using bad anchor - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BadType", "sourceId": "f3be82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using empty anchor - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using btcopreturn missing source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using btcopreturn bad source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "aaaaaabe82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using btcopreturn non hex source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCOpReturn", "sourceId": "zzbe82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using ethdata missing source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "EthData" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using ethdata bad source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "EthData", "sourceId": "aaaaaabe82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using ethdata non hex source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "EthData", "sourceId": "zzbe82fe1b5d8f18e009cb9a491781289d2e01678311fe2b2e4e84381aafadee" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader missing source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "tx": "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader non int source - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "source": "abc", "tx": "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader missing tx - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "blockProof": [ { "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader empty tx - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "", "blockProof": [ { "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader missing blockProof - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000"} ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader bad blockProof- ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": "sdfsdf" } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader invalid blockProof object - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "invalid": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader blockProof bad right- ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "aa3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader blockProof non hex right- ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "zz23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader blockProof bad left - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "left": "aaaa978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader blockProof non hex left - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "left": "zz978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return invalid", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.exist(err);
                should.not.exist(resultCHP);
                err.should.equal('Proof object contents are invalid');
                done();
            });
        });

    });

    describe("Using BTCBlockHeader valid - ", function () {

        var json = '{ "@context": "https://w3id.org/chainpoint/v2", "type": "ChainpointSHA256v2", "targetHash": "bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2", "merkleRoot": "51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a", "proof": [ { "left": "aaf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2" }, { "left": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" }, { "right": "cb0dbbedb5ec5363e39be9fc43f56f321e1572cfcf304d26fc67cb6ea2e49faf" } ], "anchors": [ { "type": "BTCBlockHeader", "sourceId": "486987", "tx":  "0100000001d94a7f924e49246a136a95ceb70b7c6758b2a65f7cca2b0fa144cbe7c39f217a010000006a4730440220504a4571c4263c83d51399ef14240a3bb06af7159fb6dbb6db182e7e7901edf802202942e98a20d295753155c5249a584f6261a6b31ce603720b7c37e0e71ba742070121035b690114679d44d75b75aa170e34596c94c778f589bcb9063b0e4e293fcacd1dffffffff020000000000000000226a204bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f8777b0d3e00000000001976a9147003cc5915f6c23fd512b38daeeecfdde7a587e988ac00000000", "blockProof": [ { "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }, { "right": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d" }] } ] }';

        var cb = new chainpointBinary();
        it("should return OK", function (done) {
            cb.fromJSON(json, function (err, resultCHP) {
                should.not.exist(err);
                should.exist(resultCHP);
                done();
            });
        });

    });
});

describe("Testing Regex functions ", function () {

    describe("isHex - ", function () {

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

describe("Testing VLQ functions ", function () {

    describe("isVLQLastByte - ", function () {

        it("136 false", function (done) {
            var value = 136; // 10001000
            vlq.isVLQLastByte(value).should.equal(false);
            done();
        });

        it("193 false", function (done) {
            var value = 193; // 11000001
            vlq.isVLQLastByte(value).should.equal(false);
            done();
        });

        it("46 true", function (done) {
            var value = 46; // 00101110
            vlq.isVLQLastByte(value).should.equal(true);
            done();
        });

        it("127 true", function (done) {
            var value = 127; // 01111111
            vlq.isVLQLastByte(value).should.equal(true);
            done();
        });

    });

    describe("int2VLQBuffer - ", function () {

        it("0 == 00", function (done) {
            var int = 0;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x00]));
            done();
        });

        it("127 == 7f", function (done) {
            var int = 127;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x7f]));
            done();
        });

        it("128 == 8100", function (done) {
            var int = 128;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x81, 0x00]));
            done();
        });

        it("8192 == C000", function (done) {
            var int = 8192;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xc0, 0x00]));
            done();
        });

        it("16383 == ff7f", function (done) {
            var int = 16383;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xff, 0x7f]));
            done();
        });

        it("16384 == 818000", function (done) {
            var int = 16384;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x81, 0x80, 0x00]));
            done();
        });

        it("2097151 == ffff7f", function (done) {
            var int = 2097151;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xff, 0xff, 0x7f]));
            done();
        });

        it("2097152 == 81808000", function (done) {
            var int = 2097152;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x81, 0x80, 0x80, 0x00]));
            done();
        });

        it("134217728 == c0808000", function (done) {
            var int = 134217728;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xc0, 0x80, 0x80, 0x00]));
            done();
        });

        it("268435455 == ffffff7f", function (done) {
            var int = 268435455;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xff, 0xff, 0xff, 0x7f]));
            done();
        });

    });

    describe("vlqBuffer2Int - ", function () {

        it("0 == 00", function (done) {
            var buffer = new Buffer([0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(0);
            done();
        });

        it("127 == 7f", function (done) {
            var buffer = new Buffer([0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(127);
            done();
        });

        it("128 == 8100", function (done) {
            var buffer = new Buffer([0x81, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(128);
            done();
        });

        it("8192 == C000", function (done) {
            var buffer = new Buffer([0xc0, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(8192);
            done();
        });

        it("16383 == ff7f", function (done) {
            var buffer = new Buffer([0xff, 0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(16383);
            done();
        });

        it("16384 == 818000", function (done) {
            var buffer = new Buffer([0x81, 0x80, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(16384);
            done();
        });

        it("2097151 == ffff7f", function (done) {
            var buffer = new Buffer([0xff, 0xff, 0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(2097151);
            done();
        });

        it("2097152 == 81808000", function (done) {
            var buffer = new Buffer([0x81, 0x80, 0x80, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(2097152);
            done();
        });

        it("134217728 == c0808000", function (done) {
            var buffer = new Buffer([0xc0, 0x80, 0x80, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(134217728);
            done();
        });

        it("268435455 == ffffff7f", function (done) {
            var buffer = new Buffer([0xff, 0xff, 0xff, 0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(268435455);
            done();
        });

    });

});