# chainpoint-binary

[![npm](https://img.shields.io/npm/l/blockchain-anchor.svg)](https://www.npmjs.com/package/blockchain-anchor)
[![npm](https://img.shields.io/npm/v/blockchain-anchor.svg)](https://www.npmjs.com/package/blockchain-anchor)

A Node.JS tool for converting between Chainpoint JSON and .CHP binary files

## Installation

```
$ npm install --save chainpoint-binary
```

### Create ChainpointBinary Object

```js
var chainpointBinary = require('chainpoint-binary');

var cpb = new chainpointBinary();
```

## Usage

### From JSON

Converts your Chainpoint proof from a Chainpoint JSON string to binary form in a Buffer

```js

cb.fromJSON(chainpointProofJSONString, function (err, chpBinary) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // chpBinary contains your binary Chainpoint data
    }
});
```

### From Object

Converts your Chainpoint proof from a Chainpoint Javascript object to binary form in a Buffer

```js

cb.fromJSON(chainpointProofJSObject, function (err, chpBinary) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // chpBinary contains your binary Chainpoint data
    }
});
```

### To JSON

Converts your Chainpoint proof to a JSON string from binary form in a Buffer
A hexidecimal string is also acceptable as input for this method

```js

cb.fromJSON(chainpointProofBinaryBuffer, function (err, proofJSON) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // proofJSON conatins your Chainpoint data as a JSON string
    }
});
```

### To Object

Converts your Chainpoint proof to a Javascript object from binary form in a Buffer
A hexidecimal string is also acceptable as input for this method

```js

cb.fromJSON(chainpointProofBinaryBuffer, function (err, proofObject) {
    if (err) {
        // if an error occurs, the error message will return here
    } else {
        // proofObject conatins your Chainpoint data as a Javascript Object
    }
});
```

