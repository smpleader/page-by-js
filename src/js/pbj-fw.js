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
		X() || console.error("PBJ-error: Application doesn't setup");
		let t = window.location.pathname, n = null;
		if (t in u) if (F(u[t])) n = u[t];
		else throw Error("Invalid view for ${path}");
		else n = V(() => "<h1>Page Not Found</h1>");
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
}, x = [], S = /* @__PURE__ */ new Map(), C = (e) => w(e) ? S.get(e) : !1, w = (e) => typeof e == "string" ? S.has(e) : typeof e == "object" && "_get" in e && typeof e._get == "function" && x.includes(e._get("_uuid")), T = (e, t) => {
	if (typeof e != "string" || S.has(e)) throw Error(`Model name must be unique and string (${e})`);
	if (typeof t == "function") t = { prepareData: t };
	else if (typeof t != "object" || !t.prepareData) throw Error("Model doesn't have function prepareData");
	return t._name = e, E(e, {
		_name: "protected",
		prepareData: "function"
	}, t);
}, E = (n, r, i) => {
	let a = "M" + e();
	if (x.includes(a)) return E(n, r, i);
	x.push(a), r._uuid = "protected", i._uuid = a;
	let o = new t(r, i), s = Object.freeze(o);
	return S.set(n, s), s;
}, D = [], O = null, k = null, A = [], j = [], M = () => {
	let e = p();
	if (!e) throw Error("View not found");
	let t = e._get("_uuid");
	j.includes(t + "before") || (j.push(t + "before"), e.runOnceBefore()), e.beforeRender();
	let n = e.render();
	N(), typeof n == "string" ? X(n) : O ? X(O.renderPage()) : console.warn("Nothing to show because template not set"), e.afterRender(), j.includes(t + "after") || (j.push(t + "after"), e.runOnceAfter());
}, N = () => {
	if (k && (A.forEach((e) => {
		let t = i(e);
		if (t && "data" in t) {
			let n = t.dataStructure ? t.dataStructure() : {};
			t.data(k.prepareData(n, e));
		}
	}), O)) for (let [e, t] of Object.entries(O.getPositions())) t.forEach((e) => {
		let t = i(e);
		if (t && "data" in t) {
			let n = t.dataStructure ? t.dataStructure() : {};
			t.data(k.prepareData(n, e));
		}
	});
}, P = () => {
	let e = p();
	return e ? e._get("context") : "--";
}, F = (e) => typeof e == "object" && "_get" in e && typeof e._get == "function" && D.includes(e._get("_uuid")), I = (e, ...t) => {
	let n = i(e);
	if (n) return A.push(n._get("_name")), t.length && n.data(...t), n;
	throw Error("Invalid model to use", mdl);
}, L = () => k, R = (e) => {
	let t = C(e);
	if (t) return k = t;
	throw Error("Invalid model to use", e);
}, z = () => O, B = (e) => {
	let t = v(e);
	if (t) return O = t;
	throw Error("Invalid template to use", e);
}, V = (t) => {
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
		O && O.afterRender(), "afterRender" in t && t.afterRender();
	}, n.mount = M, n.context = t.context ? t.context : "temp" + e(), n.render ||= t.render, H({
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
}, H = (n, r) => {
	let i = "V" + e();
	if (D.includes(i)) return H(n, r);
	D.push(i), r._uuid = i;
	let a = new t(n, r);
	return Object.freeze(a);
}, U = { "--": {} }, W = [], G = {}, K = {
	getState(e = "") {
		let t = JSON.parse(JSON.stringify(U)), n = e || P();
		return n in t ? t[n] : {};
	},
	subscribe(e) {
		return W.push(e), () => {
			W.splice(W.indexOf(e), 1);
		};
	},
	registerActions(e, t) {
		if (e in G || (G[e] = {}), Object.assign(G[e], t), "DEFAULT_VALUES" in t) {
			let n = t.DEFAULT_VALUES;
			U[e] = n({}, null);
		}
	},
	dispatch(e, t) {
		let n = P();
		if (G[n] && G[n][e]) {
			let r = G[n][e], i = U[n];
			U[n] = r(i, t), W.forEach((t) => t({ action: e }));
		}
	}
};
//#endregion
//#region src/safehtml.js
function q(e) {
	return typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : e;
}
function J(e, ...t) {
	return e.reduce((e, n, r) => {
		let i = t[r] === void 0 ? "" : t[r], a = Array.isArray(i) ? i.join("") : q(String(i));
		return e + n + a;
	}, "");
}
//#endregion
//#region src/index.js
var Y = "", X = (e) => {
	if (Y === "") {
		if (Y = document.getElementById(e), !Y) throw Error("Invalid App ID");
	} else typeof e == "string" && e != "" && (Y.innerHTML = e);
	return Y;
}, Z = (e, t = "app", n = "a[data-link]") => {
	X(t), window.addEventListener("DOMContentLoaded", () => {
		document.body.addEventListener("click", (e) => {
			e.target.matches(n) && (e.preventDefault(), m.navigate(e.target.getAttribute("href")));
		}), K.subscribe((e) => m.resolve(e)), typeof e == "function" && e(), m.resolve({ action: "DOMContentLoaded" });
	});
};
//#endregion
export { X as app, Z as bootup, o as createComponent, c as createContent, T as createModel, b as createTemplate, V as createView, L as currentModel, z as currentTemplate, s as generateComponentData, i as getComponent, P as getContext, v as getTemplate, p as getView, m as router, J as safehtml, K as store, I as useComponent, R as useModel, B as useTemplate, a as validComponent, y as validTemplate, F as validView };
