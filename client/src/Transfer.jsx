import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { recoverPublicKey } from "ethereum-cryptography/secp256k1";
import { hexToBytes } from "ethereum-cryptography/utils";
import { toHex } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, signatureHash, customMessage }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState("");

  const setValue = (setter) => (evt) => {
    setter(evt.target.value);
  };

  async function transfer(evt) {
    evt.preventDefault();

    const recoveryBit = parseInt(signature[signature.length - 1]);
    const restoredSignature = hexToBytes(signature.slice(0, -1).toLowerCase());

    const messageHash = keccak256(utf8ToBytes(message));
    const publicKeySigner = recoverPublicKey(
      messageHash,
      restoredSignature,
      recoveryBit
    );
    const signer = "0x" + toHex(keccak256(publicKeySigner.slice(1)).slice(-20));
    console.log(signer);

    if (address === signer) {
      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
        });
        setBalance(balance);
      } catch (ex) {
        alert(ex.response.data.message);
      }
    } else {
      alert("Signature not approved");
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="Type in the value to send. Ex: 1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type in the recipient's address. Ex: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Signature Hash
        <input
          placeholder="Type in the signature hash. Ex: ed57f"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>
      <label>
        TX Message
        <input
          placeholder="Input the message provided with the signature. Ex: Hello World"
          value={message}
          onChange={setValue(setMessage)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
