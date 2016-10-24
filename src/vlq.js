/*jslint node: true */
'use strict';

module.exports = {
    int2VLQBuffer: function (intValue) {
        var bytes = [];
        if (intValue < 128) {
            bytes.push(intValue);
        } else {
            bytes.unshift(intValue & 127);
            intValue >>= 7;
            while (intValue > 0) {
                bytes.unshift((intValue & 127) | 128);
                intValue >>= 7;
            }
        }
        return new Buffer(bytes);
    },
    isVLQLastByte: function (intValue) {
        return intValue >> 7 === 0;
    },
    vlqBuffer2Int: function (vlqBuffer) {
        var intValue = 0;
        for (var x = 0; x < vlqBuffer.length; x++) intValue = intValue << 7 | (vlqBuffer[x] % 128);
        return intValue;
    }
};