(function () {
	var BUILD = {}
	
	/**
	 * 设置侧边滑动框的方法
	 * @param {string} el  aside的id或者class
	 * @param {object} opt 一些配置项
	 */
	BUILD.setSlider = function (el, opt) {
		this.el = $(el)

		opt = opt || {}
		this.showClass = opt.showClass || 'show'
	}
	BUILD.setSlider.prototype.show = function (callback) {
		this.el.addClass(this.showClass)
		callback && callback()
	}
	BUILD.setSlider.prototype.close = function (callback) {
		this.el.addClass(this.showClass)
		callback && callback()
	}
	BUILD.setSlider.prototype.toggle = function (fn1, fn2) {
		this.el.toggleClass(this.showClass)
		var isShow = this.el.hasClass('show');
		if (isShow) {
			// 显示
			fn1 && fn1();
		} else {
			fn2 && fn2();
		}
	}


	BUILD.setRegionTree = function () {
		
	}
	
	window.BUILD = BUILD;
})()