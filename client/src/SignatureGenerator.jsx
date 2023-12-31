import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { sign } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { hexToBytes } from "ethereum-cryptography/utils";
import * as config from "./config";

function SignatureGenerator({
  privateKey,
  setPrivateKey,
  customMessage,
  setCustomMessage,
}) {
  const [secretKey, setSecretKey] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const setValue = (setter, stateUpdater) => (evt) => {
    setter(evt.target.value);
    if (stateUpdater === setPrivateKey) {
      setPrivateKey(evt.target.value);
    } else if (stateUpdater === setCustomMessage) {
      setCustomMessage(evt.target.value);
    }
  };

  async function signMessage(evt) {
    evt.preventDefault();
    try {
      const messageHash = keccak256(utf8ToBytes(customMessage));
      const formattedPrivateKey = privateKey.startsWith("0x")
        ? hexToBytes(privateKey.slice(2))
        : hexToBytes(privateKey);
      const signTx = await sign(messageHash, formattedPrivateKey, {
        recovered: true,
      });
      const serializedSignature = toHex(signTx[0]) + signTx[1];

      let info = config.getRandomInfo();
      config.updateRandomInfo({
        nonce: Math.floor(Math.random() * 900 + 100),
        position: Math.floor(Math.random() * (serializedSignature.length - 1)),
      });
      info = config.getRandomInfo();

      const modifiedSignatureHash =
        serializedSignature.slice(0, info.position) +
        info.nonce +
        serializedSignature.slice(info.position);

      setSignature(modifiedSignatureHash);
    } catch (error) {
      console.error("Error signing the message:", error.message);
    }
  }

  return (
    <div className="sign container">
      <form onSubmit={signMessage}>
        <h1>Sign Transaction</h1>

        <label>
          Your Private Key
          <input
            placeholder="Type in your Private Key."
            value={secretKey}
            onChange={setValue(setSecretKey, setPrivateKey)}
          />
        </label>

        <label>
          TX Message
          <input
            placeholder="Type in a custom message for your signature. Ex: for Jane"
            value={message}
            onChange={setValue(setMessage, setCustomMessage)}
          />
        </label>

        <input type="submit" className="button" value="Sign" />
      </form>
      <div className="signature">
        <p
          style={{
            overflowWrap: "break-word",
            maxWidth: "40ch",
            overflow: "hidden",
          }}
        >
          Signature: {signature}
        </p>
      </div>
    </div>
  );
}

export default SignatureGenerator;
