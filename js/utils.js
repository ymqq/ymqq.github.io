(function($, win, tools) {
	
	tools.getUrlArg4Key = function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return "";
	};
	
	/**	模块化 封装sessionStorage
	* Func Name: sesStorage
	* Func Disc: 
	* Author: ChenQq
	* Date: 2012-07-10
	* Update Author: ChenQq
	* Update Date: 2012-07-11
	**/
	tools.sesStorage = (function() {
		var _Storage = {};
		/* 读取*/
		_Storage.get = function(key) {
			/* 从sessionstorage中取得数据*/
			var value = sessionStorage.getItem(key);
			/* 如果是json数据格式，则解析成JSON格式数据对象*/
			return (/^(\{|\[).*(\}|\])$/).test(value) ? JSON.parse(value) : value;
		};
		
		/* 保存*/
		_Storage.set = function(key, value) {
			/* 如果value是一个对象，则使用JSON序列化成一个字符串*/
			var serializable = $.isArray(value) || $.isPlainObject(value);
			var storageValue = serializable ? JSON.stringify(value) : value;
			/* 存储到sessionStorage中*/
			sessionStorage.setItem(key, storageValue);
		};
		
		/* 删除*/
		_Storage.remove = function(key) {
			sessionStorage.removeItem(key);
		};
		
		/* 删除*/
		_Storage.clear = function() {
			sessionStorage.clear();
		};

		return _Storage;
	})();
	
	/**模块化 封装localStorage
	* Func Name: locStorage
	* Func Disc: 
	* Author: ChenQq
	* Date: 2012-07-11
	* Update Author: ChenQq
	* Update Date: 2012-07-11
	**/
	tools.locStorage = (function() {
		var _Storage = {};
		/* 读取*/
		_Storage.get = function(key) {
			/* 从sessionstorage中取得数据*/
			var value = localStorage.getItem(key);
			/* 如果是json数据格式，则解析成JSON格式数据对象*/
			return (/^(\{|\[).*(\}|\])$/).test(value) ? $.parseJSON(value) : value;
		};
		
		/* 保存*/
		_Storage.set = function(key, value) {
			/* 如果value是一个对象，则使用JSON序列化成一个字符串*/
			var serializable = $.isArray(value) || $.isPlainObject(value);
			var storageValue = serializable ? $.toJSON(value) : value;
			/* 存储到sessionStorage中*/
			localStorage.setItem(key, storageValue);
		};
		
		/* 删除*/
		_Storage.remove = function(key) {
			localStorage.removeItem(key);
		};

		/* 删除*/
		_Storage.clear = function() {
			localStorage.clear();
		};
		
		return _Storage;
	})();
	
}(mui, window, window.utils = {}));