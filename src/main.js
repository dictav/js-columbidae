import StackDriver from './stackdriver'

function hello() {
  /*@cc_on return false;@*/
  throw new Error("Hello, My StackdriverJS!");
}

export function HelloStackDriver(config){
  var sd = new StackDriver(config);
  try {
    throw new Error("Whats wrong!!!");
  } catch(err) {
    sd.send(err);
  }
}

export function Crash(str) {
  throw new Error(str);
}
