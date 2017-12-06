/*创建时间：2017-12-5
 *主要功能：1、页面中事件的处理
 * 		  2、火灾图片切换
 * * */

//创建并执行一个匿名函数（避免变量的冲突）
(function($){
	var eventObj = {
		/*关闭窗口*/
		_close:function(){
			var _btn = $(this);
			_btn.on('click',function(){
				var _dom = $(this).parent();
				_dom.fadeOut();
			})
		},
		/*导航栏切换*/
		menusChange:function(){
			var menuBtn = $(this);
			if(menuBtn.attr('href') == '#hiddenDanger'){
				
			}
		},
		_upLeft:function(speed,upLeftNum) {
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
				'margin-left':upLeftNum
			},speed);
			//删除指定元素
			setTimeout(function(){
				dom.remove();
			},speed);
		},
		_upRight:function(deleteDom,speed,upLeftNum) {
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
				'margin-left':upLeftNum
			},speed);
			
			//删除指定元素
			if(deleteDom){
				setTimeout(function(){
					deleteDom.remove();
				},speed);
			}
			
		}
	}
	
	//为Jquery添加新的实例方法
	$.fn.extend(eventObj);
	
	
	//向左侧滑动切换显示内容
	var slideDisplayToLeftAndRight = {};
	slideDisplayToLeftAndRight.ini = function(data) {
		var showDom = data.showDom;
		var listDom = data.ListDom;
		var listName = data.listName;
		var showList = data.showList;
		$(listDom).find(listName).on('click',function(){
			var obj = $(this);
			if(!obj.attr('class') || obj.attr('class').indexOf('active') == -1) {
				if(obj.find('.active').length <= 0){
					$(listDom).find('.active').removeClass('active');
					if(obj.find('img').length > 0) {
						obj.find('img').addClass('active');
					} else {
						obj.addClass('active');
					}
						
					slideDisplayToLeftAndRight.listData(obj,function(data){
						slideDisplayToLeftAndRight.creatNewDom(data,showDom,showList);
					});
				}
			}
		});
	}
	slideDisplayToLeftAndRight.listData = function(obj,callBack) {
		
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
	slideDisplayToLeftAndRight.creatNewDom = function(data,showDom,showList,direction) {
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
	window.slideDisplayToLeftAndRight = slideDisplayToLeftAndRight;
	
	
	/*火灾分析详情页-日期切换内容*/
	var contentChangeFromDate = {
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
			imgSliderBang();
		},
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
	window.contentChangeFromDate = contentChangeFromDate;
})(jQuery);


//上面新添加的实例方法关闭(_close())的应用
$('.building-window-close')._close();

//火灾图片列表切换
function imgSliderBang() {
	slideDisplayToLeftAndRight.ini({
		/*显示窗*/
		showDom:'.building-fire-card-imgs-carousel',
		/*显示窗列表名*/
		showList:'.building-fire-card-view-img',
		/*按钮列表窗*/
		ListDom:'.building-fire-card-imgs-scroll',
		/*按钮列表名*/
		listName:'.building-fire-card-img-item'
	});
}

//火灾分析详情-日期切换
function contentChangeFromDateBang() {
	contentChangeFromDate.ini({
		/*显示窗*/
		contentDom:'.building-fire-card-body',
		/*按钮列表窗*/
		btnsDom:'.building-fire-card-year'
	});
}

//隐患整改记录切换
function rectifiedChangeBang(){
	slideDisplayToLeftAndRight.ini({
		/*显示窗*/
		showDom:'.building-rectified-detail-inner',
		/*显示窗列表名*/
		showList:'.building-rectified-report',
		/*按钮列表窗*/
		ListDom:'.building-rectified-list',
		/*按钮列表名*/
		listName:'.building-rectified-name'
	});
}

imgSliderBang();				//火灾图片列表切换绑定
contentChangeFromDateBang();	//火灾分析详情-日期切换绑定
rectifiedChangeBang()			//隐患整改记录切换绑定