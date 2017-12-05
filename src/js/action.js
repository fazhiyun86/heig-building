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
		}
	}
	
	//为Jquery添加新的实例方法
	$.fn.extend(eventObj);
})(jQuery);


//上面新添加的实例方法的应用
$('.building-window-close')._close();