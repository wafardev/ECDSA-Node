import Wallet from "./Wallet";
import Transfer from "./Transfer";
import SignatureGenerator from "./SignatureGenerator";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signatureHash] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <SignatureGenerator
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        customMessage={customMessage}
        setCustomMessage={setCustomMessage}
      />
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        signatureHash={signatureHash}
        customMessage={customMessage}
      />
    </div>
  );
}

export default App;
