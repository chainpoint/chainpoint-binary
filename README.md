# chainpoint-binary

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![npm](https://img.shields.io/npm/l/chainpoint-binary.svg)](https://www.npmjs.com/package/chainpoint-binary)
[![npm](https://img.shields.io/npm/v/chainpoint-binary.svg)](https://www.npmjs.com/package/chainpoint-binary)

A Node.JS tool for converting between Chainpoint v3 JSON and binary formats

## Installation

```
$ npm install --save chainpoint-binary
```

### Create ChainpointBinary Object

```js
const ChainpointBinary = require('chainpoint-binary')

let cpb = new ChainpointBinary()
```

## Usage

### objectToBinary
##### Converting from JSON object/string to binary

This method converts your Chainpoint proof from a Chainpoint JSON object or string to binary form in a Buffer.

```js

cpb.objectToBinary(chainpointProofObject, function (err, chpBinary) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // chpBinary contains your binary Chainpoint data
    }
})
```

### binaryToObject
##### Converting from binary format to a JSON object

This method converts your Chainpoint proof to a JSON object from binary form in a Buffer. A hexadecimal string is also acceptable as input for this method.

```js

cpb.binaryToObject(chainpointProofBinaryBuffer, function (err, proofObject) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // proofObject contains your Chainpoint data as a JSON Object
    }
})
```

