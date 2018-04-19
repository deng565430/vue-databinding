function Watcher(vm, node, name, type) {
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.type = type;
  this.update()
  Dep.target = null;
}

Watcher.prototype = {
  update: function () {
    this.get();
    var batcher = new Batcher();
    batcher.push(this);
  },
  cb: function () {
    // 订阅者执行相应操作
    this.node[this.type] = this.value;
  },
  // 获取data的属性值
  get: function () {
    // this.value 设置成员属性 helloworld 取出来 通知observer -> dep
    // this.vm => 实例 get -> text -> dep -> add
    this.value = this.vm[this.name];// 触发相应属性的get
  }
}
