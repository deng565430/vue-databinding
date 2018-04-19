function Vue(options) {
	this.data = options.data;
	var data = this.data;
	// {text: 'xx'}, this -> data {text: 'xxxx'}
	observe(data, this);
	var id = options.el;
	// 编译
	// this -> data {text: 'xxxx'}
	var dom = new Compile(document.getElementById(id), this);
	// 编译完成后，将dom返回到app中
	document.getElementById(id).appendChild(dom);
}

// 1、this.data = {text: 'xxxx'}
// 2、传到 observe Compile 里面