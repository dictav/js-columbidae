function hoge(str) {
  return 'hoge' + str;
}

function piyo(str) {
  return hoge(str) + 'piyo';
}

export default function crash(str) {
  throw new Error(piyo(str));
}
