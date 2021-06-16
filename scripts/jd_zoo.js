/*
618动物联萌
解密参考自：https://github.com/yangtingxiao/QuantumultX/blob/master/scripts/jd/jd_zoo.js
===================quantumultx================
[task_local]
#618动物联萌
36 0,6-23/2 * * * https://raw.githubusercontent.com/star261/jd/main/scripts/jd_zoo.js, tag=618动物联萌, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

=====================Loon================
[Script]
cron "36 0,6-23/2 * * *" script-path=https://raw.githubusercontent.com/star261/jd/main/scripts/jd_zoo.js, tag=618动物联萌

====================Surge================
618动物联萌 = type=cron,cronexp="36 0,6-23/2 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/star261/jd/main/scripts/jd_zoo.js

============小火箭=========
618动物联萌 = type=cron,script-path=https://raw.githubusercontent.com/star261/jd/main/scripts/jd_zoo.js, cronexpr="36 0,6-23/2 * * *", timeout=3600, enable=true
*/
!function (t, r) { "object" == typeof exports ? module.exports = exports = r() : "function" == typeof define && define.amd ? define([], r) : t.CryptoJS = r() }(this, function () {
  var t = t || function (t, r) { var e = Object.create || function () { function t() { } return function (r) { var e; return t.prototype = r, e = new t, t.prototype = null, e } }(), i = {}, n = i.lib = {}, o = n.Base = function () { return { extend: function (t) { var r = e(this); return t && r.mixIn(t), r.hasOwnProperty("init") && this.init !== r.init || (r.init = function () { r.$super.init.apply(this, arguments) }), r.init.prototype = r, r.$super = this, r }, create: function () { var t = this.extend(); return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r]); t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () { return this.init.prototype.extend(this) } } }(), s = n.WordArray = o.extend({ init: function (t, e) { t = this.words = t || [], e != r ? this.sigBytes = e : this.sigBytes = 4 * t.length }, toString: function (t) { return (t || c).stringify(this) }, concat: function (t) { var r = this.words, e = t.words, i = this.sigBytes, n = t.sigBytes; if (this.clamp(), i % 4) for (var o = 0; o < n; o++) { var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255; r[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8 } else for (var o = 0; o < n; o += 4)r[i + o >>> 2] = e[o >>> 2]; return this.sigBytes += n, this }, clamp: function () { var r = this.words, e = this.sigBytes; r[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, r.length = t.ceil(e / 4) }, clone: function () { var t = o.clone.call(this); return t.words = this.words.slice(0), t }, random: function (r) { for (var e, i = [], n = function (r) { var r = r, e = 987654321, i = 4294967295; return function () { e = 36969 * (65535 & e) + (e >> 16) & i, r = 18e3 * (65535 & r) + (r >> 16) & i; var n = (e << 16) + r & i; return n /= 4294967296, n += .5, n * (t.random() > .5 ? 1 : -1) } }, o = 0; o < r; o += 4) { var a = n(4294967296 * (e || t.random())); e = 987654071 * a(), i.push(4294967296 * a() | 0) } return new s.init(i, r) } }), a = i.enc = {}, c = a.Hex = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) { var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i += 2)e[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4; return new s.init(e, r / 2) } }, h = a.Latin1 = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) { var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i++)e[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8; return new s.init(e, r) } }, l = a.Utf8 = { stringify: function (t) { try { return decodeURIComponent(escape(h.stringify(t))) } catch (t) { throw new Error("Malformed UTF-8 data") } }, parse: function (t) { return h.parse(unescape(encodeURIComponent(t))) } }, f = n.BufferedBlockAlgorithm = o.extend({ reset: function () { this._data = new s.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = l.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (r) { var e = this._data, i = e.words, n = e.sigBytes, o = this.blockSize, a = 4 * o, c = n / a; c = r ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0); var h = c * o, l = t.min(4 * h, n); if (h) { for (var f = 0; f < h; f += o)this._doProcessBlock(i, f); var u = i.splice(0, h); e.sigBytes -= l } return new s.init(u, l) }, clone: function () { var t = o.clone.call(this); return t._data = this._data.clone(), t }, _minBufferSize: 0 }), u = (n.Hasher = f.extend({ cfg: o.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { f.reset.call(this), this._doReset() }, update: function (t) { return this._append(t), this._process(), this }, finalize: function (t) { t && this._append(t); var r = this._doFinalize(); return r }, blockSize: 16, _createHelper: function (t) { return function (r, e) { return new t.init(e).finalize(r) } }, _createHmacHelper: function (t) { return function (r, e) { return new u.HMAC.init(t, e).finalize(r) } } }), i.algo = {}); return i }(Math); return function () { function r(t, r, e) { for (var i = [], o = 0, s = 0; s < r; s++)if (s % 4) { var a = e[t.charCodeAt(s - 1)] << s % 4 * 2, c = e[t.charCodeAt(s)] >>> 6 - s % 4 * 2; i[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++ } return n.create(i, o) } var e = t, i = e.lib, n = i.WordArray, o = e.enc; o.Base64 = { stringify: function (t) { var r = t.words, e = t.sigBytes, i = this._map; t.clamp(); for (var n = [], o = 0; o < e; o += 3)for (var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255, a = r[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = r[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, h = s << 16 | a << 8 | c, l = 0; l < 4 && o + .75 * l < e; l++)n.push(i.charAt(h >>> 6 * (3 - l) & 63)); var f = i.charAt(64); if (f) for (; n.length % 4;)n.push(f); return n.join("") }, parse: function (t) { var e = t.length, i = this._map, n = this._reverseMap; if (!n) { n = this._reverseMap = []; for (var o = 0; o < i.length; o++)n[i.charCodeAt(o)] = o } var s = i.charAt(64); if (s) { var a = t.indexOf(s); a !== -1 && (e = a) } return r(t, e, n) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" } }(), function (r) { function e(t, r, e, i, n, o, s) { var a = t + (r & e | ~r & i) + n + s; return (a << o | a >>> 32 - o) + r } function i(t, r, e, i, n, o, s) { var a = t + (r & i | e & ~i) + n + s; return (a << o | a >>> 32 - o) + r } function n(t, r, e, i, n, o, s) { var a = t + (r ^ e ^ i) + n + s; return (a << o | a >>> 32 - o) + r } function o(t, r, e, i, n, o, s) { var a = t + (e ^ (r | ~i)) + n + s; return (a << o | a >>> 32 - o) + r } var s = t, a = s.lib, c = a.WordArray, h = a.Hasher, l = s.algo, f = []; !function () { for (var t = 0; t < 64; t++)f[t] = 4294967296 * r.abs(r.sin(t + 1)) | 0 }(); var u = l.MD5 = h.extend({ _doReset: function () { this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, r) { for (var s = 0; s < 16; s++) { var a = r + s, c = t[a]; t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8) } var h = this._hash.words, l = t[r + 0], u = t[r + 1], d = t[r + 2], v = t[r + 3], p = t[r + 4], _ = t[r + 5], y = t[r + 6], g = t[r + 7], B = t[r + 8], w = t[r + 9], k = t[r + 10], S = t[r + 11], m = t[r + 12], x = t[r + 13], b = t[r + 14], H = t[r + 15], z = h[0], A = h[1], C = h[2], D = h[3]; z = e(z, A, C, D, l, 7, f[0]), D = e(D, z, A, C, u, 12, f[1]), C = e(C, D, z, A, d, 17, f[2]), A = e(A, C, D, z, v, 22, f[3]), z = e(z, A, C, D, p, 7, f[4]), D = e(D, z, A, C, _, 12, f[5]), C = e(C, D, z, A, y, 17, f[6]), A = e(A, C, D, z, g, 22, f[7]), z = e(z, A, C, D, B, 7, f[8]), D = e(D, z, A, C, w, 12, f[9]), C = e(C, D, z, A, k, 17, f[10]), A = e(A, C, D, z, S, 22, f[11]), z = e(z, A, C, D, m, 7, f[12]), D = e(D, z, A, C, x, 12, f[13]), C = e(C, D, z, A, b, 17, f[14]), A = e(A, C, D, z, H, 22, f[15]), z = i(z, A, C, D, u, 5, f[16]), D = i(D, z, A, C, y, 9, f[17]), C = i(C, D, z, A, S, 14, f[18]), A = i(A, C, D, z, l, 20, f[19]), z = i(z, A, C, D, _, 5, f[20]), D = i(D, z, A, C, k, 9, f[21]), C = i(C, D, z, A, H, 14, f[22]), A = i(A, C, D, z, p, 20, f[23]), z = i(z, A, C, D, w, 5, f[24]), D = i(D, z, A, C, b, 9, f[25]), C = i(C, D, z, A, v, 14, f[26]), A = i(A, C, D, z, B, 20, f[27]), z = i(z, A, C, D, x, 5, f[28]), D = i(D, z, A, C, d, 9, f[29]), C = i(C, D, z, A, g, 14, f[30]), A = i(A, C, D, z, m, 20, f[31]), z = n(z, A, C, D, _, 4, f[32]), D = n(D, z, A, C, B, 11, f[33]), C = n(C, D, z, A, S, 16, f[34]), A = n(A, C, D, z, b, 23, f[35]), z = n(z, A, C, D, u, 4, f[36]), D = n(D, z, A, C, p, 11, f[37]), C = n(C, D, z, A, g, 16, f[38]), A = n(A, C, D, z, k, 23, f[39]), z = n(z, A, C, D, x, 4, f[40]), D = n(D, z, A, C, l, 11, f[41]), C = n(C, D, z, A, v, 16, f[42]), A = n(A, C, D, z, y, 23, f[43]), z = n(z, A, C, D, w, 4, f[44]), D = n(D, z, A, C, m, 11, f[45]), C = n(C, D, z, A, H, 16, f[46]), A = n(A, C, D, z, d, 23, f[47]), z = o(z, A, C, D, l, 6, f[48]), D = o(D, z, A, C, g, 10, f[49]), C = o(C, D, z, A, b, 15, f[50]), A = o(A, C, D, z, _, 21, f[51]), z = o(z, A, C, D, m, 6, f[52]), D = o(D, z, A, C, v, 10, f[53]), C = o(C, D, z, A, k, 15, f[54]), A = o(A, C, D, z, u, 21, f[55]), z = o(z, A, C, D, B, 6, f[56]), D = o(D, z, A, C, H, 10, f[57]), C = o(C, D, z, A, y, 15, f[58]), A = o(A, C, D, z, x, 21, f[59]), z = o(z, A, C, D, p, 6, f[60]), D = o(D, z, A, C, S, 10, f[61]), C = o(C, D, z, A, d, 15, f[62]), A = o(A, C, D, z, w, 21, f[63]), h[0] = h[0] + z | 0, h[1] = h[1] + A | 0, h[2] = h[2] + C | 0, h[3] = h[3] + D | 0 }, _doFinalize: function () { var t = this._data, e = t.words, i = 8 * this._nDataBytes, n = 8 * t.sigBytes; e[n >>> 5] |= 128 << 24 - n % 32; var o = r.floor(i / 4294967296), s = i; e[(n + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), e[(n + 64 >>> 9 << 4) + 14] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), t.sigBytes = 4 * (e.length + 1), this._process(); for (var a = this._hash, c = a.words, h = 0; h < 4; h++) { var l = c[h]; c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8) } return a }, clone: function () { var t = h.clone.call(this); return t._hash = this._hash.clone(), t } }); s.MD5 = h._createHelper(u), s.HmacMD5 = h._createHmacHelper(u) }(Math), function () { var r = t, e = r.lib, i = e.WordArray, n = e.Hasher, o = r.algo, s = [], a = o.SHA1 = n.extend({ _doReset: function () { this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], a = e[3], c = e[4], h = 0; h < 80; h++) { if (h < 16) s[h] = 0 | t[r + h]; else { var l = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16]; s[h] = l << 1 | l >>> 31 } var f = (i << 5 | i >>> 27) + c + s[h]; f += h < 20 ? (n & o | ~n & a) + 1518500249 : h < 40 ? (n ^ o ^ a) + 1859775393 : h < 60 ? (n & o | n & a | o & a) - 1894007588 : (n ^ o ^ a) - 899497514, c = a, a = o, o = n << 30 | n >>> 2, n = i, i = f } e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + o | 0, e[3] = e[3] + a | 0, e[4] = e[4] + c | 0 }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; return r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 64 >>> 9 << 4) + 14] = Math.floor(e / 4294967296), r[(i + 64 >>> 9 << 4) + 15] = e, t.sigBytes = 4 * r.length, this._process(), this._hash }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t } }); r.SHA1 = n._createHelper(a), r.HmacSHA1 = n._createHmacHelper(a) }(), function (r) { var e = t, i = e.lib, n = i.WordArray, o = i.Hasher, s = e.algo, a = [], c = []; !function () { function t(t) { for (var e = r.sqrt(t), i = 2; i <= e; i++)if (!(t % i)) return !1; return !0 } function e(t) { return 4294967296 * (t - (0 | t)) | 0 } for (var i = 2, n = 0; n < 64;)t(i) && (n < 8 && (a[n] = e(r.pow(i, .5))), c[n] = e(r.pow(i, 1 / 3)), n++), i++ }(); var h = [], l = s.SHA256 = o.extend({ _doReset: function () { this._hash = new n.init(a.slice(0)) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], l = e[5], f = e[6], u = e[7], d = 0; d < 64; d++) { if (d < 16) h[d] = 0 | t[r + d]; else { var v = h[d - 15], p = (v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3, _ = h[d - 2], y = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10; h[d] = p + h[d - 7] + y + h[d - 16] } var g = a & l ^ ~a & f, B = i & n ^ i & o ^ n & o, w = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22), k = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25), S = u + k + g + c[d] + h[d], m = w + B; u = f, f = l, l = a, a = s + S | 0, s = o, o = n, n = i, i = S + m | 0 } e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + o | 0, e[3] = e[3] + s | 0, e[4] = e[4] + a | 0, e[5] = e[5] + l | 0, e[6] = e[6] + f | 0, e[7] = e[7] + u | 0 }, _doFinalize: function () { var t = this._data, e = t.words, i = 8 * this._nDataBytes, n = 8 * t.sigBytes; return e[n >>> 5] |= 128 << 24 - n % 32, e[(n + 64 >>> 9 << 4) + 14] = r.floor(i / 4294967296), e[(n + 64 >>> 9 << 4) + 15] = i, t.sigBytes = 4 * e.length, this._process(), this._hash }, clone: function () { var t = o.clone.call(this); return t._hash = this._hash.clone(), t } }); e.SHA256 = o._createHelper(l), e.HmacSHA256 = o._createHmacHelper(l) }(Math), function () { function r(t) { return t << 8 & 4278255360 | t >>> 8 & 16711935 } var e = t, i = e.lib, n = i.WordArray, o = e.enc; o.Utf16 = o.Utf16BE = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n += 2) { var o = r[n >>> 2] >>> 16 - n % 4 * 8 & 65535; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i++)e[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16; return n.create(e, 2 * r) } }; o.Utf16LE = { stringify: function (t) { for (var e = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) { var s = r(e[o >>> 2] >>> 16 - o % 4 * 8 & 65535); n.push(String.fromCharCode(s)) } return n.join("") }, parse: function (t) { for (var e = t.length, i = [], o = 0; o < e; o++)i[o >>> 1] |= r(t.charCodeAt(o) << 16 - o % 2 * 16); return n.create(i, 2 * e) } } }(), function () { if ("function" == typeof ArrayBuffer) { var r = t, e = r.lib, i = e.WordArray, n = i.init, o = i.init = function (t) { if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) { for (var r = t.byteLength, e = [], i = 0; i < r; i++)e[i >>> 2] |= t[i] << 24 - i % 4 * 8; n.call(this, e, r) } else n.apply(this, arguments) }; o.prototype = i } }(), function (r) { function e(t, r, e) { return t ^ r ^ e } function i(t, r, e) { return t & r | ~t & e } function n(t, r, e) { return (t | ~r) ^ e } function o(t, r, e) { return t & e | r & ~e } function s(t, r, e) { return t ^ (r | ~e) } function a(t, r) { return t << r | t >>> 32 - r } var c = t, h = c.lib, l = h.WordArray, f = h.Hasher, u = c.algo, d = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), v = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), p = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), _ = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), B = u.RIPEMD160 = f.extend({ _doReset: function () { this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, r) { for (var c = 0; c < 16; c++) { var h = r + c, l = t[h]; t[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8) } var f, u, B, w, k, S, m, x, b, H, z = this._hash.words, A = y.words, C = g.words, D = d.words, R = v.words, E = p.words, M = _.words; S = f = z[0], m = u = z[1], x = B = z[2], b = w = z[3], H = k = z[4]; for (var F, c = 0; c < 80; c += 1)F = f + t[r + D[c]] | 0, F += c < 16 ? e(u, B, w) + A[0] : c < 32 ? i(u, B, w) + A[1] : c < 48 ? n(u, B, w) + A[2] : c < 64 ? o(u, B, w) + A[3] : s(u, B, w) + A[4], F |= 0, F = a(F, E[c]), F = F + k | 0, f = k, k = w, w = a(B, 10), B = u, u = F, F = S + t[r + R[c]] | 0, F += c < 16 ? s(m, x, b) + C[0] : c < 32 ? o(m, x, b) + C[1] : c < 48 ? n(m, x, b) + C[2] : c < 64 ? i(m, x, b) + C[3] : e(m, x, b) + C[4], F |= 0, F = a(F, M[c]), F = F + H | 0, S = H, H = b, b = a(x, 10), x = m, m = F; F = z[1] + B + b | 0, z[1] = z[2] + w + H | 0, z[2] = z[3] + k + S | 0, z[3] = z[4] + f + m | 0, z[4] = z[0] + u + x | 0, z[0] = F }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 64 >>> 9 << 4) + 14] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8), t.sigBytes = 4 * (r.length + 1), this._process(); for (var n = this._hash, o = n.words, s = 0; s < 5; s++) { var a = o[s]; o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8) } return n }, clone: function () { var t = f.clone.call(this); return t._hash = this._hash.clone(), t } }); c.RIPEMD160 = f._createHelper(B), c.HmacRIPEMD160 = f._createHmacHelper(B) }(Math), function () { var r = t, e = r.lib, i = e.Base, n = r.enc, o = n.Utf8, s = r.algo; s.HMAC = i.extend({ init: function (t, r) { t = this._hasher = new t.init, "string" == typeof r && (r = o.parse(r)); var e = t.blockSize, i = 4 * e; r.sigBytes > i && (r = t.finalize(r)), r.clamp(); for (var n = this._oKey = r.clone(), s = this._iKey = r.clone(), a = n.words, c = s.words, h = 0; h < e; h++)a[h] ^= 1549556828, c[h] ^= 909522486; n.sigBytes = s.sigBytes = i, this.reset() }, reset: function () { var t = this._hasher; t.reset(), t.update(this._iKey) }, update: function (t) { return this._hasher.update(t), this }, finalize: function (t) { var r = this._hasher, e = r.finalize(t); r.reset(); var i = r.finalize(this._oKey.clone().concat(e)); return i } }) }(), function () { var r = t, e = r.lib, i = e.Base, n = e.WordArray, o = r.algo, s = o.SHA1, a = o.HMAC, c = o.PBKDF2 = i.extend({ cfg: i.extend({ keySize: 4, hasher: s, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, r) { for (var e = this.cfg, i = a.create(e.hasher, t), o = n.create(), s = n.create([1]), c = o.words, h = s.words, l = e.keySize, f = e.iterations; c.length < l;) { var u = i.update(r).finalize(s); i.reset(); for (var d = u.words, v = d.length, p = u, _ = 1; _ < f; _++) { p = i.finalize(p), i.reset(); for (var y = p.words, g = 0; g < v; g++)d[g] ^= y[g] } o.concat(u), h[0]++ } return o.sigBytes = 4 * l, o } }); r.PBKDF2 = function (t, r, e) { return c.create(e).compute(t, r) } }(), function () { var r = t, e = r.lib, i = e.Base, n = e.WordArray, o = r.algo, s = o.MD5, a = o.EvpKDF = i.extend({ cfg: i.extend({ keySize: 4, hasher: s, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, r) { for (var e = this.cfg, i = e.hasher.create(), o = n.create(), s = o.words, a = e.keySize, c = e.iterations; s.length < a;) { h && i.update(h); var h = i.update(t).finalize(r); i.reset(); for (var l = 1; l < c; l++)h = i.finalize(h), i.reset(); o.concat(h) } return o.sigBytes = 4 * a, o } }); r.EvpKDF = function (t, r, e) { return a.create(e).compute(t, r) } }(), function () { var r = t, e = r.lib, i = e.WordArray, n = r.algo, o = n.SHA256, s = n.SHA224 = o.extend({ _doReset: function () { this._hash = new i.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]) }, _doFinalize: function () { var t = o._doFinalize.call(this); return t.sigBytes -= 4, t } }); r.SHA224 = o._createHelper(s), r.HmacSHA224 = o._createHmacHelper(s) }(), function (r) { var e = t, i = e.lib, n = i.Base, o = i.WordArray, s = e.x64 = {}; s.Word = n.extend({ init: function (t, r) { this.high = t, this.low = r } }), s.WordArray = n.extend({ init: function (t, e) { t = this.words = t || [], e != r ? this.sigBytes = e : this.sigBytes = 8 * t.length }, toX32: function () { for (var t = this.words, r = t.length, e = [], i = 0; i < r; i++) { var n = t[i]; e.push(n.high), e.push(n.low) } return o.create(e, this.sigBytes) }, clone: function () { for (var t = n.clone.call(this), r = t.words = this.words.slice(0), e = r.length, i = 0; i < e; i++)r[i] = r[i].clone(); return t } }) }(), function (r) { var e = t, i = e.lib, n = i.WordArray, o = i.Hasher, s = e.x64, a = s.Word, c = e.algo, h = [], l = [], f = []; !function () { for (var t = 1, r = 0, e = 0; e < 24; e++) { h[t + 5 * r] = (e + 1) * (e + 2) / 2 % 64; var i = r % 5, n = (2 * t + 3 * r) % 5; t = i, r = n } for (var t = 0; t < 5; t++)for (var r = 0; r < 5; r++)l[t + 5 * r] = r + (2 * t + 3 * r) % 5 * 5; for (var o = 1, s = 0; s < 24; s++) { for (var c = 0, u = 0, d = 0; d < 7; d++) { if (1 & o) { var v = (1 << d) - 1; v < 32 ? u ^= 1 << v : c ^= 1 << v - 32 } 128 & o ? o = o << 1 ^ 113 : o <<= 1 } f[s] = a.create(c, u) } }(); var u = []; !function () { for (var t = 0; t < 25; t++)u[t] = a.create() }(); var d = c.SHA3 = o.extend({ cfg: o.cfg.extend({ outputLength: 512 }), _doReset: function () { for (var t = this._state = [], r = 0; r < 25; r++)t[r] = new a.init; this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32 }, _doProcessBlock: function (t, r) { for (var e = this._state, i = this.blockSize / 2, n = 0; n < i; n++) { var o = t[r + 2 * n], s = t[r + 2 * n + 1]; o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8); var a = e[n]; a.high ^= s, a.low ^= o } for (var c = 0; c < 24; c++) { for (var d = 0; d < 5; d++) { for (var v = 0, p = 0, _ = 0; _ < 5; _++) { var a = e[d + 5 * _]; v ^= a.high, p ^= a.low } var y = u[d]; y.high = v, y.low = p } for (var d = 0; d < 5; d++)for (var g = u[(d + 4) % 5], B = u[(d + 1) % 5], w = B.high, k = B.low, v = g.high ^ (w << 1 | k >>> 31), p = g.low ^ (k << 1 | w >>> 31), _ = 0; _ < 5; _++) { var a = e[d + 5 * _]; a.high ^= v, a.low ^= p } for (var S = 1; S < 25; S++) { var a = e[S], m = a.high, x = a.low, b = h[S]; if (b < 32) var v = m << b | x >>> 32 - b, p = x << b | m >>> 32 - b; else var v = x << b - 32 | m >>> 64 - b, p = m << b - 32 | x >>> 64 - b; var H = u[l[S]]; H.high = v, H.low = p } var z = u[0], A = e[0]; z.high = A.high, z.low = A.low; for (var d = 0; d < 5; d++)for (var _ = 0; _ < 5; _++) { var S = d + 5 * _, a = e[S], C = u[S], D = u[(d + 1) % 5 + 5 * _], R = u[(d + 2) % 5 + 5 * _]; a.high = C.high ^ ~D.high & R.high, a.low = C.low ^ ~D.low & R.low } var a = e[0], E = f[c]; a.high ^= E.high, a.low ^= E.low } }, _doFinalize: function () { var t = this._data, e = t.words, i = (8 * this._nDataBytes, 8 * t.sigBytes), o = 32 * this.blockSize; e[i >>> 5] |= 1 << 24 - i % 32, e[(r.ceil((i + 1) / o) * o >>> 5) - 1] |= 128, t.sigBytes = 4 * e.length, this._process(); for (var s = this._state, a = this.cfg.outputLength / 8, c = a / 8, h = [], l = 0; l < c; l++) { var f = s[l], u = f.high, d = f.low; u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), h.push(d), h.push(u) } return new n.init(h, a) }, clone: function () { for (var t = o.clone.call(this), r = t._state = this._state.slice(0), e = 0; e < 25; e++)r[e] = r[e].clone(); return t } }); e.SHA3 = o._createHelper(d), e.HmacSHA3 = o._createHmacHelper(d) }(Math), function () { function r() { return s.create.apply(s, arguments) } var e = t, i = e.lib, n = i.Hasher, o = e.x64, s = o.Word, a = o.WordArray, c = e.algo, h = [r(1116352408, 3609767458), r(1899447441, 602891725), r(3049323471, 3964484399), r(3921009573, 2173295548), r(961987163, 4081628472), r(1508970993, 3053834265), r(2453635748, 2937671579), r(2870763221, 3664609560), r(3624381080, 2734883394), r(310598401, 1164996542), r(607225278, 1323610764), r(1426881987, 3590304994), r(1925078388, 4068182383), r(2162078206, 991336113), r(2614888103, 633803317), r(3248222580, 3479774868), r(3835390401, 2666613458), r(4022224774, 944711139), r(264347078, 2341262773), r(604807628, 2007800933), r(770255983, 1495990901), r(1249150122, 1856431235), r(1555081692, 3175218132), r(1996064986, 2198950837), r(2554220882, 3999719339), r(2821834349, 766784016), r(2952996808, 2566594879), r(3210313671, 3203337956), r(3336571891, 1034457026), r(3584528711, 2466948901), r(113926993, 3758326383), r(338241895, 168717936), r(666307205, 1188179964), r(773529912, 1546045734), r(1294757372, 1522805485), r(1396182291, 2643833823), r(1695183700, 2343527390), r(1986661051, 1014477480), r(2177026350, 1206759142), r(2456956037, 344077627), r(2730485921, 1290863460), r(2820302411, 3158454273), r(3259730800, 3505952657), r(3345764771, 106217008), r(3516065817, 3606008344), r(3600352804, 1432725776), r(4094571909, 1467031594), r(275423344, 851169720), r(430227734, 3100823752), r(506948616, 1363258195), r(659060556, 3750685593), r(883997877, 3785050280), r(958139571, 3318307427), r(1322822218, 3812723403), r(1537002063, 2003034995), r(1747873779, 3602036899), r(1955562222, 1575990012), r(2024104815, 1125592928), r(2227730452, 2716904306), r(2361852424, 442776044), r(2428436474, 593698344), r(2756734187, 3733110249), r(3204031479, 2999351573), r(3329325298, 3815920427), r(3391569614, 3928383900), r(3515267271, 566280711), r(3940187606, 3454069534), r(4118630271, 4000239992), r(116418474, 1914138554), r(174292421, 2731055270), r(289380356, 3203993006), r(460393269, 320620315), r(685471733, 587496836), r(852142971, 1086792851), r(1017036298, 365543100), r(1126000580, 2618297676), r(1288033470, 3409855158), r(1501505948, 4234509866), r(1607167915, 987167468), r(1816402316, 1246189591)], l = []; !function () { for (var t = 0; t < 80; t++)l[t] = r() }(); var f = c.SHA512 = n.extend({ _doReset: function () { this._hash = new a.init([new s.init(1779033703, 4089235720), new s.init(3144134277, 2227873595), new s.init(1013904242, 4271175723), new s.init(2773480762, 1595750129), new s.init(1359893119, 2917565137), new s.init(2600822924, 725511199), new s.init(528734635, 4215389547), new s.init(1541459225, 327033209)]) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], c = e[5], f = e[6], u = e[7], d = i.high, v = i.low, p = n.high, _ = n.low, y = o.high, g = o.low, B = s.high, w = s.low, k = a.high, S = a.low, m = c.high, x = c.low, b = f.high, H = f.low, z = u.high, A = u.low, C = d, D = v, R = p, E = _, M = y, F = g, P = B, W = w, O = k, U = S, I = m, K = x, X = b, L = H, j = z, N = A, T = 0; T < 80; T++) { var Z = l[T]; if (T < 16) var q = Z.high = 0 | t[r + 2 * T], G = Z.low = 0 | t[r + 2 * T + 1]; else { var J = l[T - 15], $ = J.high, Q = J.low, V = ($ >>> 1 | Q << 31) ^ ($ >>> 8 | Q << 24) ^ $ >>> 7, Y = (Q >>> 1 | $ << 31) ^ (Q >>> 8 | $ << 24) ^ (Q >>> 7 | $ << 25), tt = l[T - 2], rt = tt.high, et = tt.low, it = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ rt >>> 6, nt = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ (et >>> 6 | rt << 26), ot = l[T - 7], st = ot.high, at = ot.low, ct = l[T - 16], ht = ct.high, lt = ct.low, G = Y + at, q = V + st + (G >>> 0 < Y >>> 0 ? 1 : 0), G = G + nt, q = q + it + (G >>> 0 < nt >>> 0 ? 1 : 0), G = G + lt, q = q + ht + (G >>> 0 < lt >>> 0 ? 1 : 0); Z.high = q, Z.low = G } var ft = O & I ^ ~O & X, ut = U & K ^ ~U & L, dt = C & R ^ C & M ^ R & M, vt = D & E ^ D & F ^ E & F, pt = (C >>> 28 | D << 4) ^ (C << 30 | D >>> 2) ^ (C << 25 | D >>> 7), _t = (D >>> 28 | C << 4) ^ (D << 30 | C >>> 2) ^ (D << 25 | C >>> 7), yt = (O >>> 14 | U << 18) ^ (O >>> 18 | U << 14) ^ (O << 23 | U >>> 9), gt = (U >>> 14 | O << 18) ^ (U >>> 18 | O << 14) ^ (U << 23 | O >>> 9), Bt = h[T], wt = Bt.high, kt = Bt.low, St = N + gt, mt = j + yt + (St >>> 0 < N >>> 0 ? 1 : 0), St = St + ut, mt = mt + ft + (St >>> 0 < ut >>> 0 ? 1 : 0), St = St + kt, mt = mt + wt + (St >>> 0 < kt >>> 0 ? 1 : 0), St = St + G, mt = mt + q + (St >>> 0 < G >>> 0 ? 1 : 0), xt = _t + vt, bt = pt + dt + (xt >>> 0 < _t >>> 0 ? 1 : 0); j = X, N = L, X = I, L = K, I = O, K = U, U = W + St | 0, O = P + mt + (U >>> 0 < W >>> 0 ? 1 : 0) | 0, P = M, W = F, M = R, F = E, R = C, E = D, D = St + xt | 0, C = mt + bt + (D >>> 0 < St >>> 0 ? 1 : 0) | 0 } v = i.low = v + D, i.high = d + C + (v >>> 0 < D >>> 0 ? 1 : 0), _ = n.low = _ + E, n.high = p + R + (_ >>> 0 < E >>> 0 ? 1 : 0), g = o.low = g + F, o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0), w = s.low = w + W, s.high = B + P + (w >>> 0 < W >>> 0 ? 1 : 0), S = a.low = S + U, a.high = k + O + (S >>> 0 < U >>> 0 ? 1 : 0), x = c.low = x + K, c.high = m + I + (x >>> 0 < K >>> 0 ? 1 : 0), H = f.low = H + L, f.high = b + X + (H >>> 0 < L >>> 0 ? 1 : 0), A = u.low = A + N, u.high = z + j + (A >>> 0 < N >>> 0 ? 1 : 0) }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 128 >>> 10 << 5) + 30] = Math.floor(e / 4294967296), r[(i + 128 >>> 10 << 5) + 31] = e, t.sigBytes = 4 * r.length, this._process(); var n = this._hash.toX32(); return n }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t }, blockSize: 32 }); e.SHA512 = n._createHelper(f), e.HmacSHA512 = n._createHmacHelper(f) }(), function () { var r = t, e = r.x64, i = e.Word, n = e.WordArray, o = r.algo, s = o.SHA512, a = o.SHA384 = s.extend({ _doReset: function () { this._hash = new n.init([new i.init(3418070365, 3238371032), new i.init(1654270250, 914150663), new i.init(2438529370, 812702999), new i.init(355462360, 4144912697), new i.init(1731405415, 4290775857), new i.init(2394180231, 1750603025), new i.init(3675008525, 1694076839), new i.init(1203062813, 3204075428)]) }, _doFinalize: function () { var t = s._doFinalize.call(this); return t.sigBytes -= 16, t } }); r.SHA384 = s._createHelper(a), r.HmacSHA384 = s._createHmacHelper(a) }(), t.lib.Cipher || function (r) { var e = t, i = e.lib, n = i.Base, o = i.WordArray, s = i.BufferedBlockAlgorithm, a = e.enc, c = (a.Utf8, a.Base64), h = e.algo, l = h.EvpKDF, f = i.Cipher = s.extend({ cfg: n.extend(), createEncryptor: function (t, r) { return this.create(this._ENC_XFORM_MODE, t, r) }, createDecryptor: function (t, r) { return this.create(this._DEC_XFORM_MODE, t, r) }, init: function (t, r, e) { this.cfg = this.cfg.extend(e), this._xformMode = t, this._key = r, this.reset() }, reset: function () { s.reset.call(this), this._doReset() }, process: function (t) { return this._append(t), this._process() }, finalize: function (t) { t && this._append(t); var r = this._doFinalize(); return r }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function () { function t(t) { return "string" == typeof t ? m : w } return function (r) { return { encrypt: function (e, i, n) { return t(i).encrypt(r, e, i, n) }, decrypt: function (e, i, n) { return t(i).decrypt(r, e, i, n) } } } }() }), u = (i.StreamCipher = f.extend({ _doFinalize: function () { var t = this._process(!0); return t }, blockSize: 1 }), e.mode = {}), d = i.BlockCipherMode = n.extend({ createEncryptor: function (t, r) { return this.Encryptor.create(t, r) }, createDecryptor: function (t, r) { return this.Decryptor.create(t, r) }, init: function (t, r) { this._cipher = t, this._iv = r } }), v = u.CBC = function () { function t(t, e, i) { var n = this._iv; if (n) { var o = n; this._iv = r } else var o = this._prevBlock; for (var s = 0; s < i; s++)t[e + s] ^= o[s] } var e = d.extend(); return e.Encryptor = e.extend({ processBlock: function (r, e) { var i = this._cipher, n = i.blockSize; t.call(this, r, e, n), i.encryptBlock(r, e), this._prevBlock = r.slice(e, e + n) } }), e.Decryptor = e.extend({ processBlock: function (r, e) { var i = this._cipher, n = i.blockSize, o = r.slice(e, e + n); i.decryptBlock(r, e), t.call(this, r, e, n), this._prevBlock = o } }), e }(), p = e.pad = {}, _ = p.Pkcs7 = { pad: function (t, r) { for (var e = 4 * r, i = e - t.sigBytes % e, n = i << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4)s.push(n); var c = o.create(s, i); t.concat(c) }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, y = (i.BlockCipher = f.extend({ cfg: f.cfg.extend({ mode: v, padding: _ }), reset: function () { f.reset.call(this); var t = this.cfg, r = t.iv, e = t.mode; if (this._xformMode == this._ENC_XFORM_MODE) var i = e.createEncryptor; else { var i = e.createDecryptor; this._minBufferSize = 1 } this._mode && this._mode.__creator == i ? this._mode.init(this, r && r.words) : (this._mode = i.call(e, this, r && r.words), this._mode.__creator = i) }, _doProcessBlock: function (t, r) { this._mode.processBlock(t, r) }, _doFinalize: function () { var t = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { t.pad(this._data, this.blockSize); var r = this._process(!0) } else { var r = this._process(!0); t.unpad(r) } return r }, blockSize: 4 }), i.CipherParams = n.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) { return (t || this.formatter).stringify(this) } })), g = e.format = {}, B = g.OpenSSL = { stringify: function (t) { var r = t.ciphertext, e = t.salt; if (e) var i = o.create([1398893684, 1701076831]).concat(e).concat(r); else var i = r; return i.toString(c) }, parse: function (t) { var r = c.parse(t), e = r.words; if (1398893684 == e[0] && 1701076831 == e[1]) { var i = o.create(e.slice(2, 4)); e.splice(0, 4), r.sigBytes -= 16 } return y.create({ ciphertext: r, salt: i }) } }, w = i.SerializableCipher = n.extend({ cfg: n.extend({ format: B }), encrypt: function (t, r, e, i) { i = this.cfg.extend(i); var n = t.createEncryptor(e, i), o = n.finalize(r), s = n.cfg; return y.create({ ciphertext: o, key: e, iv: s.iv, algorithm: t, mode: s.mode, padding: s.padding, blockSize: t.blockSize, formatter: i.format }) }, decrypt: function (t, r, e, i) { i = this.cfg.extend(i), r = this._parse(r, i.format); var n = t.createDecryptor(e, i).finalize(r.ciphertext); return n }, _parse: function (t, r) { return "string" == typeof t ? r.parse(t, this) : t } }), k = e.kdf = {}, S = k.OpenSSL = { execute: function (t, r, e, i) { i || (i = o.random(8)); var n = l.create({ keySize: r + e }).compute(t, i), s = o.create(n.words.slice(r), 4 * e); return n.sigBytes = 4 * r, y.create({ key: n, iv: s, salt: i }) } }, m = i.PasswordBasedCipher = w.extend({ cfg: w.cfg.extend({ kdf: S }), encrypt: function (t, r, e, i) { i = this.cfg.extend(i); var n = i.kdf.execute(e, t.keySize, t.ivSize); i.iv = n.iv; var o = w.encrypt.call(this, t, r, n.key, i); return o.mixIn(n), o }, decrypt: function (t, r, e, i) { i = this.cfg.extend(i), r = this._parse(r, i.format); var n = i.kdf.execute(e, t.keySize, t.ivSize, r.salt); i.iv = n.iv; var o = w.decrypt.call(this, t, r, n.key, i); return o } }) }(), t.mode.CFB = function () { function r(t, r, e, i) { var n = this._iv; if (n) { var o = n.slice(0); this._iv = void 0 } else var o = this._prevBlock; i.encryptBlock(o, 0); for (var s = 0; s < e; s++)t[r + s] ^= o[s] } var e = t.lib.BlockCipherMode.extend(); return e.Encryptor = e.extend({ processBlock: function (t, e) { var i = this._cipher, n = i.blockSize; r.call(this, t, e, n, i), this._prevBlock = t.slice(e, e + n) } }), e.Decryptor = e.extend({ processBlock: function (t, e) { var i = this._cipher, n = i.blockSize, o = t.slice(e, e + n); r.call(this, t, e, n, i), this._prevBlock = o } }), e }(), t.mode.ECB = function () { var r = t.lib.BlockCipherMode.extend(); return r.Encryptor = r.extend({ processBlock: function (t, r) { this._cipher.encryptBlock(t, r) } }), r.Decryptor = r.extend({ processBlock: function (t, r) { this._cipher.decryptBlock(t, r) } }), r }(), t.pad.AnsiX923 = { pad: function (t, r) { var e = t.sigBytes, i = 4 * r, n = i - e % i, o = e + n - 1; t.clamp(), t.words[o >>> 2] |= n << 24 - o % 4 * 8, t.sigBytes += n }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, t.pad.Iso10126 = { pad: function (r, e) { var i = 4 * e, n = i - r.sigBytes % i; r.concat(t.lib.WordArray.random(n - 1)).concat(t.lib.WordArray.create([n << 24], 1)) }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, t.pad.Iso97971 = { pad: function (r, e) { r.concat(t.lib.WordArray.create([2147483648], 1)), t.pad.ZeroPadding.pad(r, e) }, unpad: function (r) { t.pad.ZeroPadding.unpad(r), r.sigBytes-- } }, t.mode.OFB = function () { var r = t.lib.BlockCipherMode.extend(), e = r.Encryptor = r.extend({ processBlock: function (t, r) { var e = this._cipher, i = e.blockSize, n = this._iv, o = this._keystream; n && (o = this._keystream = n.slice(0), this._iv = void 0), e.encryptBlock(o, 0); for (var s = 0; s < i; s++)t[r + s] ^= o[s] } }); return r.Decryptor = e, r }(), t.pad.NoPadding = { pad: function () { }, unpad: function () { } }, function (r) { var e = t, i = e.lib, n = i.CipherParams, o = e.enc, s = o.Hex, a = e.format; a.Hex = { stringify: function (t) { return t.ciphertext.toString(s) }, parse: function (t) { var r = s.parse(t); return n.create({ ciphertext: r }) } } }(), function () { var r = t, e = r.lib, i = e.BlockCipher, n = r.algo, o = [], s = [], a = [], c = [], h = [], l = [], f = [], u = [], d = [], v = []; !function () { for (var t = [], r = 0; r < 256; r++)r < 128 ? t[r] = r << 1 : t[r] = r << 1 ^ 283; for (var e = 0, i = 0, r = 0; r < 256; r++) { var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4; n = n >>> 8 ^ 255 & n ^ 99, o[e] = n, s[n] = e; var p = t[e], _ = t[p], y = t[_], g = 257 * t[n] ^ 16843008 * n; a[e] = g << 24 | g >>> 8, c[e] = g << 16 | g >>> 16, h[e] = g << 8 | g >>> 24, l[e] = g; var g = 16843009 * y ^ 65537 * _ ^ 257 * p ^ 16843008 * e; f[n] = g << 24 | g >>> 8, u[n] = g << 16 | g >>> 16, d[n] = g << 8 | g >>> 24, v[n] = g, e ? (e = p ^ t[t[t[y ^ p]]], i ^= t[t[i]]) : e = i = 1 } }(); var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], _ = n.AES = i.extend({ _doReset: function () { if (!this._nRounds || this._keyPriorReset !== this._key) { for (var t = this._keyPriorReset = this._key, r = t.words, e = t.sigBytes / 4, i = this._nRounds = e + 6, n = 4 * (i + 1), s = this._keySchedule = [], a = 0; a < n; a++)if (a < e) s[a] = r[a]; else { var c = s[a - 1]; a % e ? e > 6 && a % e == 4 && (c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c]) : (c = c << 8 | c >>> 24, c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c], c ^= p[a / e | 0] << 24), s[a] = s[a - e] ^ c } for (var h = this._invKeySchedule = [], l = 0; l < n; l++) { var a = n - l; if (l % 4) var c = s[a]; else var c = s[a - 4]; l < 4 || a <= 4 ? h[l] = c : h[l] = f[o[c >>> 24]] ^ u[o[c >>> 16 & 255]] ^ d[o[c >>> 8 & 255]] ^ v[o[255 & c]] } } }, encryptBlock: function (t, r) { this._doCryptBlock(t, r, this._keySchedule, a, c, h, l, o) }, decryptBlock: function (t, r) { var e = t[r + 1]; t[r + 1] = t[r + 3], t[r + 3] = e, this._doCryptBlock(t, r, this._invKeySchedule, f, u, d, v, s); var e = t[r + 1]; t[r + 1] = t[r + 3], t[r + 3] = e }, _doCryptBlock: function (t, r, e, i, n, o, s, a) { for (var c = this._nRounds, h = t[r] ^ e[0], l = t[r + 1] ^ e[1], f = t[r + 2] ^ e[2], u = t[r + 3] ^ e[3], d = 4, v = 1; v < c; v++) { var p = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ e[d++], _ = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ e[d++], y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ e[d++], g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ e[d++]; h = p, l = _, f = y, u = g } var p = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ e[d++], _ = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ e[d++], y = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ e[d++], g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ e[d++]; t[r] = p, t[r + 1] = _, t[r + 2] = y, t[r + 3] = g }, keySize: 8 }); r.AES = i._createHelper(_) }(), function () {
    function r(t, r) { var e = (this._lBlock >>> t ^ this._rBlock) & r; this._rBlock ^= e, this._lBlock ^= e << t } function e(t, r) {
      var e = (this._rBlock >>> t ^ this._lBlock) & r; this._lBlock ^= e, this._rBlock ^= e << t;
    } var i = t, n = i.lib, o = n.WordArray, s = n.BlockCipher, a = i.algo, c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], f = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }], u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], d = a.DES = s.extend({ _doReset: function () { for (var t = this._key, r = t.words, e = [], i = 0; i < 56; i++) { var n = c[i] - 1; e[i] = r[n >>> 5] >>> 31 - n % 32 & 1 } for (var o = this._subKeys = [], s = 0; s < 16; s++) { for (var a = o[s] = [], f = l[s], i = 0; i < 24; i++)a[i / 6 | 0] |= e[(h[i] - 1 + f) % 28] << 31 - i % 6, a[4 + (i / 6 | 0)] |= e[28 + (h[i + 24] - 1 + f) % 28] << 31 - i % 6; a[0] = a[0] << 1 | a[0] >>> 31; for (var i = 1; i < 7; i++)a[i] = a[i] >>> 4 * (i - 1) + 3; a[7] = a[7] << 5 | a[7] >>> 27 } for (var u = this._invSubKeys = [], i = 0; i < 16; i++)u[i] = o[15 - i] }, encryptBlock: function (t, r) { this._doCryptBlock(t, r, this._subKeys) }, decryptBlock: function (t, r) { this._doCryptBlock(t, r, this._invSubKeys) }, _doCryptBlock: function (t, i, n) { this._lBlock = t[i], this._rBlock = t[i + 1], r.call(this, 4, 252645135), r.call(this, 16, 65535), e.call(this, 2, 858993459), e.call(this, 8, 16711935), r.call(this, 1, 1431655765); for (var o = 0; o < 16; o++) { for (var s = n[o], a = this._lBlock, c = this._rBlock, h = 0, l = 0; l < 8; l++)h |= f[l][((c ^ s[l]) & u[l]) >>> 0]; this._lBlock = c, this._rBlock = a ^ h } var d = this._lBlock; this._lBlock = this._rBlock, this._rBlock = d, r.call(this, 1, 1431655765), e.call(this, 8, 16711935), e.call(this, 2, 858993459), r.call(this, 16, 65535), r.call(this, 4, 252645135), t[i] = this._lBlock, t[i + 1] = this._rBlock }, keySize: 2, ivSize: 2, blockSize: 2 }); i.DES = s._createHelper(d); var v = a.TripleDES = s.extend({ _doReset: function () { var t = this._key, r = t.words; this._des1 = d.createEncryptor(o.create(r.slice(0, 2))), this._des2 = d.createEncryptor(o.create(r.slice(2, 4))), this._des3 = d.createEncryptor(o.create(r.slice(4, 6))) }, encryptBlock: function (t, r) { this._des1.encryptBlock(t, r), this._des2.decryptBlock(t, r), this._des3.encryptBlock(t, r) }, decryptBlock: function (t, r) { this._des3.decryptBlock(t, r), this._des2.encryptBlock(t, r), this._des1.decryptBlock(t, r) }, keySize: 6, ivSize: 2, blockSize: 2 }); i.TripleDES = s._createHelper(v)
  }(), function () { function r() { for (var t = this._S, r = this._i, e = this._j, i = 0, n = 0; n < 4; n++) { r = (r + 1) % 256, e = (e + t[r]) % 256; var o = t[r]; t[r] = t[e], t[e] = o, i |= t[(t[r] + t[e]) % 256] << 24 - 8 * n } return this._i = r, this._j = e, i } var e = t, i = e.lib, n = i.StreamCipher, o = e.algo, s = o.RC4 = n.extend({ _doReset: function () { for (var t = this._key, r = t.words, e = t.sigBytes, i = this._S = [], n = 0; n < 256; n++)i[n] = n; for (var n = 0, o = 0; n < 256; n++) { var s = n % e, a = r[s >>> 2] >>> 24 - s % 4 * 8 & 255; o = (o + i[n] + a) % 256; var c = i[n]; i[n] = i[o], i[o] = c } this._i = this._j = 0 }, _doProcessBlock: function (t, e) { t[e] ^= r.call(this) }, keySize: 8, ivSize: 0 }); e.RC4 = n._createHelper(s); var a = o.RC4Drop = s.extend({ cfg: s.cfg.extend({ drop: 192 }), _doReset: function () { s._doReset.call(this); for (var t = this.cfg.drop; t > 0; t--)r.call(this) } }); e.RC4Drop = n._createHelper(a) }(), t.mode.CTRGladman = function () { function r(t) { if (255 === (t >> 24 & 255)) { var r = t >> 16 & 255, e = t >> 8 & 255, i = 255 & t; 255 === r ? (r = 0, 255 === e ? (e = 0, 255 === i ? i = 0 : ++i) : ++e) : ++r, t = 0, t += r << 16, t += e << 8, t += i } else t += 1 << 24; return t } function e(t) { return 0 === (t[0] = r(t[0])) && (t[1] = r(t[1])), t } var i = t.lib.BlockCipherMode.extend(), n = i.Encryptor = i.extend({ processBlock: function (t, r) { var i = this._cipher, n = i.blockSize, o = this._iv, s = this._counter; o && (s = this._counter = o.slice(0), this._iv = void 0), e(s); var a = s.slice(0); i.encryptBlock(a, 0); for (var c = 0; c < n; c++)t[r + c] ^= a[c] } }); return i.Decryptor = n, i }(), function () { function r() { for (var t = this._X, r = this._C, e = 0; e < 8; e++)a[e] = r[e]; r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0; for (var e = 0; e < 8; e++) { var i = t[e] + r[e], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o, h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); c[e] = s ^ h } t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0 } var e = t, i = e.lib, n = i.StreamCipher, o = e.algo, s = [], a = [], c = [], h = o.Rabbit = n.extend({ _doReset: function () { for (var t = this._key.words, e = this.cfg.iv, i = 0; i < 4; i++)t[i] = 16711935 & (t[i] << 8 | t[i] >>> 24) | 4278255360 & (t[i] << 24 | t[i] >>> 8); var n = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], o = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; this._b = 0; for (var i = 0; i < 4; i++)r.call(this); for (var i = 0; i < 8; i++)o[i] ^= n[i + 4 & 7]; if (e) { var s = e.words, a = s[0], c = s[1], h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), f = h >>> 16 | 4294901760 & l, u = l << 16 | 65535 & h; o[0] ^= h, o[1] ^= f, o[2] ^= l, o[3] ^= u, o[4] ^= h, o[5] ^= f, o[6] ^= l, o[7] ^= u; for (var i = 0; i < 4; i++)r.call(this) } }, _doProcessBlock: function (t, e) { var i = this._X; r.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16; for (var n = 0; n < 4; n++)s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), t[e + n] ^= s[n] }, blockSize: 4, ivSize: 2 }); e.Rabbit = n._createHelper(h) }(), t.mode.CTR = function () { var r = t.lib.BlockCipherMode.extend(), e = r.Encryptor = r.extend({ processBlock: function (t, r) { var e = this._cipher, i = e.blockSize, n = this._iv, o = this._counter; n && (o = this._counter = n.slice(0), this._iv = void 0); var s = o.slice(0); e.encryptBlock(s, 0), o[i - 1] = o[i - 1] + 1 | 0; for (var a = 0; a < i; a++)t[r + a] ^= s[a] } }); return r.Decryptor = e, r }(), function () { function r() { for (var t = this._X, r = this._C, e = 0; e < 8; e++)a[e] = r[e]; r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0; for (var e = 0; e < 8; e++) { var i = t[e] + r[e], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o, h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); c[e] = s ^ h } t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0 } var e = t, i = e.lib, n = i.StreamCipher, o = e.algo, s = [], a = [], c = [], h = o.RabbitLegacy = n.extend({ _doReset: function () { var t = this._key.words, e = this.cfg.iv, i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; this._b = 0; for (var o = 0; o < 4; o++)r.call(this); for (var o = 0; o < 8; o++)n[o] ^= i[o + 4 & 7]; if (e) { var s = e.words, a = s[0], c = s[1], h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), f = h >>> 16 | 4294901760 & l, u = l << 16 | 65535 & h; n[0] ^= h, n[1] ^= f, n[2] ^= l, n[3] ^= u, n[4] ^= h, n[5] ^= f, n[6] ^= l, n[7] ^= u; for (var o = 0; o < 4; o++)r.call(this) } }, _doProcessBlock: function (t, e) { var i = this._X; r.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16; for (var n = 0; n < 4; n++)s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), t[e + n] ^= s[n] }, blockSize: 4, ivSize: 2 }); e.RabbitLegacy = n._createHelper(h) }(), t.pad.ZeroPadding = { pad: function (t, r) { var e = 4 * r; t.clamp(), t.sigBytes += e - (t.sigBytes % e || e) }, unpad: function (t) { for (var r = t.words, e = t.sigBytes - 1; !(r[e >>> 2] >>> 24 - e % 4 * 8 & 255);)e--; t.sigBytes = e + 1 } }, t
});
const $ = new Env('618动物联萌');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const pKHelpFlag = true;//是否PK助力  true 助力，false 不助力
const pKHelpAuthorFlag = true;//是否助力作者PK  true 助力，false 不助力
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [];
$.cookie = '';
$.inviteList = [];
$.pkInviteList = [];
$.secretpInfo = {};
$.innerPkInviteList = [];
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [
    $.getdata("CookieJD"),
    $.getdata("CookieJD2"),
    ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  console.log('活动入口：京东APP-》搜索 玩一玩-》瓜分20亿\n' +
    '邀请好友助力：内部账号自行互助(排名靠前账号得到的机会多)\n' +
    'PK互助：内部账号自行互助(排名靠前账号得到的机会多),多余的助力次数会默认助力作者内置助力码\n' +
    '活动时间：2021-05-24至2021-06-20\n'+
    '更新时间：6.16 7:00\n'
  );
  $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      $.cookie = cookiesArr[i];
      initial();
      $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = $.UserName;
      $.hotFlag = false; //是否火爆
      await TotalBean();
      console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
      console.log(`\n如有未完成的任务，请多执行几次\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await zoo();
      if($.hotFlag)$.secretpInfo[$.UserName] = false;//火爆账号不执行助力
    }
  }
  if (pKHelpAuthorFlag && new Date().getHours() >= 9) {
    let res = [], res2 = [], res3 = [];
    try {
      res = await getAuthorShareCode('https://raw.githubusercontent.com/star261/jd/main/code/zoo.json');
    }catch (e) {
      res = []
    }
    res2 = await getAuthorShareCode('https://cdn.jsdelivr.net/gh/gitupdate/updateTeam@master/shareCodes/jd_zoo.json');
    res3 = await getAuthorShareCode('http://cdn.trueorfalse.top/e528ffae31d5407aac83b8c37a4c86bc/');
    if(res2.length > 3){
      res2 = getRandomArrayElements(res2,3);
    }
    if([...$.innerPkInviteList, ...res, ...res2, ...res3].length > 6){
      $.innerPkInviteList = getRandomArrayElements([...$.innerPkInviteList, ...res, ...res2, ...res3],6);
    }else{
      $.innerPkInviteList = getRandomArrayElements([...$.innerPkInviteList, ...res, ...res2, ...res3], [...$.innerPkInviteList, ...res, ...res2, ...res3].length);
    }
    $.pkInviteList.push(...$.innerPkInviteList);
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    $.cookie = cookiesArr[i];
    $.canHelp = true;
    $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    if (!$.secretpInfo[$.UserName]) {
      continue;
    }
    $.secretp = $.secretpInfo[$.UserName];
    $.index = i + 1;
    //console.log($.inviteList);
    //pk助力
    if (new Date().getHours() >= 9) {
      console.log(`\n******开始内部京东账号【怪兽大作战pk】助力*********\n`);
      for (let i = 0; i < $.pkInviteList.length && pKHelpFlag && $.canHelp; i++) {
        console.log(`${$.UserName} 去助力PK码 ${$.pkInviteList[i]}`);
        $.pkInviteId = $.pkInviteList[i];
        await takePostRequest('pkHelp');
        await $.wait(2000);
      }
      $.canHelp = true;
    }
    if ($.inviteList && $.inviteList.length) console.log(`\n******开始内部京东账号【邀请好友助力】*********\n`);
    for (let j = 0; j < $.inviteList.length && $.canHelp; j++) {
      $.oneInviteInfo = $.inviteList[j];
      if ($.oneInviteInfo.ues === $.UserName || $.oneInviteInfo.max) {
        continue;
      }
      //console.log($.oneInviteInfo);
      $.inviteId = $.oneInviteInfo.inviteId;
      console.log(`${$.UserName}去助力${$.oneInviteInfo.ues},助力码${$.inviteId}`);
      //await takePostRequest('helpHomeData');
      await takePostRequest('help');
      await $.wait(2000);
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function zoo() {
  try {
    $.signSingle = {};
    $.homeData = {};
    $.secretp = ``;
    $.taskList = [];
    $.shopSign = ``;
    await takePostRequest('zoo_signSingle');
    if (JSON.stringify($.signSingle) === `{}` || $.signSingle.bizCode !== 0) {
      console.log($.signSingle.bizMsg);
      return;
    } else {
      console.log(`\n获取活动信息`);
    }
    await $.wait(1000);
    await takePostRequest('zoo_getHomeData');
    $.userInfo =$.homeData.result.homeMainInfo
    console.log(`\n\n当前分红：${$.userInfo.raiseInfo.redNum}份，当前等级:${$.userInfo.raiseInfo.scoreLevel}\n当前金币${$.userInfo.raiseInfo.remainScore}，下一关需要${$.userInfo.raiseInfo.nextLevelScore - $.userInfo.raiseInfo.curLevelStartScore}\n\n`);
    await $.wait(1000);
    await takePostRequest('zoo_getSignHomeData');
    await $.wait(1000);
    if($.signHomeData.todayStatus === 0){
      console.log(`去签到`);
      await takePostRequest('zoo_sign');
      await $.wait(1000);
    }else{
      console.log(`已签到`);
    }
    let raiseInfo = $.homeData.result.homeMainInfo.raiseInfo;
    if (Number(raiseInfo.totalScore) > Number(raiseInfo.nextLevelScore) && raiseInfo.buttonStatus === 1) {
      console.log(`满足升级条件，去升级`);
      await $.wait(3000);
      await takePostRequest('zoo_raise');
    }
    //收金币
    await $.wait(1000);
    await takePostRequest('zoo_collectProduceScore');
    await $.wait(1000);
    await takePostRequest('zoo_getTaskDetail');
    await $.wait(1000);
    //做任务
    for (let i = 0; i < $.taskList.length && $.secretp && !$.hotFlag; i++) {
      $.oneTask = $.taskList[i];
      if ([1, 3, 5, 7, 9, 26].includes($.oneTask.taskType) && $.oneTask.status === 1) {
        $.activityInfoList = $.oneTask.shoppingActivityVos || $.oneTask.brandMemberVos || $.oneTask.followShopVo || $.oneTask.browseShopVo;
        for (let j = 0; j < $.activityInfoList.length; j++) {
          $.oneActivityInfo = $.activityInfoList[j];
          if ($.oneActivityInfo.status !== 1 || !$.oneActivityInfo.taskToken) {
            continue;
          }
          $.callbackInfo = {};
          console.log(`做任务：${$.oneActivityInfo.title || $.oneActivityInfo.taskName || $.oneActivityInfo.shopName};等待完成`);
          await takePostRequest('zoo_collectScore');
          if ($.callbackInfo.code === 0 && $.callbackInfo.data && $.callbackInfo.data.result && $.callbackInfo.data.result.taskToken) {
            await $.wait(8000);
            let sendInfo = encodeURIComponent(`{"dataSource":"newshortAward","method":"getTaskAward","reqParams":"{\\"taskToken\\":\\"${$.callbackInfo.data.result.taskToken}\\"}","sdkVersion":"1.0.0","clientLanguage":"zh"}`)
            await callbackResult(sendInfo)
          } else if ($.oneTask.taskType === 5 || $.oneTask.taskType === 3 || $.oneTask.taskType === 26) {
            await $.wait(2000);
            console.log(`任务完成`);
          } else {
            console.log($.callbackInfo);
            console.log(`任务失败`);
            await $.wait(3000);
          }
        }
      } else if ($.oneTask.taskType === 2 && $.oneTask.status === 1 && $.oneTask.scoreRuleVos[0].scoreRuleType === 2){
        console.log(`做任务：${$.oneTask.taskName};等待完成 (实际不会添加到购物车)`);
        $.taskId = $.oneTask.taskId;
        $.feedDetailInfo = {};
        await takePostRequest('zoo_getFeedDetail');
        let productList = $.feedDetailInfo.productInfoVos;
        let needTime = Number($.feedDetailInfo.maxTimes) - Number($.feedDetailInfo.times);
        for (let j = 0; j < productList.length && needTime > 0; j++) {
          if(productList[j].status !== 1){
            continue;
          }
          $.taskToken = productList[j].taskToken;
          console.log(`加购：${productList[j].skuName}`);
          await takePostRequest('add_car');
          await $.wait(1500);
          needTime --;
        }
      }else if ($.oneTask.taskType === 2 && $.oneTask.status === 1 && $.oneTask.scoreRuleVos[0].scoreRuleType === 0){
        $.activityInfoList = $.oneTask.productInfoVos ;
        for (let j = 0; j < $.activityInfoList.length; j++) {
          $.oneActivityInfo = $.activityInfoList[j];
          if ($.oneActivityInfo.status !== 1 || !$.oneActivityInfo.taskToken) {
            continue;
          }
          $.callbackInfo = {};
          console.log(`做任务：浏览${$.oneActivityInfo.skuName};等待完成`);
          await takePostRequest('zoo_collectScore');
          if ($.oneTask.taskType === 2) {
            await $.wait(2000);
            console.log(`任务完成`);
          } else {
            console.log($.callbackInfo);
            console.log(`任务失败`);
            await $.wait(3000);
          }
        }
      }
    }
    await $.wait(1000);
    await takePostRequest('zoo_getHomeData');
    raiseInfo = $.homeData.result.homeMainInfo.raiseInfo;
    if (Number(raiseInfo.totalScore) > Number(raiseInfo.nextLevelScore) && raiseInfo.buttonStatus === 1) {
      console.log(`满足升级条件，去升级`);
      await $.wait(1000);
      await takePostRequest('zoo_raise');
    }
    //===================================图鉴里的店铺====================================================================
    if (new Date().getHours()>= 17 && new Date().getHours()<= 18 && !$.hotFlag) {//分享
      $.myMapList = [];
      await takePostRequest('zoo_myMap');
      for (let i = 0; i < $.myMapList.length; i++) {
        await $.wait(3000);
        $.currentScence = i + 1;
        if ($.myMapList[i].isFirstShare === 1) {
          console.log(`去分享${$.myMapList[i].partyName}`);
          await takePostRequest('zoo_getWelfareScore');
        }
      }
    }
    if (new Date().getHours() >= 14 && new Date().getHours() <= 17 && !$.hotFlag){//30个店铺，为了避免代码执行太久，下午2点到5点才做店铺任务
      console.log(`去做店铺任务`);
      $.shopInfoList = [];
      await takePostRequest('qryCompositeMaterials');
      for (let i = 0; i < $.shopInfoList.length; i++) {
        $.shopSign = $.shopInfoList[i].extension.shopId;
        console.log(`执行第${i+1}个店铺任务：${$.shopInfoList[i].name} ID:${$.shopSign}`);
        $.shopResult = {};
        await takePostRequest('zoo_shopLotteryInfo');
        await $.wait(1000);
        if(JSON.stringify($.shopResult) === `{}`) continue;
        $.shopTask = $.shopResult.taskVos;
        for (let i = 0; i < $.shopTask.length; i++) {
          $.oneTask = $.shopTask[i];
          //console.log($.oneTask);
          if($.oneTask.taskType === 21 || $.oneTask.taskType === 14 || $.oneTask.status !== 1){continue;} //不做入会//不做邀请
          $.activityInfoList = $.oneTask.shoppingActivityVos || $.oneTask.simpleRecordInfoVo;
          if($.oneTask.taskType === 12){//签到
            if($.shopResult.dayFirst === 0){
              $.oneActivityInfo =  $.activityInfoList;
              console.log(`店铺签到`);
              await takePostRequest('zoo_bdCollectScore');
            }
            continue;
          }
          for (let j = 0; j < $.activityInfoList.length; j++) {
            $.oneActivityInfo = $.activityInfoList[j];
            if ($.oneActivityInfo.status !== 1 || !$.oneActivityInfo.taskToken) {
              continue;
            }
            $.callbackInfo = {};
            console.log(`做任务：${$.oneActivityInfo.subtitle || $.oneActivityInfo.title || $.oneActivityInfo.taskName || $.oneActivityInfo.shopName};等待完成`);
            await takePostRequest('zoo_collectScore');
            if ($.callbackInfo.code === 0 && $.callbackInfo.data && $.callbackInfo.data.result && $.callbackInfo.data.result.taskToken) {
              await $.wait(8000);
              let sendInfo = encodeURIComponent(`{"dataSource":"newshortAward","method":"getTaskAward","reqParams":"{\\"taskToken\\":\\"${$.callbackInfo.data.result.taskToken}\\"}","sdkVersion":"1.0.0","clientLanguage":"zh"}`)
              await callbackResult(sendInfo)
            } else  {
              await $.wait(2000);
              console.log(`任务完成`);
            }
          }
        }
        await $.wait(1000);
        let boxLotteryNum = $.shopResult.boxLotteryNum;
        for (let j = 0; j < boxLotteryNum; j++) {
          console.log(`开始第${j+1}次拆盒`)
          //抽奖
          await takePostRequest('zoo_boxShopLottery');
          await $.wait(3000);
        }
        // let wishLotteryNum = $.shopResult.wishLotteryNum;
        // for (let j = 0; j < wishLotteryNum; j++) {
        //   console.log(`开始第${j+1}次能量抽奖`)
        //   //抽奖
        //   await takePostRequest('zoo_wishShopLottery');
        //   await $.wait(3000);
        // }
        await $.wait(3000);
      }
    }
    //==================================微信任务========================================================================
    $.wxTaskList = [];
    if(!$.hotFlag) await takePostRequest('wxTaskDetail');
    for (let i = 0; i < $.wxTaskList.length; i++) {
      $.oneTask = $.wxTaskList[i];
      if($.oneTask.taskType === 2 || $.oneTask.status !== 1){continue;} //不做加购
      $.activityInfoList = $.oneTask.shoppingActivityVos || $.oneTask.brandMemberVos || $.oneTask.followShopVo || $.oneTask.browseShopVo;
      for (let j = 0; j < $.activityInfoList.length; j++) {
        $.oneActivityInfo = $.activityInfoList[j];
        if ($.oneActivityInfo.status !== 1 || !$.oneActivityInfo.taskToken) {
          continue;
        }
        $.callbackInfo = {};
        console.log(`做任务：${$.oneActivityInfo.title || $.oneActivityInfo.taskName || $.oneActivityInfo.shopName};等待完成`);
        await takePostRequest('zoo_collectScore');
        if ($.callbackInfo.code === 0 && $.callbackInfo.data && $.callbackInfo.data.result && $.callbackInfo.data.result.taskToken) {
          await $.wait(8000);
          let sendInfo = encodeURIComponent(`{"dataSource":"newshortAward","method":"getTaskAward","reqParams":"{\\"taskToken\\":\\"${$.callbackInfo.data.result.taskToken}\\"}","sdkVersion":"1.0.0","clientLanguage":"zh"}`)
          await callbackResult(sendInfo)
        } else  {
          await $.wait(2000);
          console.log(`任务完成`);
        }
      }
    }
    //=======================================================京东金融=================================================================================
    $.jdjrTaskList = [];
    if(!$.hotFlag) await takePostRequest('jdjrTaskDetail');
    await $.wait(1000);
    for (let i = 0; i < $.jdjrTaskList.length; i++) {
      $.taskId = $.jdjrTaskList[i].id;
      if($.taskId === '3980' || $.taskId === '3981' || $.taskId === '3982') continue;
      if($.jdjrTaskList[i].status === '1' || $.jdjrTaskList[i].status === '3'){
        console.log(`去做任务：${$.jdjrTaskList[i].name}`);
        await takePostRequest('jdjrAcceptTask');
        await $.wait(8000);
        await takeGetRequest();
      }else if($.jdjrTaskList[i].status === '2'){
        console.log(`任务：${$.jdjrTaskList[i].name},已完成`);
      }
    }
    //======================================================怪兽大作战=================================================================================
    $.pkHomeData = {};
    await takePostRequest('zoo_pk_getHomeData');
    if (JSON.stringify($.pkHomeData) === '{}') {
      console.log(`获取PK信息异常`);
      return;
    }
    await $.wait(1000);
    $.pkTaskList = [];
    if(!$.hotFlag) await takePostRequest('zoo_pk_getTaskDetail');
    await $.wait(1000);
    for (let i = 0; i < $.pkTaskList.length; i++) {
      $.oneTask = $.pkTaskList[i];
      if ($.oneTask.status === 1) {
        $.activityInfoList = $.oneTask.shoppingActivityVos || $.oneTask.brandMemberVos || $.oneTask.followShopVo || $.oneTask.browseShopVo
        for (let j = 0; j < $.activityInfoList.length; j++) {
          $.oneActivityInfo = $.activityInfoList[j];
          if ($.oneActivityInfo.status !== 1) {
            continue;
          }
          console.log(`做任务：${$.oneActivityInfo.title || $.oneActivityInfo.taskName || $.oneActivityInfo.shopName};等待完成`);
          await takePostRequest('zoo_pk_collectScore');
          await $.wait(2000);
          console.log(`任务完成`);
        }
      }
    }
    await $.wait(1000);
    //await takePostRequest('zoo_pk_getTaskDetail');
    let skillList = $.pkHomeData.result.groupInfo.skillList || [];
    //activityStatus === 1未开始，2 已开始
    $.doSkillFlag = true;
    // for (let i = 0; i < skillList.length && $.pkHomeData.result.activityStatus === 2 && $.doSkillFlag; i++) {
    //   if (Number(skillList[i].num) > 0) {
    //     $.skillCode = skillList[i].code;
    //     for (let j = 0; j < Number(skillList[i].num) && $.doSkillFlag; j++) {
    //       console.log(`使用技能`);
    //       await takePostRequest('zoo_pk_doPkSkill');
    //       await $.wait(2000);
    //     }
    //   }
    // }
  } catch (e) {
    $.logErr(e)
  }
}

async function takePostRequest(type) {
  let body = ``;
  let myRequest = ``;
  switch (type) {
    case 'zoo_signSingle':
      body = `functionId=zoo_signSingle&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_signSingle`, body);
      break;
    case 'zoo_getHomeData':
      body = `functionId=zoo_getHomeData&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_getHomeData`, body);
      break;
    case 'helpHomeData':
      body = `functionId=zoo_getHomeData&body={"inviteId":"${$.inviteId}"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_getHomeData`, body);
      break;
    case 'zoo_collectProduceScore':
      body = getPostBody(type);
      myRequest = await getPostRequest(`zoo_collectProduceScore`, body);
      break;
    case 'zoo_getFeedDetail':
      body = `functionId=zoo_getFeedDetail&body={"taskId":"${$.taskId}"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_getFeedDetail`, body);
      break;
    case 'zoo_getTaskDetail':
      body = `functionId=zoo_getTaskDetail&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_getTaskDetail`, body);
      break;
    case 'zoo_collectScore':
      body = getPostBody(type);
      //console.log(body);
      myRequest = await getPostRequest(`zoo_collectScore`, body);
      break;
    case 'zoo_raise':
      body = `functionId=zoo_raise&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_raise`, body);
      break;
    case 'help':
      body = getPostBody(type);
      //console.log(body);
      myRequest = await getPostRequest(`zoo_collectScore`, body);
      break;
    case 'zoo_pk_getHomeData':
      body = `functionId=zoo_pk_getHomeData&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_pk_getHomeData`, body);
      break;
    case 'zoo_pk_getTaskDetail':
      body = `functionId=zoo_pk_getTaskDetail&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_pk_getTaskDetail`, body);
      break;
    case 'zoo_pk_collectScore':
      body = getPostBody(type);
      //console.log(body);
      myRequest = await getPostRequest(`zoo_pk_collectScore`, body);
      break;
    case 'zoo_pk_doPkSkill':
      body = `functionId=zoo_pk_doPkSkill&body={"skillType":"${$.skillCode}"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_pk_doPkSkill`, body);
      break;
    case 'pkHelp':
      body = getPostBody(type);
      myRequest = await getPostRequest(`zoo_pk_assistGroup`, body);
      break;
    case 'zoo_getSignHomeData':
      body = `functionId=zoo_getSignHomeData&body={"notCount":"1"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_getSignHomeData`,body);
      break;
    case 'zoo_sign':
      body = `functionId=zoo_sign&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_sign`,body);
      break;
    case 'wxTaskDetail':
      body = `functionId=zoo_getTaskDetail&body={"appSign":"2","channel":1,"shopSign":""}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_getTaskDetail`,body);
      break;
    case 'zoo_shopLotteryInfo':
      body = `functionId=zoo_shopLotteryInfo&body={"shopSign":"${$.shopSign}"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_shopLotteryInfo`,body);
      break;
    case 'zoo_bdCollectScore':
      body = getPostBody(type);
      myRequest = await getPostRequest(`zoo_bdCollectScore`,body);
      break;
    case 'qryCompositeMaterials':
      body = `functionId=qryCompositeMaterials&body={"qryParam":"[{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"resultData\\",\\"id\\":\\"05371960\\"}]","activityId":"2s7hhSTbhMgxpGoa9JDnbDzJTaBB","pageId":"","reqSrc":"","applyKey":"jd_star"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`qryCompositeMaterials`,body);
      break;
    case 'zoo_boxShopLottery':
      body = `functionId=zoo_boxShopLottery&body={"shopSign":"${$.shopSign}"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_boxShopLottery`,body);
      break;
    case `zoo_wishShopLottery`:
      body = `functionId=zoo_wishShopLottery&body={"shopSign":"${$.shopSign}"}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_boxShopLottery`,body);
      break;
    case `zoo_myMap`:
      body = `functionId=zoo_myMap&body={}&client=wh5&clientVersion=1.0.0`;
      myRequest = await getPostRequest(`zoo_myMap`,body);
      break;
    case 'zoo_getWelfareScore':
      body = getPostBody(type);
      myRequest = await getPostRequest(`zoo_getWelfareScore`,body);
      break;
    case 'jdjrTaskDetail':
      body = `reqData={"eid":"","sdkToken":"jdd014JYKVE2S6UEEIWPKA4B5ZKBS4N6Y6X5GX2NXL4IYUMHKF3EEVK52RQHBYXRZ67XWQF5N7XB6Y2YKYRTGQW4GV5OFGPDPFP3MZINWG2A01234567"}`;
      myRequest = await getPostRequest(`listTask`,body);
      break;
    case 'jdjrAcceptTask':
      body = `reqData={"eid":"","sdkToken":"jdd014JYKVE2S6UEEIWPKA4B5ZKBS4N6Y6X5GX2NXL4IYUMHKF3EEVK52RQHBYXRZ67XWQF5N7XB6Y2YKYRTGQW4GV5OFGPDPFP3MZINWG2A01234567","id":"${$.taskId}"}`;
      myRequest = await getPostRequest(`acceptTask`,body);
      break;
    case 'add_car':
      body = getPostBody(type);
      myRequest = await getPostRequest(`zoo_collectScore`,body);
      break;
    default:
      console.log(`错误${type}`);
  }
  return new Promise(async resolve => {
    $.post(myRequest, (err, resp, data) => {
      try {
        //console.log(data);
        dealReturn(type, data);
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

async function dealReturn(type, data) {
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(`返回异常：${data}`);
    return;
  }
  switch (type) {
    case 'zoo_signSingle':
      if (data.code === 0) $.signSingle = data.data
      break;
    case 'zoo_getHomeData':
      if (data.code === 0) {
        if (data.data['bizCode'] === 0) {
          $.homeData = data.data;
          $.secretp = data.data.result.homeMainInfo.secretp;
          $.secretpInfo[$.UserName] = $.secretp;
        }
      }
      break;
    case 'helpHomeData':
      console.log(data)
      if (data.code === 0) {
        $.secretp = data.data.result.homeMainInfo.secretp;
        //console.log(`$.secretp：${$.secretp}`);
      }
      break;
    case 'zoo_collectProduceScore':
      if (data.code === 0 && data.data && data.data.result) {
        console.log(`收取成功，获得：${data.data.result.produceScore}`);
      }else{
        console.log(JSON.stringify(data));
      }
      if(data.code === 0 && data.data && data.data.bizCode === -1002){
        $.hotFlag = true;
        console.log(`该账户脚本执行任务火爆，暂停执行任务，请手动做任务或者等待解决脚本火爆问题`)
      }
      break;
    case 'zoo_getTaskDetail':
      if (data.code === 0) {
        console.log(`互助码：${data.data.result.inviteId || '助力已满，获取助力码失败'}`);
        if (data.data.result.inviteId) {
          $.inviteList.push({
            'ues': $.UserName,
            'secretp': $.secretp,
            'inviteId': data.data.result.inviteId,
            'max': false
          });
        }
        $.taskList = data.data.result.taskVos;
      }
      break;
    case 'zoo_collectScore':
      $.callbackInfo = data;
      break;
    case 'zoo_raise':
      if (data.code === 0) console.log(`升级成功`);
      break;
    case 'help':
    case 'pkHelp':
      //console.log(data);
      switch (data.data.bizCode) {
        case 0:
          console.log(`助力成功`);
          break;
        case -201:
          console.log(`助力已满`);
          $.oneInviteInfo.max = true;
          break;
        case -202:
          console.log(`已助力`);
          break;
        case -8:
          console.log(`已经助力过该队伍`);
          break;
        case -6:
        case 108:
          console.log(`助力次数已用光`);
          $.canHelp = false;
          break;
        default:
          console.log(`怪兽大作战助力失败：${JSON.stringify(data)}`);
          $.canHelp = false;
      }
      break;
    case 'zoo_pk_getHomeData':
      if (data.code === 0) {
        console.log(`PK互助码：${data.data.result.groupInfo.groupAssistInviteId}`);
        if (data.data.result.groupInfo.groupAssistInviteId) $.pkInviteList.push(data.data.result.groupInfo.groupAssistInviteId);
        $.pkHomeData = data.data;
      }
      break;
    case 'zoo_pk_getTaskDetail':
      if (data.code === 0) {
        $.pkTaskList = data.data.result.taskVos;
      }
      break;
    case 'zoo_getFeedDetail':
      if (data.code === 0) {
        $.feedDetailInfo = data.data.result.addProductVos[0];
      }
      break;
    case 'zoo_pk_collectScore':
      break;
    case 'zoo_pk_doPkSkill':
      if (data.data.bizCode === 0) console.log(`使用成功`);
      if (data.data.bizCode === -2) {
        console.log(`队伍任务已经完成，无法释放技能!`);
        $.doSkillFlag = false;
      }else if(data.data.bizCode === -2003){
        console.log(`现在不能打怪兽`);
        $.doSkillFlag = false;
      }
      break;
    case 'zoo_getSignHomeData':
      if(data.code === 0) {
        $.signHomeData = data.data.result;
      }
      break;
    case 'zoo_sign':
      if(data.code === 0 && data.data.bizCode === 0) {
        console.log(`签到获得成功`);
        if (data.data.result.redPacketValue) console.log(`签到获得：${data.data.result.redPacketValue} 红包`);
      }else{
        console.log(`签到失败`);
        console.log(data);
      }
      break;
    case 'wxTaskDetail':
      if (data.code === 0) {
        $.wxTaskList = data.data.result.taskVos;
      }
      break;
    case 'zoo_shopLotteryInfo':
      if (data.code === 0) {
        $.shopResult = data.data.result;
      }
      break;
    case 'zoo_bdCollectScore':
      if (data.code === 0) {
        console.log(`签到获得：${data.data.result.score}`);
      }
      break;
    case 'qryCompositeMaterials':
      //console.log(data);
      if (data.code === '0') {
        $.shopInfoList = data.data.resultData.list;
        console.log(`获取到${$.shopInfoList.length}个店铺`);
      }
      break
    case 'zoo_boxShopLottery':
      let result = data.data.result;
      switch (result.awardType) {
        case 8:
          console.log(`获得金币：${result.rewardScore}`);
          break;
        case 5:
          console.log(`获得：adidas能量`);
          break;
        case 2:
        case 3:
          console.log(`获得优惠券：${result.couponInfo.usageThreshold} 优惠：${result.couponInfo.quota}，${result.couponInfo.useRange}`);
          break;
        default:
          console.log(`抽奖获得未知`);
          console.log(JSON.stringify(data));
      }
      break
    case 'zoo_wishShopLottery':
      console.log(JSON.stringify(data));
      break
    case `zoo_myMap`:
      if (data.code === 0) {
        $.myMapList = data.data.result.sceneMap.sceneInfo;
      }
      break;
    case 'zoo_getWelfareScore':
      if (data.code === 0) {
        console.log(`分享成功，获得：${data.data.result.score}`);
      }
      break;
    case 'jdjrTaskDetail':
      if (data.resultCode === 0) {
        $.jdjrTaskList = data.resultData.top;
      }
      break;
    case 'jdjrAcceptTask':
      if (data.resultCode === 0) {
        console.log(`领任务成功`);
      }
      break;
    case 'add_car':
      if (data.code === 0) {
        let acquiredScore = data.data.result.acquiredScore;
        if(Number(acquiredScore) > 0){
          console.log(`加购成功,获得金币:${acquiredScore}`);
        }else{
          console.log(`加购成功`);
        }
      }else{
        console.log(JSON.stringify(data));
        console.log(`加购失败`);
      }
      break
    default:
      console.log(`未判断的异常${type}`);
  }
}
function takeGetRequest(){
  return new Promise(async resolve => {
    $.get({
      url:`https://ms.jr.jd.com/gw/generic/mission/h5/m/finishReadMission?reqData={%22missionId%22:%22${$.taskId}%22,%22readTime%22:8}`,
      headers:{
        'Origin' : `https://prodev.m.jd.com`,
        'Cookie': $.cookie,
        'Connection' : `keep-alive`,
        'Accept' : `*/*`,
        'Referer' : `https://prodev.m.jd.com`,
        'Host' : `ms.jr.jd.com`,
        "User-Agent": "jdapp;iPhone;9.2.0;14.1;",
        'Accept-Encoding' : `gzip, deflate, br`,
        'Accept-Language' : `zh-cn`
      }
    }, (err, resp, data) => {
      try {
        data = JSON.parse(data);
        if (data.resultCode === 0) {
          console.log(`任务完成`);
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//领取奖励
function callbackResult(info) {
  return new Promise((resolve) => {
    let url = {
      url: `https://api.m.jd.com/?functionId=qryViewkitCallbackResult&client=wh5&clientVersion=1.0.0&body=${info}&_timestamp=` + Date.now(),
      headers: {
        'Origin': `https://bunearth.m.jd.com`,
        'Cookie': $.cookie,
        'Connection': `keep-alive`,
        'Accept': `*/*`,
        'Host': `api.m.jd.com`,
        "User-Agent": "jdapp;iPhone;9.2.0;14.1;",
        'Accept-Encoding': `gzip, deflate, br`,
        'Accept-Language': `zh-cn`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://bunearth.m.jd.com'
      }
    }

    $.get(url, async (err, resp, data) => {
      try {
        data = JSON.parse(data);
        console.log(data.toast.subTitle)
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    })
  })
}

async function getPostRequest(type, body) {
  let url = `https://api.m.jd.com/client.action?functionId=${type}`;
  if(type === 'listTask' || type === 'acceptTask' ){
    url = `https://ms.jr.jd.com/gw/generic/hy/h5/m/${type}`;
  }
  const method = `POST`;
  const headers = {
    'Accept': `application/json, text/plain, */*`,
    'Origin': `https://wbbny.m.jd.com`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Cookie': $.cookie,
    'Content-Type': `application/x-www-form-urlencoded`,
    'Host': `api.m.jd.com`,
    'Connection': `keep-alive`,
    "User-Agent": "jdapp;iPhone;9.2.0;14.1;",
    'Referer': `https://wbbny.m.jd.com/babelDiy/Zeus/2s7hhSTbhMgxpGoa9JDnbDzJTaBB/index.html`,
    'Accept-Language': `zh-cn`
  };
  return {url: url, method: method, headers: headers, body: body};
}

function getPostBody(type) {
  let uuid = getUUID();
  let taskBody = '';
  if (type === 'help') {
    taskBody = `functionId=zoo_collectScore&body=${JSON.stringify({"taskId": 2,"inviteId":$.inviteId,"actionType":1,"ss" :getBody()})}&uuid=${uuid}&client=wh5&clientVersion=1.0.0`
  } else if (type === 'pkHelp') {
    taskBody = `functionId=zoo_pk_assistGroup&body=${JSON.stringify({"confirmFlag": 1,"inviteId" : $.pkInviteId,"ss" : getBody()})}&uuid=${uuid}&client=wh5&clientVersion=1.0.0`;
  } else if (type === 'zoo_collectProduceScore') {
    taskBody = `functionId=zoo_collectProduceScore&body=${JSON.stringify({"ss" :getBody()})}&uuid=${uuid}&client=wh5&clientVersion=1.0.0`;
  } else if(type === 'zoo_getWelfareScore'){
    taskBody = `functionId=zoo_getWelfareScore&body=${JSON.stringify({"type": 2,"currentScence":$.currentScence,"ss" : getBody()})}&uuid=${uuid}&client=wh5&clientVersion=1.0.0`;
  } else if(type === 'add_car'){
    taskBody = `functionId=zoo_collectScore&body=${JSON.stringify({"taskId": $.taskId,"taskToken":$.taskToken,"actionType":1,"ss" : getBody()})}&uuid=${uuid}&client=wh5&clientVersion=1.0.0`
  }else{
    taskBody = `functionId=${type}&body=${JSON.stringify({"taskId": $.oneTask.taskId,"actionType":1,"taskToken" : $.oneActivityInfo.taskToken,"ss" : getBody()})}&uuid=${uuid}&client=wh5&clientVersion=1.0.0`
  }
  return taskBody
}


function getUUID() {
    var n = (new Date).getTime();
    let uuid="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    uuid = uuid.replace(/[xy]/g, function (e) {
        var t = (n + 16 * Math.random()) % 16 | 0;
        return n = Math.floor(n / 16),
            ("x" == e ? t : 3 & t | 8).toString(16)
    }).replace(/-/g, "")
    return uuid
}

/**
 * 随机从一数组里面取
 * @param arr
 * @param count
 * @returns {Buffer}
 */
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
function getAuthorShareCode(url = "http://cdn.annnibb.me/eb6fdc36b281b7d5eabf33396c2683a2.json") {
  return new Promise(async resolve => {
    const options = {
      "url": `${url}?${new Date()}`,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
      const tunnel = require("tunnel");
      const agent = {
        https: tunnel.httpsOverHttp({
          proxy: {
            host: process.env.TG_PROXY_HOST,
            port: process.env.TG_PROXY_PORT * 1
          }
        })
      }
      Object.assign(options, { agent })
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
        } else {
          if (data) data = JSON.parse(data)
        }
      } catch (e) {
        // $.logErr(e, resp)
      } finally {
        resolve(data || []);
      }
    })
    await $.wait(10000)
    resolve();
  })
}
//初始化
function initial() {
  merge = {
    nickname: "",
    enabled: true,
    end: false,
    black: false
  }
  for (let i in merge) {
    merge[i].success = 0;
    merge[i].fail = 0;
    merge[i].prizeCount = 0;
    merge[i].notify = "";
    merge[i].show = true;
  }
  showCode = true;
}
function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: $.cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === "1001") {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            $.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })
  })
}

var _0xodv='jsjiami.com.v6',_0x3048=[_0xodv,'PREswr7CigjDrQkKUAcl','ISjDv0rDqQ==','MlzClsKNHQ==','wrnDmMOKw4Zg','WcKlwrEPfg==','PSchw7VXIlzCnFJgw7TDpA==','GMKew7HClgE=','DMO/MnoP','wrtNAh0p','EHvCnMKfCw==','woLCu8OKwpLCoQ==','esKZA8O/JA==','wpvCg8OTw6/Dqw==','W8K5wp0Mag==','VMOFw59YG8KR','HMO6wq/Dpw==','wphvBH7CmQ==','acO9XMO0QA==','RMKSJ8OzEA==','AMODwqJRecKy','SyvDicKwwro=','w63DnEbDnsOV','JzPDt0bDjQ==','L0bCqMKzaQ==','PcKJw7LCohNdwpLCoAHCvnvDpw==','wq7DqMO9w5J8NQ==','XMO2w7l8IQ==','wrJIw4EXwpdK','wpXClcO/','wqUyasOLw58=','PwHCrMOzFA==','JFJH','wpPDisOIwpHCi8K9KCk=','SSvDqcKmw44=','KsO4woTDrWE=','KCrDhcK3cg==','wozDh8O3wpLCuw==','w6XDsmXDm8Ozw4U=','fcOUXcOzcQ==','wpLDmsOVw65F','YcK+w7bCsiky','wrlmEQ0EZxBIwrBh','D8K7w5TDqw==','GcOowpVQTw==','Ey7CnEUew7HDpXA=','JWjCv8KRD8O8w4Q=','wqtjFEzCmg==','S3bCh8KCAw==','DhHDs8KqTA==','wpQgYcO3w7nDpgnDsSPDrUDCksKTw7c=','IWddwrt7','OcK7w5Vcw7bCmA==','wrNMw5c=','YwJ+wqXCsQ==','w7sJw7LCqVU=','ZjFzw4Q=','S2fDhgfClw==','WxXDv8KOwrI=','P8Kxw5JV','BCnCrkMvw7fDr3LCisKp','C8Khw7TDt3I5w7lG','EFvCtcKcZH4=','UyLDqMOXwrg=','fsKww4DCmDA=','R0DCuMK5MQ==','Ay/DnsKDVw==','E8O0C8KU','wq7DiMOiwq3Cmw==','wpLDp8O9w4Ba','dg0Nw5F/w5M=','fgNCwrzCpQ==','w54lwrbDh8OBRcKVE8OBwrE=','e8KzGsOrAw==','S8Kjw6HCrAw=','wrXCsMOBwrbCisOWw7/Di8KJw6rDvsOmwoRywqrDvsOWehDCscKxMMOQwoLCoTZ5UmRYw5MDw4HCm2MZEl7CrMOSw4Mxw63Cr3cOw6BHE8O0PcKMQjPCkCzDncOUPsO+VcOfUMOjJMOfwrvDiMOOw5PDlMOZw7Bsw4DDtMOcUEnDjU3CsxMgwqsewrDDkkYGM8KlwpLCpyrDj0gCwqnChwzDlcKVw4DDiUpLw7bCkcK6','EgrDhQ==','wqwzZMOuw7Y=','UsKqI8OfBQ==','AjDCi8OTFw==','wpLCssOWw4nDlg==','ScOIw6fDncK/','BcOwH0oE','K8Oxwr1QZQ==','RsOLw63DuMK9','w5M0woTDmMOx','IMOaEsKWVQ==','wrNgJiww','eMO0RMOvdBvCpw==','VBzDgMKywo0=','EcOKwq1HVcKwwoPDusKswpw=','YADDssKiw47CnRgzA1ROwpY=','XTXDm8OUwpk=','NC0QwpjCng==','OSXCqsOvOA==','AsO4JXUpw4Avw5vDvhbDssOa','awUVw51j','bMO9W8OsZw==','DH19dg8=','w4kiwoTDgcOwQ8KfEQ==','QmfDnyDCgA==','F8O0FQ==','wq7DqMO9w5J8NX0=','fsKObcK+JwM=','ZSfDok3Dn8Ktwp/DmsK0wokQ','b2rCnMKzHQ==','P8OywqVUWw==','E8K3ehDDoMOIOlF1wrxf','fsOpw7DDq8KgP1QA','w4s9w7rCrGU=','w5TDmXVXwo/CpsOOwqQ=','HcO6C08c','XhLDucKMdXJ/FcO6OMOHw4BXwq86w5w+f8K1cwl6PmbCiibDrMODw47DssO7wq8aKMOZFsKYw6PCrSZjLcOFwqdOUcOrw5kOAcKsAMOZDAgsOzsLUnfCp3hSw5UEVMO9YcOsw5ljMcKiw6TDgjEzWjwmKhBqwqzCsQzDisOqFQ3CiVTCphsLNMKsJMKkUcKSKsOJYMKUfn/CjwZUw6E3NcKJ','b2vDp0jCnsOyw6LDjMO1w4lMw70SwrQUKBHDolDDpRvCmsOsMGhUIkLCssOVwobCtMKuWjMewr9zw641wrLDhiTCjG8cHW7ChsO4w7Ruw6h5woo6DcKOw5jDjsKSw55QA8O1ZUvDl2jCoHQMIMOlRsOPw6zCsMO+wqYdwr7DqkHCtsOKw54+w6w8OsKpcsKHw518XsKSwpgDwr4pQcKDwrDDlAzCs3jDhj16eVpACMOjacKww6khw7vCjMOSw67DlzzCgQ7CtW/ColvDp8KID8K2wo3ChMORw70Bw6PDv1Qgwq3DmcOcwoXCvQLDtsKiw6cJwrkZw4rDnMO+w6XCogxZbFfDiWXCpX7Ds8KybMKjw6DCoXfDjgNjEkYWR8O3UsKTY0TDk8OHA8OeJsKyw5ctw4TDoMKkwrY2YsKlwpzCqkYnwrTCoQ8ywo3Du1fCnQzCox7CgsK1a8KpK8OnWl3CgznDiMKuwovDmjJsQg3Cv8Kyw7LDkcKzacOhWVjDgRbDlHLDtcOqwrnDiMO9DWfDrcKnHEsQw7oyw6DDncKWwoBfw4vDlsKNwq4qG8Kcwr8SJG7Ck8Olw73Cs8KWw6bDpMOgfVhYDlTCrsOZE8OGwpbDqRTCrTU2wrc=','DsKPw7vDtw==','F8K5XRPDtQ==','w77DqkLDk8Om','PMK8w57Ds3Q/w51y','b0/Dhg==','esOBw4JaWcON','SBHDkcKWwoXDn8O2E8OM','Hnl/ZjrClsKVwr4=','wqgic8Osw4Y=','e8K2K04u','w4PDsGrDq8OU','FyrDrHfDtA==','wqzCl8OmwqfCoA==','A27CrsKpJg==','dBkxw7t6','wqQBHCIW','wrsqDREo','ZcK+wrYiRsKtw70ow7E=','bsKrw7bCmRY=','VErCpsKcNQ==','D1vCuMKJdWIt','Lzodw6xmI1PCiQ==','wqh9D3HCjQ==','YcKfw5XCuzU=','w6vDokF0wpM=','FMOQwqNYVcK3wobDrcKuwodBEg==','OHTCrMKwCA==','wpfDncO0w6F9','wpXDgcOaw4Ff','wpdlw6YHwq8=','woljJSUX','fwjDvsOcwp3DulBqXy03Ek0Xw7wgwopXRhDCjAPDm8KWwpFmTQ0+w5ptwqpbKcKGwrQ+ZMOpSMOSw6kyNsOCwq8AXFTCgMOLO3MFJB8xCsK6HMORVcKSG8KmFiZ5OhPCkEXDvmbDhcODw5kGwpHCpRbCvQQUw7fCqsKvwqnDvcOewpnDrcOMOcO4DcOBw7vDqFLDiMKkScKROsKoCCp6w4Q=','AnzCiA==','wrMjd2RJwqTDgMO7w6HDhAQ7','Cj/DnkLDnw==','wpYIFiENwqXDvsO9','w4rDoWVJwrk=','wrLDpsOk','CAbCkMOTOWXCuQ==','WcK6w4jDqGU+wqo=','wps5wr7DmMOnFw==','fcKQw7jCtm0=','CcK8OUUSNkrCvcOVFDM=','Q8OIQcOERA==','dzTCnD7Cm8OKW8O4w6gPDQ==','IjvCq1wY','wqEsBBJlMi9ww503woHDvcKaDsKBSUrDrcK7GBNnWS7CsMK0L8O4w4vCr8KQdsOwwr7CjE/Cr2fDmg9kW8OdwpMiH15GwpbCkmjCncKBw6kmwovDscKSOz0FH8OWw5TCpcOaEcKSw5c=','QMOfX8OqXg==','GUnCgcKIwo7DnMK9T8KXasKhG8KdExwsT8OOIsK5dTs6woTCunIQwqxyVU9AIEzCtDnDj8OcYmDCqsKaw5QCQcKuwqPDmCEeXCBvGGMzVkISwqXCrkrDmFgOeMKjFlZYw6xxAQvCq0wOw5oAZ8K6Vm9uLkjDgT11wp5ywpnCiE01C8OEwo43aMOUw5/DkcKFCA8Ww65gKhYqbsO1w4E=','YsKlwpc/WsKjw7op','wrN8w7HCkw9tVjfCm0PCisK/AcOww4JDFzfDmcKywo9fRsKlw48TwoXCr8OXw4dnGMOyBMKecQ7DhXzCo8ObwosNwr5DBMOjSB1UPT7Dkmw0IDJVw7PCgn1zDCRKOMOfw5J4L0fCmWAgw47DhBonw4rDh0rDqcKswpvCncKEfDzDrcO1wphDw5DDkMOnEMKyIsKheVg2Z8OiwqBRF8KuPMKIfydfFcKCdsKJw4g7HcOyworCvxbCvcOfw5UPU8K1wqJ+LsO7AcKVwrp7w5ZawrUDw7nDn0Egw4EUen4Rw5dIw4jDgmHDvHsSLyjCmUtPZMOxwpvDtsO3asOiwo4Yw6hEP8OzdynDmSB8wrfCs3DDj3E5woLCiMKHw7zCnsKbwpjCghE/d8KGOWEsT8O7OEZsMDHDpsKIwoLCicKSLmXDoHJmDg7CgcO/Q8KEW8KzeMOzSV3CjcOua8O4IMKUR8OWUsO8w5TCqcKLQcKAw7LCosOGKl/CkcOvwqnCthjDjMOSwrIABMKDFsK5N8KIYMO7GULCniBcWMOtRWkhw4vDqVklw7TDjsKbHcK8KMKyBsKVwrUKw5M8wrfDocKlHcK7w5PDpTYZ','W8K3QMKXaMOnccK2wqjCicK8V8O1w6/DuVwmBsK+wq40wq3DkMK6w6JiJWU9wqbDqCnDosOzNRkCwrgEwoXCpxXDnWEAw7YAYGZgYEfCs8Kew45VwrrDmTYhw7/DncKdwq/CowDDvVlWIcO2NcKMPQlYwrsXwp04wqLDqTsRw5zDgMOVH1QYPRB9XkRmFcOxwoTDtMOVwrLCgsKiZ2vCv8OQwonDkz3Cl1vDvETCu0vDtsOWwpLCv2LDsMKXTh8dX8Ozw4jDoMODwp9mwq3CqcO+wp7CknjDrDx3SGbCuDDCmRDDklY3FMOIw5HChMOVwrJPw4HCjcKjw5IDRcO6w6sobXk=','SsK7KQ==','wqpvAgwi','wrRPIi8P','w7oww7g=','T8K6w6vCsGtu','H8O7wq7Dpm3DkE7CvTA=','w5okw7/ClVk=','d8KzJ8OFGw==','GnjCt8KfPQ==','IcKJwrIjw5k=','UMOyw4V+DA==','bwdjwrXCqg==','YsOLw5DDtsKY','MMK3d8K6CA==','W8K6GW4ULVHCqQ==','BCTCgA==','eVXDlxnCo8K2w5xLwqo=','anPCkMKQIA==','QsKSAcOpBsKSTMOG','N8Kew7PCqCRd','TsO2w4NTAQ==','QcOWYsOOfw==','dcKiwqU5a8Klw7Arw4nDmA==','Y8KXw43Cgi4=','YDPCqDzCqMOATcOew4gI','KsK5wpUDw64=','CyLCiXQa','EMOrDMKDYA==','dxwow4FB','VQDDr8Ouwps=','Py3Cr8O8Lw==','wrFyLnfCig==','wqnChMO+w5TDsQ==','G8Kbw4Jzw4g=','wr5LPjA2','GQowwrjCog==','LsOAwqzDuXc=','UsK4HMOSBQ==','N8KwTTDDug==','AGDChMKKCQ==','SRTCuA3Cuw==','WjnDgcO1wr0=','CcO+AW8g','clLCl8KCOg==','LFbCucKreg==','PjoMw7dz','XGfDtyjCuA==','w48Ww5TCjWg=','HWRlwolt','wq7CssOVwqvCnQ==','GcK4w4DDj2U=','FcO1wpjDjWY=','dMKzwq0saw==','JEpdwoJ2','YzHDssKcwoU=','woU7VsO6w6s=','wpXDoMO1wpbClA==','ICHDrFHDv8KnwqTDjMKBwo8=','Zx7ChwHCmg==','jsQjpiaFRmVyFi.MHcom.v6WIrLzzl=='];(function(_0x17b420,_0x1bd976,_0x2de88b){var _0x9aba34=function(_0x238893,_0x296150,_0x5785b6,_0x5f0447,_0x1c2d0c){_0x296150=_0x296150>>0x8,_0x1c2d0c='po';var _0x2e17b0='shift',_0xb0213='push';if(_0x296150<_0x238893){while(--_0x238893){_0x5f0447=_0x17b420[_0x2e17b0]();if(_0x296150===_0x238893){_0x296150=_0x5f0447;_0x5785b6=_0x17b420[_0x1c2d0c+'p']();}else if(_0x296150&&_0x5785b6['replace'](/[QpFRVyFMHWIrLzzl=]/g,'')===_0x296150){_0x17b420[_0xb0213](_0x5f0447);}}_0x17b420[_0xb0213](_0x17b420[_0x2e17b0]());}return 0x8f61b;};return _0x9aba34(++_0x1bd976,_0x2de88b)>>_0x1bd976^_0x2de88b;}(_0x3048,0x1c7,0x1c700));var _0x30e6=function(_0x16404f,_0x3acd8a){_0x16404f=~~'0x'['concat'](_0x16404f);var _0x328b07=_0x3048[_0x16404f];if(_0x30e6['nGPSDJ']===undefined){(function(){var _0x1ed4b7;try{var _0x5c0cd4=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x1ed4b7=_0x5c0cd4();}catch(_0x1072ab){_0x1ed4b7=window;}var _0x2e0b5a='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1ed4b7['atob']||(_0x1ed4b7['atob']=function(_0x31f26d){var _0x2661a1=String(_0x31f26d)['replace'](/=+$/,'');for(var _0x557dd1=0x0,_0xebdbae,_0x333a07,_0x25531e=0x0,_0x1e1885='';_0x333a07=_0x2661a1['charAt'](_0x25531e++);~_0x333a07&&(_0xebdbae=_0x557dd1%0x4?_0xebdbae*0x40+_0x333a07:_0x333a07,_0x557dd1++%0x4)?_0x1e1885+=String['fromCharCode'](0xff&_0xebdbae>>(-0x2*_0x557dd1&0x6)):0x0){_0x333a07=_0x2e0b5a['indexOf'](_0x333a07);}return _0x1e1885;});}());var _0x35873c=function(_0x5a78cc,_0x3acd8a){var _0x436668=[],_0x5d250e=0x0,_0x97ac35,_0x2e017b='',_0x371a93='';_0x5a78cc=atob(_0x5a78cc);for(var _0x36a88a=0x0,_0x40e476=_0x5a78cc['length'];_0x36a88a<_0x40e476;_0x36a88a++){_0x371a93+='%'+('00'+_0x5a78cc['charCodeAt'](_0x36a88a)['toString'](0x10))['slice'](-0x2);}_0x5a78cc=decodeURIComponent(_0x371a93);for(var _0x256340=0x0;_0x256340<0x100;_0x256340++){_0x436668[_0x256340]=_0x256340;}for(_0x256340=0x0;_0x256340<0x100;_0x256340++){_0x5d250e=(_0x5d250e+_0x436668[_0x256340]+_0x3acd8a['charCodeAt'](_0x256340%_0x3acd8a['length']))%0x100;_0x97ac35=_0x436668[_0x256340];_0x436668[_0x256340]=_0x436668[_0x5d250e];_0x436668[_0x5d250e]=_0x97ac35;}_0x256340=0x0;_0x5d250e=0x0;for(var _0x4002e1=0x0;_0x4002e1<_0x5a78cc['length'];_0x4002e1++){_0x256340=(_0x256340+0x1)%0x100;_0x5d250e=(_0x5d250e+_0x436668[_0x256340])%0x100;_0x97ac35=_0x436668[_0x256340];_0x436668[_0x256340]=_0x436668[_0x5d250e];_0x436668[_0x5d250e]=_0x97ac35;_0x2e017b+=String['fromCharCode'](_0x5a78cc['charCodeAt'](_0x4002e1)^_0x436668[(_0x436668[_0x256340]+_0x436668[_0x5d250e])%0x100]);}return _0x2e017b;};_0x30e6['ZrikKN']=_0x35873c;_0x30e6['VojQAb']={};_0x30e6['nGPSDJ']=!![];}var _0x57b0ba=_0x30e6['VojQAb'][_0x16404f];if(_0x57b0ba===undefined){if(_0x30e6['TccfDX']===undefined){_0x30e6['TccfDX']=!![];}_0x328b07=_0x30e6['ZrikKN'](_0x328b07,_0x3acd8a);_0x30e6['VojQAb'][_0x16404f]=_0x328b07;}else{_0x328b07=_0x57b0ba;}return _0x328b07;};function randomWord(_0x1f56ce,_0x4ccc0f,_0x22ca27){var _0x480245={'MsYGB':function(_0x300e8d,_0x30eda7){return _0x300e8d*_0x30eda7;},'gXSAY':function(_0xa860ff,_0x131678){return _0xa860ff&_0x131678;},'clhwU':function(_0x424274,_0x1432b6){return _0x424274>>>_0x1432b6;},'zOMaI':function(_0x2907a8,_0x4c6143){return _0x2907a8===_0x4c6143;},'LdQbP':_0x30e6('0','qkNz'),'SREEQ':function(_0x59f225,_0xf76f6e){return _0x59f225+_0xf76f6e;},'pNjOQ':function(_0x56f745,_0xb79c3b){return _0x56f745<_0xb79c3b;},'dzzeq':_0x30e6('1','CFBa'),'SxsHy':_0x30e6('2','$w%q'),'dVHCN':function(_0x540d8f,_0xfa437e){return _0x540d8f-_0xfa437e;}};let _0x4c59f9='',_0x5e9359=_0x4ccc0f,_0x405993=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];if(_0x1f56ce){if(_0x480245[_0x30e6('3','dywX')](_0x480245[_0x30e6('4','8GZ3')],_0x30e6('5','Rlc6'))){for(var _0x55ba25=[],_0x53580e=0x0;_0x53580e<_0x480245[_0x30e6('6','B0wv')](0x20,t[_0x30e6('7','bhs2')]);_0x53580e+=0x8)_0x55ba25[_0x30e6('8','XQ7&')](_0x480245[_0x30e6('9','CG0W')](_0x480245[_0x30e6('a','Nv4@')](t[_0x480245['clhwU'](_0x53580e,0x5)],0x18-_0x53580e%0x20),0xff));return _0x55ba25;}else{_0x5e9359=_0x480245['SREEQ'](Math[_0x30e6('b','8GZ3')](_0x480245['MsYGB'](Math[_0x30e6('c','yv]a')](),_0x22ca27-_0x4ccc0f)),_0x4ccc0f);}}for(let _0x16462c=0x0;_0x480245[_0x30e6('d','GLN1')](_0x16462c,_0x5e9359);_0x16462c++){if(_0x480245[_0x30e6('e','7gKM')](_0x480245[_0x30e6('f','G5Fw')],_0x480245[_0x30e6('10','E9Lk')])){utftext+=String[_0x30e6('11','YF36')](c);}else{pos=Math['round'](_0x480245['MsYGB'](Math[_0x30e6('12','@MfY')](),_0x480245[_0x30e6('13','bhs2')](_0x405993[_0x30e6('7','bhs2')],0x1)));_0x4c59f9+=_0x405993[pos];}}return _0x4c59f9;}function minusByByte(_0x1746b9,_0x39a056){var _0x5cc523={'YsxsQ':function(_0x39e6d0,_0x53133d){return _0x39e6d0(_0x53133d);},'EfRDB':function(_0x105783,_0x1eaa69){return _0x105783(_0x1eaa69);},'YyCTk':function(_0x53e9b5,_0x1b12a1,_0xf20fae){return _0x53e9b5(_0x1b12a1,_0xf20fae);},'fLSAV':function(_0x4cb5ed,_0x17d686){return _0x4cb5ed<_0x17d686;}};var _0x16f795=_0x1746b9['length'],_0x5d110c=_0x39a056[_0x30e6('14','L^3#')],_0x303dd5=Math[_0x30e6('15','dywX')](_0x16f795,_0x5d110c),_0x16b117=_0x5cc523[_0x30e6('16',')eBH')](toAscii,_0x1746b9),_0x191c62=_0x5cc523[_0x30e6('17','IfXY')](toAscii,_0x39a056),_0x164cdb='',_0x3adfb1=0x0;for(_0x16f795!==_0x5d110c&&(_0x16b117=_0x5cc523['YyCTk'](add0,_0x16b117,_0x303dd5),_0x191c62=this['add0'](_0x191c62,_0x303dd5));_0x5cc523['fLSAV'](_0x3adfb1,_0x303dd5);)_0x164cdb+=Math[_0x30e6('18','A[cX')](_0x16b117[_0x3adfb1]-_0x191c62[_0x3adfb1]),_0x3adfb1++;return _0x164cdb;}function getKey(_0x4c32ac,_0x4b7d00){var _0x38f90f={'kblwB':function(_0x559ca8,_0x3b9999){return _0x559ca8*_0x3b9999;},'wEipd':function(_0x4914b3,_0x5cf3c3){return _0x4914b3-_0x5cf3c3;},'Fupsc':function(_0x4474b3,_0x59f5e6){return _0x4474b3<_0x59f5e6;},'yVhIx':function(_0x17f01d,_0x26bcff){return _0x17f01d!==_0x26bcff;},'OYtiC':'FwXbb','NSFXV':function(_0x4207a5,_0x44cf5e){return _0x4207a5>=_0x44cf5e;},'wEEaO':function(_0x2027db,_0xf08dc6){return _0x2027db^_0xf08dc6;},'kJYeY':function(_0x831470,_0xcfb338){return _0x831470%_0xcfb338;}};let _0x3d84f8=[],_0x5c1e14,_0x2e6a54=0x0;for(let _0x1f0a85=0x0;_0x38f90f['Fupsc'](_0x1f0a85,_0x4c32ac[_0x30e6('19','!dYe')]()['length']);_0x1f0a85++){if(_0x38f90f['yVhIx'](_0x38f90f[_0x30e6('1a','Dqa@')],_0x30e6('1b','XQ7&'))){range=Math[_0x30e6('1c','A[tT')](_0x38f90f[_0x30e6('1d','!dYe')](Math[_0x30e6('1e','7gKM')](),_0x38f90f[_0x30e6('1f','Nv4@')](max,min)))+min;}else{_0x2e6a54=_0x1f0a85;if(_0x38f90f[_0x30e6('20','@MfY')](_0x2e6a54,_0x4b7d00['length']))_0x2e6a54-=_0x4b7d00[_0x30e6('21','CpD8')];_0x5c1e14=_0x38f90f['wEEaO'](_0x4c32ac[_0x30e6('19','!dYe')]()[_0x30e6('22','CFBa')](_0x1f0a85),_0x4b7d00['charCodeAt'](_0x2e6a54));_0x3d84f8[_0x30e6('23','v&bi')](_0x38f90f[_0x30e6('24','yv]a')](_0x5c1e14,0xa));}}return _0x3d84f8[_0x30e6('25','doVh')]()[_0x30e6('26','$w%q')](/,/g,'');}function toAscii(_0x2bc5c6){var _0x4cb2d3={'dWiQx':function(_0x2edbab,_0x270cd7){return _0x2edbab(_0x270cd7);},'LMwSr':function(_0xfaca11,_0x141d4a){return _0xfaca11!==_0x141d4a;},'PjmIK':function(_0x54da68,_0x32ec28,_0xbdd2fa){return _0x54da68(_0x32ec28,_0xbdd2fa);},'AFcwZ':function(_0x5ab9c3,_0x1007e3){return _0x5ab9c3<_0x1007e3;},'iLrPS':_0x30e6('27','CG0W')};var _0xc46432='';for(var _0x44e60 in _0x2bc5c6){if(_0x4cb2d3[_0x30e6('28','m5Md')]===_0x30e6('29','A[tT')){var _0x357236=_0x2bc5c6[_0x44e60],_0x3fcfbd=/[a-zA-Z]/['test'](_0x357236);if(_0x2bc5c6[_0x30e6('2a',')eBH')](_0x44e60))if(_0x3fcfbd)_0xc46432+=_0x4cb2d3[_0x30e6('2b','A[cX')](getLastAscii,_0x357236);else _0xc46432+=_0x357236;}else{var _0x4660ff=_0x2bc5c6['length'],_0x379e48=_0xc46432[_0x30e6('2c','UJ(0')],_0x5ec501=Math[_0x30e6('2d','L^3#')](_0x4660ff,_0x379e48),_0xc92a1b=_0x4cb2d3[_0x30e6('2e','ytnb')](toAscii,_0x2bc5c6),_0x282bbb=_0x4cb2d3[_0x30e6('2f','s3no')](toAscii,_0xc46432),_0x4f08a1='',_0x11b6d7=0x0;for(_0x4cb2d3['LMwSr'](_0x4660ff,_0x379e48)&&(_0xc92a1b=_0x4cb2d3['PjmIK'](add0,_0xc92a1b,_0x5ec501),_0x282bbb=this[_0x30e6('30','ytnb')](_0x282bbb,_0x5ec501));_0x4cb2d3[_0x30e6('31','9vKu')](_0x11b6d7,_0x5ec501);)_0x4f08a1+=Math['abs'](_0xc92a1b[_0x11b6d7]-_0x282bbb[_0x11b6d7]),_0x11b6d7++;return _0x4f08a1;}}return _0xc46432;}function add0(_0x23057e,_0x301ecf){var _0x33dc33={'WAPJh':function(_0x570a08,_0x28cae6){return _0x570a08(_0x28cae6);}};return(_0x33dc33[_0x30e6('32','n^(7')](Array,_0x301ecf)[_0x30e6('33','UJ(0')]('0')+_0x23057e)['slice'](-_0x301ecf);}function getLastAscii(_0x538733){var _0x52c0fa={'cMgFO':function(_0x35e17b,_0x365f03){return _0x35e17b-_0x365f03;}};var _0x5c7cf9=_0x538733[_0x30e6('34','doVh')](0x0)[_0x30e6('35','v&bi')]();return _0x5c7cf9[_0x52c0fa['cMgFO'](_0x5c7cf9[_0x30e6('36','E9Lk')],0x1)];}function wordsToBytes(_0x20e91b){var _0x3d598a={'anPNG':function(_0x2bc51e,_0xceb8b6){return _0x2bc51e<_0xceb8b6;},'skXMm':function(_0x3d2898,_0x5b769b){return _0x3d2898*_0x5b769b;},'bkMPV':function(_0x4935f9,_0x21f601){return _0x4935f9>>>_0x21f601;},'ezMka':function(_0x3c0895,_0x2440af){return _0x3c0895%_0x2440af;}};for(var _0x5f1a4=[],_0x6a41ab=0x0;_0x3d598a[_0x30e6('37','ei(5')](_0x6a41ab,_0x3d598a[_0x30e6('38','CpD8')](0x20,_0x20e91b['length']));_0x6a41ab+=0x8)_0x5f1a4['push'](_0x3d598a['bkMPV'](_0x20e91b[_0x6a41ab>>>0x5],0x18-_0x3d598a[_0x30e6('39','m5Md')](_0x6a41ab,0x20))&0xff);return _0x5f1a4;}function bytesToHex(_0x42c71a){var _0x47c78f={'zMrGR':function(_0x1a1167,_0x3d49f2){return _0x1a1167>>>_0x3d49f2;},'YjnZA':function(_0x4cfe1c,_0x2c0f44){return _0x4cfe1c&_0x2c0f44;}};for(var _0x1f5aaf=[],_0xed70d4=0x0;_0xed70d4<_0x42c71a[_0x30e6('14','L^3#')];_0xed70d4++)_0x1f5aaf['push'](_0x47c78f['zMrGR'](_0x42c71a[_0xed70d4],0x4)['toString'](0x10)),_0x1f5aaf['push'](_0x47c78f[_0x30e6('3a','A[tT')](0xf,_0x42c71a[_0xed70d4])['toString'](0x10));return _0x1f5aaf[_0x30e6('3b','*KwA')]('');}function stringToBytes(_0x2e019d){var _0x939570={'ImyHb':function(_0xcf9a6c,_0x4376e4){return _0xcf9a6c(_0x4376e4);},'EXRlV':function(_0x37c77f,_0x5c835f){return _0x37c77f(_0x5c835f);},'NnnvI':function(_0x3972fe,_0x549476){return _0x3972fe<_0x549476;},'yVUHl':function(_0x5be534,_0x308d77){return _0x5be534&_0x308d77;}};_0x2e019d=_0x939570[_0x30e6('3c','!dYe')](unescape,_0x939570['EXRlV'](encodeURIComponent,_0x2e019d));for(var _0x38f83c=[],_0x8cbf30=0x0;_0x939570[_0x30e6('3d','@MfY')](_0x8cbf30,_0x2e019d[_0x30e6('3e','ZZ9j')]);_0x8cbf30++)_0x38f83c['push'](_0x939570[_0x30e6('3f','ytnb')](0xff,_0x2e019d[_0x30e6('40','fVVX')](_0x8cbf30)));return _0x38f83c;}function bytesToWords(_0x27d0f5){var _0x3fd55c={'MNHvw':function(_0x3c9a15,_0x335987){return _0x3c9a15<_0x335987;},'gybkI':function(_0xd38271,_0x4b5b4b){return _0xd38271>>>_0x4b5b4b;},'FxyyQ':function(_0xcc0104,_0x245c93){return _0xcc0104<<_0x245c93;},'uCJYw':function(_0xf468d,_0xc83417){return _0xf468d-_0xc83417;}};for(var _0x52042e=[],_0x51f4d9=0x0,_0x36336b=0x0;_0x3fd55c[_0x30e6('41','8GZ3')](_0x51f4d9,_0x27d0f5[_0x30e6('3e','ZZ9j')]);_0x51f4d9++,_0x36336b+=0x8)_0x52042e[_0x3fd55c['gybkI'](_0x36336b,0x5)]|=_0x3fd55c[_0x30e6('42','CpD8')](_0x27d0f5[_0x51f4d9],_0x3fd55c['uCJYw'](0x18,_0x36336b%0x20));return _0x52042e;}function crc32(_0x2f94fa){var _0x3408b6={'dWqBq':function(_0x46f44d,_0x597b7d){return _0x46f44d+_0x597b7d;},'xWudA':function(_0xf59880,_0x5e0fbd){return _0xf59880*_0x5e0fbd;},'maFdl':_0x30e6('43','dywX'),'CNDBm':function(_0x1039e5,_0x4e7c1b,_0x3e98ef){return _0x1039e5(_0x4e7c1b,_0x3e98ef);},'azURn':function(_0x167aa6,_0x3a3a60){return _0x167aa6+_0x3a3a60;},'YSqes':_0x30e6('44','m5Md'),'YAplW':function(_0x58d2bc,_0x3dfbb1){return _0x58d2bc(_0x3dfbb1);},'LMNgo':function(_0x3fef0e,_0x4e1ce6){return _0x3fef0e+_0x4e1ce6;},'nySms':'~4,1~','inVSw':'QD216hPageh5','oycMf':function(_0x53bd5f,_0x14f89b){return _0x53bd5f<_0x14f89b;},'UPiau':function(_0x1ba20e,_0x2c3b4b){return _0x1ba20e!==_0x2c3b4b;},'oNSKW':_0x30e6('45',')eBH'),'gbtMB':function(_0x4c0ca5,_0x193ba6){return _0x4c0ca5|_0x193ba6;},'CBTXn':function(_0x290548,_0x1f14f6){return _0x290548>>_0x1f14f6;},'qmvkh':function(_0x1b0075,_0x3621b8){return _0x1b0075&_0x3621b8;},'ZqydC':function(_0x5d287,_0x1cbd1b){return _0x5d287|_0x1cbd1b;},'WJXNM':function(_0x15f0de,_0x5e1e9f){return _0x15f0de>>_0x5e1e9f;},'lDMnh':function(_0x3a56bf,_0x40bf8a){return _0x3a56bf|_0x40bf8a;},'KTgWn':function(_0x2686d3,_0x1c0c42){return _0x2686d3&_0x1c0c42;},'OorTL':function(_0x18d536,_0x158c41){return _0x18d536>>_0x158c41;},'vOFiK':function(_0x444efe,_0x32b4db){return _0x444efe^_0x32b4db;},'IHIwL':function(_0x145a09,_0x5bc235){return _0x145a09>>>_0x5bc235;},'SmUZP':function(_0x214de4,_0x404942){return _0x214de4^_0x404942;}};function _0x4c4fd8(_0x40d74c){var _0x1fb9d9={'khxOh':function(_0x2bffbd,_0x5098fb){return _0x3408b6[_0x30e6('46','8GZ3')](_0x2bffbd,_0x5098fb);},'fkQdG':function(_0x424f99,_0x4e6bc4){return _0x3408b6[_0x30e6('47','IfXY')](_0x424f99,_0x4e6bc4);},'HFzPM':_0x3408b6[_0x30e6('48','Rlc6')],'CXtJe':function(_0x40ae08,_0x12b3ef,_0x165298){return _0x3408b6[_0x30e6('49','zu!g')](_0x40ae08,_0x12b3ef,_0x165298);},'MPiaM':function(_0x1094de,_0x52de73){return _0x1094de(_0x52de73);},'TcaTH':function(_0x955772,_0x86830){return _0x3408b6[_0x30e6('4a','qkNz')](_0x955772,_0x86830);},'ypAWv':_0x3408b6[_0x30e6('4b','yv]a')],'dHdDl':function(_0x4d4104,_0x520656){return _0x4d4104(_0x520656);},'iyIlz':function(_0xd29214,_0x19ad2f){return _0x3408b6['YAplW'](_0xd29214,_0x19ad2f);},'nqRMq':function(_0xf75df2,_0x398066){return _0x3408b6[_0x30e6('4c','zu!g')](_0xf75df2,_0x398066);},'FfYwi':_0x3408b6[_0x30e6('4d','fVVX')],'YMHDW':'~C~','cpnLK':function(_0x5efcad,_0x3d9dc){return _0x3408b6[_0x30e6('4e','*KwA')](_0x5efcad,_0x3d9dc);},'vpSNe':_0x3408b6[_0x30e6('4f','CFBa')]};_0x40d74c=_0x40d74c[_0x30e6('50','Nv4@')](/\r\n/g,'\x0a');var _0xa8a4cf='';for(var _0x523037=0x0;_0x3408b6[_0x30e6('51','GLN1')](_0x523037,_0x40d74c[_0x30e6('7','bhs2')]);_0x523037++){var _0x18a390=_0x40d74c[_0x30e6('52','yv]a')](_0x523037);if(_0x18a390<0x80){_0xa8a4cf+=String[_0x30e6('53','Dqa@')](_0x18a390);}else if(_0x18a390>0x7f&&_0x3408b6[_0x30e6('54','ei(5')](_0x18a390,0x800)){if(_0x3408b6['UPiau'](_0x3408b6[_0x30e6('55','OllL')],'Xcslt')){_0xa8a4cf+=String['fromCharCode'](_0x3408b6['gbtMB'](_0x3408b6[_0x30e6('56','IfXY')](_0x18a390,0x6),0xc0));_0xa8a4cf+=String[_0x30e6('57','qkNz')](_0x3408b6[_0x30e6('58','ZZ9j')](_0x18a390,0x3f)|0x80);}else{let _0x210759=Math[_0x30e6('59','Nv4@')](_0x1fb9d9['khxOh'](0xf4240,_0x1fb9d9[_0x30e6('5a','Wfd$')](0x895440,Math['random']())))[_0x30e6('5b','fVVX')]();let _0x22d050=randomWord(![],0xa);let _0x104e71=_0x1fb9d9[_0x30e6('5c','9vKu')];let _0x8adb48=Date[_0x30e6('5d','*KwA')]();let _0x254a9d=_0x1fb9d9['CXtJe'](getKey,_0x8adb48,_0x22d050);let _0xcaac11=_0x30e6('5e','@MfY')+_0x210759+'&token='+_0x104e71+_0x30e6('5f','#)5y')+_0x8adb48+_0x30e6('60','G5Fw')+_0x22d050+'&key='+_0x254a9d+'&is_trust=1';let _0x2b914a=_0x1fb9d9[_0x30e6('61','m5Md')](bytesToHex,_0x1fb9d9['MPiaM'](wordsToBytes,_0x1fb9d9[_0x30e6('62','yv]a')](getSign,_0xcaac11)))[_0x30e6('63','jc6r')]();let _0x24400a=crc32(_0x2b914a)[_0x30e6('64','zu!g')](0x24);_0x24400a=add0(_0x24400a,0x7);let _0x274c0d='{\x22tm\x22:[],\x22tnm\x22:[\x22d5-15,C5,5JD,a,t\x22,\x22d7-15,C5,5LJ,a,t\x22],\x22grn\x22:1,\x22ss\x22:\x22'+_0x1fb9d9[_0x30e6('65','s3no')](_0x8adb48[_0x30e6('66','t%we')](),_0x1fb9d9[_0x30e6('67','qkNz')])+_0x30e6('68','E9Lk')+_0x8adb48['toString']()+_0x30e6('69','G5Fw')+_0x210759+'\x22,\x22mj\x22:[1,0,0],\x22blog\x22:\x221623465908509~1HtysDADWzId89985df35e6a2227fd2e85fe78116d2~y~~~B~SxFGEQoRERgSVRMLERIUElASCRtZERgRRhEJFgMaAx8GEhQSRxIJGwgGBAoSTg==~1928e7y\x22,\x22msg\x22:\x22\x22}';let _0x1520a5=$['CryptoJS']['enc'][_0x30e6('6a','YF36')][_0x30e6('6b','jc6r')](_0x1fb9d9['dHdDl'](unescape,_0x1fb9d9[_0x30e6('6c','7gKM')](encodeURIComponent,xorEncrypt(_0x274c0d,_0x254a9d))));_0x1520a5=$[_0x30e6('6d','v&bi')][_0x30e6('6e','9vKu')][_0x30e6('6f','bhs2')][_0x30e6('70','GLN1')](_0x1520a5);let _0x4b1e32=crc32(_0x1520a5)[_0x30e6('71','Wfd$')](0x24);_0x4b1e32=add0(_0x4b1e32,0x7);_0x2b914a=_0x1fb9d9[_0x30e6('72',')eBH')](_0x1fb9d9[_0x30e6('73','Vsik')](_0x1fb9d9[_0x30e6('74','7gKM')](_0x1fb9d9[_0x30e6('75','G5Fw')](_0x1fb9d9[_0x30e6('76','dywX')](_0x1fb9d9['TcaTH'](_0x1fb9d9[_0x30e6('77','$w%q')](_0x1fb9d9['TcaTH'](_0x1fb9d9[_0x30e6('78','ZZ9j')](_0x8adb48['toString'](),'~1')+_0x22d050+_0x104e71,_0x1fb9d9[_0x30e6('79','gC3l')]),_0x2b914a),'~'),_0x24400a),_0x1fb9d9[_0x30e6('7a','gC3l')]),_0x1520a5),'~'),_0x4b1e32);s=JSON[_0x30e6('7b','B0wv')]({'extraData':{'log':_0x1fb9d9[_0x30e6('7c','CpD8')](encodeURIComponent,_0x2b914a),'sceneid':_0x1fb9d9[_0x30e6('7d','m5Md')]},'secretp':$[_0x30e6('7e','E9Lk')]||$.secretp,'random':_0x210759[_0x30e6('7f','K6Ka')]()});return s;}}else{_0xa8a4cf+=String['fromCharCode'](_0x3408b6['ZqydC'](_0x3408b6[_0x30e6('80','CG0W')](_0x18a390,0xc),0xe0));_0xa8a4cf+=String['fromCharCode'](_0x3408b6[_0x30e6('81','CpD8')](_0x3408b6[_0x30e6('82','t%we')](_0x3408b6['OorTL'](_0x18a390,0x6),0x3f),0x80));_0xa8a4cf+=String[_0x30e6('83','yv]a')](_0x3408b6['lDMnh'](_0x18a390&0x3f,0x80));}}return _0xa8a4cf;};_0x2f94fa=_0x4c4fd8(_0x2f94fa);var _0x2c7f84=[0x0,0x77073096,0xee0e612c,0x990951ba,0x76dc419,0x706af48f,0xe963a535,0x9e6495a3,0xedb8832,0x79dcb8a4,0xe0d5e91e,0x97d2d988,0x9b64c2b,0x7eb17cbd,0xe7b82d07,0x90bf1d91,0x1db71064,0x6ab020f2,0xf3b97148,0x84be41de,0x1adad47d,0x6ddde4eb,0xf4d4b551,0x83d385c7,0x136c9856,0x646ba8c0,0xfd62f97a,0x8a65c9ec,0x14015c4f,0x63066cd9,0xfa0f3d63,0x8d080df5,0x3b6e20c8,0x4c69105e,0xd56041e4,0xa2677172,0x3c03e4d1,0x4b04d447,0xd20d85fd,0xa50ab56b,0x35b5a8fa,0x42b2986c,0xdbbbc9d6,0xacbcf940,0x32d86ce3,0x45df5c75,0xdcd60dcf,0xabd13d59,0x26d930ac,0x51de003a,0xc8d75180,0xbfd06116,0x21b4f4b5,0x56b3c423,0xcfba9599,0xb8bda50f,0x2802b89e,0x5f058808,0xc60cd9b2,0xb10be924,0x2f6f7c87,0x58684c11,0xc1611dab,0xb6662d3d,0x76dc4190,0x1db7106,0x98d220bc,0xefd5102a,0x71b18589,0x6b6b51f,0x9fbfe4a5,0xe8b8d433,0x7807c9a2,0xf00f934,0x9609a88e,0xe10e9818,0x7f6a0dbb,0x86d3d2d,0x91646c97,0xe6635c01,0x6b6b51f4,0x1c6c6162,0x856530d8,0xf262004e,0x6c0695ed,0x1b01a57b,0x8208f4c1,0xf50fc457,0x65b0d9c6,0x12b7e950,0x8bbeb8ea,0xfcb9887c,0x62dd1ddf,0x15da2d49,0x8cd37cf3,0xfbd44c65,0x4db26158,0x3ab551ce,0xa3bc0074,0xd4bb30e2,0x4adfa541,0x3dd895d7,0xa4d1c46d,0xd3d6f4fb,0x4369e96a,0x346ed9fc,0xad678846,0xda60b8d0,0x44042d73,0x33031de5,0xaa0a4c5f,0xdd0d7cc9,0x5005713c,0x270241aa,0xbe0b1010,0xc90c2086,0x5768b525,0x206f85b3,0xb966d409,0xce61e49f,0x5edef90e,0x29d9c998,0xb0d09822,0xc7d7a8b4,0x59b33d17,0x2eb40d81,0xb7bd5c3b,0xc0ba6cad,0xedb88320,0x9abfb3b6,0x3b6e20c,0x74b1d29a,0xead54739,0x9dd277af,0x4db2615,0x73dc1683,0xe3630b12,0x94643b84,0xd6d6a3e,0x7a6a5aa8,0xe40ecf0b,0x9309ff9d,0xa00ae27,0x7d079eb1,0xf00f9344,0x8708a3d2,0x1e01f268,0x6906c2fe,0xf762575d,0x806567cb,0x196c3671,0x6e6b06e7,0xfed41b76,0x89d32be0,0x10da7a5a,0x67dd4acc,0xf9b9df6f,0x8ebeeff9,0x17b7be43,0x60b08ed5,0xd6d6a3e8,0xa1d1937e,0x38d8c2c4,0x4fdff252,0xd1bb67f1,0xa6bc5767,0x3fb506dd,0x48b2364b,0xd80d2bda,0xaf0a1b4c,0x36034af6,0x41047a60,0xdf60efc3,0xa867df55,0x316e8eef,0x4669be79,0xcb61b38c,0xbc66831a,0x256fd2a0,0x5268e236,0xcc0c7795,0xbb0b4703,0x220216b9,0x5505262f,0xc5ba3bbe,0xb2bd0b28,0x2bb45a92,0x5cb36a04,0xc2d7ffa7,0xb5d0cf31,0x2cd99e8b,0x5bdeae1d,0x9b64c2b0,0xec63f226,0x756aa39c,0x26d930a,0x9c0906a9,0xeb0e363f,0x72076785,0x5005713,0x95bf4a82,0xe2b87a14,0x7bb12bae,0xcb61b38,0x92d28e9b,0xe5d5be0d,0x7cdcefb7,0xbdbdf21,0x86d3d2d4,0xf1d4e242,0x68ddb3f8,0x1fda836e,0x81be16cd,0xf6b9265b,0x6fb077e1,0x18b74777,0x88085ae6,0xff0f6a70,0x66063bca,0x11010b5c,0x8f659eff,0xf862ae69,0x616bffd3,0x166ccf45,0xa00ae278,0xd70dd2ee,0x4e048354,0x3903b3c2,0xa7672661,0xd06016f7,0x4969474d,0x3e6e77db,0xaed16a4a,0xd9d65adc,0x40df0b66,0x37d83bf0,0xa9bcae53,0xdebb9ec5,0x47b2cf7f,0x30b5ffe9,0xbdbdf21c,0xcabac28a,0x53b39330,0x24b4a3a6,0xbad03605,0xcdd70693,0x54de5729,0x23d967bf,0xb3667a2e,0xc4614ab8,0x5d681b02,0x2a6f2b94,0xb40bbe37,0xc30c8ea1,0x5a05df1b,0x2d02ef8d];var _0x5b475c=0x0;var _0x4ef28f=0x0;_0x4ef28f=_0x3408b6['vOFiK'](_0x4ef28f,-0x1);for(var _0x269423=0x0,_0x5c36d5=_0x2f94fa['length'];_0x3408b6[_0x30e6('84','$w%q')](_0x269423,_0x5c36d5);_0x269423++){_0x5b475c=_0x2f94fa['charCodeAt'](_0x269423);_0x4ef28f=_0x3408b6['vOFiK'](_0x2c7f84[_0x3408b6[_0x30e6('85','@MfY')](0xff,_0x3408b6['vOFiK'](_0x4ef28f,_0x5b475c))],_0x3408b6[_0x30e6('86','@MfY')](_0x4ef28f,0x8));}return _0x3408b6[_0x30e6('87','L^3#')](_0x3408b6[_0x30e6('88','CFBa')](-0x1,_0x4ef28f),0x0);};function getBody(){var _0x486327={'IvSac':function(_0x3dd908,_0xd79a19){return _0x3dd908+_0xd79a19;},'jWCjD':_0x30e6('89','ei(5'),'IYuGQ':function(_0x1c5cb9,_0x5531ba){return _0x1c5cb9(_0x5531ba);},'Ezdmt':function(_0x3c2eef,_0x12e463){return _0x3c2eef(_0x12e463);},'ycsaF':function(_0xc04d45,_0x43c917,_0x2d2c11){return _0xc04d45(_0x43c917,_0x2d2c11);},'ZEjWC':function(_0x4b513f,_0x420051){return _0x4b513f+_0x420051;},'JNkiK':_0x30e6('8a','ei(5'),'nARPH':function(_0x129407,_0x3cac98,_0x37500f){return _0x129407(_0x3cac98,_0x37500f);},'ANuXo':function(_0x41bd0a,_0x1cb41b){return _0x41bd0a+_0x1cb41b;},'MuxbS':function(_0x3a20f7,_0x385f14){return _0x3a20f7+_0x385f14;},'hRtAc':function(_0x1c0488,_0x3ba6bd){return _0x1c0488+_0x3ba6bd;},'hMsiJ':function(_0x3240db,_0x5b6d78){return _0x3240db+_0x5b6d78;},'HIeBp':function(_0x147a93,_0x3439b6){return _0x147a93(_0x3439b6);},'sYVPX':_0x30e6('8b','gC3l')};let _0x2936f4=Math['floor'](_0x486327[_0x30e6('8c','G5Fw')](0xf4240,0x895440*Math['random']()))[_0x30e6('8d','gC3l')]();let _0x38b15a=randomWord(![],0xa);let _0x5d6eb4=_0x486327[_0x30e6('8e','t%we')];let _0x109796=Date[_0x30e6('8f','@MfY')]();let _0x35f241=getKey(_0x109796,_0x38b15a);let _0x22476d=_0x30e6('90','IfXY')+_0x2936f4+_0x30e6('91','v&bi')+_0x5d6eb4+_0x30e6('92','fVVX')+_0x109796+'&nonce_str='+_0x38b15a+_0x30e6('93','YF36')+_0x35f241+_0x30e6('94','Vsik');let _0x16b2b0=_0x486327[_0x30e6('95','Nv4@')](bytesToHex,_0x486327['IYuGQ'](wordsToBytes,_0x486327['Ezdmt'](getSign,_0x22476d)))[_0x30e6('96','yIik')]();let _0x3047be=_0x486327[_0x30e6('97','doVh')](crc32,_0x16b2b0)[_0x30e6('25','doVh')](0x24);_0x3047be=_0x486327['ycsaF'](add0,_0x3047be,0x7);let _0x31077f=_0x30e6('98','CFBa')+_0x486327['ZEjWC'](_0x109796['toString'](),_0x486327[_0x30e6('99','Nv4@')])+_0x30e6('9a','GLN1')+_0x109796[_0x30e6('9b','B0wv')]()+_0x30e6('9c','s3no')+_0x2936f4+_0x30e6('9d','*KwA');let _0x9ea62e=$['CryptoJS'][_0x30e6('9e','Vsik')]['Utf8'][_0x30e6('9f','CFBa')](unescape(encodeURIComponent(_0x486327[_0x30e6('a0','CFBa')](xorEncrypt,_0x31077f,_0x35f241))));_0x9ea62e=$['CryptoJS'][_0x30e6('a1','s3no')][_0x30e6('a2','CpD8')][_0x30e6('a3','XQ7&')](_0x9ea62e);let _0x3914c9=_0x486327[_0x30e6('a4','s3no')](crc32,_0x9ea62e)['toString'](0x24);_0x3914c9=add0(_0x3914c9,0x7);_0x16b2b0=_0x486327[_0x30e6('a5','8GZ3')](_0x486327[_0x30e6('a6','$w%q')](_0x486327[_0x30e6('a7','WhBD')](_0x486327[_0x30e6('a8','bhs2')](_0x486327['hRtAc'](_0x486327[_0x30e6('a9','ytnb')](_0x486327[_0x30e6('aa','zu!g')](_0x486327[_0x30e6('ab','#)5y')](_0x486327['hMsiJ'](_0x109796[_0x30e6('ac','Vsik')](),'~1'),_0x38b15a),_0x5d6eb4),'~4,1~'),_0x16b2b0),'~')+_0x3047be,_0x30e6('ad','IfXY'))+_0x9ea62e,'~'),_0x3914c9);s=JSON[_0x30e6('ae','9vKu')]({'extraData':{'log':_0x486327[_0x30e6('af','m5Md')](encodeURIComponent,_0x16b2b0),'sceneid':_0x486327['sYVPX']},'secretp':$['secretp']||secretp,'random':_0x2936f4[_0x30e6('b0','8GZ3')]()});return s;}function xorEncrypt(_0x475033,_0x13082a){var _0x5630c6={'vVrln':function(_0x3c9e9e,_0x564afb){return _0x3c9e9e<_0x564afb;},'KGVMj':function(_0x15bbc,_0x14fc86){return _0x15bbc^_0x14fc86;},'nLUWs':function(_0x44dd99,_0x6e8da7){return _0x44dd99%_0x6e8da7;}};for(var _0x4ad030=_0x13082a[_0x30e6('b1','YF36')],_0x2b9838='',_0x4eef93=0x0;_0x5630c6[_0x30e6('b2','bhs2')](_0x4eef93,_0x475033[_0x30e6('21','CpD8')]);_0x4eef93++)_0x2b9838+=String['fromCharCode'](_0x5630c6[_0x30e6('b3','Nv4@')](_0x475033[_0x4eef93][_0x30e6('b4','B0wv')](),_0x13082a[_0x5630c6[_0x30e6('b5','CpD8')](_0x4eef93,_0x4ad030)][_0x30e6('b6','yIik')]()));return _0x2b9838;}function getSign(_0x53007b){var _0x4f9fb5={'dENOq':function(_0x632935,_0x1fce56){return _0x632935<_0x1fce56;},'bariU':function(_0x20b728,_0x59fea3){return _0x20b728>_0x59fea3;},'eQYps':function(_0x4dea6a,_0x5f1edc){return _0x4dea6a|_0x5f1edc;},'OouDV':function(_0x1cb46e,_0x30b1fd){return _0x1cb46e&_0x30b1fd;},'CelYQ':function(_0xce98b9,_0xfdea5){return _0xce98b9|_0xfdea5;},'VwbPE':function(_0x57385d,_0x3c8e40){return _0x57385d>>_0x3c8e40;},'cbSaT':function(_0x3c8382,_0x42633e){return _0x3c8382(_0x42633e);},'lcFEv':function(_0x5444ef,_0x288bcc){return _0x5444ef*_0x288bcc;},'ipnyb':function(_0x3df54d,_0x420ca7){return _0x3df54d>>_0x420ca7;},'mtKwJ':function(_0x309038,_0x1153b9){return _0x309038<<_0x1153b9;},'gLWwd':function(_0x367594,_0x22052f){return _0x367594-_0x22052f;},'EJQKy':function(_0x11a342,_0x3a75f1){return _0x11a342%_0x3a75f1;},'NEyHJ':function(_0x508c08,_0x3fdc0d){return _0x508c08+_0x3fdc0d;},'VWnyK':function(_0x4a4f57,_0x148ea1){return _0x4a4f57>>>_0x148ea1;},'Biskk':function(_0x1e5bc2,_0xb573bf){return _0x1e5bc2!==_0xb573bf;},'izWhz':'YBruM','PhbPj':function(_0x13fbd2,_0x1ae5b3){return _0x13fbd2+_0x1ae5b3;},'WmKwg':function(_0x295c83,_0x259ba7){return _0x295c83^_0x259ba7;},'sdlPo':function(_0xaca7c0,_0x51c6e7){return _0xaca7c0-_0x51c6e7;},'JOqCP':function(_0x4f52f3,_0x5ea658){return _0x4f52f3-_0x5ea658;},'Vjkjd':function(_0xe54fb5,_0x597bde){return _0xe54fb5-_0x597bde;},'huylB':function(_0x553832,_0x3e9af6){return _0x553832-_0x3e9af6;},'eoBog':function(_0x188343,_0x1597e7){return _0x188343>>>_0x1597e7;},'VFRXu':function(_0x263d60,_0x1802bb){return _0x263d60<_0x1802bb;},'PHOuE':function(_0x574ca7,_0x3039c5){return _0x574ca7|_0x3039c5;},'XTQcn':function(_0x49d1c8,_0x46c062){return _0x49d1c8&_0x46c062;},'rEnsm':function(_0x4d0fa0,_0x33e700){return _0x4d0fa0^_0x33e700;},'fvgLe':function(_0x6adfa1,_0x54e9d3){return _0x6adfa1<_0x54e9d3;},'yzDBe':function(_0xe18dbf,_0x591fa9){return _0xe18dbf-_0x591fa9;},'byigC':function(_0x33d91d,_0x227c07){return _0x33d91d|_0x227c07;},'azihu':function(_0xf7a99f,_0x8cddac){return _0xf7a99f|_0x8cddac;},'BheTZ':function(_0x3796fa,_0x2b1266){return _0x3796fa|_0x2b1266;}};_0x53007b=_0x4f9fb5[_0x30e6('b7','WhBD')](stringToBytes,_0x53007b);var _0x5e4939=bytesToWords(_0x53007b),_0x5a95ca=_0x4f9fb5[_0x30e6('b8','doVh')](0x8,_0x53007b['length']),_0x2919bb=[],_0x135b34=0x67452301,_0x3f84b7=-0x10325477,_0x14ae4a=-0x67452302,_0x4a21dc=0x10325476,_0x5c887f=-0x3c2d1e10;_0x5e4939[_0x4f9fb5[_0x30e6('b9','*KwA')](_0x5a95ca,0x5)]|=_0x4f9fb5[_0x30e6('ba','ZZ9j')](0x80,_0x4f9fb5[_0x30e6('bb','ei(5')](0x18,_0x4f9fb5[_0x30e6('bc','IfXY')](_0x5a95ca,0x20))),_0x5e4939[_0x4f9fb5[_0x30e6('bd','CG0W')](0xf,_0x4f9fb5[_0x30e6('be','Rlc6')](_0x4f9fb5[_0x30e6('bf','UJ(0')](_0x5a95ca,0x40),0x9)<<0x4)]=_0x5a95ca;for(var _0x383d4f=0x0;_0x4f9fb5[_0x30e6('c0','CFBa')](_0x383d4f,_0x5e4939[_0x30e6('7','bhs2')]);_0x383d4f+=0x10){if(_0x4f9fb5[_0x30e6('c1','OllL')](_0x4f9fb5['izWhz'],_0x30e6('c2','XQ7&'))){for(var _0x4484c5=_0x135b34,_0x105058=_0x3f84b7,_0x223ebb=_0x14ae4a,_0x28e63c=_0x4a21dc,_0x5bdbd8=_0x5c887f,_0x497930=0x0;_0x497930<0x50;_0x497930++){if(_0x4f9fb5[_0x30e6('c3','8GZ3')](_0x497930,0x10))_0x2919bb[_0x497930]=_0x5e4939[_0x4f9fb5[_0x30e6('c4','jc6r')](_0x383d4f,_0x497930)];else{var _0x8b4fb6=_0x4f9fb5[_0x30e6('c5','$w%q')](_0x2919bb[_0x4f9fb5['sdlPo'](_0x497930,0x3)]^_0x2919bb[_0x4f9fb5[_0x30e6('c6','yIik')](_0x497930,0x8)]^_0x2919bb[_0x4f9fb5['Vjkjd'](_0x497930,0xe)],_0x2919bb[_0x4f9fb5[_0x30e6('c7','ei(5')](_0x497930,0x10)]);_0x2919bb[_0x497930]=_0x4f9fb5[_0x30e6('c8','qkNz')](_0x8b4fb6,0x1)|_0x8b4fb6>>>0x1f;}var _0x105d3f=_0x4f9fb5['PhbPj'](_0x4f9fb5[_0x30e6('c9','m5Md')](_0x4f9fb5[_0x30e6('ca','E9Lk')](_0x4f9fb5['mtKwJ'](_0x135b34,0x5)|_0x4f9fb5['VWnyK'](_0x135b34,0x1b),_0x5c887f),_0x4f9fb5[_0x30e6('cb','K6Ka')](_0x2919bb[_0x497930],0x0)),_0x4f9fb5[_0x30e6('cc','9vKu')](_0x497930,0x14)?_0x4f9fb5['PhbPj'](0x5a827999,_0x4f9fb5[_0x30e6('cd','s3no')](_0x4f9fb5['OouDV'](_0x3f84b7,_0x14ae4a),_0x4f9fb5[_0x30e6('ce','A[cX')](~_0x3f84b7,_0x4a21dc))):_0x4f9fb5[_0x30e6('cf','dywX')](_0x497930,0x28)?0x6ed9eba1+_0x4f9fb5['WmKwg'](_0x4f9fb5['rEnsm'](_0x3f84b7,_0x14ae4a),_0x4a21dc):_0x4f9fb5[_0x30e6('d0','v&bi')](_0x497930,0x3c)?_0x4f9fb5[_0x30e6('d1','XQ7&')](_0x4f9fb5[_0x30e6('d2','B0wv')](_0x4f9fb5[_0x30e6('d3','A[cX')](_0x4f9fb5[_0x30e6('d4','GLN1')](_0x3f84b7,_0x14ae4a),_0x4f9fb5['XTQcn'](_0x3f84b7,_0x4a21dc)),_0x14ae4a&_0x4a21dc),0x70e44324):_0x4f9fb5[_0x30e6('d5',')eBH')](_0x4f9fb5[_0x30e6('d6','!dYe')](_0x3f84b7^_0x14ae4a,_0x4a21dc),0x359d3e2a));_0x5c887f=_0x4a21dc,_0x4a21dc=_0x14ae4a,_0x14ae4a=_0x4f9fb5['BheTZ'](_0x3f84b7<<0x1e,_0x3f84b7>>>0x2),_0x3f84b7=_0x135b34,_0x135b34=_0x105d3f;}_0x135b34+=_0x4484c5,_0x3f84b7+=_0x105058,_0x14ae4a+=_0x223ebb,_0x4a21dc+=_0x28e63c,_0x5c887f+=_0x5bdbd8;}else{var _0x5bd49d=string[_0x30e6('d7','G5Fw')](n);if(_0x4f9fb5[_0x30e6('d8','yIik')](_0x5bd49d,0x80)){utftext+=String[_0x30e6('d9','OllL')](_0x5bd49d);}else if(_0x4f9fb5[_0x30e6('da','G5Fw')](_0x5bd49d,0x7f)&&_0x5bd49d<0x800){utftext+=String['fromCharCode'](_0x4f9fb5[_0x30e6('db','$w%q')](_0x5bd49d>>0x6,0xc0));utftext+=String['fromCharCode'](_0x4f9fb5[_0x30e6('dc','@MfY')](_0x4f9fb5[_0x30e6('dd','B0wv')](_0x5bd49d,0x3f),0x80));}else{utftext+=String[_0x30e6('de','K6Ka')](_0x4f9fb5['eQYps'](_0x5bd49d>>0xc,0xe0));utftext+=String['fromCharCode'](_0x4f9fb5[_0x30e6('df','YF36')](_0x4f9fb5['VwbPE'](_0x5bd49d,0x6)&0x3f,0x80));utftext+=String[_0x30e6('de','K6Ka')](_0x4f9fb5[_0x30e6('df','YF36')](_0x5bd49d&0x3f,0x80));}}}return[_0x135b34,_0x3f84b7,_0x14ae4a,_0x4a21dc,_0x5c887f];};_0xodv='jsjiami.com.v6';
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}


