!function(e, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define([ "exports" ], n) : n(e.undefinedExample = e.undefinedExample || {});
}(this, function(e) {
    "use strict";
    function n(e, n) {
        if ("undefined" != typeof navigator.sendBeacon) return navigator.sendBeacon(e, n);
        var t = /*@cc_on @if (@_jscript_version < 10) window.XDomainRequest || @end @*/ window.XMLHttpRequest;
        if (void 0 === t) return flase;
        var r = new t();
        return r.open("POST", e, !0), r.send(n), !0;
    }
    function t(e) {
        var n = null;
        return "string" == typeof e.stack && (n = r(e.stack)), {
            type: "Error",
            value: e.message,
            stacktrace: n
        };
    }
    function r(e) {
        var n = [];
        return [ c, f ].forEach(function(t) {
            if (!(n.length > 0)) for (var r = null; null != (r = t.exec(e)); ) {
                var i = r[1].trim();
                0 == i.length && (i = "?"), n.unshift({
                    "function": i,
                    filename: r[2],
                    lineno: parseInt(r[3]),
                    colno: parseInt(r[4])
                });
            }
        }), 0 == n.length ? null : {
            frames: n
        };
    }
    function i(e) {
        /*@cc_on
  @if (@_jscript_version < 5.8) throw new Error('This library does not support IE8-'); @end
  @if (@_jscript_version < 10) if (window.location.protocol !== 'https:') throw new Error('Sentry.io supports https only'); @end
  @*/
        if ("undefined" == typeof e.uuidv4) throw new Error("uuidv4 is required");
        this.start = new Date().getTime(), this.uuidv4 = e.uuidv4, this.sendBeacon = e.sendBeacon, 
        this.url = "//sentry.io/api/" + e.projectId + "/store/?sentry_version=7&sentry_client=ColumbidaeJS%2F" + x + "&sentry_key=" + e.key, 
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
    function o(e) {
        a("crashA: " + e);
    }
    function a(e) {
        u("crashB: " + e);
    }
    function u(e) {
        throw new Error("crashZ: " + e);
    }
    function s(e) {
        o(e);
    }
    function d() {
        var e = window.crypto || window.msCrypto;
        if (void 0 !== e && e.getRandomValues) {
            var n = new Uint16Array(8);
            e.getRandomValues(n), n[3] = 4095 & n[3] | 16384, n[4] = 16383 & n[4] | 32768;
            var t = function(e) {
                for (var n = e.toString(16); n.length < 4; ) n = "0" + n;
                return n;
            };
            return t(n[0]) + t(n[1]) + t(n[2]) + t(n[3]) + t(n[4]) + t(n[5]) + t(n[6]) + t(n[7]);
        }
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var n = 16 * Math.random() | 0;
            return ("x" === e ? n : 3 & n | 8).toString(16);
        });
    }
    var c = /at(.*) \(?(.+):(\d+):(\d+)/g, f = /(.*)@(.+):(\d+):(\d+)/g, x = "0.1.0";
    i.prototype.send = function(e) {
        var r = this.uuidv4();
        return this.payload.exception.values.push(t(e)), this.payload.extra["session:duration"] = new Date().getTime() - this.start, 
        this.payload.event_id = r, n(this.url, JSON.stringify(this.payload)), r;
    }, e.HelloSentry = function(e, n) {
        e.uuidv4 = d;
        var t = new i(e);
        try {
            s(n);
        } catch (r) {
            return t.send(r);
        }
    };
});
//# sourceMappingURL=example.js.map
