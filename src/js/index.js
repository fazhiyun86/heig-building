(function() {

	//地图中各项数据的处理
	var mapDate = {};
	mapDate.apis = {
		getBranchAndStreetList:'Map_Chart_GetChildrenOrganiseUnitList', //地图-获取子组织结构列表
		getHomePageHRBDStatistics:'Map_Chart_GetHomePageHRBDStatistics', //地图-首页高层统计
		getHomePageBldgTypeStatistics:'Map_Chart_GetHomePageBldgTypeStatistics', //地图-首页建筑类型统计
		getHomePageBldgNatureStatistics:'Map_Chart_GetHomePageBldgNatureStatistics', //地图-首页建筑性质统计
		getHomePageStructureStatistics:'Map_Chart_GetHomePageStructureStatistics', //地图-首页建筑结构统计
		getBldgNature:'Map_Chart_GetBldgNature',		//各支队辖区建筑数量分布--筛选条件：建筑性质
		getBldgStructure:'Map_Chart_GetBldgStructure',	//各支队辖区建筑数量分布--筛选条件：建筑结构
		//各支队辖区建筑数量分布	统计查询
		getHomePageNatureAndStructureStatistics:'Map_Chart_GetHomePageNatureAndStructureStatistics'
	};
	mapDate.organiseUnitID = [
		'0cddf792-0ee6-11e7-98bc-000c29624c55',
		'338d2a55-0ee6-11e7-98bc-000c29624c55'
	];

	//ajax
	mapDate.mapAjax = {
		_getDataFromOrganiseUnitId: function(req, callback, api, dataNum) {
			$.ajax({
				url: BUILD.getDataUrl(api),
				data: req,
				success: function(info) {
					//返回数据table个数
					if(dataNum > 1) {
						info = info['DataSource']['Tables'];
					} else {
						info = info['DataSource']['Tables'][0]['Datas'];
					}
					callback && callback(info);
				}
			})
		}
	};

	//数据获取和处理
	mapDate.mapGet = {
		//支队/中队列表
		_getBranchList: function() {
			var api = mapDate.apis['getBranchAndStreetList'];
			var organiseUnitID = mapDate.organiseUnitID[0];
			var parNode = $('#branch');
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				mapDate.mapHtml._getChildrenOrganiseUnitList(data, function(html) {
					parNode.html(html);
					parNode.find('.building-region-list-item').on('click', function() {
						$(this).parent().find('.building-region-list-item').removeClass('active');
						$(this).addClass('active');

						//搜索区域
						var searchKey = $(this).html().split('消防')[0];
						fpcMap.searchArea(searchKey);

						var organiseUnitID = $(this).attr('datasrc');
						mapDate.mapGet._getStreetList(organiseUnitID);
					});
				}, false);
			}, api);
		},
		//街道列表
		_getStreetList: function(organiseUnitID) {
			var api = mapDate.apis['getBranchAndStreetList'];
			var parNode = $('.building-region-sub-detail-panel .building-region-scroll-con');
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				mapDate.mapHtml._getChildrenOrganiseUnitList(data, function(html) {
					parNode.html(html + parNode.html());
					parNode.find('.building-region-sub-detail').eq(0)._upRight(parNode.find('.building-region-sub-detail').eq(1));

					parNode.find('.building-region-list-item').on('click', function() {
						//搜索区域
						var searchKey = $(this).html().split('消防')[0];
						fpcMap.searchArea(searchKey);
					});

				}, true);
			}, api);
		},
		//数据面板---高层建筑物总计
		_getHomePageHRBDStatistics: function() {
			var api = mapDate.apis['getHomePageHRBDStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var info = data[0];
				$('.registerNumber').html(info.RegisterNumber);
				$('.auditNumber').html(info.AuditNumber);
				$('.checkNumber').html(info.CheckNumber);
			}, api);
		},
		//数据面板---高层建筑类型统计
		_getHomePageBldgTypeStatistics: function() {
			var api = mapDate.apis['getHomePageBldgTypeStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var info1 = data[0].Datas;
				var info2 = data[1].Datas;
				info1.splice(2, 0, info2[0]);
				info1.push(info2[1]);
				mapDate.mapHtml._getHomePageBldgTypeStatistics(info1, function(html) {
					$('.typeCount').html(html);
				});
			}, api, 2);
		},
		//数据面板---建筑性质统计
		_getHomePageBldgNatureStatistics: function() {
			var api = mapDate.apis['getHomePageBldgNatureStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var chartsData = [];
				for(var a = 0; a < data.length; a++) {
					var theInfo = data[a];
					var name = theInfo.Name;
					var value = theInfo.Numner;
					chartsData.push({
						'value': value,
						'name': name
					});
				}
				//调用饼图1(建筑性质)
				Charts._peiOne(chartsData, 'chart1');
			}, api);
		},
		//数据面板---建筑结构统计
		_getHomePageStructureStatistics: function() {
			var api = mapDate.apis['getHomePageStructureStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var chartsData = [];
				for(var a = 0; a < data.length; a++) {
					var theInfo = data[a];
					var name = theInfo.Name;
					var value = theInfo.Numner;
					chartsData.push({
						'value': value,
						'name': name
					});
				}
				//调用饼图1(建筑性质)
				Charts._peiTwo(chartsData, 'chart2');
			}, api);
		},
		//数据面板-----------各支队辖区建筑数量分布筛选条件（下拉菜单列表）：建筑性质
		_getBldgNature: function() {
			var api = mapDate.apis['getBldgNature'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var parNode = $('#bldgNature');
//				$('#bldgNature').find('option').remove();
				parNode.html('<option value="" selected="selected">全部</option>')
				if(data.length > 0) {
					for(var a=0; a<data.length; a++) {
						var theInfo = data[a];
						var name = theInfo.Name;
						var val = theInfo.DicItemCode;
						var option = document.createElement('option');
						option.value = val;
						option.innerHTML = name;
						parNode.append(option);
					}
				}
			}, api);	
		},
		//数据面板-----------各支队辖区建筑数量分布筛选条件（下拉菜单列表）：建筑结构
		_getBldgStructure: function() {
			var api = mapDate.apis['getBldgStructure'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var parNode = $('#bldgStructure');
//				parNode.find('option').remove();
				parNode.html('<option value="" selected="selected">全部</option>')
				if(data.length > 0) {
					for(var a=0; a<data.length; a++) {
						var theInfo = data[a];
						var name = theInfo.Name;
						var val = theInfo.DicItemCode;
						var option = document.createElement('option');
						option.value = val;
						option.innerHTML = name;
						parNode.append(option);
					}
				}
			}, api);	
		},
		//数据面板-----------各支队辖区建筑数量分布	统计查询
		_getHomePageNatureAndStructureStatistics:function(autoRun) {
			$('#searchBldg').on('click',function(){
				var api = mapDate.apis['getHomePageNatureAndStructureStatistics'];
				var organiseUnitID = mapDate.organiseUnitID[1];
				var req = {
					OrganiseUnitID: organiseUnitID,
					Nature: $('#bldgNature').val(),
					Structure: $('#bldgStructure').val()
				};
				mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
					var barData = [];
					if(data.length > 0) {
						for (var a=0; a<data.length; a++) {
							var theInfo = data[a];
							var name = theInfo.DistrictName;
							var value = theInfo.Numner;
							barData.push({
								name:name,
								value:value
							});
						}
						Charts._barOne(barData, 'chart3');
					}
				}, api);	
			});
			autoRun && $('#searchBldg').click();
		}
	};

	//显示模板
	mapDate.mapHtml = {
		//消防支队中队和街道列表共用模板
		_getChildrenOrganiseUnitList: function(data, callback, type) {
			var html = '';
			if(!data || data.length <= 0) {} else {
				if(type) {
					html += '<ul class="building-region-sub-detail" style="margin-left:-50%">';
				}
				for(var x = 0; x < data.length; x++) {
					var theInfo = data[x];
					var name = theInfo.OrganiseUnitName;
					var id = theInfo.OrganiseUnitID;
					var code = theInfo.OrganiseUnitCode;
					html += '<li class="building-region-list-item" datasrc="' + id + '" datacode="' + code + '">' + name + '</li>';
				}
				if(type) {
					html += '</ul>';
				}
			}
			callback && callback(html);
		},
		//高层建筑类型统计模板
		_getHomePageBldgTypeStatistics: function(data, callback) {
			var text = '';
			for(var x = 0; x < data.length; x++) {
				var theInfo = data[x];
				text += '<div class="building-card-content-col-4">\
                  <div class="building-yellow-num">' + theInfo.Numner + '</div>\
                  <p class="building-card-content-desc">' + theInfo.Name + '</p>\
                </div>';
			}
			callback && callback(text);
		}
	};

	window.mapDate = mapDate;

	var Build = {};
	// 导出

	Build.init = function() {
		this.initiate(); // 初始化默认加载的数据和方法
		this.selectArea(); // 区域选择
		this.clickBuilding(); //点击建筑物的操作
		this.clickCondition(); // 点击条件查询
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
		//数据面板---高层建筑物总计
		mapDate.mapGet._getHomePageHRBDStatistics();
		//数据面板---高层建筑物类型统计
		mapDate.mapGet._getHomePageBldgTypeStatistics();
		//数据面板---建筑性质统计
		mapDate.mapGet._getHomePageBldgNatureStatistics();
		//数据面板---建筑结构统计
		mapDate.mapGet._getHomePageStructureStatistics();
		//数据面板---各支队辖区建筑数量分布筛选条件：建筑性质
		mapDate.mapGet._getBldgNature();
		//数据面板---各支队辖区建筑数量分布筛选条件：建筑性质
		mapDate.mapGet._getBldgStructure();
		//数据面板---各支队辖区建筑数量分布搜索
		mapDate.mapGet._getHomePageNatureAndStructureStatistics(true);
		

		// 切换点击
		$('[data-toggle="toggleItem"]')._toggleItem();

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
		$('[data-toggle="toggleItem"]')._menuCallback(actions);
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
	}
	/**
	 * 点击隐患统计操作
	 */
	Build.clickStatic = function() {

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