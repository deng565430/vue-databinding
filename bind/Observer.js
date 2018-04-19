function defineReactive(obj, key, val) {
	// obj -> this    key -> text   val ->'xxxx'
	var dep = new Dep();
	Object.defineProperty(obj, key, {
		get: function(){
			// 添加订阅者watcher到主题对象Dep
			if (Dep.target) {
				// JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
				dep.addSub(Dep.target);
			}
			return val
		},
		set: function(newVal) {
			if (newVal === val) return;
			val = newVal;
			// 作为发布者发出通知
			dep.notify();
		}
	})
}

// obj -> {text: 'xxx'}  vm -> this -> {text: 'xxxx'}
function observe(obj, vm) {
	Object.keys(obj).forEach(function(key) {
		// this text 'xxx'
		defineReactive(vm, key, obj[key]);
	})
}