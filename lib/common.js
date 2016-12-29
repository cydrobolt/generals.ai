class Common {
    constructor () {
        this.delta = function(e, t) {
            if (!e || e.length != t.length) return [0, t.length].concat(t);
            for (var n = [], r = !0, o = 0, i = 0; i < t.length; i++) r ? e[i] !== t[i] && (n.push(o), o = 0, r = !1) : r || e[i] === t[i] && (r = !1, n.push(o), Array.prototype.push.apply(n, t.slice(i - o, i)), r = !0, o = 0), o++;
            return r && n.push(o), r || (n.push(o), Array.prototype.push.apply(n, t.slice(t.length - o))), n
        }
        this.patch = function(e, t) {
            for (var n = [], r = 0; r < t.length;) t[r] && Array.prototype.push.apply(n, e.slice(n.length, n.length + t[r])), r++, r < t.length && t[r] && (Array.prototype.push.apply(n, t.slice(r + 1, r + 1 + t[r])), r += t[r]), r++;
            return n
        }
    }
}

export { Common }
