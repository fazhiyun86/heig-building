(function () {
  
  var Build = {};
  // 导出
  
  
  Build.init = function () {
    this.initiate(); // 初始化默认加载的数据和方法
    this.selectArea(); // 区域选择
    this.clickBuilding(); //点击建筑物的操作
    this.clickCondition(); // 点击条件查询
    this.clickObject(); // 点击对象分布操作
    this.clickStatic(); //点击隐患统计操作
    this.clickInspect(); //点击检查监督操作
    this.clickFireAnalyse(); //点击火灾分析
  }
  /**
   * 初始化默认加载的数据和方法
   */
  Build.initiate = function () {
    
    // 地图初始化加载
    // baiduMap.loadScript()

//    baiduMap.initialize();
    
    //关闭窗口事件绑定
		$('.building-window-close')._close();

    // 数据面板
    $('[data-toggle="slide"]')._slide();
    // 切换点击
    $('[data-toggle="toggleItem"]')._toggleItem();
  }

  /**
   * 区域选择
   */
  Build.selectArea = function () {
    $('[data-toggle="dropdown"]')._dropdown();
  }
  /**
   * 点击建筑物的操作
   */
  Build.clickBuilding = function () {
    
  }
  /**
   * 点击条件查询
   */
  Build.clickCondition = function () {
    // 建筑性质
    var nature = new BUILD.selectAll({
      parentWrap: '.building-card',
      allEl: '.building-nature-all',
      itemsEl: '.building-nature-item',
      itemIDName: 'data-id'
    })
    nature.init();
    // 建筑结构
    var structure = new BUILD.selectAll({
      parentWrap: '.building-card',
      allEl: '.building-structure-all',
      itemsEl: '.building-structure-item',
      itemIDName: 'data-id'
    })
    structure.init();
    // 建筑主要类型
    var type = new BUILD.selectAll({
      parentWrap: '.building-card',
      allEl: '.building-type-all',
      itemsEl: '.building-type-item',
      itemIDName: 'data-id'
    })
    type.init();
    

  }
  /**
   * 点击对象分布操作
   */
  Build.clickObject = function () {
    //绑定消防安全检查记录--时间轴的事件
		$('.building-inspection-period')._inspectionPeriodClick();
		//绑定消防安全检查记录--单元楼层事件
		$(document)._inspectionFloorClick();
		$(document)._inspectionPalceClick();
		Build.rectifiedChangeBang();			//隐患整改记录切换绑定
  }
  /**
   * 点击隐患统计操作
   */
  Build.clickStatic = function () {
  	
  }
  /**
   * 点击检查监督操作
   */
  Build.clickInspect = function () {
    
  }
  /**
   * 点击火灾分析
   */
  Build.clickFireAnalyse = function () {
    Build.contentChangeFromDateBang();	//火灾分析详情-日期切换绑定
    Build.imgSliderBang();				//火灾图片列表切换绑定
  }
  
	//火灾图片列表切换
	Build.imgSliderBang = function() {
		BUILD.slideDisplayToLeft.ini({
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
	/*火灾分析详情-日期切换*/
	Build.contentChangeFromDateBang = function() {
		BUILD.contentChangeFromDate.ini({
			/*显示窗*/
			contentDom:'.building-fire-card-body',
			/*按钮列表窗*/
			btnsDom:'.building-fire-card-year'
		});
	}
	
	//隐患整改记录切换
	Build.rectifiedChangeBang = function() {
		BUILD.slideDisplayToLeft.ini({
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
	
	window.Build = Build;
  Build.init();
})()
