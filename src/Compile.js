function Compile(node, vm) {
  // 1 id节点 2 this对象
  if(node) {
    // 1节点 2vm对象
    this.$frag = this.nodeToFragment(node, vm);
    return this.$frag;
  }
}

Compile.prototype = {
  nodeToFragment: function (node, vm) {
    var self = this;
    // 创建文档代码片段
    var frag = document.createDocumentFragment();
    var child;
    var childNodes = node.childNodes;
    while (child = node.firstChild) {
      self.compileElement(child, vm);
      // 将所有子节点添加到fragment中
      frag.appendChild(child);
    }
    return frag;
  },
  compileElement: function (node, vm) {

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
        if (attr[i].nodeName === 'v-model') {
          var name = attr[i].nodeValue; //获取 v-model 绑定的值
          node.addEventListener('input', function (e) {
            // 给相应的Data属性赋值 进而触发该属性set的方法
            vm[name] = e.target.value;
          });
          new Watcher(vm, node, name, 'value');
        }
      }
    }

    // 节点类型为text
    if(node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        var name = RegExp.$1 //获取匹配到的字符串
        name = name.trim();
        // this 节点(dom) text 'nodeValue'
        new Watcher(vm, node, name, 'nodeValue');
      }
    }
  }
}

