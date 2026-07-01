//#region src/store.js
var e = { "--": {} }, t = "--", n = [], r = {}, i = {
	getState(n = "") {
		let r = JSON.parse(JSON.stringify(e)), i = n || t;
		return i in r ? r[i] : {};
	},
	subscribe(e) {
		return n.push(e), () => {
			n.splice(n.indexOf(e), 1);
		};
	},
	setContext(e) {
		return t = e, this;
	},
	registerActions(t, n) {
		if (t in r || (r[t] = {}), Object.assign(r[t], n), "DEFAULT_VALUES" in n) {
			let r = n.DEFAULT_VALUES;
			e[t] = r({}, null);
		}
	},
	dispatch(i, a) {
		if (r[t] && r[t][i]) {
			let o = r[t][i], s = e[t];
			e[t] = o(s, a), n.forEach((e) => e({ action: i }));
		}
	}
}, a = {}, o = {}, s = [], c = {
	render: () => "<h1>Page Not Found</h1>",
	title: "NotFound"
}, l = {
	getRouteState: () => o,
	registerRoutes(e, t) {
		let n = Object.keys(a).filter((e) => e in t);
		n.length > 0 ? console.error(`Path already registered: '${n.join("','")}'`) : Object.assign(a, t);
	},
	navigate(e) {
		history.pushState(null, null, e), this.resolve({
			action: "navigate",
			slug: e
		});
	},
	resolve(e = null) {
		let t = window.location.pathname, n = c;
		t in a && (n = a[t]), console.log("resolve", t, n), typeof e == "object" && Object.assign(o, e), Object.assign(o, {
			current: n,
			slug: t
		}), i.setContext(n.name), document.title = n.title, document.getElementById("app").innerHTML = n.render(), s.includes(n.name) || (s.push(n.name), typeof n.runOnce == "function" && n.runOnce()), typeof n.initEvents == "function" && n.initEvents();
	}
};
window.addEventListener("popstate", () => l.resolve({ action: "popstate" }));
//#endregion
//#region src/safehtml.js
function u(e) {
	return typeof e == "string" ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : e;
}
var d = (e, ...t) => e.reduce((e, n, r) => {
	let i = t[r] === void 0 ? "" : t[r], a = Array.isArray(i) ? i.join("") : u(String(i));
	return e + n + a;
}, "");
//#endregion
export { l as router, d as safehtml, i as store };
