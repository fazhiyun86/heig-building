/**
 * 地图中各数据的交互处理
 */
(function() {
	//地图中各项数据的处理
	var mapDate = {};
	mapDate.apis = {
		getBranchAndStreetList:'Map_Chart_GetChildrenOrganiseUnitList', //地图-获取消防子组织结构列表
		getHomePageHRBDStatistics:'Map_Chart_GetHomePageHRBDStatistics', //地图-首页高层统计
		getHomePageBldgTypeStatistics:'Map_Chart_GetHomePageBldgTypeStatistics', //地图-首页建筑类型统计
		getHomePageBldgNatureStatistics:'Map_Chart_GetHomePageBldgNatureStatistics', //地图-首页建筑性质统计
		getHomePageStructureStatistics:'Map_Chart_GetHomePageStructureStatistics', //地图-首页建筑结构统计
		getBldgNature:'Map_Chart_GetBldgNature',		//各支队辖区建筑数量分布--筛选条件：建筑性质
		getBldgStructure:'Map_Chart_GetBldgStructure',	//各支队辖区建筑数量分布--筛选条件：建筑结构
		//各支队辖区建筑数量分布	统计查询
		getHomePageNatureAndStructureStatistics:'Map_Chart_GetHomePageNatureAndStructureStatistics',
		getHazardsTotal:'Map_Chart_GetHazardsTotal',	//地图-隐患总体统计(重大隐患及整改情况)
		getHazardsExamType:'Map_Chart_GetHazardsExamType'	//地图-隐患检查分类(消防检查发现隐患)
	};
	mapDate.organiseUnitID = [
		'0cddf792-0ee6-11e7-98bc-000c29624c55',
		'338d2a55-0ee6-11e7-98bc-000c29624c55',
		'ac88f4af-7955-11e6-954d-02004c4f4f50'
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
						$(this).parent().find('.building-region-list-item').removeClass('active');
						$(this).addClass('active');
						//搜索区域
						var searchKey = $(this).html().split('消防')[0];
						fpcMap.searchArea(searchKey);
					});

				}, true);
			}, api);
		},
		//对象分布-------------数据面板---高层建筑物总计
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
		//对象分布-------------数据面板---高层建筑类型统计
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
		//对象分布-------------数据面板---建筑性质统计
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
		//对象分布-------------数据面板---建筑结构统计
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
		//对象分布-------------数据面板-----------各支队辖区建筑数量分布筛选条件（下拉菜单列表）：建筑性质
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
		//对象分布-------------数据面板-----------各支队辖区建筑数量分布筛选条件（下拉菜单列表）：建筑结构
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
		//对象分布-------------数据面板-----------各支队辖区建筑数量分布	统计查询
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
		},
		//隐患统计（隐患分析）------------数据面板-----------重大隐患及整改情况 
		_getHazardsTotal: function() {
			var api = mapDate.apis['getHazardsTotal'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				data = data[0];
				var total = data.total;	//全部
				var overdueIncomplete = data.overdueIncomplete;	//逾期未完成
				var overdueComplete = data.overdueComplete;		//逾期完成
				var complete = data.complete;	//完成
				
				var completeRate = '';
				if(total <= 0) {
					completeRate = '—';
				} else {
					//	完成率：complete/total
					completeRate = Math.floor(parseInt(complete)/parseInt(total)*10000)/100+'%';
				}
				
				$('.zgComplete').html(complete);
				$('.zgTotal').html(total);
				$('.zgOverdueComplete').html(overdueComplete);
				$('.zgOverdueIncomplete').html(overdueIncomplete);
				$('.zgCompleteRate').html(completeRate);
			}, api);	
		},
		//隐患统计（隐患分析）------------数据面板-----------消防检查发现隐患 
		_getHazardsExamType: function() {
			var api = mapDate.apis['getHazardsExamType'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				
			}, api);	
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
})();
