(function() {
	/**
	* 对Date的扩展，将 Date 转化为指定格式的String 
	* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	* 例子： 
	* 	(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	* 	(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	*/
	Date.prototype.Format = function(fmt) { 
		//author: meizz 
		var o = { 
			"M+" : this.getMonth()+1,                 //月份 
			"d+" : this.getDate(),                    //日 
			"h+" : this.getHours(),                   //小时 
			"m+" : this.getMinutes(),                 //分 
			"s+" : this.getSeconds(),                 //秒 
			"q+" : Math.floor((this.getMonth()+3)/3), //季度 
			"S"  : this.getMilliseconds()             //毫秒 
		}; 
		if(/(y+)/.test(fmt)) {
			fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		}
		for(var k in o) {
			if(new RegExp("("+ k +")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			}
		} 
		return fmt; 
	}
}());

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