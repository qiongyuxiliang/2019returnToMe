/*define函数*/
var mymodules = (function () {
	var modules = {};

	function define(name, deps, impl) {
		for (var i = 0; i < deps.length; i++) {
			deps[i] = modules[deps[i]]
		}
		modules[name] = impl.apply(impl, deps)
		console.log(modules);
	}

	function get(name) {
		return modules[name]
	}
	return {
		define: define,
		get: get
	}
})()
/*mymodules.define('bar', [], function() {
	function hello(who) {
		return 'let me introduce :' + who;
	};

	function cc(who) {
		return 'call me ' + who;
	}
	return {
		hello: hello,
		cc: cc
	}
})*/

/*版本比较*/
function compareVersion(v1, v2) {
	v1 = v1.split('.')
	v2 = v2.split('.')
	const len = Math.max(v1.length, v2.length)

	while (v1.length < len) {
		v1.push('0')
	}
	while (v2.length < len) {
		v2.push('0')
	}

	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i])
		const num2 = parseInt(v2[i])

		if (num1 > num2) {
			return 1
		} else if (num1 < num2) {
			return -1
		}
	}

	return 0
}

/*compareVersion('1.11.0', '1.9.9') */

/*观察者模式*/
//有一家猎人工会，其中每个猎人都具有发布任务(publish)，订阅任务(subscribe)的功能
//他们都有一个订阅列表来记录谁订阅了自己
//定义一个猎人类
//包括姓名，级别，订阅列表
function Hunter(name, level) {
	this.name = name
	this.level = level
	this.list = []
}
Hunter.prototype.publish = function (money) {
	console.log(this.level + '猎人' + this.name + '寻求帮助')
	this.list.forEach(function (item, index) {
		item(money)
	})
}
Hunter.prototype.subscribe = function (targrt, fn) {
	console.log(this.level + '猎人' + this.name + '订阅了' + targrt.name)
	targrt.list.push(fn)
}
//猎人工会走来了几个猎人
let hunterMing = new Hunter('小明', '黄金')
let hunterJin = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')
//Peter等级较低，可能需要帮助，所以小明，小金，小张都订阅了Peter
hunterMing.subscribe(hunterPeter, function (money) {
	console.log('小明表示：' + (money > 200 ? '' : '暂时很忙，不能') + '给予帮助')
})
hunterJin.subscribe(hunterPeter, function () {
	console.log('小金表示：给予帮助')
})
hunterZhang.subscribe(hunterPeter, function () {
	console.log('小张表示：给予帮助')
})
//Peter遇到困难，赏金198寻求帮助
hunterPeter.publish(198)
//猎人们(观察者)关联他们感兴趣的猎人(目标对象)，如Peter，当Peter有困难时，会自动通知给他们（观察者）

/*订阅-发布模式*/
//定义一家猎人工会
//主要功能包括任务发布大厅(topics)，以及订阅任务(subscribe)，发布任务(publish)
let HunterUnion = {
	type: 'hunt',
	topics: Object.create(null),
	subscribe: function (topic, fn) {
		if (!this.topics[topic]) {
			this.topics[topic] = [];
		}
		this.topics[topic].push(fn);
	},
	publish: function (topic, money) {
		if (!this.topics[topic])
			return;
		for (let fn of this.topics[topic]) {
			fn(money)
		}
	}
}
//定义一个猎人类
//包括姓名，级别
function Hunter(name, level) {
	this.name = name
	this.level = level
}
//猎人可在猎人工会发布订阅任务
Hunter.prototype.subscribe = function (topic, fn) {
	console.log(this.level + '猎人' + this.name + '订阅了狩猎' + topic + '的任务')
	HunterUnion.subscribe(topic, fn)
}
Hunter.prototype.publish = function (topic, money) {
	console.log(this.level + '猎人' + this.name + '发布了狩猎' + topic + '的任务')
	HunterUnion.publish(topic, money)
}
//猎人工会走来了几个猎人
let hunterMing = new Hunter('小明', '黄金')
let hunterJin = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')
//小明，小金，小张分别订阅了狩猎tiger的任务
hunterMing.subscribe('tiger', function (money) {
	console.log('小明表示：' + (money > 200 ? '' : '不') + '接取任务')
})
hunterJin.subscribe('tiger', function (money) {
	console.log('小金表示：接取任务')
})
hunterZhang.subscribe('tiger', function (money) {
	console.log('小张表示：接取任务')
})
//Peter订阅了狩猎sheep的任务
hunterPeter.subscribe('sheep', function (money) {
	console.log('Peter表示：接取任务')
})


// indexOf 源码
// indexOf compares searchElement to elements of the Array using strict
// equality (the same method used by the ===, or triple-equals, operator).
//
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
//
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
		"use strict";
		if (this == null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n != 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	}
}