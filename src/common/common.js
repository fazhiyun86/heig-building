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

	/* 
	 * 向左侧滑动切换显示内容
	 * 此方法支持一拖多（点击一个按钮控制多个板块切换）
	 * 参数data说明：
		{
			ListDom:'按钮列表，例如：.building-inspection-floors',
			listName:'按钮，例如：li',
			showDomArr:数组
				[
					{
						showDom:'显示窗口，例如：.building-inspection-inner-cons',
						showList:'显示窗口的内容窗口，例如：.building-inspection-inner-cons-li',
						showUrl:'Ajax请求地址，例如：/user/reg.php'
					}
				]
		}
	 * */
	var slideDisplayToLeft = {};
	/*初始化*/
	slideDisplayToLeft.ini = function(data,callBack) {
		var listDom = data.ListDom;		/*按钮列表窗*/
		var listName = data.listName;	/*按钮列表名*/
		$(listDom).find(listName).on('click',function(){
			var obj = $(this);
			if(!obj.attr('class') || obj.attr('class').indexOf('active') == -1) {
				//选择的按钮不是选择状态
				if(obj.find('.active').length <= 0){
					$(listDom).find('.active').removeClass('active');
					if(obj.find('img').length > 0) {
						obj.find('img').addClass('active');
					} else {
						obj.addClass('active');
					}
					//被改变的元素信息
					var showDomArr = data.showDomArr;
					//将被改变的元素分别绑定到触发元素事件上
					for(var a=0; a<showDomArr.length; a++) {
						var theShowDom = showDomArr[a];
						var showDom = theShowDom.showDom;
						var showList = theShowDom.showList;
						var showUrl = theShowDom.showUrl;		//ajax请求地址
						var info = theShowDom;
						
						//获取数据并创建新的信息，此处的获取数据仅传了showUrl一个参数作为代表，实际使用数据时再按需添加
						slideDisplayToLeft.listData(showUrl,function(data){
							slideDisplayToLeft.creatNewDom(data,showDom,showList);
						});
					}
					callBack && callBack();
				}
			}
		});
	}
	/*获取新数据*/
	slideDisplayToLeft.listData = function(showUrl,callBack) {
		
		/**
		 * 此处通过判断或传值去加载不同的ajax数据
		 * ajax............................................................................
		 * ajax............................................................................
		 * ajax............................................................................
		 * 得到data，并callBack(data)
		 */
		var data = {};
		
		callBack && callBack(data);
	}
	/*使用新数据生成新的内容模块*/
	slideDisplayToLeft.creatNewDom = function(data,showDom,showList,direction) {
		/**
		 * 此处暂无ajax返回的data数据所以暂时先执行了拷贝以展示效果
		 * 有数据后再通过判断生成不同的dom到指定的地方
		 */
		var newCon = $(showDom).find(showList).eq(0).clone();
		if(direction == 'left') {
			newCon.css('margin-left','-50%');
			$(showDom).find(showList).eq(0).before(newCon);
			$(showDom).find(showList).eq(0)._upRight($(showDom).find(showList).eq(1));
		} else {
			$(showDom).find(showList).eq(0).after(newCon);
			$(showDom).find(showList).eq(0)._upLeft();
		}
	}
	
	BUILD.slideDisplayToLeft = slideDisplayToLeft;
	
	
	/*火灾分析详情页-日期切换内容*/
	var contentChangeFromDate = {
		/*新数据的获取和使用新数据生成内容模块的过程*/
		_content:function(direction,contentDom){
			//direction:添加方向，添加到元素的前面或后面（left,right）
			
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			var newCon = $(contentDom).find('.building-fire-card-wrap').eq(0).clone();
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			//此处应为调取数据的地方，暂时先执行了拷贝以展示效果
			if(direction == 'left') {
				newCon.css('margin-left','-50%');
				$(contentDom).find('.building-fire-card-wrap').eq(0).before(newCon);
				$(contentDom).find('.building-fire-card-wrap').eq(0)._upRight($(contentDom).find('.building-fire-card-wrap').eq(1))
			} else {
				$(contentDom).find('.building-fire-card-wrap').eq(0).after(newCon);
				$(contentDom).find('.building-fire-card-wrap').eq(0)._upLeft();
			}
			//绑定图片列表切换效果
			Build.imgSliderBang();
		},
		/*初始化*/
		ini:function(data){
			var btnsDom = data.btnsDom;
			var contentDom = data.contentDom;
			//如果没有记录当前显示第几个按钮内容的隐藏Input，则创建
			if($(btnsDom).find('.nowShowVal').length <=0) {
				var inpHidden = document.createElement('input');
				inpHidden.className = 'nowShowVal';
				inpHidden.type="hidden";
				inpHidden.value = '0';
				$(btnsDom).append(inpHidden);
			}
			if($(btnsDom).find('button').length > 0) {
				//为按钮编号
				for(var a=0; a<$(btnsDom).find('button').length; a++) {
					if(!$(btnsDom).find('button').eq(a).attr('datasrc')){
						$(btnsDom).find('button').eq(a).attr('datasrc',a);
					}
				}
				$(btnsDom).find('button').on('click',function(){
					$(btnsDom).find('.active').removeClass('active');
					$(this).addClass('active');
					//获取当前显示的第几个按钮的内容
					var nowShowVal = $(btnsDom).find('.nowShowVal').val();
					//获取当前按钮编号
					var btnNum = $(this).attr('datasrc');
					if(btnNum > nowShowVal) {
						//将当前按钮编号添加到记录的隐藏input
						$(btnsDom).find('.nowShowVal').val(btnNum);
						contentChangeFromDate._content('right',contentDom);
					}
					if(btnNum < nowShowVal) {
						//将当前按钮编号添加到记录的隐藏input
						$(btnsDom).find('.nowShowVal').val(btnNum);
						contentChangeFromDate._content('left',contentDom);
					}
				});
			}
		}
	};
	BUILD.contentChangeFromDate = contentChangeFromDate;
	
	window.BUILD = BUILD;
})();