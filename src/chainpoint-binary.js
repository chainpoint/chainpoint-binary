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

    var magicHeader = new Buffer([0x07, 0x00, 0x00, 0x43, 0x68, 0x61, 0x69, 0x6e, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x00, 0x00, 0x07]);

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

        // get buffer from hex string if needed
        if (!Buffer.isBuffer(proof)) proof = new Buffer(proof, 'hex');

        // check the crc
        var calculatedCRCInt = crc.crc32(proof.slice(0, proof.length - 4));
        var documentedCRCInt = proof.readUInt32BE(proof.length - 4);
        if (calculatedCRCInt !== documentedCRCInt) return callback('Proof contents have been currupted');

        var dataIndex = 0;

        // check header
        var headerResult = _readHeader(proof, dataIndex);
        dataIndex = headerResult[0];
        if (!headerResult[1].equals(magicHeader)) return callback('Not a valid Chainpoint binary');

        var proofObject = {};

        // get version and hashtype
        var versionTypeResult = _readVersionType(proof, dataIndex);
        if (!versionTypeResult) return callback('Proof contents are invalid');
        dataIndex = versionTypeResult[0];
        proofObject['@context'] = versionTypeResult[1];
        proofObject.type = versionTypeResult[2];

        if (proofObject.type == 'ChainpointOpListv2') {
            _toOperationList(proof, proofObject, calculatedCRCInt, dataIndex, function (err, result) {
                return callback(err, result);
            });
        } else {
            _toTypedProof(proof, proofObject, calculatedCRCInt, dataIndex, function (err, result) {
                return callback(err, result);
            });
        }

    };

    function _fromTypedProof(proofObject, callback) {
        var proof = new Buffer(0);

        // add the header
        var header = _makeHeader();

        // add version number and hash type code
        var versionTypeBytes = _getVersionTypeBytes(proofObject.type, proofObject['@context']);
        if (!versionTypeBytes) return callback('Proof object contents are invalid');

        // add targetHash
        if (!proofObject.targetHash || !rgxs.isHex(proofObject.targetHash)) return callback('Proof object contents are invalid');
        var targetHashBytes = _getVLQBytes(new Buffer(proofObject.targetHash, 'hex'));

        // add merkleRoot
        if (!proofObject.merkleRoot || !rgxs.isHex(proofObject.merkleRoot)) return callback('Proof object contents are invalid');
        var merkleRootBytes = _getVLQBytes(new Buffer(proofObject.merkleRoot, 'hex'));

        // add proof path
        if (!proofObject.proof || !Array.isArray(proofObject.proof)) return callback('Proof object contents are invalid');
        var proofPathBytes = _getProofPathBytes(proofObject.proof);
        if (!proofPathBytes) return callback('Proof object contents are invalid');

        // add anchors
        if (!proofObject.anchors || !Array.isArray(proofObject.anchors)) return callback('Proof object contents are invalid');
        var anchorsBytes = _getAnchorBytes(proofObject.anchors, true);
        if (!anchorsBytes) return callback('Proof object contents are invalid');

        proof = Buffer.concat([header, versionTypeBytes, targetHashBytes, merkleRootBytes, proofPathBytes, anchorsBytes]);

        // add crc
        var crcBytes = _getCRCBytes(proof);
        proof = Buffer.concat([proof, crcBytes]);

        return callback(null, proof);
    }

    function _fromOperationList(proofObject, callback) {
        var proof = new Buffer(0);

        // add the header
        var header = _makeHeader();

        // add version number and hash type code
        var versionTypeBytes = _getVersionTypeBytes(proofObject.type, proofObject['@context']);
        if (!versionTypeBytes) return callback('Proof object contents are invalid');

        // add targetHash
        if (!proofObject.targetHash || !rgxs.isHex(proofObject.targetHash)) return callback('Proof object contents are invalid');
        var targetHashBytes = _getVLQBytes(new Buffer(proofObject.targetHash, 'hex'));

        // add operations
        if (!proofObject.operations || !Array.isArray(proofObject.operations)) return callback('Proof object contents are invalid');
        var operationsBytes = _getOperationsBytes(proofObject.operations);
        if (!operationsBytes) return callback('Proof object contents are invalid');

        proof = Buffer.concat([header, versionTypeBytes, targetHashBytes, operationsBytes]);

        // add crc
        var crcBytes = _getCRCBytes(proof);
        proof = Buffer.concat([proof, crcBytes]);

        return callback(null, proof);
    }

    function _toTypedProof(proof, proofObject, calculatedCRCInt, dataIndex, callback) {

        // get targetHash
        var targetHashResult = _readVLQValue(proof, dataIndex);
        if (!targetHashResult) return callback('Proof contents are invalid');
        dataIndex = targetHashResult[0];
        proofObject.targetHash = targetHashResult[1].toString('hex');

        // get merkleRoot
        var merkleRootResult = _readVLQValue(proof, dataIndex);
        if (!merkleRootResult) return callback('Proof contents are invalid');
        dataIndex = merkleRootResult[0];
        proofObject.merkleRoot = merkleRootResult[1].toString('hex');

        // get proofPath
        var proofPathResult = _readProofPath(proof, dataIndex);
        if (!proofPathResult) return callback('Proof contents are invalid');
        dataIndex = proofPathResult[0];
        proofObject.proof = proofPathResult[1];

        // get anchors
        var anchorsResult = _readAnchors(proof, dataIndex, true);
        if (!anchorsResult) return callback('Proof contents are invalid');
        dataIndex = anchorsResult[0];
        proofObject.anchors = anchorsResult[1];


        var documentedCRCInt = proof.readUInt32BE(dataIndex);
        if (documentedCRCInt !== calculatedCRCInt) return callback('Proof contents are invalid');

        return callback(null, proofObject);
    }

    function _toOperationList(proof, proofObject, calculatedCRCInt, dataIndex, callback) {
        // get targetHash
        var targetHashResult = _readVLQValue(proof, dataIndex);
        if (!targetHashResult) return callback('Proof contents are invalid');
        dataIndex = targetHashResult[0];
        proofObject.targetHash = targetHashResult[1].toString('hex');

        // get operations
        var operationsResult = _readOperations(proof, dataIndex);
        if (!operationsResult) return callback('Proof contents are invalid');
        dataIndex = operationsResult[0];
        proofObject.operations = operationsResult[1];

        var documentedCRCInt = proof.readUInt32BE(dataIndex);
        if (documentedCRCInt !== calculatedCRCInt) return callback('Proof contents are invalid');

        return callback(null, proofObject);
    }

    //////////////////////////////////////////////////////////////////////////
    // CHP write support functions
    //////////////////////////////////////////////////////////////////////////

    function _makeHeader() {
        return magicHeader;
    }

    function _getVersionTypeBytes(proofType, context) {
        var versionTypeBytes = new Buffer(2).fill(0);
        var expectedContext = '';
        switch (proofType) {
            case 'ChainpointSHA224v2':
                versionTypeBytes.writeInt16BE(0x02c0, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA256v2':
                versionTypeBytes.writeInt16BE(0x02c1, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA384v2':
                versionTypeBytes.writeInt16BE(0x02c2, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA512v2':
                versionTypeBytes.writeInt16BE(0x02c3, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-224v2':
                versionTypeBytes.writeInt16BE(0x02c4, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-256v2':
                versionTypeBytes.writeInt16BE(0x02c5, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-384v2':
                versionTypeBytes.writeInt16BE(0x02c6, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-512v2':
                versionTypeBytes.writeInt16BE(0x02c7, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointOpListv2':
                versionTypeBytes.writeInt16BE(0x02cf, 0);
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            default:
                return false;
        }

        // confirm valid context
        if (!context || context !== expectedContext) return false;

        return versionTypeBytes;
    }

    function _getVLQBytes(bufferValue) {
        var valueVLQ = vlq.int2VLQBuffer(bufferValue.length);
        return new Buffer.concat([valueVLQ, bufferValue]);
    }

    function _getProofPathBytes(proof) {
        var pathBuffer = new Buffer(0);
        for (var x = 0; x < proof.length; x++) {
            if (proof[x].right && rgxs.isHex(proof[x].right)) {
                pathBuffer = Buffer.concat([pathBuffer, new Buffer([0x01]), _getVLQBytes(new Buffer(proof[x].right, 'hex'))]);
            } else if (proof[x].left && rgxs.isHex(proof[x].left)) {
                pathBuffer = Buffer.concat([pathBuffer, new Buffer([0x00]), _getVLQBytes(new Buffer(proof[x].left, 'hex'))]);
            } else return false;
        }
        return new Buffer.concat([new Buffer([0xf0]), pathBuffer, new Buffer([0xf1])]);
    }

    function _getAnchorBytes(anchors, isTypedProof) {
        var anchorsBuffer = new Buffer(0);
        if (anchors.length === 0) return false;
        for (var x = 0; x < anchors.length; x++) {
            switch (anchors[x].type) {
                case 'BTCOpReturn':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer([0xa0]), new Buffer(anchors[x].sourceId, 'hex')]);
                    break;
                case 'ETHData':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer([0xa1]), new Buffer(anchors[x].sourceId, 'hex')]);
                    break;
                case 'BTCBlockHeader':
                    if (!anchors[x].sourceId || !rgxs.isInt(anchors[x].sourceId)) return false;
                    var sourceIdInt = parseInt(anchors[x].sourceId, 10);
                    var intByteLength = Math.ceil(Math.floor(Math.log2(sourceIdInt) / 8) + 1);
                    var sourceIdBuffer = new Buffer(intByteLength);
                    sourceIdBuffer.writeIntBE(sourceIdInt, 0, intByteLength);
                    anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer([0xa2]), _getVLQBytes(sourceIdBuffer)]);

                    if (isTypedProof) { // Operation Lists dont need the remaining data
                        if (!anchors[x].tx || anchors[x].tx.length === 0) return false;
                        anchorsBuffer = Buffer.concat([anchorsBuffer, _getVLQBytes(new Buffer(anchors[x].tx, 'hex'))]);

                        if (!anchors[x].blockProof || !Array.isArray(anchors[x].blockProof)) return false;
                        var blockPathBuffer = new Buffer(0);
                        for (var y = 0; y < anchors[x].blockProof.length; y++) {
                            if (anchors[x].blockProof[y].right &&
                                anchors[x].blockProof[y].right.length === 64 &&
                                rgxs.isHex(anchors[x].blockProof[y].right)) {
                                blockPathBuffer = Buffer.concat([blockPathBuffer, new Buffer([0x01]), new Buffer(anchors[x].blockProof[y].right, 'hex')]);
                            } else if (anchors[x].blockProof[y].left &&
                                anchors[x].blockProof[y].left.length === 64 &&
                                rgxs.isHex(anchors[x].blockProof[y].left)) {
                                blockPathBuffer = Buffer.concat([blockPathBuffer, new Buffer([0x00]), new Buffer(anchors[x].blockProof[y].left, 'hex')]);
                            } else return false;
                        }
                        anchorsBuffer = Buffer.concat([anchorsBuffer, new Buffer([0xf4]), blockPathBuffer, new Buffer([0xf5])]);
                    }
                    break;
                default:
                    return false;
            }
        }
        return new Buffer.concat([new Buffer([0xf2]), anchorsBuffer, new Buffer([0xf3])]);
    }

    function _getCRCBytes(proof) {
        var crcInt = crc.crc32(proof);
        var byteArray = [];
        for (var x = 24; x >= 0; x -= 8) {
            byteArray.push((crcInt >> x) & 0xff);
        }
        return new Buffer(byteArray);
    }

    function _getOperationsBytes(operations) {
        var operationsBuffer = new Buffer(0);
        for (var x = 0; x < operations.length; x++) {
            if (operations[x].right && rgxs.isHex(operations[x].right)) {
                operationsBuffer = Buffer.concat([operationsBuffer, new Buffer([0x01]), _getVLQBytes(new Buffer(operations[x].right, 'hex'))]);
            } else if (operations[x].left && rgxs.isHex(operations[x].left)) {
                operationsBuffer = Buffer.concat([operationsBuffer, new Buffer([0x00]), _getVLQBytes(new Buffer(operations[x].left, 'hex'))]);
            } else if (operations[x].op) {
                var opByte;
                switch (operations[x].op) {
                    case 'sha-224':
                        opByte = 0xb0;
                        break;
                    case 'sha-256':
                        opByte = 0xb1;
                        break;
                    case 'sha-384':
                        opByte = 0xb2;
                        break;
                    case 'sha-512':
                        opByte = 0xb3;
                        break;
                    case 'sha3-224':
                        opByte = 0xb4;
                        break;
                    case 'sha3-256':
                        opByte = 0xb5;
                        break;
                    case 'sha3-384':
                        opByte = 0xb6;
                        break;
                    case 'sha3-512':
                        opByte = 0xb7;
                        break;
                    default:
                        return false;
                }
                operationsBuffer = Buffer.concat([operationsBuffer, new Buffer([opByte])]);
            } else if (operations[x].anchors && Array.isArray(operations[x].anchors)) {
                var anchorsBytes = _getAnchorBytes(operations[x].anchors, false);
                if (!anchorsBytes) return false;
                operationsBuffer = Buffer.concat([operationsBuffer, anchorsBytes]);
            } else return false;
        }
        return new Buffer.concat([new Buffer([0xf6]), operationsBuffer, new Buffer([0xf7])]);
    }

    //////////////////////////////////////////////////////////////////////////
    // CHP read support functions
    //////////////////////////////////////////////////////////////////////////

    function _readHeader(proof, dataIndex) {
        var header = proof.slice(dataIndex, dataIndex + 16);
        dataIndex += 16;
        return [dataIndex, header];
    }

    function _readVersionType(proof, dataIndex) {

        var version = proof.readUIntBE(dataIndex, 1);
        dataIndex++;
        if (version !== 0x02) return false;

        var hashType = proof.readUIntBE(dataIndex, 1);
        dataIndex++;
        var proofType = '';
        switch (hashType) {
            case 0xc0:
                proofType = 'ChainpointSHA224v2';
                break;
            case 0xc1:
                proofType = 'ChainpointSHA256v2';
                break;
            case 0xc2:
                proofType = 'ChainpointSHA384v2';
                break;
            case 0xc3:
                proofType = 'ChainpointSHA512v2';
                break;
            case 0xc4:
                proofType = 'ChainpointSHA3-224v2';
                break;
            case 0xc5:
                proofType = 'ChainpointSHA3-256v2';
                break;
            case 0xc6:
                proofType = 'ChainpointSHA3-384v2';
                break;
            case 0xc7:
                proofType = 'ChainpointSHA3-512v2';
                break;
            case 0xcf:
                proofType = 'ChainpointOpListv2';
                break;
            default:
                return false;
        }

        return [dataIndex, 'https://w3id.org/chainpoint/v2', proofType];
    }

    function _readVLQValue(proof, dataIndex) {
        var startIndex = dataIndex;
        var currentByte = proof.readUIntBE(dataIndex, 1);
        while (!vlq.isVLQLastByte(currentByte)) {
            if (++dataIndex >= proof.length) return false;
            currentByte = proof.readUIntBE(dataIndex, 1);
        }
        var valueByteCountBuffer = proof.slice(startIndex, ++dataIndex);
        var vlqValueByteCount = vlq.vlqBuffer2Int(valueByteCountBuffer);
        var fullLength = dataIndex + vlqValueByteCount;
        var valueBuffer = proof.slice(startIndex + valueByteCountBuffer.length, fullLength);
        dataIndex += vlqValueByteCount;
        return [dataIndex, valueBuffer];
    }

    function _readProofPath(proof, dataIndex) {
        var proofPath = [];
        var pathStartFlag = proof.readUIntBE(dataIndex, 1);
        dataIndex++;
        if (pathStartFlag !== 0xf0) return false;
        var nextByte = proof.readUIntBE(dataIndex, 1);
        dataIndex++;
        while (nextByte !== 0xf1) {
            var hashValueResult = _readVLQValue(proof, dataIndex);
            if (!hashValueResult) return false;
            dataIndex = hashValueResult[0];
            var hashValue = hashValueResult[1];
            switch (nextByte) {
                case 0x00:
                    proofPath.push({ 'left': hashValue.toString('hex') });
                    break;
                case 0x01:
                    proofPath.push({ 'right': hashValue.toString('hex') });
                    break;
                default:
                    return false;
            }
            nextByte = proof.readUIntBE(dataIndex, 1);
            dataIndex++;
        }
        return [dataIndex, proofPath];
    }

    function _readAnchors(proof, dataIndex, isTypedProof) {
        var anchors = [];
        var anchorStartFlag = proof.readUIntBE(dataIndex, 1);
        dataIndex++;
        if (anchorStartFlag !== 0xf2) return false;
        var nextByte = proof.readUIntBE(dataIndex, 1);
        dataIndex++;
        while (nextByte !== 0xf3) {
            var anchor = {};
            var sourceId = '';
            switch (nextByte) {
                case 0xa0:
                    anchor.type = 'BTCOpReturn';
                    sourceId = proof.slice(dataIndex, dataIndex + 32);
                    dataIndex += 32;
                    anchor.sourceId = sourceId.toString('hex');
                    break;
                case 0xa1:
                    anchor.type = 'ETHData';
                    sourceId = proof.slice(dataIndex, dataIndex + 32);
                    dataIndex += 32;
                    anchor.sourceId = sourceId.toString('hex');
                    break;
                case 0xa2:
                    anchor.type = 'BTCBlockHeader';

                    var sourceIdResult = _readVLQValue(proof, dataIndex);
                    if (!sourceIdResult) return false;
                    dataIndex = sourceIdResult[0];
                    anchor.sourceId = sourceIdResult[1].readUIntBE(0, sourceIdResult[1].length).toString(10);

                    if (isTypedProof) { // Operation Lists do not need this data
                        var txResult = _readVLQValue(proof, dataIndex);
                        if (!txResult) return false;
                        dataIndex = txResult[0];
                        anchor.tx = txResult[1].toString('hex');

                        var blockPath = [];
                        var blockPathStartFlag = proof.readUIntBE(dataIndex, 1);
                        dataIndex++;
                        if (blockPathStartFlag !== 0xf4) return false;
                        nextByte = proof.readUIntBE(dataIndex, 1);
                        dataIndex++;
                        while (nextByte !== 0xf5) {
                            var blockHashValue = proof.slice(dataIndex, dataIndex + 32);
                            dataIndex += 32;
                            switch (nextByte) {
                                case 0x00:
                                    blockPath.push({ 'left': blockHashValue.toString('hex') });
                                    break;
                                case 0x01:
                                    blockPath.push({ 'right': blockHashValue.toString('hex') });
                                    break;
                                default:
                                    return false;
                            }
                            nextByte = proof.readUIntBE(dataIndex, 1);
                            dataIndex++;
                        }
                        anchor.blockProof = blockPath;
                    }
                    break;
                default:
                    return false;
            }
            anchors.push(anchor);
            nextByte = proof.readUIntBE(dataIndex, 1);
            dataIndex++;
        }
        return [dataIndex, anchors];
    }

    function _readOperations(proof, dataIndex) {
        var operations = [];
        var operationsStartFlag = proof.readUIntBE(dataIndex, 1);
        dataIndex++;
        if (operationsStartFlag !== 0xf6) return false;
        var nextByte = proof.readUIntBE(dataIndex, 1);
        while (nextByte !== 0xf7) {
            switch (nextByte) {
                // a left / right operation
                case 0x00:
                case 0x01:
                    dataIndex++;
                    var hashValueResult = _readVLQValue(proof, dataIndex);
                    if (!hashValueResult) return false;
                    dataIndex = hashValueResult[0];
                    var hashValue = hashValueResult[1];
                    switch (nextByte) {
                        case 0x00:
                            operations.push({ 'left': hashValue.toString('hex') });
                            break;
                        case 0x01:
                            operations.push({ 'right': hashValue.toString('hex') });
                            break;
                        default:
                            return false;
                    }
                    break;
                // a hashing operation
                case 0xb0:
                    dataIndex++;
                    operations.push({ 'op': 'sha-224' });
                    break;
                case 0xb1:
                    dataIndex++;
                    operations.push({ 'op': 'sha-256' });
                    break;
                case 0xb2:
                    dataIndex++;
                    operations.push({ 'op': 'sha-384' });
                    break;
                case 0xb3:
                    dataIndex++;
                    operations.push({ 'op': 'sha-512' });
                    break;
                case 0xb4:
                    dataIndex++;
                    operations.push({ 'op': 'sha3-224' });
                    break;
                case 0xb5:
                    dataIndex++;
                    operations.push({ 'op': 'sha3-256' });
                    break;
                case 0xb6:
                    dataIndex++;
                    operations.push({ 'op': 'sha3-384' });
                    break;
                case 0xb7:
                    dataIndex++;
                    operations.push({ 'op': 'sha3-512' });
                    break;
                // an anchor point declaration
                case 0xf2:
                    var anchorsResult = _readAnchors(proof, dataIndex, false);
                    if (!anchorsResult) return false;
                    dataIndex = anchorsResult[0];
                    operations.push({ 'anchors': anchorsResult[1] });
                    break;
                default:
                    return false;
            }
            nextByte = proof.readUIntBE(dataIndex, 1);
        }
        dataIndex++;
        return [dataIndex, operations];
    }

};

module.exports = ChainpointBinary;

