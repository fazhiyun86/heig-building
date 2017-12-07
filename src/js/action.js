/*创建时间：2017-12-5
 *主要功能：页面中事件的处理
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
					//将不用的被改变的元素分别绑定到触发元素事件上
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
	
	window.slideDisplayToLeft = slideDisplayToLeft;
	
	
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
			imgSliderBang();
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
	window.contentChangeFromDate = contentChangeFromDate;

/*消防检查记录-action*/
var inspectionDomAction = $.fn.extend({
	/*时间轴切换*/
	_inspectionPeriodAction:function(tarDom) {
		if($(this).attr('class').indexOf('active') != -1) {
			return false;
		}
		$(this).parent().parent().find('.active').removeClass('active');
		$(this).addClass('active');
		
		$(tarDom).html('');
		//创建
		function creatLi(val,text) {
			var li = document.createElement('li');
			$(li).attr('datasrc',val);
			li.innerHTML = text;
			$(tarDom).append(li);
			$(document)._inspectionFloorClick();
		}
		
		/**
		 * 此处应进行ajax请求
		 * 暂模拟数据arr显示
		 */
		var arr = [
			[
				{'text':'1单元1层','value':'1.1'},
				{'text':'1单元2层','value':'1.2'},
				{'text':'1单元2层','value':'1.3'}
			],
			[
				{'text':'2单元1层','value':'2.1'},
				{'text':'2单元2层','value':'2.2'},
				{'text':'2单元3层','value':'2.3'}
			],
			[
				{'text':'3单元1层','value':'3.1'},
				{'text':'3单元2层','value':'3.2'},
				{'text':'3单元3层','value':'3.3'}
			]
		];
		
		var num = Math.floor(Math.random()*3);
		var data = arr[num];
		
		//重新创建单元及楼层的列表
		for(var a=0; a<data.length; a++) {
			creatLi(data[a].value,data[a].text);
		}
		$(tarDom).find('li').eq(0).click();
	},
	/*单元楼层事件绑定*/
	_inspectionFloorClick:function() {
		slideDisplayToLeft.ini({
			/*按钮列表窗*/
			ListDom:'.building-inspection-floors',
			/*按钮列表名*/
			listName:'li',
			showDomArr:[
				{
					/*显示窗*/
					showDom:'.building-inspection-inner-cons',
					/*显示窗列表名*/
					showList:'.building-inspection-inner-cons-li',
					/*Ajax请求地址*/
					showUrl:''
				},
				{
					/*显示窗*/
					showDom:'.building-inspection-dcon-ul',
					/*显示窗列表名*/
					showList:'.inspection-li',
					/*Ajax请求地址*/
					showUrl:''
				}
			]
		},function(){
			$(document)._inspectionPalceClick();
		});
	},
	/*时间轴事件绑定*/
	_inspectionPeriodClick:function() {
		$(this).on('click',function(){
			$(this)._inspectionPeriodAction('.building-inspection-floors');
		});
	},
	/*具体消防位置绑定*/
	_inspectionPalceClick:function() {
		slideDisplayToLeft.ini({
			/*按钮列表窗*/
			ListDom:'.building-inspection-inner-cons-li',
			/*按钮列表名*/
			listName:'.building-inspection-item-content',
			showDomArr:[
				{
					/*显示窗*/
					showDom:'.building-inspection-dcon-ul',
					/*显示窗列表名*/
					showList:'.inspection-li',
					/*Ajax请求地址*/
					showUrl:''
				}
			]
		});
	}
	
});
})(jQuery);


//火灾图片列表切换
function imgSliderBang() {
	slideDisplayToLeft.ini({
		/*按钮列表窗*/
		ListDom:'.building-fire-card-imgs-scroll',
		/*按钮列表名*/
		listName:'.building-fire-card-img-item',
		showDomArr:[
			{
				/*显示窗*/
				showDom:'.building-fire-card-imgs-carousel',
				/*显示窗列表名*/
				showList:'.building-fire-card-view-img',
				/*Ajax请求地址*/
				showUrl:''
			}
		]
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
	slideDisplayToLeft.ini({
		/*显示窗*/
		showDom:'.building-rectified-detail-inner',
		/*显示窗列表名*/
		showList:'.building-rectified-report',
		/*按钮列表窗*/
		ListDom:'.building-rectified-list',
		/*按钮列表名*/
		listName:'.building-rectified-name',
		showDomArr:[
			{
				/*显示窗*/
				showDom:'.building-rectified-detail-inner',
				/*显示窗列表名*/
				showList:'.building-rectified-report',
				/*Ajax请求地址*/
				showUrl:''
			}
		]
	});
}


/*
 * ---------------------------------------------------------------------------------------------------
 * 实际的引用START
 * */

//上面新添加的实例方法关闭(_close())的应用
$('.building-window-close')._close();

imgSliderBang();				//火灾图片列表切换绑定
contentChangeFromDateBang();	//火灾分析详情-日期切换绑定
rectifiedChangeBang()			//隐患整改记录切换绑定
//绑定消防安全检查记录--时间轴的事件
$('.building-inspection-period')._inspectionPeriodClick();
//绑定消防安全检查记录--单元楼层事件
$(document)._inspectionFloorClick();
$(document)._inspectionPalceClick();

/*
 * 实际的引用END
 * --------------------------------------------------------------------------------------------------
 * */