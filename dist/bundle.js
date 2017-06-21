!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define([ "exports" ], t) : t(e.ColumbidaeJS = e.ColumbidaeJS || {});
}(this, function(e) {
    "use strict";
    function t(e) {
        return "hoge" + e;
    }
    function n(e) {
        return t(e) + "piyo";
    }
    function r(e) {
        throw new Error(n(e));
    }
    function i(e, t) {
        if ("undefined" != typeof navigator.sendBeacon) return navigator.sendBeacon(e, t);
        var n = /*@cc_on @if (@_jscript_version < 10) window.XDomainRequest || @end @*/ window.XMLHttpRequest;
        if (void 0 === n) return flase;
        var r = new n();
        return r.open("POST", e, !0), r.send(t), !0;
    }
    function o() {
        var e = window.crypto || window.msCrypto;
        if (void 0 !== e && e.getRandomValues) {
            var t = new Uint16Array(8);
            e.getRandomValues(t), t[3] = 4095 & t[3] | 16384, t[4] = 16383 & t[4] | 32768;
            var n = function(e) {
                for (var t = e.toString(16); t.length < 4; ) t = "0" + t;
                return t;
            };
            return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7]);
        }
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" === e ? t : 3 & t | 8).toString(16);
        });
    }
    function a(e) {
        var t = null;
        return "string" == typeof e.stack && (t = u(e.stack)), {
            type: "Error",
            value: e.message,
            stacktrace: t
        };
    }
    function u(e) {
        var t = [];
        return [ d, f ].forEach(function(n) {
            if (!(t.length > 0)) for (var r = null; null != (r = n.exec(e)); ) {
                var i = r[1].trim();
                0 == i.length && (i = "?");
                var o = r[2];
                t.unshift({
                    "function": i,
                    filename: o,
                    lineno: parseInt(r[3]),
                    colno: parseInt(r[4])
                });
            }
        }), 0 == t.length ? null : {
            frames: t
        };
    }
    function s(e) {
        /*@cc_on
  @if (@_jscript_version < 5.8) throw new Error('This library does not support IE8-'); @end
  @if (@_jscript_version < 10) if (window.location.protocol !== 'https:') throw new Error('Sentry.io supports https only'); @end
  @*/
        if ("undefined" == typeof e.uuidv4) throw new Error("uuidv4 is required");
        this.start = new Date().getTime(), this.uuidv4 = e.uuidv4, this.sendBeacon = e.sendBeacon, 
        this.url = "//sentry.io/api/" + e.projectId + "/store/?sentry_version=7&sentry_client=simple-reporter%2F" + c + "&sentry_key=" + e.key, 
        this.payload = {
            project: e.projectId,
            logger: "javascript",
            platform: "javascript",
            request: {
                headers: {
                    "User-Agent": navigator.userAgent
                },
                url: window.location.href
            },
            exception: {
                values: []
            },
            extra: {
                "session:duration": 0
            }
        };
    }
    var d = /at(.*) \(?(.+):(\d+):(\d+)/g, f = /(.*)@(.+):(\d+):(\d+)/g, c = "0.0.1";
    s.prototype.send = function(e) {
        var t = this.uuidv4();
        return this.payload.exception.values.push(a(e)), this.payload.extra["session:duration"] = new Date().getTime() - this.start, 
        this.payload.event_id = t, i(this.url, JSON.stringify(this.payload)), t;
    }, e.Crash = function(e) {
        r(e);
    }, e.HelloSentry = function(e, t) {
        e.uuidv4 = o;
        var n = new s(e);
        try {
            r(t);
        } catch (i) {
            return n.send(i);
        }
    };
});
//# sourceMappingURL=bundle.js.map
