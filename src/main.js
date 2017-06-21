import StackDriver from './stackdriver'
import Sentry from './sentry'
import crash from './util'

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
  crash(str)
}

export function HelloSentry(config, msg){
  var st = new Sentry(config);
  try {
    console.log('crash');
    crash(msg)
  } catch(err) {
    console.log('err', err);
    st.send(err);
  }
}
