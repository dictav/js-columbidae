import Sentry from './sentry'
import { crash, uuidv4 } from './util'

export function Crash(str) {
  crash(str)
}

export function HelloSentry(config, msg){
  config.uuidv4 = uuidv4;
  var st = new Sentry(config);
  try {
    crash(msg)
  } catch(err) {
    return st.send(err);
  }
}
