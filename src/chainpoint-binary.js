/*jslint node: true */
'use strict';

var vlq = require('vlq-buffer');
var rgxs = require('./rgxs');

var ChainpointBinary = function () {
    // in case 'new' was omitted
    if (!(this instanceof ChainpointBinary)) {
        return new ChainpointBinary();
    }

    var magicHeader = new Buffer([0x07, 0x00, 0x00, 0x43, 0x68, 0x61, 0x69, 0x6e, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x00, 0x00, 0x07]); // _..Chainpoint.._

    ChainpointBinary.prototype.fromJSON = function (proofJSON, callback) {
        var proofObject = null;
        try {
            proofObject = JSON.parse(proofJSON);
        }
        catch (err) {
            return callback('Could not parse Chainpoint v3 JSON');
        }
        this.fromObject(proofObject, function (err, result) {
            return callback(err, result);
        });
    };

    ChainpointBinary.prototype.fromObject = function (proofObject, callback) {
        if (!proofObject) return callback('Could not parse Chainpoint v3 object');

        _createBinary(proofObject, function (err, result) {
            return callback(err, result);
        });
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
        try {
            _parseBinary(proof, function (err, result) {
                return callback(err, result);
            });
        } catch (e) {
            return callback('Could not parse Chainpoint v3 binary');
        }
    };

    function _createBinary(proofObject, callback) {
        var proofArray = [];

        // add the header
        _makeHeader(proofArray);

        // add version number and hash type code
        var appendVersionByteResult = _appendVersionByte(proofArray, proofObject['@context']);
        if (!appendVersionByteResult) return callback('Could not parse Chainpoint v3 object');

        // add targetHash
        if (!proofObject.targetHash || !rgxs.isHex(proofObject.targetHash)) return callback('Could not parse Chainpoint v3 object');
        _appendVLQBytes(proofArray, new Buffer(proofObject.targetHash, 'hex'));

        // add operations
        if (!proofObject.operations || !Array.isArray(proofObject.operations)) return callback('Could not parse Chainpoint v3 object');
        var appendOperationsBytesResult = _appendOperationsBytes(proofArray, proofObject.operations);
        if (!appendOperationsBytesResult) return callback('Could not parse Chainpoint v3 object');

        return callback(null, new Buffer(proofArray));
    }

    function _parseBinary(proof, callback) {

        // get buffer from hex string if needed
        if (!Buffer.isBuffer(proof)) proof = new Buffer(proof, 'hex');

        var dataIndex = 0;

        // check header
        var headerResult = _readHeader(proof, dataIndex);
        dataIndex = headerResult[0];
        if (!headerResult[1].equals(magicHeader)) return callback('Could not parse Chainpoint v3 binary');

        var proofObject = {};

        // get version
        var versionResult = _readVersion(proof, dataIndex);
        if (!versionResult) return callback('Could not parse Chainpoint v3 binary');
        dataIndex = versionResult[0];
        proofObject['@context'] = versionResult[1];
        proofObject.type = 'Chainpoint';

        // get targetHash
        var targetHashResult = _readVLQValue(proof, dataIndex);
        if (!targetHashResult) return callback('Could not parse Chainpoint v3 binary');
        dataIndex = targetHashResult[0];
        proofObject.targetHash = targetHashResult[1].toString('hex');

        // get operations
        var operationsResult = _readOperations(proof, dataIndex);
        if (!operationsResult) return callback('Could not parse Chainpoint v3 binary');
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

    function _appendVersionByte(proofArray, context) {
        var versionByte;
        switch (context) {
            case 'https://w3id.org/chainpoint/v3':
                versionByte = 0x03;
                break;
            default:
                return false;
        }

        proofArray.push(versionByte);
        return true;
    }

    function _appendVLQBytes(proofArray, bufferValue) {
        var valueVLQ = vlq.int2VLQBuffer(bufferValue.length);
        for (var x = 0; x < valueVLQ.length; x++) proofArray.push(valueVLQ[x]);
        for (x = 0; x < bufferValue.length; x++) proofArray.push(bufferValue[x]);
    }

    function _appendOperationsBytes(proofArray, operations) {
        proofArray.push(0xf0);
        for (var x = 0; x < operations.length; x++) {
            if (Array.isArray(operations[x])) {
                var appendOperationsBytesResult = _appendOperationsBytes(proofArray, operations[x]);
                if (!appendOperationsBytesResult) return false;
            } else if (operations[x].right && rgxs.isHex(operations[x].right)) {
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

        proofArray.push(0xf1);
        return true;
    }

    function _appendAnchorBytes(proofArray, anchors) {
        if (anchors.length === 0) return false;
        proofArray.push(0xf2);
        for (var x = 0; x < anchors.length; x++) {
            switch (anchors[x].type) {
                case 'BTCOpReturn':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    proofArray.push(0xa0);
                    _appendVLQBytes(proofArray, new Buffer(anchors[x].sourceId, 'hex'));
                    break;
                case 'ETHData':
                    if (!anchors[x].sourceId || anchors[x].sourceId.length !== 64 || !rgxs.isHex(anchors[x].sourceId)) return false;
                    proofArray.push(0xa1);
                    _appendVLQBytes(proofArray, new Buffer(anchors[x].sourceId, 'hex'));
                    break;
                case 'BTCBlockHeader':
                    if (!anchors[x].sourceId || !rgxs.isInt(anchors[x].sourceId)) return false;
                    var sourceIdInt = parseInt(anchors[x].sourceId, 10);
                    proofArray.push(0xa2);
                    var sourceIdBuffer = new Buffer(4);
                    sourceIdBuffer.writeUInt32BE(sourceIdInt, 0, 4);
                    _appendVLQBytes(proofArray, sourceIdBuffer);
                    break;
                case 'TierionCalendar':
                    if (!anchors[x].sourceId) return false;
                    proofArray.push(0xa3);
                    _appendVLQBytes(proofArray, new Buffer(anchors[x].sourceId));
                    break;
                default:
                    return false;
            }
        }
        proofArray.push(0xf3);
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

    function _readVersion(proof, dataIndex) {
        var versionByte = proof.readUInt8(dataIndex++);
        var version;
        switch (versionByte) {
            case 0x03:
                version = '3';
                break;
            default:
                return false;
        }

        return [dataIndex, 'https://w3id.org/chainpoint/v' + version];
    }

    function _readVLQValue(proof, dataIndex) {
        var startIndex = dataIndex;
        var currentByte = proof.readUInt8(dataIndex);
        while (!vlq.isVLQLastByte(currentByte)) {
            if (++dataIndex >= proof.length) return false;
            currentByte = proof.readUInt8(dataIndex);
        }
        var valueByteCountBuffer = proof.slice(startIndex, ++dataIndex);
        var vlqValueByteCount = vlq.vlqBuffer2Int(valueByteCountBuffer);
        var fullLength = dataIndex + vlqValueByteCount;
        var valueBuffer = proof.slice(startIndex + valueByteCountBuffer.length, fullLength);
        dataIndex += vlqValueByteCount;
        return [dataIndex, valueBuffer];
    }

    function _readOperations(proof, dataIndex) {
        var operations = [];
        var operationsStartFlag = proof.readUInt8(dataIndex++);
        if (operationsStartFlag !== 0xf0) return false;
        var currentByte = proof.readUInt8(dataIndex);
        while (currentByte !== 0xf1) {
            switch (currentByte) {
                // a new branching path
                case 0xf0:
                    var operationsResult = _readOperations(proof, dataIndex);
                    if (!operationsResult) return false;
                    dataIndex = operationsResult[0];
                    operations.push(operationsResult[1]);
                    break;
                // a left / right operation
                case 0x00:
                case 0x01:
                    var hashValueResult = _readVLQValue(proof, ++dataIndex);
                    if (!hashValueResult) return false;
                    dataIndex = hashValueResult[0];
                    var hashValue = hashValueResult[1];
                    switch (currentByte) {
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
            currentByte = proof.readUInt8(dataIndex);
        }
        return [++dataIndex, operations];
    }

    function _readAnchors(proof, dataIndex) {
        var anchors = [];
        var anchorStartFlag = proof.readUInt8(dataIndex++);
        if (anchorStartFlag !== 0xf2) return false;
        var currentByte = proof.readUInt8(dataIndex++);
        while (currentByte !== 0xf3) {
            var anchor = {};
            var sourceId = '';
            switch (currentByte) {
                case 0xa0:
                    anchor.type = 'BTCOpReturn';
                    var sourceIdResult = _readVLQValue(proof, dataIndex);
                    if (!sourceIdResult) return false;
                    dataIndex = sourceIdResult[0];
                    anchor.sourceId = sourceIdResult[1].toString('hex');
                    break;
                case 0xa1:
                    anchor.type = 'ETHData';
                    sourceIdResult = _readVLQValue(proof, dataIndex);
                    if (!sourceIdResult) return false;
                    dataIndex = sourceIdResult[0];
                    anchor.sourceId = sourceIdResult[1].toString('hex');
                    break;
                case 0xa2:
                    anchor.type = 'BTCBlockHeader';
                    sourceIdResult = _readVLQValue(proof, dataIndex);
                    if (!sourceIdResult) return false;
                    dataIndex = sourceIdResult[0];
                    anchor.sourceId = sourceIdResult[1].readUInt32BE(0);
                    break;
                case 0xa3:
                    anchor.type = 'TierionCalendar';
                    sourceIdResult = _readVLQValue(proof, dataIndex);
                    if (!sourceIdResult) return false;
                    dataIndex = sourceIdResult[0];
                    anchor.sourceId = sourceIdResult[1].toString();
                    break;
                default:
                    return false;
            }
            anchors.push(anchor);
            currentByte = proof.readUInt8(dataIndex++);
        }
        return [dataIndex, anchors];
    }

};

module.exports = ChainpointBinary;
module.exports.getInstance = function () {
    return new ChainpointBinary();
};

