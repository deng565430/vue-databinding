((w) => {
	w.listenerList = new Set();
	const _cache = w.addEventListener;
	const handler = {
		apply: (target, thisBinding, args) => {
			target();
			listenerList.add(args[0]);
			Reflect.apply(_cache, w, args)
		}
	}
	w.addEventListener = new Proxy((event, fn) => {
	}, handler)
})(window)

window.addEventListener('click', function(){console.log(111)});
window.addEventListener('dasd', function(){});
for(const val of listenerList) {
	console.log(val)
}