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

    var magicHeader = '070000436861696e706f696e74000007';

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

        if (proofObject.type == 'ChainpointOpListv2') {
            _fromOperationList(proofObject, function (err, result) {
                return callback(err, result);
            });
        } else {
            _fromTypedProof(proofObject, function (err, result) {
                return callback(err, result);
            });
        }
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
        var crcHexString = crc.crc32(new Buffer(proof.slice(0, proof.length - 8), 'hex')).toString(16);
        while (crcHexString.length < 8) crcHexString = '0' + crcHexString;
        var checksum = proof.slice(proof.length - 8);
        if (crcHexString !== checksum) return callback('Proof contents have been currupted');

        // check header
        var headerResult = _readHeader(proof);
        proof = headerResult[0];
        if (headerResult[1] !== magicHeader) return callback('Not a valid Chainpoint binary');

        var proofObject = {};

        // get version and hashtype
        var versionTypeResult = _readVersionType(proof);
        if (!versionTypeResult) return callback('Proof contents are invalid');
        proof = versionTypeResult[0];
        proofObject['@context'] = versionTypeResult[1];
        proofObject.type = versionTypeResult[2];

        if (proofObject.type == 'ChainpointOpListv2') {
            _toOperationList(proof, proofObject, crcHexString, function (err, result) {
                return callback(err, result);
            });
        } else {
            _toTypedProof(proof, proofObject, crcHexString, function (err, result) {
                return callback(err, result);
            });
        }

    };

    function _fromTypedProof(proofObject, callback) {
        var proof = new Buffer(0);

        // add the header
        var header = _makeHeader();
        proof = Buffer.concat([proof, header]);

        // add version number and hash type code
        var versionTypeBytes = _getVersionTypeBytes(proofObject.type, proofObject['@context']);
        if (!versionTypeBytes) return callback('Proof object contents are invalid');
        proof = Buffer.concat([proof, versionTypeBytes]);

        // add targetHash
        if (!proofObject.targetHash || !rgxs.isHex(proofObject.targetHash)) return callback('Proof object contents are invalid');
        var targetHashBytes = _getVLQBytes(proofObject.targetHash);
        proof = Buffer.concat([proof, targetHashBytes]);

        // add merkleRoot
        if (!proofObject.merkleRoot || !rgxs.isHex(proofObject.merkleRoot)) return callback('Proof object contents are invalid');
        var merkleRootBytes = _getVLQBytes(proofObject.merkleRoot);
        proof = Buffer.concat([proof, merkleRootBytes]);

        // add proof path
        if (!proofObject.proof || !Array.isArray(proofObject.proof)) return callback('Proof object contents are invalid');
        var proofPathBytes = _getProofPathBytes(proofObject.proof);
        if (!proofPathBytes) return callback('Proof object contents are invalid');
        proof = Buffer.concat([proof, proofPathBytes]);

        // add anchors
        if (!proofObject.anchors || !Array.isArray(proofObject.anchors)) return callback('Proof object contents are invalid');
        var anchorsBytes = _getAnchorBytes(proofObject.anchors, true);
        if (!anchorsBytes) return callback('Proof object contents are invalid');
        proof = Buffer.concat([proof, anchorsBytes]);

        // add crc
        var cycBytes = _getCRCBytes(proof);
        proof = Buffer.concat([proof, cycBytes]);

        return callback(null, proof);
    }

    function _fromOperationList(proofObject, callback) {
        var proof = new Buffer(0);

        // add the header
        var header = _makeHeader();
        proof = Buffer.concat([proof, header]);

        // add version number and hash type code
        var versionTypeBytes = _getVersionTypeBytes(proofObject.type, proofObject['@context']);
        if (!versionTypeBytes) return callback('Proof object contents are invalid');
        proof = Buffer.concat([proof, versionTypeBytes]);

        // add targetHash
        if (!proofObject.targetHash || !rgxs.isHex(proofObject.targetHash)) return callback('Proof object contents are invalid');
        var targetHashBytes = _getVLQBytes(proofObject.targetHash);
        proof = Buffer.concat([proof, targetHashBytes]);

        // add operations
        if (!proofObject.operations || !Array.isArray(proofObject.operations)) return callback('Proof object contents are invalid');
        var operationsBytes = _getOperationsBytes(proofObject.operations);
        if (!operationsBytes) return callback('Proof object contents are invalid');
        proof = Buffer.concat([proof, operationsBytes]);

        // add crc
        var cycBytes = _getCRCBytes(proof);
        proof = Buffer.concat([proof, cycBytes]);
        return callback(null, proof);
    }

    function _toTypedProof(proof, proofObject, crcHexString, callback) {

        // get targetHash
        var targetHashResult = _readVLQValue(proof);
        if (!targetHashResult) return callback('Proof contents are invalid');
        proof = targetHashResult[0];
        proofObject.targetHash = targetHashResult[1];

        // get merkleRoot
        var merkleRootResult = _readVLQValue(proof);
        if (!merkleRootResult) return callback('Proof contents are invalid');
        proof = merkleRootResult[0];
        proofObject.merkleRoot = merkleRootResult[1];

        // get proofPath
        var proofPathResult = _readProofPath(proof);
        if (!proofPathResult) return callback('Proof contents are invalid');
        proof = proofPathResult[0];
        proofObject.proof = proofPathResult[1];

        // get anchors
        var anchorsResult = _readAnchors(proof, true);
        if (!anchorsResult) return callback('Proof contents are invalid');
        proof = anchorsResult[0];
        proofObject.anchors = anchorsResult[1];


        var nextFourBytes = proof.slice(0, 8);
        proof = proof.slice(8);
        if (nextFourBytes !== crcHexString) return callback('Proof contents are invalid');

        return callback(null, proofObject);
    }

    function _toOperationList(proof, proofObject, crcHexString, callback) {
        // get targetHash
        var targetHashResult = _readVLQValue(proof);
        if (!targetHashResult) return callback('Proof contents are invalid');
        proof = targetHashResult[0];
        proofObject.targetHash = targetHashResult[1];

        // get operations
        var operationsResult = _readOperations(proof);
        if (!operationsResult) return callback('Proof contents are invalid');
        proof = operationsResult[0];
        proofObject.operations = operationsResult[1];

        var nextFourBytes = proof.slice(0, 8);
        proof = proof.slice(8);
        if (nextFourBytes !== crcHexString) return callback('Proof contents are invalid');

        return callback(null, proofObject);
    }

    //////////////////////////////////////////////////////////////////////////
    // CHP write support functions
    //////////////////////////////////////////////////////////////////////////

    function _makeHeader() {
        return new Buffer(magicHeader, 'hex');
    }

    function _getVersionTypeBytes(proofType, context) {
        var versionTypeBytes = null;
        var expectedContext = '';
        switch (proofType) {
            case 'ChainpointSHA224v2':
                versionTypeBytes = '02c0';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA256v2':
                versionTypeBytes = '02c1';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA384v2':
                versionTypeBytes = '02c2';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA512v2':
                versionTypeBytes = '02c3';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-224v2':
                versionTypeBytes = '02c4';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-256v2':
                versionTypeBytes = '02c5';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-384v2':
                versionTypeBytes = '02c6';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-512v2':
                versionTypeBytes = '02c7';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointOpListv2':
                versionTypeBytes = '02cf';
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            default:
                return false;
        }

        // confirm valid context
        if (!context || context !== expectedContext) return false;

        return new Buffer(versionTypeBytes, 'hex');
    }

    function _getVLQBytes(hexString) {
        if (hexString.length % 2) hexString = '0' + hexString;
        var hexBuffer = new Buffer(hexString, 'hex');
        var hexVLQ = vlq.int2VLQBuffer(hexBuffer.length);
        return new Buffer.concat([hexVLQ, hexBuffer]);
    }

    function _getProofPathBytes(proof) {
        var pathBuffer = new Buffer(0);
        for (var x = 0; x < proof.length; x++) {
            if (proof[x].right && rgxs.isHex(proof[x].right)) {
                pathBuffer = Buffer.concat([pathBuffer, new Buffer('01', 'hex'), _getVLQBytes(proof[x].right)]);
            } else if (proof[x].left && rgxs.isHex(proof[x].left)) {
                pathBuffer = Buffer.concat([pathBuffer, new Buffer('00', 'hex'), _getVLQBytes(proof[x].left)]);
            } else return false;
        }
        return new Buffer.concat([new Buffer('f0', 'hex'), pathBuffer, new Buffer('f1', 'hex')]);
    }

    function _getAnchorBytes(anchors, isTypedProof) {
        var anchorsBuffer = new Buffer(0);
        if (anchors.length === 0) return false;
        for (var x = 0; x < anchors.length; x++) {
            switch (anchors[x].type) {
                case 'BTCOpReturn':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer('a0', 'hex'), new Buffer(anchors[x].sourceId, 'hex')]);
                    break;
                case 'ETHData':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer('a1', 'hex'), new Buffer(anchors[x].sourceId, 'hex')]);
                    break;
                case 'BTCBlockHeader':
                    if (!anchors[x].sourceId || !rgxs.isInt(anchors[x].sourceId)) return false;
                    var sourceIdHexString = Number(anchors[x].sourceId).toString(16);
                    anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer('a2', 'hex'), _getVLQBytes(sourceIdHexString)]);

                    if (isTypedProof) { // Operation Lists dont need the remaining data
                        if (!anchors[x].tx || anchors[x].tx.length === 0) return false;
                        anchorsBuffer = Buffer.concat([anchorsBuffer, _getVLQBytes(anchors[x].tx)]);

                        if (!anchors[x].blockProof || !Array.isArray(anchors[x].blockProof)) return false;
                        var blockPathBuffer = new Buffer(0);
                        for (var y = 0; y < anchors[x].blockProof.length; y++) {
                            if (anchors[x].blockProof[y].right &&
                                anchors[x].blockProof[y].right.length === 64 &&
                                rgxs.isHex(anchors[x].blockProof[y].right)) {
                                blockPathBuffer = Buffer.concat([blockPathBuffer, new Buffer('01', 'hex'), new Buffer(anchors[x].blockProof[y].right, 'hex')]);
                            } else if (anchors[x].blockProof[y].left &&
                                anchors[x].blockProof[y].left.length === 64 &&
                                rgxs.isHex(anchors[x].blockProof[y].left)) {
                                blockPathBuffer = Buffer.concat([blockPathBuffer, new Buffer('00', 'hex'), new Buffer(anchors[x].blockProof[y].left, 'hex')]);
                            } else return false;
                        }
                        anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer('f4', 'hex'), blockPathBuffer, new Buffer('f5', 'hex')]);
                    }
                    break;
                default:
                    return false;
            }
        }
        return new Buffer.concat([new Buffer('f2', 'hex'), anchorsBuffer, new Buffer('f3', 'hex')]);
    }

    function _getCRCBytes(proof) {
        var crcHexString = crc.crc32(proof).toString(16);
        while (crcHexString.length < 8) crcHexString = '0' + crcHexString;
        var crcBuffer = new Buffer(crcHexString, 'hex');
        return crcBuffer;
    }

    function _getOperationsBytes(operations) {
        var operationsBuffer = new Buffer(0);
        for (var x = 0; x < operations.length; x++) {
            if (operations[x].right && rgxs.isHex(operations[x].right)) {
                operationsBuffer = Buffer.concat([operationsBuffer, new Buffer('01', 'hex'), _getVLQBytes(operations[x].right)]);
            } else if (operations[x].left && rgxs.isHex(operations[x].left)) {
                operationsBuffer = Buffer.concat([operationsBuffer, new Buffer('00', 'hex'), _getVLQBytes(operations[x].left)]);
            } else if (operations[x].op) {
                var opByte;
                switch (operations[x].op) {
                    case 'sha-224':
                        opByte = 'b0';
                        break;
                    case 'sha-256':
                        opByte = 'b1';
                        break;
                    case 'sha-384':
                        opByte = 'b2';
                        break;
                    case 'sha-512':
                        opByte = 'b3';
                        break;
                    case 'sha3-224':
                        opByte = 'b4';
                        break;
                    case 'sha3-256':
                        opByte = 'b5';
                        break;
                    case 'sha3-384':
                        opByte = 'b6';
                        break;
                    case 'sha3-512':
                        opByte = 'b7';
                        break;
                    default:
                        return false;
                }
                operationsBuffer = Buffer.concat([operationsBuffer, new Buffer(opByte, 'hex')]);
            } else if (operations[x].anchors && Array.isArray(operations[x].anchors)) {
                var anchorsBytes = _getAnchorBytes(operations[x].anchors, false);
                if (!anchorsBytes) return false;
                operationsBuffer = Buffer.concat([operationsBuffer, anchorsBytes]);
            } else return false;
        }
        return new Buffer.concat([new Buffer('f6', 'hex'), operationsBuffer, new Buffer('f7', 'hex')]);
    }

    //////////////////////////////////////////////////////////////////////////
    // CHP read support functions
    //////////////////////////////////////////////////////////////////////////

    function _readHeader(proof) {
        var header = proof.slice(0, 32);
        proof = proof.slice(32);
        return [proof, header];
    }

    function _readVersionType(proof) {
        var version = proof.slice(0, 2);
        proof = proof.slice(2);
        if (version !== '02') return false;

        var hashType = proof.slice(0, 2);
        proof = proof.slice(2);
        var proofType = '';
        switch (hashType) {
            case 'c0':
                proofType = 'ChainpointSHA224v2';
                break;
            case 'c1':
                proofType = 'ChainpointSHA256v2';
                break;
            case 'c2':
                proofType = 'ChainpointSHA384v2';
                break;
            case 'c3':
                proofType = 'ChainpointSHA512v2';
                break;
            case 'c4':
                proofType = 'ChainpointSHA3-224v2';
                break;
            case 'c5':
                proofType = 'ChainpointSHA3-256v2';
                break;
            case 'c6':
                proofType = 'ChainpointSHA3-384v2';
                break;
            case 'c7':
                proofType = 'ChainpointSHA3-512v2';
                break;
            case 'cf':
                proofType = 'ChainpointOpListv2';
                break;
            default:
                return false;
        }

        return [proof, 'https://w3id.org/chainpoint/v2', proofType];
    }

    function _readVLQValue(proof) {
        var valByteCount = proof.slice(0, 2);
        proof = proof.slice(2);
        var currentByte = valByteCount;
        while (!vlq.isVLQLastByte(parseInt(currentByte, 16))) {
            currentByte = proof.slice(0, 2);
            if (currentByte === '') return false;
            valByteCount += currentByte;
            proof = proof.slice(2);
        }
        valByteCount = vlq.vlqBuffer2Int(new Buffer(valByteCount, 'hex'));
        var value = proof.slice(0, valByteCount * 2);
        proof = proof.slice(valByteCount * 2);
        return [proof, value];
    }

    function _readProofPath(proof) {
        var proofPath = [];
        var pathStartFlag = proof.slice(0, 2);
        proof = proof.slice(2);
        if (pathStartFlag !== 'f0') return false;
        var nextByte = proof.slice(0, 2);
        proof = proof.slice(2);
        while (nextByte !== 'f1') {
            var hashValueResult = _readVLQValue(proof);
            if (!hashValueResult) return false;
            proof = hashValueResult[0];
            var hashValue = hashValueResult[1];
            switch (nextByte) {
                case '00':
                    proofPath.push({ 'left': hashValue });
                    break;
                case '01':
                    proofPath.push({ 'right': hashValue });
                    break;
                default:
                    return false;
            }
            nextByte = proof.slice(0, 2);
            proof = proof.slice(2);
        }
        return [proof, proofPath];
    }

    function _readAnchors(proof, isTypedProof) {
        var anchors = [];
        var anchorStartFlag = proof.slice(0, 2);
        proof = proof.slice(2);
        if (anchorStartFlag !== 'f2') return false;
        var nextByte = proof.slice(0, 2);
        proof = proof.slice(2);
        while (nextByte !== 'f3') {
            var anchor = {};
            var sourceId = '';
            switch (nextByte) {
                case 'a0':
                    anchor.type = 'BTCOpReturn';
                    sourceId = proof.slice(0, 64);
                    proof = proof.slice(64);
                    anchor.sourceId = sourceId;
                    break;
                case 'a1':
                    anchor.type = 'ETHData';
                    sourceId = proof.slice(0, 64);
                    proof = proof.slice(64);
                    anchor.sourceId = sourceId;
                    break;
                case 'a2':
                    anchor.type = 'BTCBlockHeader';

                    var sourceIdResult = _readVLQValue(proof);
                    if (!sourceIdResult) return false;
                    proof = sourceIdResult[0];
                    anchor.sourceId = parseInt(sourceIdResult[1], 16).toString(10);

                    if (isTypedProof) { // Operation Lists do not need this data
                        var txResult = _readVLQValue(proof);
                        if (!txResult) return false;
                        proof = txResult[0];
                        anchor.tx = txResult[1];

                        var blockPath = [];
                        var blockPathStartFlag = proof.slice(0, 2);
                        proof = proof.slice(2);

                        if (blockPathStartFlag !== 'f4') return false;
                        nextByte = proof.slice(0, 2);
                        proof = proof.slice(2);
                        while (nextByte !== 'f5') {
                            var blockHashValue = proof.slice(0, 64);
                            proof = proof.slice(64);
                            switch (nextByte) {
                                case '00':
                                    blockPath.push({ 'left': blockHashValue });
                                    break;
                                case '01':
                                    blockPath.push({ 'right': blockHashValue });
                                    break;
                                default:
                                    return false;
                            }
                            nextByte = proof.slice(0, 2);
                            proof = proof.slice(2);
                        }
                        anchor.blockProof = blockPath;
                    }
                    break;
                default:
                    return false;
            }
            anchors.push(anchor);
            nextByte = proof.slice(0, 2);
            proof = proof.slice(2);
        }
        return [proof, anchors];
    }

    function _readOperations(proof) {
        var operations = [];
        var operationsStartFlag = proof.slice(0, 2);
        proof = proof.slice(2);
        if (operationsStartFlag !== 'f6') return false;
        var nextByte = proof.slice(0, 2);
        while (nextByte !== 'f7') {
            switch (nextByte) {
                // a left / right operation
                case '00':
                case '01':
                    proof = proof.slice(2);
                    var hashValueResult = _readVLQValue(proof);
                    if (!hashValueResult) return false;
                    proof = hashValueResult[0];
                    var hashValue = hashValueResult[1];
                    switch (nextByte) {
                        case '00':
                            operations.push({ 'left': hashValue });
                            break;
                        case '01':
                            operations.push({ 'right': hashValue });
                            break;
                        default:
                            return false;
                    }
                    break;
                // a hashing operation
                case 'b0':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha-224' });
                    break;
                case 'b1':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha-256' });
                    break;
                case 'b2':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha-384' });
                    break;
                case 'b3':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha-512' });
                    break;
                case 'b4':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha3-224' });
                    break;
                case 'b5':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha3-256' });
                    break;
                case 'b6':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha3-384' });
                    break;
                case 'b7':
                    proof = proof.slice(2);
                    operations.push({ 'op': 'sha3-512' });
                    break;
                // an anchor point declaration
                case 'f2':
                    var anchorsResult = _readAnchors(proof, false);
                    if (!anchorsResult) return false;
                    proof = anchorsResult[0];
                    operations.push({ 'anchors': anchorsResult[1] });
                    break;
                default:
                    return false;
            }
            nextByte = proof.slice(0, 2);
        }
        proof = proof.slice(2);
        return [proof, operations];
    }

};

module.exports = ChainpointBinary;

