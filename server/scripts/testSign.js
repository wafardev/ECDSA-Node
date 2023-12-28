const { sign } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes } = require("ethereum-cryptography/utils");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { getPublicKey } = require("ethereum-cryptography/secp256k1");
const { recoverPublicKey } = require("ethereum-cryptography/secp256k1");

async function signing() {
  const signature = await sign(
    keccak256(utf8ToBytes("Go")),
    "f1a80c7a71130dd9ce8973755a731f6de46cb1b65e9ac33f5d3e52b81efffd98"
  );
  console.log(signature);
  console.log("*");
  return signature;
}
const messageHash = keccak256(utf8ToBytes("Go"));
const publicKey = getPublicKey(
  "f1a80c7a71130dd9ce8973755a731f6de46cb1b65e9ac33f5d3e52b81efffd98"
);
