function Compile(node, vm) {
	// id节点  this对象
	if (node){
		// 节点 vm对象 -> data text
		this.$frag = this.nodeToFragment(node, vm);
		return this.$frag;
	}
}
Compile.prototype = {
	nodeToFragment: function(node, vm){
		var self = this;
		var frag = document.createDocumentFragment();
		var child;

		while(child = node.firstChild){
			// 当前元素的子节点 
			self.compileElement(child, vm);
			frag.append(child); // 将所有子节点添加到fragment中
		}
		return frag;
	},
	compileElement: function(node, vm){
		var reg = /\{\{(.*)\}\}/;
		// 节点类型为元素
		if (node.nodeType === 1) {
			if (reg.test(node.textContent)){
		        var name = RegExp.$1 //获取匹配到的字符串
		        name = name.trim();
		        new Watcher(vm, node, name, 'textContent');
		        return;
		    }
			var attr = node.attributes;
			// 解析属性
			for(var i = 0; i < attr.length; i++) {
				if (attr[i].nodeName == 'v-model') {
					var name = attr[i].nodeValue; // 获取v-model绑定的属性名
					node.addEventListener('input', function(e){
						// 给相应的Data属性赋值， 进而触发该属性的set方法
						vm[name] = e.target.value;
					});
					// node.value = vm[name]; // 将data的值赋给该node
					new Watcher(vm, node, name, 'value');
				}
			}
		}
		if (node.nodeType === 3) {
			if (reg.test(node.nodeValue)) {
				var name = RegExp.$1; // 获取匹配到的字符串
				name = name.trim();
				// node.nodeValue = vm[name]; // 将data 的值赋给node
				// this 节点 dom text
				new Watcher(vm, node, name, 'nodeValue');
			}
		}
	}
}