;
(function($) {

	document.onselectstart = function() {
		return false;
	}

	var jQueryAddon = {
		/**
		  按钮触发该函数。
		  点击按钮展示/隐藏效果。
		  鼠标移出，隐藏下拉框。
		  example: $('[data-toggle="dropdown"]')._dropdown();
		*/
		_dropdown: function() {
			var _btn = this;
			var $dropdown = $(_btn).parent();
			var $dropdownList = $(_btn).next();

			$(_btn).on('click', function() {
				$dropdown.toggleClass('active');
			});

			$dropdownList.on('mouseleave', function(e) {
				$dropdown.removeClass('active');
			});
		},
		/**
		  按钮触发该函数。
		  点击按钮，切换滑出效果。
		  example：$('[data-toggle="slide"]')._slide();
		*/
		_slide: function() {
			var _callers = this;

			for(var i = 0; i < _callers.length; i++) {
				var $self = $(_callers[i]);
				var _selectorPrefix = '.building-slider-';
				var _direction = $self.attr('data-direct');

				(function(_direction) {
					$self.on('click', function() {
						var _selector = _selectorPrefix + _direction;
						$(_selector).toggleClass('active');
						if(_direction === 'left') {
							$(_selectorPrefix + 'bottom').toggleClass('active');
						}
					});
				}(_direction));
			}
		},
		/*
		  导航切换
		  导航栏父元素触发该事件。
		*/
		_toggleItem: function() {
			var $root = this;
			$root.on('click', function(evt) {
				var $src = $(evt.target);
				$root.children().removeClass('active');
				$src.addClass('active');
				evt.preventDefault();
			});
		},
		/*导航栏回调操作*/
		_menuCallback: function(actions) {
			var $root = $(this);
			$root.on('click', function (evt) {
				var $src = $(evt.target);
				var href = $src.attr('href');
				console.log(this)
				var key = href.substring(1);
				actions[key]();
			});		
		},
		/*	关闭窗口
		 *	$('.building-window-close')._close();
		 * */
		_close: function() {
			var _btn = $(this);
			_btn.on('click', function() {
				var _dom = $(this).parent();
				_dom.fadeOut();
			})
		},
		/*
		 *向左滑动切换效果 
		 * */
		_upLeft: function(speed, upLeftNum) {
			var dom = $(this);
			/*upLeftNum:向左滑动的数值，缺省时默认为-50%*/
			if(!upLeftNum) {
				upLeftNum = '-50%';
			}
			//speed动画周期，如果缺省则默认为300毫秒
			if(!speed) {
				speed = 300;
			}
			//指定元素向左移动
			dom.animate({
				'margin-left': upLeftNum
			}, speed);
			//删除指定元素
			setTimeout(function() {
				dom.remove();
			}, speed);
		},
		/*
		 *向右滑动切换效果 
		 * */
		_upRight: function(deleteDom, speed, upLeftNum) {
			//deleteDom:需要删除的元素

			var dom = $(this);
			/*upLeftNum:向右滑动的数值，缺省时默认为0（既将向左偏移的元素归正）*/
			if(!upLeftNum) {
				upLeftNum = '0';
			}
			//speed动画周期，如果缺省则默认为300毫秒
			if(!speed) {
				speed = 300;
			}
			//指定元素向左移动
			dom.animate({
				'margin-left': upLeftNum
			}, speed);

			//删除指定元素
			if(deleteDom) {
				setTimeout(function() {
					deleteDom.remove();
				}, speed);
			}

		},
		/*消防检查记录---时间轴切换*/
		_inspectionPeriodAction: function(tarDom) {
			if($(this).attr('class').indexOf('active') != -1) {
				return false;
			}
			$(this).parent().parent().find('.active').removeClass('active');
			$(this).addClass('active');

			$(tarDom).html('');
			//创建
			function creatLi(val, text) {
				var li = document.createElement('li');
				$(li).attr('datasrc', val);
				li.innerHTML = text;
				$(tarDom).append(li);
				$(document)._inspectionFloorClick();
			}

			/**
			 * 此处应进行ajax请求
			 * 暂模拟数据arr显示
			 */
			var arr = [
				[{
						'text': '1单元1层',
						'value': '1.1'
					},
					{
						'text': '1单元2层',
						'value': '1.2'
					},
					{
						'text': '1单元2层',
						'value': '1.3'
					}
				],
				[{
						'text': '2单元1层',
						'value': '2.1'
					},
					{
						'text': '2单元2层',
						'value': '2.2'
					},
					{
						'text': '2单元3层',
						'value': '2.3'
					}
				],
				[{
						'text': '3单元1层',
						'value': '3.1'
					},
					{
						'text': '3单元2层',
						'value': '3.2'
					},
					{
						'text': '3单元3层',
						'value': '3.3'
					}
				]
			];

			var num = Math.floor(Math.random() * 3);
			var data = arr[num];

			//重新创建单元及楼层的列表
			for(var a = 0; a < data.length; a++) {
				creatLi(data[a].value, data[a].text);
			}
			$(tarDom).find('li').eq(0).click();
		},
		/*消防检查记录---单元楼层事件绑定*/
		_inspectionFloorClick: function() {
			BUILD.slideDisplayToLeft.ini({
				/*按钮列表窗*/
				ListDom: '.building-inspection-floors',
				/*按钮列表名*/
				listName: 'li',
				showDomArr: [{
						/*显示窗*/
						showDom: '.building-inspection-inner-cons',
						/*显示窗列表名*/
						showList: '.building-inspection-inner-cons-li',
						/*Ajax请求地址*/
						showUrl: ''
					},
					{
						/*显示窗*/
						showDom: '.building-inspection-dcon-ul',
						/*显示窗列表名*/
						showList: '.inspection-li',
						/*Ajax请求地址*/
						showUrl: ''
					}
				]
			}, function() {
				$(document)._inspectionPalceClick();
			});
		},
		/*消防检查记录---时间轴事件绑定*/
		_inspectionPeriodClick: function() {
			$(this).on('click', function() {
				$(this)._inspectionPeriodAction('.building-inspection-floors');
			});
		},
		/*消防检查记录---具体消防位置绑定*/
		_inspectionPalceClick: function() {
			BUILD.slideDisplayToLeft.ini({
				/*按钮列表窗*/
				ListDom: '.building-inspection-inner-cons-li',
				/*按钮列表名*/
				listName: '.building-inspection-item-content',
				showDomArr: [{
					/*显示窗*/
					showDom: '.building-inspection-dcon-ul',
					/*显示窗列表名*/
					showList: '.inspection-li',
					/*Ajax请求地址*/
					showUrl: ''
				}]
			});
		}
	}

	$.extend($.fn, jQueryAddon);

	/*项目*/
	var fireSupervisorPlatform = {
		init: function() {

		},
		features: ['distribution', 'hiddenDanger', 'inspection', 'fireDisaster']
	}

})($);