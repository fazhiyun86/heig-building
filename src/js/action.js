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
	
	imgSlider.changeList = function(data,showDom,showList){
		//右侧添加新的元素
		var newList = document.createElement('div');
		newList.className = 'building-fire-card-view-img';
		newList.innerHTML = '<div><img src="'+data.src+'"/></div><p><span class="building-fire-place">'+data.title+'</span><span class="building-fire-time">'+data.time+'</span></p>';
		$(showDom).append(newList);
		var speed = 300;
		//显示窗第一个元素向左移动
		var hisDom = $(showDom).find(showList).eq(0);
		hisDom.animate({
			'margin-left':'-50%'
		},speed);
		//删除左侧第一个元素
		setTimeout(function(){
			hisDom.remove();
		},speed);
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
				imgSlider.changeList(data,showDom,showList);
			});
		});
	}
	window.imgSlider = imgSlider;
})(jQuery);


//上面新添加的实例方法的应用
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