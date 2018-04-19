function Watcher(vm, node, name, type) {
	Dep.target = this;
	// text
	this.name = name;
	//节点
	this.node = node;
	//this
	this.vm = vm;
	// nodeValue
	this.type = type;
	this.update();
	Dep.target = null;
}

Watcher.prototype = {
	update: function() {
		this.get();
		var batcher = new Batcher();
		batcher.push(this)
	},
	cb: function() {
		// 订阅者执行相应操作
		this.node[this.type] = this.value;
	},
	// 获取data的属性值
	get: function() {
		// this.value 设置成员属性 hello world 取出来 通知observer ->dep
		// this.vm => 实例 get -> text -> dep -> add
		this.value = this.vm[this.name]; // 触发相应属性的get
	}
}