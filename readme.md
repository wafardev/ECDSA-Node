## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### App Functionality

## Wallet Component

### Functionality:

- Allows users to input an Ethereum address.
- Fetches and displays the corresponding wallet balance.
- Includes error handling for failed server requests.

### Components and Libraries:

- React
- External server module

### Code Sample:

```javascript
// Handling user input and fetching balance
function onChange(evt) {
  const inputAddress = evt.target.value;
  setAddress(inputAddress);

  if (inputAddress) {
    try {
      const {
        data: { balance: newBalance },
      } = await server.get(`balance/${inputAddress}`);
      setBalance(newBalance);
    } catch (error) {
      console.error("Error fetching balance:", error.message);
      setBalance(0);
    }
  } else {
    setBalance(0);
  }
}
```

## Transfer Component

### Functionality:

- Enables users to initiate Ethereum transactions.
- Validates signatures for transaction approval.
- Updates the user's balance upon successful transfers.

### Components and Libraries:

- React
- External server module
- Ethereum cryptography libraries

### Code Sample:

```javascript
// Checking signature validity and updating balance
async function transfer(evt) {
  evt.preventDefault();
  // Signature and recovery logic
  // Transaction approval logic
}
```

## SignatureGenerator Component

### Functionality:

- Allows users to sign custom messages using a private key.
- Displays the resulting signature.

### Components and Libraries:

- React
- Ethereum cryptography libraries

### Code Sample:

```javascript
// Signing a custom message and updating the signature state
async function signMessage(evt) {
  evt.preventDefault();
  // Message signing logic
  // Updating the signature state
}

These components collectively create a simple Ethereum wallet application with features for balance checking, transfers, and message signing.
```

## Upgrade to v2 - Enhanced Security Measures

### Notable Features:

1. Random Nonce Inclusion
   To fortify the integrity of the centralized node, a unique nonce between 100 and 999 is generated for each signature. This nonce serves as a unique variable for each transaction, making it significantly more challenging for malicious actors to replicate or reuse transactions.

2. Random Positioning
   The chosen nonce is placed at a random position within the signature hash. This dynamic positioning ensures that each signature is unique and resistant to replay attacks.

Considerations:
Scalability Impact
While this innovative security measure markedly improves the robustness of our system, it's important to note that the scalability of the system may be affected. The current implementation allows for the signing of only one transaction at a time. After each signature, a new nonce is set, contributing to a more secure environment but potentially limiting the system's ability to handle a high volume of concurrent signatures.
