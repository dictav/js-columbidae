import StackDriver from './stackdriver'
import Sentry from './sentry'

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

export function HelloSentry(config){
  var st = new Sentry(config);
  try {
    throw new Error("Whats wrong!");
  } catch(err) {
    st.send(err);
  }
}
