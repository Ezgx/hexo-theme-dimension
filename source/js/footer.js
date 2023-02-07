function whenDOMReady() {
	marcus.randomLink()
}
var marcus = {
	saveData: (e, t) => {
		localStorage.setItem(e, JSON.stringify({
			time: Date.now(),
			data: t
		}))
	},
	loadData: (e, t) => {
		let n = JSON.parse(localStorage.getItem(e));
		if (n) {
			let e = Date.now() - n.time;
			if (-1 < e && e < 6e4 * t) return n.data
		}
		return 0
	},
	runtime: () => {
		var e = function(e) {
			return e > 9 ? e : "0" + e
		};
		let t = new Date("2022/08/03 00:00:00")
			.getTime(),
			n = (new Date)
			.getTime(),
			a = Math.round((n - t) / 1e3),
			r = "本站已运行：";
		a >= 86400 && (r += e(parseInt(a / 86400)) + " 天 ", a %= 86400), a >= 3600 && (r += e(parseInt(a / 3600)) + " 时 ", a %= 3600), a >= 60 && (r += e(parseInt(a / 60)) + " 分 ", a %= 60), a >= 0 && (r += e(a) + " 秒");
		let i = document.getElementById("runtime");
		i && (i.innerHTML = r), setTimeout(marcus.runtime, 1e3)
	},
	randomLink: () => {
		let e = marcus.loadData("links", 30);
		if (e) {
			let t = document.querySelectorAll("#friend-links-in-footer .footer-item");
			if (!t.length) return;
			for (let n = 0; n < 5; n++) {
				let a = parseInt(Math.random() * e.length);
				t[n].innerText = e[a].name, t[n].href = e[a].link, e.splice(a, 1)
			}
		} else fetch("/link.json")
			.then(e => e.json())
			.then(e => {
				marcus.saveData("links", e.link_list), marcus.randomLink()
			})
	}
};
marcus.runtime();