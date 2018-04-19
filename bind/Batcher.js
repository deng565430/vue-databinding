// 批量更新函数
function Batcher() {
	this.reset();
}

// 批量处理重置
Batcher.prototype.reset = function() {
	this.has = {};
	this.queue = [];
	this.waiting = false;
}

// 添加事件队列
Batcher.prototype.push = function(job) {
	console.log(job)
	if (!this.has[job.name]) {
		this.queue.push(job);
		this.has[job.name] = job;
		if (!this.waiting) {
			this.waiting = true;
			// 优雅降级 promise MutationObserver setTimeout
			setTimeout(() => {
				this.flush();
			}, 0)
		}
	}
}

// 执行并清空事件队列
Batcher.prototype.flush = function() {
	this.queue.forEach(job => {
		job.cb();
	});
	this.reset();
}