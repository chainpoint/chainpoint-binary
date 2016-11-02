/*jslint node: true */
'use strict';

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
        if (!proofObject) return callback('Proof object contents are invalid');

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
        if (!proof) return callback('Not a valid Chainpoint binary');

        // get buffer from hex string if needed
        if (!Buffer.isBuffer(proof)) proof = new Buffer(proof, 'hex');

        if (proof.length < 78) return callback('Not a valid Chainpoint binary');
        // 78 is the unlikely minimum theoretical chp byte count

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
            _toOperationList(proof, proofObject, dataIndex, function (err, result) {
                return callback(err, result);
            });
        } else {
            _toTypedProof(proof, proofObject, dataIndex, function (err, result) {
                return callback(err, result);
            });
        }

    };

    function _fromTypedProof(proofObject, callback) {
        var proofArray = [];

        // add the header
        _makeHeader(proofArray);

        // add version number and hash type code
        var appendVersionTypeBytesResult = _appendVersionTypeBytes(proofArray, proofObject.type, proofObject['@context']);
        if (!appendVersionTypeBytesResult) return callback('Proof object contents are invalid');

        // add targetHash
        if (!proofObject.targetHash || !rgxs.isHex(proofObject.targetHash)) return callback('Proof object contents are invalid');
        _appendVLQBytes(proofArray, new Buffer(proofObject.targetHash, 'hex'));

        // add merkleRoot
        if (!proofObject.merkleRoot || !rgxs.isHex(proofObject.merkleRoot)) return callback('Proof object contents are invalid');
        _appendVLQBytes(proofArray, new Buffer(proofObject.merkleRoot, 'hex'));

        // add proof path
        if (!proofObject.proof || !Array.isArray(proofObject.proof)) return callback('Proof object contents are invalid');
        var appendProofPathBytesResult = _appendProofPathBytes(proofArray, proofObject.proof);
        if (!appendProofPathBytesResult) return callback('Proof object contents are invalid');

        // add anchors
        if (!proofObject.anchors || !Array.isArray(proofObject.anchors)) return callback('Proof object contents are invalid');
        var appendAnchorBytesResult = _appendAnchorBytes(proofArray, proofObject.anchors, true);
        if (!appendAnchorBytesResult) return callback('Proof object contents are invalid');

        return callback(null, new Buffer(proofArray));
    }

    function _fromOperationList(proofObject, callback) {
        var proofArray = [];

        // add the header
        _makeHeader(proofArray);

        // add version number and hash type code
        var appendVersionTypeBytesResult = _appendVersionTypeBytes(proofArray, proofObject.type, proofObject['@context']);
        if (!appendVersionTypeBytesResult) return callback('Proof object contents are invalid');

        // add targetHash
        if (!proofObject.targetHash || !rgxs.isHex(proofObject.targetHash)) return callback('Proof object contents are invalid');
        _appendVLQBytes(proofArray, new Buffer(proofObject.targetHash, 'hex'));

        // add operations
        if (!proofObject.operations || !Array.isArray(proofObject.operations)) return callback('Proof object contents are invalid');
        var appendOperationsBytesResult = _appendOperationsBytes(proofArray, proofObject.operations);
        if (!appendOperationsBytesResult) return callback('Proof object contents are invalid');

        return callback(null, new Buffer(proofArray));
    }

    function _toTypedProof(proof, proofObject, dataIndex, callback) {

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

        return callback(null, proofObject);
    }

    function _toOperationList(proof, proofObject, dataIndex, callback) {
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

        return callback(null, proofObject);
    }

    //////////////////////////////////////////////////////////////////////////
    // CHP write support functions
    //////////////////////////////////////////////////////////////////////////

    function _makeHeader(proofArray) {
        for (var x = 0; x < magicHeader.length; x++) {
            proofArray.push(magicHeader[x]);
        }
    }

    function _appendVersionTypeBytes(proofArray, proofType, context) {
        var expectedContext = '';
        var typeByte;
        switch (proofType) {
            case 'ChainpointSHA224v2':
                typeByte = 0xc0;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA256v2':
                typeByte = 0xc1;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA384v2':
                typeByte = 0xc2;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA512v2':
                typeByte = 0xc3;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-224v2':
                typeByte = 0xc4;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-256v2':
                typeByte = 0xc5;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-384v2':
                typeByte = 0xc6;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointSHA3-512v2':
                typeByte = 0xc7;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            case 'ChainpointOpListv2':
                typeByte = 0xcf;
                expectedContext = 'https://w3id.org/chainpoint/v2';
                break;
            default:
                return false;
        }

        // confirm valid context
        if (!context || context !== expectedContext) return false;
        proofArray.push(0x02);
        proofArray.push(typeByte);
        return true;
    }

    function _appendVLQBytes(proofArray, bufferValue) {
        var valueVLQ = vlq.int2VLQBuffer(bufferValue.length);
        for (var x = 0; x < valueVLQ.length; x++) proofArray.push(valueVLQ[x]);
        for (x = 0; x < bufferValue.length; x++) proofArray.push(bufferValue[x]);
    }

    function _appendProofPathBytes(proofArray, proof) {
        proofArray.push(0xf0);
        for (var x = 0; x < proof.length; x++) {
            if (proof[x].right && rgxs.isHex(proof[x].right)) {
                proofArray.push(0x01);
                _appendVLQBytes(proofArray, new Buffer(proof[x].right, 'hex'));
            } else if (proof[x].left && rgxs.isHex(proof[x].left)) {
                proofArray.push(0x00);
                _appendVLQBytes(proofArray, new Buffer(proof[x].left, 'hex'));
            } else return false;
        }
        proofArray.push(0xf1);
        return true;
    }

    function _appendAnchorBytes(proofArray, anchors, isTypedProof) {
        if (anchors.length === 0) return false;
        proofArray.push(0xf2);
        for (var x = 0; x < anchors.length; x++) {
            switch (anchors[x].type) {
                case 'BTCOpReturn':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    proofArray.push(0xa0);
                    var sourceIdBuffer = new Buffer(anchors[x].sourceId, 'hex');
                    for (var i = 0; i < sourceIdBuffer.length; i++) proofArray.push(sourceIdBuffer[i]);
                    break;
                case 'ETHData':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    proofArray.push(0xa1);
                    sourceIdBuffer = new Buffer(anchors[x].sourceId, 'hex');
                    for (i = 0; i < sourceIdBuffer.length; i++) proofArray.push(sourceIdBuffer[i]);
                    break;
                case 'BTCBlockHeader':
                    if (!anchors[x].sourceId || !rgxs.isInt(anchors[x].sourceId)) return false;
                    var sourceIdInt = parseInt(anchors[x].sourceId, 10);
                    var intByteLength = Math.ceil(Math.floor(Math.log2(sourceIdInt) / 8) + 1);
                    sourceIdBuffer = new Buffer(intByteLength);
                    sourceIdBuffer.writeIntBE(sourceIdInt, 0, intByteLength);
                    proofArray.push(0xa2);
                    _appendVLQBytes(proofArray, sourceIdBuffer);

                    if (isTypedProof) { // Operation Lists dont need the remaining data
                        if (!anchors[x].tx || anchors[x].tx.length === 0) return false;
                        _appendVLQBytes(proofArray, new Buffer(anchors[x].tx, 'hex'));

                        if (!anchors[x].blockProof || !Array.isArray(anchors[x].blockProof)) return false;
                        var blockPathBuffer;

                        proofArray.push(0xf4);
                        for (var y = 0; y < anchors[x].blockProof.length; y++) {
                            if (anchors[x].blockProof[y].right &&
                                anchors[x].blockProof[y].right.length === 64 &&
                                rgxs.isHex(anchors[x].blockProof[y].right)) {
                                proofArray.push(0x01);
                                blockPathBuffer = new Buffer(anchors[x].blockProof[y].right, 'hex');
                                for (i = 0; i < blockPathBuffer.length; i++) proofArray.push(blockPathBuffer[i]);
                            } else if (anchors[x].blockProof[y].left &&
                                anchors[x].blockProof[y].left.length === 64 &&
                                rgxs.isHex(anchors[x].blockProof[y].left)) {
                                proofArray.push(0x00);
                                blockPathBuffer = new Buffer(anchors[x].blockProof[y].left, 'hex');
                                for (i = 0; i < blockPathBuffer.length; i++) proofArray.push(blockPathBuffer[i]);
                            } else return false;
                        }
                        proofArray.push(0xf5);

                    }
                    break;
                default:
                    return false;
            }
        }
        proofArray.push(0xf3);
        return true;
    }

    function _appendOperationsBytes(proofArray, operations) {
        proofArray.push(0xf6);
        for (var x = 0; x < operations.length; x++) {
            if (operations[x].right && rgxs.isHex(operations[x].right)) {
                proofArray.push(0x01);
                _appendVLQBytes(proofArray, new Buffer(operations[x].right, 'hex'));
            } else if (operations[x].left && rgxs.isHex(operations[x].left)) {
                proofArray.push(0x00);
                _appendVLQBytes(proofArray, new Buffer(operations[x].left, 'hex'));
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
                proofArray.push(opByte);
            } else if (operations[x].anchors && Array.isArray(operations[x].anchors)) {
                var appendAnchorBytesResult = _appendAnchorBytes(proofArray, operations[x].anchors, false);
                if (!appendAnchorBytesResult) return false;
            } else return false;
        }

        proofArray.push(0xf7);
        return true;
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

