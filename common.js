		/*define函数*/
		var mymodules = (function() {
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