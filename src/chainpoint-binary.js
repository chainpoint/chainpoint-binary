/*jslint node: true */
'use strict';

var crc = require('crc');
var vlq = require('./vlq');
var rgxs = require('./rgxs');

var ChainpointBinary = function () {
    // in case 'new' was omitted
    if (!(this instanceof ChainpointBinary)) {
        return new ChainpointBinary();
    }

    ChainpointBinary.prototype.fromJSON = function (proofJSON, callback) {
        var proofObject = null;
        try {
            proofObject = JSON.parse(proofJSON);
        }
        catch (err) {
            return callback('Unable to parse the proof');
        }
        this.fromObject(proofObject, function (err, result) {
            return callback(err, result);
        });
    };

    ChainpointBinary.prototype.fromObject = function (proofObject, callback) {
        var proof = new Buffer(0);

        // add the header
        proof = Buffer.concat([proof, new Buffer('070000436861696e706f696e74000007', 'hex')]);

        // add version number and hash type code
        var versionTypeBytes = null;
        var expectedHashLength = null;
        var expectedContext = '';
        switch (proofObject.type) {
            case 'ChainpointSHA224v2':
                versionTypeBytes = '02c0';
                expectedHashLength = 56;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA256v2':
                versionTypeBytes = '02c1';
                expectedHashLength = 64;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA384v2':
                versionTypeBytes = '02c2';
                expectedHashLength = 96;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA512v2':
                versionTypeBytes = '02c3';
                expectedHashLength = 128;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-224v2':
                versionTypeBytes = '02c4';
                expectedHashLength = 56;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-256v2':
                versionTypeBytes = '02c5';
                expectedHashLength = 64;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-384v2':
                versionTypeBytes = '02c6';
                expectedHashLength = 96;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-512v2':
                versionTypeBytes = '02c7';
                expectedHashLength = 128;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            default:
                return callback('Proof object contents are invalid');
        }
        proof = Buffer.concat([proof, new Buffer(versionTypeBytes, 'hex')]);

        // confirm valid context
        if (!proofObject['@context'] ||
            proofObject['@context'] !== expectedContext) return callback('Proof object contents are invalid');


        // add targetHash
        if (!proofObject.targetHash ||
            proofObject.targetHash.length !== expectedHashLength ||
            !rgxs.isHex(proofObject.targetHash)) return callback('Proof object contents are invalid');
        proof = Buffer.concat([proof, new Buffer(proofObject.targetHash, 'hex')]);

        // add merkleRoot
        if (!proofObject.merkleRoot ||
            proofObject.merkleRoot.length !== expectedHashLength ||
            !rgxs.isHex(proofObject.merkleRoot)) return callback('Proof object contents are invalid');
        proof = Buffer.concat([proof, new Buffer(proofObject.merkleRoot, 'hex')]);

        // add proof path
        if (!proofObject.proof || !Array.isArray(proofObject.proof)) return callback('Proof object contents are invalid');
        var pathBuffer = new Buffer(0);
        for (var x = 0; x < proofObject.proof.length; x++) {
            if (proofObject.proof[x].right &&
                proofObject.proof[x].right.length === expectedHashLength &&
                rgxs.isHex(proofObject.proof[x].right)) {
                pathBuffer = Buffer.concat([pathBuffer, new Buffer('01', 'hex'), new Buffer(proofObject.proof[x].right, 'hex')]);
            } else if (proofObject.proof[x].left &&
                proofObject.proof[x].left.length === expectedHashLength &&
                rgxs.isHex(proofObject.proof[x].left)) {
                pathBuffer = Buffer.concat([pathBuffer, new Buffer('00', 'hex'), new Buffer(proofObject.proof[x].left, 'hex')]);
            } else return callback('Proof object contents are invalid');
        }
        proof = Buffer.concat([proof, new Buffer('f0', 'hex'), pathBuffer, new Buffer('f1', 'hex')]);

        // add anchors
        if (!proofObject.anchors || !Array.isArray(proofObject.anchors)) return callback('Proof object contents are invalid');
        var anchors = new Buffer(0);
        if (!proofObject.anchors || proofObject.anchors.length === 0) return callback('Proof object contents are invalid');
        for (x = 0; x < proofObject.anchors.length; x++) {
            switch (proofObject.anchors[x].type) {
                case 'BTCOpReturn':
                    if (!proofObject.anchors[x].sourceId || proofObject.anchors[x].sourceId.length !== 64 || !rgxs.isHex(proofObject.anchors[x].sourceId)) return callback('Proof object contents are invalid');
                    anchors = Buffer.concat([anchors, new Buffer('a0', 'hex'), new Buffer(proofObject.anchors[x].sourceId, 'hex')]);
                    break;
                case 'ETHData':
                    if (!proofObject.anchors[x].sourceId || proofObject.anchors[x].sourceId.length !== 64 || !rgxs.isHex(proofObject.anchors[x].sourceId)) return callback('Proof object contents are invalid');
                    anchors = Buffer.concat([anchors, new Buffer('a1', 'hex'), new Buffer(proofObject.anchors[x].sourceId, 'hex')]);
                    break;
                case 'BTCBlockHeader':
                    if (!proofObject.anchors[x].sourceId || !rgxs.isInt(proofObject.anchors[x].sourceId)) return callback('Proof object contents are invalid');
                    var sourceIdHexString = Number(proofObject.anchors[x].sourceId).toString(16);
                    if (sourceIdHexString.length % 2) sourceIdHexString = '0' + sourceIdHexString;
                    var sourceIdBuffer = new Buffer(sourceIdHexString, 'hex');
                    var sourceIdVLQ = vlq.int2VLQBuffer(sourceIdBuffer.length);
                    anchors = Buffer.concat([anchors, new Buffer('a2', 'hex'), sourceIdVLQ, sourceIdBuffer]);

                    if (!proofObject.anchors[x].tx || proofObject.anchors[x].tx.length === 0) return callback('Proof object contents are invalid');
                    var txBuffer = new Buffer(proofObject.anchors[x].tx, 'hex');
                    var txVLQ = vlq.int2VLQBuffer(txBuffer.length);
                    anchors = Buffer.concat([anchors, txVLQ, txBuffer]);

                    if (!proofObject.anchors[x].blockProof || !Array.isArray(proofObject.anchors[x].blockProof)) return callback('Proof object contents are invalid');
                    var blockPathBuffer = new Buffer(0);
                    for (var y = 0; y < proofObject.anchors[x].blockProof.length; y++) {
                        if (proofObject.anchors[x].blockProof[y].right &&
                            proofObject.anchors[x].blockProof[y].right.length === 64 &&
                            rgxs.isHex(proofObject.anchors[x].blockProof[y].right)) {
                            blockPathBuffer = Buffer.concat([blockPathBuffer, new Buffer('01', 'hex'), new Buffer(proofObject.anchors[x].blockProof[y].right, 'hex')]);
                        } else if (proofObject.anchors[x].blockProof[y].left &&
                            proofObject.anchors[x].blockProof[y].left.length === 64 &&
                            rgxs.isHex(proofObject.anchors[x].blockProof[y].left)) {
                            blockPathBuffer = Buffer.concat([blockPathBuffer, new Buffer('00', 'hex'), new Buffer(proofObject.anchors[x].blockProof[y].left, 'hex')]);
                        } else return callback('Proof object contents are invalid');
                    }
                    anchors = Buffer.concat([anchors, new Buffer('f4', 'hex'), blockPathBuffer, new Buffer('f5', 'hex')]);

                    break;
                default:
                    return callback('Proof object contents are invalid');
            }
        }
        proof = Buffer.concat([proof, new Buffer('f2', 'hex'), anchors, new Buffer('f3', 'hex')]);

        var crcHexString = crc.crc32(proof).toString(16);
        if (crcHexString.length % 2) crcHexString = '0' + crcHexString;
        var crcBuffer = new Buffer(crcHexString, 'hex');
        proof = Buffer.concat([proof, crcBuffer]);

        return callback(null, proof);
    };

    ChainpointBinary.prototype.toJSON = function (proof, callback) {
        this.toObject(proof, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.stringify(result));
            }
        });
    };

    ChainpointBinary.prototype.toObject = function (proof, callback) {

        // get hex string if needed
        if (proof instanceof Buffer) proof = proof.toString('hex');

        // check the crc
        var crcHexString = crc.crc32(new Buffer(proof.substr(0, proof.length - 8), 'hex')).toString(16);
        if (crcHexString.length % 2) crcHexString = '0' + crcHexString;
        var checksum = proof.substr(proof.length - 8);
        if (crcHexString !== checksum) return callback('Proof contents have been currupted');

        // check header
        var header = proof.substr(0, 32);
        proof = proof.substr(32);
        if (header !== '070000436861696e706f696e74000007') return callback('Not a valid Chainpoint binary');

        var proofObject = {};

        // get version and hashtype
        var version = proof.substr(0, 2);
        proof = proof.substr(2);
        var hashType = proof.substr(0, 2);
        proof = proof.substr(2);
        if (version !== '02') return callback('Proof contents are invalid');
        var expectedHashLength = 0;
        var proofType = '';
        switch (hashType) {
            case 'c0':
                proofType = 'ChainpointSHA224v2';
                expectedHashLength = 56;
                break;
            case 'c1':
                proofType = 'ChainpointSHA256v2';
                expectedHashLength = 64;
                break;
            case 'c2':
                proofType = 'ChainpointSHA384v2';
                expectedHashLength = 96;
                break;
            case 'c3':
                proofType = 'ChainpointSHA512v2';
                expectedHashLength = 128;
                break;
            case 'c4':
                proofType = 'ChainpointSHA3-224v2';
                expectedHashLength = 56;
                break;
            case 'c5':
                proofType = 'ChainpointSHA3-256v2';
                expectedHashLength = 64;
                break;
            case 'c6':
                proofType = 'ChainpointSHA3-384v2';
                expectedHashLength = 96;
                break;
            case 'c7':
                proofType = 'ChainpointSHA3-512v2';
                expectedHashLength = 128;
                break;
            default:
                return callback('Proof contents are invalid');
        }
        proofObject['@context'] = 'https://w3id.org/chainpoint/v2';
        proofObject.type = proofType;

        // get targetHash
        var targetHash = proof.substr(0, expectedHashLength);
        proof = proof.substr(expectedHashLength);
        proofObject.targetHash = targetHash;

        // get merkleRoot
        var merkleRoot = proof.substr(0, expectedHashLength);
        proof = proof.substr(expectedHashLength);
        proofObject.merkleRoot = merkleRoot;

        // get proofPath
        var proofPath = [];
        var pathStartFlag = proof.substr(0, 2);
        proof = proof.substr(2);
        if (pathStartFlag !== 'f0') return callback('Proof contents are invalid');
        var nextByte = proof.substr(0, 2);
        proof = proof.substr(2);
        while (nextByte !== 'f1') {
            var hashValue = proof.substr(0, expectedHashLength);
            proof = proof.substr(expectedHashLength);
            switch (nextByte) {
                case '00':
                    proofPath.push({ 'left': hashValue });
                    break;
                case '01':
                    proofPath.push({ 'right': hashValue });
                    break;
                default:
                    return callback('Proof contents are invalid');
            }
            nextByte = proof.substr(0, 2);
            proof = proof.substr(2);
        }
        proofObject.proof = proofPath;


        // get anchors
        var anchors = [];
        var anchorStartFlag = proof.substr(0, 2);
        proof = proof.substr(2);
        if (anchorStartFlag !== 'f2') return callback('Proof contents are invalid');
        nextByte = proof.substr(0, 2);
        proof = proof.substr(2);
        while (nextByte !== 'f3') {
            var anchor = {};
            var sourceId = '';
            switch (nextByte) {
                case 'a0':
                    anchor.type = 'BTCOpReturn';
                    sourceId = proof.substr(0, 64);
                    proof = proof.substr(64);
                    anchor.sourceId = sourceId;
                    break;
                case 'a1':
                    anchor.type = 'ETHData';
                    sourceId = proof.substr(0, 64);
                    proof = proof.substr(64);
                    anchor.sourceId = sourceId;
                    break;
                case 'a2':
                    anchor.type = 'BTCBlockHeader';

                    var sourceIdByteCount = proof.substr(0, 2);
                    proof = proof.substr(2);
                    var currentByte = sourceIdByteCount;
                    while (!vlq.isVLQLastByte(parseInt(currentByte, 16))) {
                        currentByte = proof.substr(0, 2);
                        sourceIdByteCount += currentByte;
                        proof = proof.substr(2);
                    }
                    sourceIdByteCount = vlq.vlqBuffer2Int(new Buffer(sourceIdByteCount, 'hex'));
                    sourceId = parseInt(proof.substr(0, sourceIdByteCount * 2), 16).toString(10);
                    proof = proof.substr(sourceIdByteCount * 2);
                    anchor.sourceId = sourceId;

                    var txByteCount = proof.substr(0, 2);
                    proof = proof.substr(2);
                    currentByte = txByteCount;
                    while (!vlq.isVLQLastByte(parseInt(currentByte, 16))) {
                        currentByte = proof.substr(0, 2);
                        txByteCount += currentByte;
                        proof = proof.substr(2);
                    }
                    txByteCount = vlq.vlqBuffer2Int(new Buffer(txByteCount, 'hex'));
                    var tx = proof.substr(0, txByteCount * 2);
                    proof = proof.substr(txByteCount * 2);
                    anchor.tx = tx;

                    var blockPath = [];
                    var blockPathStartFlag = proof.substr(0, 2);
                    proof = proof.substr(2);

                    if (blockPathStartFlag !== 'f4') return callback('Proof contents are invalid');
                    nextByte = proof.substr(0, 2);
                    proof = proof.substr(2);
                    while (nextByte !== 'f5') {
                        var blockHashValue = proof.substr(0, 64);
                        proof = proof.substr(64);
                        switch (nextByte) {
                            case '00':
                                blockPath.push({ 'left': blockHashValue });
                                break;
                            case '01':
                                blockPath.push({ 'right': blockHashValue });
                                break;
                            default:
                                return callback('Proof contents are invalid');
                        }
                        nextByte = proof.substr(0, 2);
                        proof = proof.substr(2);
                    }
                    anchor.blockProof = blockPath;

                    break;
                default:
                    console.log(proof);
                    return callback('aProof contents are invalid');
            }
            anchors.push(anchor);
            nextByte = proof.substr(0, 2);
            proof = proof.substr(2);
        }
        proofObject.anchors = anchors;


        var nextFourBytes = proof.substr(0, 8);
        proof = proof.substr(8);
        if (nextFourBytes !== crcHexString) return callback('Proof contents are invalid');

        return callback(null, proofObject);

    };

};

module.exports = ChainpointBinary;

