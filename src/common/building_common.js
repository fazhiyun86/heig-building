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
		//		_toggleItem: function() {
		//			var $root = this;
		//			$root.on('click', function(evt) {
		//				var $src = $(evt.target);
		//				$root.children().removeClass('active');
		//				$src.addClass('active');
		//				evt.preventDefault();
		//			});
		//		},
		//		/*导航栏回调操作*/
		//		_menuCallback: function(actions) {
		//			var $root = $(this);
		//			$root.on('click', function (evt) {
		//				var $src = $(evt.target);
		//				var href = $src.attr('href');
		//				var key = href.substring(1);
		//				actions[key]();
		//			});		
		//		},
		/*导航栏回调操作*/
		_menuCallback: function(callBack) {
			$(this).on('click', function() {
				if($(this).attr('class') != 'active') {
					$(this).parent().find('a').removeClass('active');
					$(this).addClass('active');
					var href = $(this).attr('href');
					var key = href.substr(1);

					if(key == 'hiddenDanger') {
						$('.building-hidden-danger-change').addClass('active');
					} else {
						$('.building-hidden-danger-change').removeClass('active');
					}

					//移动元素
					$('.building-slider-left-con').find('.' + key)._move($('.building-slider-left-con').find('.building-slider-left-li').eq(0), 'left', '', function(coorDom, direction) {
						coorDom._upRight();
					});
					$('.building-slider-bottom').find('.' + key)._move($('.building-slider-bottom').find('.building-slider-bottom-li').eq(0), 'bottom', '', function(coorDom, direction) {
						coorDom.prev()._upward('', $('.building-slider-bottom').height() * -1);
					});

					//					if($('.building-slider-left-con').find('.building-slider-left-li').eq(1).attr('class').indexOf(key) != -1) {
					//					//切换元素
					//						$('.building-slider-left-con').find('.building-slider-left-li').eq(0)._upRight();
					//						$('.building-slider-bottom').find('.building-slider-bottom-li').eq(0)._upward('',$('.building-slider-bottom').height()*-1);
					//					}

					//如果数据面板被关闭，在切换导航时自动打开数据面板
					if($('.building-slider-left').attr('class').indexOf('active') == -1) {
						$('.building-trigger-left').click();
					}

					callBack && callBack(key);
				}

			})
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
		//窗口拖拽
		_windowMove: function(btn) {
			if(!btn) {
				console.log('需要传入拖动事件的按钮');
				return false;
			}
			
			var start = false;
			var xx,yy,xx2,yy2,domTop,domLeft;
			var _window = '';
			
			$(btn).on('mousedown', function(e) {
				start = true;
				_window = $(this).parent().parent('.building-window-move');
				xx = e.originalEvent.x || e.originalEvent.layerX || 0;
				yy = e.originalEvent.y || e.originalEvent.layerY || 0;
				domTop = _window.css('top').replace('px', '');
				domLeft = _window.css('left').replace('px', '');
			});
			$(document).on('mousemove', function(e) {
				if(start) {
					xx2 = e.originalEvent.x || e.originalEvent.layerX || 0;
					yy2 = e.originalEvent.y || e.originalEvent.layerY || 0;
					if(xx2 != xx) {
						_window.css('left', parseInt(domLeft) + (parseInt(xx2) - parseInt(xx)) + 'px');
					}
					if(yy2 != yy) {
						_window.css('top', parseInt(domTop) + (parseInt(yy2) - parseInt(yy)) + 'px');
					}
				}
			});
			$(document).on('mouseup', function() {
				start = false;
			});
		},
		/*
		 * 将元素移动到另一个元素的前面或后面，主要用于切换效果------和向右、右左、向上、向下配合使用
		 * coorDom:坐标元素
		 * direction:移动后对于坐标元素的位置 ：left、right、top、bottom
		 * range：被移动元素相对于坐标的位置范围，不是必填项；-50%、-100%
		 * */
		_move: function(coorDom, direction, range, callBack) {
			moveDom = $(this);
			if(direction == 'right' || direction == 'bottom') {
				moveDom.insertAfter(coorDom);
			} else {
				moveDom.insertBefore(coorDom);
				if(direction == 'left') {
					if(!range) {
						var range = '-50%';
					}
					moveDom.css('margin-left', range);
				} else {
					//top

				}
			}
			callBack && callBack(moveDom, coorDom);
		},
		/*
		 *向上滑动切换效果 
		 * */
		_upward: function(speed, upWardNum) {
			var dom = $(this);
			if(!upWardNum) {
				upWardNum = '-100%';
			}
			//speed动画周期，如果缺省则默认为300毫秒
			if(!speed) {
				speed = 300;
			}
			//指定元素向左移动
			dom.animate({
				'margin-top': upWardNum
			}, speed);
			//将元素移到后面
			setTimeout(function() {
				dom.insertAfter(dom.next());
				dom.css('margin-top', 0);
			}, speed);
		},
		/*
		 *向左滑动切换效果 
		 * */
		_upLeft: function(speed, upLeftNum, callBack) {
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
				callBack && callBack();
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
		//		_inspectionPeriodAction: function(tarDom) {
		//			if($(this).attr('class').indexOf('active') != -1) {
		//				return false;
		//			}
		//			$(this).parent().parent().find('.active').removeClass('active');
		//			$(this).addClass('active');
		//
		//			$(tarDom).html('');
		//			//创建
		//			function creatLi(val, text) {
		//				var li = document.createElement('li');
		//				$(li).attr('datasrc', val);
		//				li.innerHTML = text;
		//				$(tarDom).append(li);
		//				$(document)._inspectionFloorClick();
		//			}
		//
		//			/**
		//			 * 此处应进行ajax请求
		//			 * 暂模拟数据arr显示
		//			 */
		//			var arr = [
		//				[{
		//						'text': '1单元1层',
		//						'value': '1.1'
		//					},
		//					{
		//						'text': '1单元2层',
		//						'value': '1.2'
		//					},
		//					{
		//						'text': '1单元2层',
		//						'value': '1.3'
		//					}
		//				],
		//				[{
		//						'text': '2单元1层',
		//						'value': '2.1'
		//					},
		//					{
		//						'text': '2单元2层',
		//						'value': '2.2'
		//					},
		//					{
		//						'text': '2单元3层',
		//						'value': '2.3'
		//					}
		//				],
		//				[{
		//						'text': '3单元1层',
		//						'value': '3.1'
		//					},
		//					{
		//						'text': '3单元2层',
		//						'value': '3.2'
		//					},
		//					{
		//						'text': '3单元3层',
		//						'value': '3.3'
		//					}
		//				]
		//			];
		//
		//			var num = Math.floor(Math.random() * 3);
		//			var data = arr[num];
		//
		//			//重新创建单元及楼层的列表
		//			for(var a = 0; a < data.length; a++) {
		//				creatLi(data[a].value, data[a].text);
		//			}
		//			$(tarDom).find('li').eq(0).click();
		//		},
		/*消防检查记录---单元楼层事件绑定*/
		//		_inspectionFloorClick: function() {
		//			BUILD.slideDisplayToLeft.ini({
		//				/*按钮列表窗*/
		//				ListDom: '.building-inspection-floors',
		//				/*按钮列表名*/
		//				listName: 'li',
		//				showDomArr: [{
		//						/*显示窗*/
		//						showDom: '.building-inspection-inner-cons',
		//						/*显示窗列表名*/
		//						showList: '.building-inspection-inner-cons-li',
		//						/*Ajax请求地址*/
		//						showUrl: ''
		//					},
		//					{
		//						/*显示窗*/
		//						showDom: '.building-inspection-dcon-ul',
		//						/*显示窗列表名*/
		//						showList: '.inspection-li',
		//						/*Ajax请求地址*/
		//						showUrl: ''
		//					}
		//				]
		//			}, function() {
		//				$(document)._inspectionPalceClick();
		//			});
		//		},
		//		/*消防检查记录---时间轴事件绑定*/
		//		_inspectionPeriodClick: function() {
		//			$(this).on('click', function() {
		//				$(this)._inspectionPeriodAction('.building-inspection-floors');
		//			});
		//		},
		/*消防检查记录---具体消防位置绑定*/
		//		_inspectionPalceClick: function() {
		//			BUILD.slideDisplayToLeft.ini({
		//				/*按钮列表窗*/
		//				ListDom: '.building-inspection-inner-cons-li',
		//				/*按钮列表名*/
		//				listName: '.building-inspection-item-content',
		//				showDomArr: [{
		//					/*显示窗*/
		//					showDom: '.building-inspection-dcon-ul',
		//					/*显示窗列表名*/
		//					showList: '.inspection-li',
		//					/*Ajax请求地址*/
		//					showUrl: ''
		//				}]
		//			});
		//		}
	}

	$.extend($.fn, jQueryAddon);

	//	/*项目*/
	//	var fireSupervisorPlatform = {
	//		init: function() {
	//
	//		},
	//		features: ['distribution', 'hiddenDanger', 'inspection', 'fireDisaster']
	//	}

})($);