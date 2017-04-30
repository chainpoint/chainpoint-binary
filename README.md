# chainpoint-binary

[![npm](https://img.shields.io/npm/l/chainpoint-binary.svg)](https://www.npmjs.com/package/chainpoint-binary)
[![npm](https://img.shields.io/npm/v/chainpoint-binary.svg)](https://www.npmjs.com/package/chainpoint-binary)

A Node.JS tool for converting between Chainpoint JSON and binary formats

## Installation

```
$ npm install --save chainpoint-binary
```

### Create ChainpointBinary Object

```js
var ChainpointBinary = require('chainpoint-binary');

var cpb = new ChainpointBinary();
```

## Usage

### From JSON

This method converts your Chainpoint proof from a Chainpoint JSON string to binary form in a Buffer.

```js

cpb.fromJSON(chainpointProofJSONString, function (err, chpBinary) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // chpBinary contains your binary Chainpoint data
    }
});
```

### From Object

This method converts your Chainpoint proof from a Chainpoint Javascript object to binary form in a Buffer.

```js

cpb.fromObject(chainpointProofJSObject, function (err, chpBinary) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // chpBinary contains your binary Chainpoint data
    }
});
```

### To JSON

This method converts your Chainpoint proof to a JSON string from binary form in a Buffer. A hexadecimal string is also acceptable as input for this method.

```js

cpb.toJSON(chainpointProofBinaryBuffer, function (err, proofJSON) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // proofJSON contains your Chainpoint data as a JSON string
    }
});
```

### To Object

This method converts your Chainpoint proof to a Javascript object from binary form in a Buffer. A hexadecimal string is also acceptable as input for this method.

```js

cpb.toObject(chainpointProofBinaryBuffer, function (err, proofObject) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // proofObject contains your Chainpoint data as a Javascript Object
    }
});
```

