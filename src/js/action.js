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
	
	//火灾图片列表切换
	var imgSlider = {};
	imgSlider.listData = function(obj,callBack) {
		var theList = obj;
		var tit = theList.attr('datasrc');
		var imgSrc = theList.find('img').attr('src');
		var time = theList.find('p').attr('datasrc');
		var data = {
			title:tit,
			src:imgSrc,
			time:time,
		}
		callBack && callBack(data);
	};
	
	imgSlider.creatNewDom = function(data,showDom,showList){
		//右侧添加新的元素
		var newList = document.createElement('div');
		newList.className = 'building-fire-card-view-img';
		newList.innerHTML = '<div><img src="'+data.src+'"/></div><p><span class="building-fire-place">'+data.title+'</span><span class="building-fire-time">'+data.time+'</span></p>';
		$(showDom).append(newList);
		
		var hisDom = $(showDom).find(showList).eq(0);
		hisDom._upLeft();
	};
	
	imgSlider.ini = function(data) {
		var showDom = data.showDom;
		var listDom = data.ListDom;
		var listName = data.listName;
		var showList = data.showList;
		$(listDom).find(listName).on('click',function(){
			var obj = $(this);
			$(listDom).find(listName).find('img').removeClass('active');
			obj.find('img').addClass('active');
			imgSlider.listData(obj,function(data){
				imgSlider.creatNewDom(data,showDom,showList);
			});
		});
	}
	window.imgSlider = imgSlider;
	
	
	/*火灾分析详情页日期切换内容*/
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
imgSlider.ini({
	/*显示窗*/
	showDom:'.building-fire-card-imgs-carousel',
	/*显示窗列表名*/
	showList:'.building-fire-card-view-img',
	/*列表窗*/
	ListDom:'.building-fire-card-imgs-scroll',
	/*列表名*/
	listName:'.building-fire-card-img-item'
});

//火灾分析详情日期切换
contentChangeFromDate.ini({
	//按钮组dom
	btnsDom:'.building-fire-card-year',
	//显示内容dom
	contentDom:'.building-fire-card-body'
})