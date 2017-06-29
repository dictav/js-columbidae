function crashA(str) {
  crashB('crashA: ' + str)
}

function crashB(str) {
  crashZ('crashB: ' + str)
}

function crashZ(str) {
  throw new Error('crashZ: ' + str);
}

export default function crash(str) {
  crashA(str)
}
