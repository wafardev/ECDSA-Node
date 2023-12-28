let signatureHashLength = 143;

let randomInfo = {
  nonce: Math.floor(Math.random() * 900 + 100),
  position: Math.floor(Math.random() * (signatureHashLength - 1)),
};

export function getRandomInfo() {
  return randomInfo;
}

export function updateRandomInfo(newInfo) {
  randomInfo = { ...randomInfo, ...newInfo };
}
