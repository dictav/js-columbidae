!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define([ "exports" ], t) : t(e.ColumbidaeJSExample = e.ColumbidaeJSExample || {});
}(this, function(e) {
    "use strict";
    function t(e, t) {
        if ("undefined" != typeof navigator.sendBeacon) return navigator.sendBeacon(e, t);
        var n = /*@cc_on @if (@_jscript_version < 10) window.XDomainRequest || @end @*/ window.XMLHttpRequest;
        if (void 0 === n) return flase;
        var r = new n();
        return r.open("POST", e, !0), r.send(t), !0;
    }
    function n(e) {
        var t = null;
        return "string" == typeof e.stack && (t = r(e.stack)), {
            type: "Error",
            value: e.message,
            stacktrace: t
        };
    }
    function r(e) {
        var t = [];
        return [ c, f ].forEach(function(n) {
            if (!(t.length > 0)) for (var r = null; null != (r = n.exec(e)); ) {
                var i = r[1].trim();
                0 == i.length && (i = "?"), t.unshift({
                    "function": i,
                    filename: r[2],
                    lineno: parseInt(r[3]),
                    colno: parseInt(r[4])
                });
            }
        }), 0 == t.length ? null : {
            frames: t
        };
    }
    function i(e) {
        /*@cc_on
  @if (@_jscript_version < 5.8) throw new Error('This library does not support IE8-'); @end
  @if (@_jscript_version < 10) if (window.location.protocol !== 'https:') throw new Error('Sentry.io supports https only'); @end
  @*/
        if ("undefined" == typeof e.uuidv4) throw new Error("uuidv4 is required");
        this.start = new Date().getTime(), this.uuidv4 = e.uuidv4, this.sendBeacon = e.sendBeacon, 
        this.url = "//sentry.io/api/" + e.projectId + "/store/?sentry_version=7&sentry_client=ColumbidaeJS%2F" + l + "&sentry_key=" + e.key, 
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
        }, "string" == typeof e.release && (this.payload.release = e.release);
    }
    function o(e) {
        a("crashA: " + e);
    }
    function a(e) {
        s("crashB: " + e);
    }
    function s(e) {
        throw new Error("crashZ: " + e);
    }
    function u(e) {
        o(e);
    }
    function d() {
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
    var c = /at(.*) \(?(.+):(\d+):(\d+)/g, f = /(.*)@(.+):(\d+):(\d+)/g, l = "0.1.3";
    i.prototype.send = function(e) {
        var r = this.uuidv4();
        return this.payload.exception.values.push(n(e)), this.payload.extra["session:duration"] = new Date().getTime() - this.start, 
        this.payload.event_id = r, t(this.url, JSON.stringify(this.payload)), r;
    }, e.HelloSentry = function(e, t) {
        e.uuidv4 = d;
        var n = new i(e);
        try {
            u(t);
        } catch (r) {
            return n.send(r);
        }
    };
});
//# sourceMappingURL=example.js.map
