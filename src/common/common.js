(function () {
	var BUILD = {}
	
	// 导出
	BUILD.getDataUrl = function (api) {
    return 'http://114.115.144.251:8001/WebApi/DataExchange/GetData/' + api + '?dataKey=00-00-00-00';
  }
  // 导入
  BUILD.sendDataUrl = function (api) {
    return 'http://114.115.144.251:8001/WebApi/DataExchange/SendData/' + api + '?dataKey=00-00-00-00';
  }
	
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

	/**
	 * [alert ]
	 * @param  {[type]} content [description]
	 * @return {[type]}         [description]
	 * @example
	 * 		BUILD.alert("操作成功")
	 */
	
	BUILD.alert = function (content) {
		var $target = $(".building-alert");
		var html = '';
		if ($target[0]) {
			$target.remove();
		} 

		html += '<div class="building-alert">\
	        <p class="building-alert_content">' + content + '</p>\
	    </div>';
		
		$("body").append(html)

		setTimeout(function () {
			$(".building-alert").fadeOut('normal', function () {
				$(".building-alert").remove();
			});
		}, 3000)
	}
	
	/**
	 * 全选单选
	 * @param  {[object]} opt [{
	 *           parentWrap // 父集合容器的名字
	 *           allEl      // 全选的单选框的名字
	 *           itemsEl    // 每个单选框的名字
	 *           itemIDName // 属性的名字
	 * }]
	 * @example
	 * 		var select = new BUILD.selectAll({
	 * 			parentWrap: '.building-card',
	 * 			allEl: '.building-style-all',
	 * 			itemsEl: '.building-style-item',
	 * 			itemIDName: 'data-id'
	 * 		})
	 * 		select.init();
	 * 		select.getItemVal(); // 获取选中复选框的val值
	 */
	
	BUILD.selectAll = function (opt) {
		opt = Object.assign({}, opt);

		this.parentWrap = opt.parentWrap;
		this.allEl = opt.allEl;
		this.itemsEl = opt.itemsEl;
		this.itemIDName = opt.itemIDName;
	}
	BUILD.selectAll.prototype.init = function () {
		var _this = this;
		var $allEl = $(_this.allEl),
			$itemsEl = $(_this.itemsEl),
			strAllEl = _this.allEl,
			strItemsEl = _this.itemsEl,
			$parentWrap = $(_this.parentWrap);

		$parentWrap.on('click', strAllEl, function (e) {
			e.stopPropagation();
			var $target = $(e.target);
			var nowAllVal = $target.prop('checked');

			$itemsEl.each(function (key, val) {
				$(val).prop('checked', nowAllVal)
			})
		})

		$parentWrap.on('click', strItemsEl, function (e) {
			e.stopPropagation();
			var tempVal = false;
			$itemsEl.each(function (key, val) {
				var itemVal = $(val).prop('checked');

				if (!itemVal) {
					// 不能选中全部
					tempVal = false;
					return false;
				} else {
					tempVal = true	
				}
			})

			if (tempVal) {
				$allEl.prop('checked', true)
			} else {
				$allEl.prop('checked', false)
			}
		})
	}
	BUILD.selectAll.prototype.getItemVal = function () {
		var _this = this,
			result = [];
		var $itemsEl = $(_this.itemsEl),
			IDName = _this.itemIDName;

		$itemsEl.each(function (key, val) {
			var itemStatue = $(val).prop('checked');
			if (itemStatue) {
				var itemVal = $(val).attr(IDName);
				result.push(itemVal);
			}
		})
		return result;
	}
	
	window.BUILD = BUILD;
})();