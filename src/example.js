//import Stackdriver from './stackdriver'
import Sentry from './sentry'
import crash from './crash'
import uuidv4 from './uuidv4'

export function HelloSentry(config, msg){
  config.uuidv4 = uuidv4;
  var s = new Sentry(config);
  try {
    crash(msg);
  } catch(err) {
    return s.send(err);
  }
}

// export function HelloStackdriver(config, msg){
//   var st = new Stackdriver(config);
//   try {
//     crash(msg)
//   } catch(err) {
//     return st.send(err);
//   }
// }
