// 生成dom树

function Element (el) {
	this.tagName = el.tagName;
	this.props = el.props;
	this.children = el.children;
}

Element.prototype.render = function () {
	var el = document.createElement(this.tagName);
	var props = this.props;

	// 设置节点的DOM属性
	for(var propName in props) {
		var propValue = props[propName];
		el.setAttribute(propName, propValue);
	}

	var children = this.children || [];

	children.forEach(function(child) {
		var childEl
		if (child.tagName) {
			childEl = new Element(child).render() // 如果子节点也是虚拟DOM, 地柜构建DOM节点
		} else {
			childEl = document.createTextNode(child) // 如果是字符串， 只构建文本节点
		}
		el.appendChild(childEl)
			
	})
	return el
}

const dom = {
	tagName: 'div',
	props: {
		id: 'parent'
	},
	children: [
		{
			tagName: 'p',
			props: {class: 'child'},
			children: ['item1']
		},
		{
			tagName: 'p',
			props: {class: 'child'},
			children: ['item2']
		},
		{
			tagName: 'p',
			props: {class: 'child'},
			children: ['item3']
		},
		[' 这是文本节点']
	]
}
const el = new Element(dom);
document.body.appendChild(el.render())