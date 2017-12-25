(function() {

	var Build = {};
	// 导出

	Build.init = function() {
		this.initiate(); // 初始化默认加载的数据和方法
		this.selectArea(); // 区域选择
		this.clickBuilding(); //点击建筑物的操作
		this.clickCondition(); // 点击条件查询
		
		setInterval(function(){
			$('.nowTimeShow').html(BUILD.getTime());
		},1000);
		
		this.clickObject(); // 点击对象分布操作
		
		/*this.clickStatic(); //点击隐患统计操作
		this.clickInspect(); //点击检查监督操作
		this.clickFireAnalyse(); //点击火灾分析*/
	}
	/**
	 * 初始化默认加载的数据和方法
	 */
	Build.initiate = function() {
		//加载消防支队/中队列表
		mapDate.mapGet._getBranchList();

		// 地图初始化加载
		// baiduMap.loadScript()
		fpcMap.initialize();

		//关闭窗口事件绑定
		$('.building-window-close')._close();

		// 数据面板显示/隐藏事件绑定到按钮
		$('[data-toggle="slide"]')._slide();
		

		// 导航切换绑定
		$('.building-nav').find('a')._menuCallback(function(key){
			actions[key]();
		});

		/**
		 * 菜单栏点击回调函数
		 *  actions: href='#xxx' xxx--key
		 */
		var actions = {
			distribution: this.clickObject,
			hiddenDanger: this.clickStatic,
			inspection: this.clickInspect,
			fireDisaster: this.clickFireAnalyse
		}
	}

	/**
	 * 区域选择
	 */
	Build.selectArea = function() {
		$('[data-toggle="dropdown"]')._dropdown();
	}
	/**
	 * 点击建筑物的操作
	 */
	Build.clickBuilding = function() {

	}
	/**
	 * 点击条件查询
	 */
	Build.clickCondition = function() {
		// 建筑性质
		var nature = new BUILD.selectAll({
			allEl: '.building-nature-all',
			itemsEl: '.building-nature-item',
			itemIDName: 'data-id'
		})
		// 建筑结构
		var structure = new BUILD.selectAll({
			allEl: '.building-structure-all',
			itemsEl: '.building-structure-item',
			itemIDName: 'data-id'
		})
		// 建筑主要类型
		var type = new BUILD.selectAll({
			allEl: '.building-type-all',
			itemsEl: '.building-type-item',
			itemIDName: 'data-id'
		})

	}
	/**
	 * 点击对象分布操作
	 */
	Build.clickObject = function() {
		//绑定消防安全检查记录--时间轴的事件
		$('.building-inspection-period')._inspectionPeriodClick();
		
		//绑定消防安全检查记录--单元楼层事件
		$(document)._inspectionFloorClick();
		$(document)._inspectionPalceClick();
		
		Build.rectifiedChangeBang(); //隐患整改记录切换绑定

		/**
		 * 添加地图标识
		 */
		fpcMap.getBldgInfo('161e95db-4700-11e5-a618-64006a4cb35a');
		
		
		//对象分布------数据面板---高层建筑物总计
		mapDate.mapGet._getHomePageHRBDStatistics();
		//对象分布------数据面板---高层建筑物类型统计
		mapDate.mapGet._getHomePageBldgTypeStatistics();
		//对象分布------数据面板---建筑性质统计
		mapDate.mapGet._getHomePageBldgNatureStatistics();
		//对象分布------数据面板---建筑结构统计
		mapDate.mapGet._getHomePageStructureStatistics();
		//对象分布------数据面板---各支队辖区建筑数量分布筛选条件：建筑性质
		mapDate.mapGet._getBldgNature();
		//对象分布------数据面板---各支队辖区建筑数量分布筛选条件：建筑性质
		mapDate.mapGet._getBldgStructure();
		//对象分布------数据面板---各支队辖区建筑数量分布搜索
		mapDate.mapGet._getHomePageNatureAndStructureStatistics(true);
		//对象分布------数据面板---监管覆盖实施进展情况
		mapDate.mapGet._getHomePageMonthlyAccessStatistics();
		
	}
	/**
	 * 点击隐患统计操作
	 */
	Build.clickStatic = function() {
		//隐患统计------数据面板---重大隐患及整改情况
		mapDate.mapGet._getHazardsTotal();
		//隐患统计------数据面板---消防检查发现隐患
		mapDate.mapGet._getHazardsExamType();
		//隐患统计------数据面板---建筑消防设施缺失
		mapDate.mapGet._getHazardsBldgLack();
		//隐患统计------数据面板---支队辖区隐患及处理情况
		mapDate.mapGet._getHazardsTotalByDistrict();
		//隐患统计------数据面板---全年隐患及处理趋势
		mapDate.mapGet._getHazardsTotalByMonth();
		//隐患统计------数据面板---重大隐患整体变化对比
		mapDate.mapGet._getHazardsPercent();
	}
	/**
	 * 点击检查监督操作
	 */
	Build.clickInspect = function() {

	}
	/**
	 * 点击火灾分析
	 */
	Build.clickFireAnalyse = function() {
		Build.contentChangeFromDateBang(); //火灾分析详情-日期切换绑定
		Build.imgSliderBang(); //火灾图片列表切换绑定

		/**
		 * 添加火灾分析标识物
		 */
		fpcMap.addFireOverlay();
	}

	//火灾图片列表切换
	Build.imgSliderBang = function() {
		BUILD.slideDisplayToLeft.ini({
			/*按钮列表窗*/
			ListDom: '.building-fire-card-imgs-scroll',
			/*按钮列表名*/
			listName: '.building-fire-card-img-item',
			showDomArr: [{
				/*显示窗*/
				showDom: '.building-fire-card-imgs-carousel',
				/*显示窗列表名*/
				showList: '.building-fire-card-view-img',
				/*Ajax请求地址*/
				showUrl: ''
			}]
		});
	}
	/*火灾分析详情-日期切换*/
	Build.contentChangeFromDateBang = function() {
		BUILD.contentChangeFromDate.ini({
			/*显示窗*/
			contentDom: '.building-fire-card-body',
			/*按钮列表窗*/
			btnsDom: '.building-fire-card-year'
		});
	}

	//隐患整改记录切换
	Build.rectifiedChangeBang = function() {
		BUILD.slideDisplayToLeft.ini({
			/*按钮列表窗*/
			ListDom: '.building-rectified-list',
			/*按钮列表名*/
			listName: '.building-rectified-name',
			showDomArr: [{
				/*显示窗*/
				showDom: '.building-rectified-detail-inner',
				/*显示窗列表名*/
				showList: '.building-rectified-report',
				/*Ajax请求地址*/
				showUrl: ''
			}]
		});
	}

	window.Build = Build;
	Build.init();
})()