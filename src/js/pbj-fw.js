//#region src/utilities.js
function e() {
	return "xxxxxxxxxxxx".replace(/[x]/g, function(e) {
		let t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
//#endregion
//#region src/extendableClass.js
var t = class {
	constructor(e, t) {
		if (typeof e == "object") {
			for (let n in e) if (n in t) if (e[n].includes("function") && n != "_get") typeof t[n] == "function" && (this[n] = (...e) => t[n](...e));
			else if (e[n].includes("protected")) {
				let e = "#" + n;
				this[e] = t[n];
			} else this[n] = t[n];
			else if (!e[n].includes("optional")) throw Error(`Can't create class because "${n}" is not set`);
		}
	}
	_get(e) {
		if (e = "#" + e, e in this) return this[e];
	}
}, n = [], r = /* @__PURE__ */ new Map(), i = (e) => a(e) ? r.get(e) : !1, a = (e) => typeof e == "string" ? r.has(e) : typeof e == "object" && "_get" in e && typeof e._get == "function" && n.includes(e._get("_uuid")), o = (e, t) => {
	if (r.has(e)) throw Error(`Component name must be unique and string (${e})`);
	return t._name = e, l(e, {
		_name: "protected",
		render: "function",
		afterRender: "function|optional",
		dataStructure: "function|optional",
		data: "function"
	}, t);
}, s = (e, t) => {
	if (a(e) && typeof t == "function") {
		let n = r.get(e), i = n.dataStructure ? n.dataStructure() : {};
		n.data(t(i, e));
	}
	return !1;
}, c = (t, n = null) => {
	let r = {
		_name: "protected",
		render: "function",
		afterRender: "function|optional"
	}, i = "", a = {};
	if (n === null ? (i = "Content" + e(), typeof t == "string" ? a.render = () => t : typeof t == "function" ? a.render = t : a = t) : (typeof t == "string" ? i = t : typeof t == "function" && (i = "Content" + e(), a.render = t, typeof n == "function" && (a.afterRender = n)), typeof n == "string" ? a.render = () => n : !a.render && typeof n == "function" && (a.render = n)), typeof a != "object") throw Error("Invalid input to create Content");
	return a._name = i, l(i, r, a);
}, l = (i, a, o) => {
	let s = e();
	if (n.includes(s)) return l(i, a, o);
	n.push(s), a._uuid = "protected", o._uuid = s;
	let c = new t(a, o), u = Object.freeze(c);
	return r.set(i, u), u;
}, u = {}, d = {}, f = null, p = () => f, m = {
	getRouteState: () => d,
	registerRoutes(e, t) {
		let n = Object.keys(u).filter((e) => e in t);
		n.length > 0 ? console.error(`Path already registered: '${n.join("','")}'`) : Object.assign(u, t);
	},
	navigate(e) {
		history.pushState(null, null, e), this.resolve({
			action: "navigate",
			slug: e
		});
	},
	resolve(e = null) {
		J() || console.error("PBJ-error: Application doesn't setup");
		let t = window.location.pathname, n = null;
		if (t in u) if (N(u[t])) n = u[t];
		else throw Error("Invalid view for ${path}");
		else n = z(() => "<h1>Page Not Found</h1>");
		if (!n) throw Error("View not found");
		typeof e == "object" && Object.assign(d, e), Object.assign(d, {
			current: n,
			slug: t
		}), f !== null && f.unmount(), f = n, n.mount();
	}
};
window.addEventListener("popstate", () => m.resolve({ action: "popstate" }));
//#endregion
//#region src/template.js
var h = class {
	#e;
	#t;
	#n;
	#r;
	#i = !1;
	#a;
	#o = !1;
	constructor(e, t, n, r) {
		if (typeof e != "string" || _[e]) throw Error(`Template name must be unique and string (${e})`);
		if (this.#e = e, this.#t = r, this.#n = t, this.#a = {}, typeof n == "object" && (this.#a = n), !this.#a.render) throw Error(`Can't create tempate ${e} because of function render not found`);
		this.#r = {};
		let i = [...t.matchAll(/\{([\w.]+)\}/g)].map((e) => e[1]);
		for (let e of i) this.#r[e] = [];
	}
	getId() {
		return this.#t;
	}
	getName() {
		return this.#e;
	}
	renderPage(...e) {
		if (this.#i) {
			this.#i = !1, console.warn("Call renderPage inside render function is unacceptable");
			return;
		} else this.#i = !0;
		!this.#o && this.#a.runOnce && (this.#a.runOnce(...e), this.#o = !0);
		let t = this.#a.render(...e);
		if (typeof t == "string") return this.#i = !1, t;
		let n = this.getName(), r = this.#n.replace(/\{\s*([\w.]+)\s*\}/g, (e, t) => {
			let r = "", a = "render" + t.charAt(0).toUpperCase() + t.slice(1);
			if (typeof this.#a[a] == "function") {
				let e = this.#a[a](this.#r[t]);
				r = typeof e == "string" ? e : "";
			} else this.#r[t].forEach((e, a) => {
				r += i(e).render({
					tpl: n,
					position: t
				});
			});
			return r;
		});
		return this.#i = !1, r;
	}
	getPositions() {
		return this.#r;
	}
	afterRender() {
		for (let [e, t] of Object.entries(this.#r)) t.forEach((e) => {
			let t = i(e);
			t && t.afterRender && t.afterRender();
		});
	}
	add(e, t, ...n) {
		if (e in this.#r && a(t)) {
			let r = typeof t == "object" ? t._get("_name") : t, a = this.#r[e].push(r);
			return n.length > 0 && i(r).data(...n), a - 1;
		}
		return !1;
	}
	arrange(e, t) {
		if (e in this.#r && typeof t == "function") {
			let n = t(this.#r[e]);
			Array.isArray(n) && (n.forEach((e, t) => {
				if (!a(e)) throw Error("Invalid component name");
			}), this.#r[e] = n);
		}
	}
}, g = [], _ = {}, v = (e) => y(e) ? _[e] : !1, y = (e) => typeof e == "string" ? e in _ : typeof e == "object" && "getId" in e && typeof e.getId == "function" && g.includes(e.getId()), b = (t, n, r) => {
	let i = e();
	if (g.includes(i)) return b(t, n, r);
	typeof _functions == "function" && (_functions = { render: _functions });
	let a = new h(t, r, n, i);
	g.push(i);
	let o = Object.freeze(a);
	return _[t] = o, o;
}, x = [], S = /* @__PURE__ */ new Map(), C = (e) => w(e) ? S.get(e) : !1, w = (e) => typeof e == "string" ? S.has(e) : typeof e == "object" && "_get" in e && typeof e._get == "function" && x.includes(e._get("_uuid")), T = [], E = null, D = null, O = [], k = [], A = () => {
	let e = p();
	if (!e) throw Error("View not found");
	let t = e._get("_uuid");
	k.includes(t + "before") || (k.push(t + "before"), e.runOnceBefore()), e.beforeRender();
	let n = e.render();
	j(), typeof n == "string" ? J(n) : E ? J(E.renderPage()) : console.warn("Nothing to show because template not set"), e.afterRender(), k.includes(t + "after") || (k.push(t + "after"), e.runOnceAfter());
}, j = () => {
	if (D && (O.forEach((e) => {
		if (com = i(e)) {
			let t = com.dataStructure ? com.dataStructure() : {};
			com.data(D.prepareData(t, e));
		}
	}), E)) for (let [e, t] of Object.entries(E.getPositions())) t.forEach((e) => {
		if (e = i(comName)) {
			let t = e.dataStructure ? e.dataStructure() : {};
			e.data(D.prepareData(comName, t));
		}
	});
}, M = () => {
	let e = p();
	return e ? e._get("context") : "--";
}, N = (e) => typeof e == "object" && "_get" in e && typeof e._get == "function" && T.includes(e._get("_uuid")), P = (e, ...t) => {
	let n = i(e);
	if (n) return O.push(n._get("_name")), t.length && n.data(...t), n;
	throw Error("Invalid model to use", mdl);
}, F = () => D, I = (e) => {
	let t = C(e);
	if (t) return D = t;
	throw Error("Invalid model to use", e);
}, L = () => E, R = (e) => {
	let t = v(e);
	if (t) return E = t;
	throw Error("Invalid template to use", e);
}, z = (t) => {
	let n = {};
	if (typeof t == "function") n.render = t, t = {};
	else if (typeof t != "object" || !t.render) throw Error("Can't create view because of invalid parameters");
	return [
		"unmount",
		"runOnceBefore",
		"beforeRender",
		"runOnceAfter"
	].forEach((e) => {
		n[e] = t[e] ? t[e] : () => {};
	}), n.afterRender = () => {
		E && E.afterRender(), t.afterRender();
	}, n.mount = A, n.context = t.context ? t.context : "temp" + e(), n.render ||= t.render, B({
		_uuid: "protected",
		context: "protected",
		mount: "function",
		unmount: "function",
		runOnceBefore: "function",
		beforeRender: "function",
		render: "function",
		runOnceAfter: "function",
		afterRender: "function"
	}, n);
}, B = (n, r) => {
	let i = "V" + e();
	if (T.includes(i)) return B(n, r);
	T.push(i), r._uuid = i;
	let a = new t(n, r);
	return Object.freeze(a);
}, V = { "--": {} }, H = [], U = {}, W = {
	getState(e = "") {
		let t = JSON.parse(JSON.stringify(V)), n = e || M();
		return n in t ? t[n] : {};
	},
	subscribe(e) {
		return H.push(e), () => {
			H.splice(H.indexOf(e), 1);
		};
	},
	registerActions(e, t) {
		if (e in U || (U[e] = {}), Object.assign(U[e], t), "DEFAULT_VALUES" in t) {
			let n = t.DEFAULT_VALUES;
			V[e] = n({}, null);
		}
	},
	dispatch(e, t) {
		let n = M();
		if (U[n] && U[n][e]) {
			let r = U[n][e], i = V[n];
			V[n] = r(i, t), H.forEach((t) => t({ action: e }));
		}
	}
};
//#endregion
//#region src/safehtml.js
function G(e) {
	return typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : e;
}
function K(e, ...t) {
	return e.reduce((e, n, r) => {
		let i = t[r] === void 0 ? "" : t[r], a = Array.isArray(i) ? i.join("") : G(String(i));
		return e + n + a;
	}, "");
}
//#endregion
//#region src/index.js
var q = "", J = (e) => {
	if (q === "") {
		if (q = document.getElementById(e), !q) throw Error("Invalid App ID");
	} else typeof e == "string" && e != "" && (q.innerHTML = e);
	return q;
}, Y = (e, t = "app", n = "a[data-link]") => {
	J(t), window.addEventListener("DOMContentLoaded", () => {
		document.body.addEventListener("click", (e) => {
			e.target.matches(n) && (e.preventDefault(), m.navigate(e.target.getAttribute("href")));
		}), W.subscribe((e) => m.resolve(e)), typeof e == "function" && e(), m.resolve({ action: "DOMContentLoaded" });
	});
};
//#endregion
export { J as app, Y as bootup, o as createComponent, c as createContent, b as createTemplate, z as createView, F as currentModel, L as currentTemplate, s as generateComponentData, i as getComponent, M as getContext, v as getTemplate, p as getView, m as router, K as safehtml, W as store, P as useComponent, I as useModel, R as useTemplate, a as validComponent, y as validTemplate, N as validView };
