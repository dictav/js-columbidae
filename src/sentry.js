import { extractException, sendBeacon } from './util'

import { version } from '../package.json'

function Sentry(config) {
  // memo: IE8 @_jscript_version == 5.8, IE10 @_jscript_version == 10
  // Sentry.io supports https only.
  // - XDomainRequest can not send to different protocol. 
  // - XMLHttpRequest on Edge v15 can not send to different protocol. 
  /*@cc_on
  @if (@_jscript_version < 5.8) throw new Error('This library does not support IE8-'); @end
  @if (@_jscript_version < 10) if (window.location.protocol !== 'https:') throw new Error('Sentry.io supports https only'); @end
  @*/

  if ('undefined' === typeof config.uuidv4) {
    throw new Error('uuidv4 is required');
  }

  this.start = (new Date()).getTime();
  this.uuidv4 = config.uuidv4;
  this.sendBeacon = config.sendBeacon;
  this.url = "//sentry.io/api/" + config.projectId + "/store/"
    + "?sentry_version=7"
    + "&sentry_client=simple-reporter%2F" + version
    + "&sentry_key=" + config.key;
  this.payload = {
    project: config.projectId,
    logger: 'javascript',
    platform: 'javascript',
    request: {
      headers: {
        'User-Agent': navigator.userAgent,
      },
      url: window.location.href
    },
    exception: {
      values: []
    },
    extra: {
      'session:duration': 0
    }
  }
}

Sentry.prototype.send = function(err) {
  var id = this.uuidv4();
  this.payload.exception.values.push(extractException(err));
  this.payload.extra['session:duration'] = (new Date()).getTime() - this.start;
  this.payload.event_id = id;

  sendBeacon(this.url, JSON.stringify(this.payload))
  return id;
}

export default Sentry;
