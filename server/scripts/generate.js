const { getPublicKey } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes } = require("ethereum-cryptography/utils");

const privateKey = "0x" + toHex(secp256k1.utils.randomPrivateKey());

const publicKey = "0x" + toHex(getPublicKey(hexToBytes(privateKey.slice(2))));

console.log(`Private Key: ${privateKey}`);
console.log(`Public Key: ${publicKey}`);

const ethereumAddress =
  "0x" + toHex(keccak256(hexToBytes(publicKey.slice(2)).slice(1)).slice(-20));
console.log(`Eth Address: ${ethereumAddress}`);
