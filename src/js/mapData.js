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
		//监管覆盖实施进展情况
		getHomePageMonthlyAccessStatistics:'Map_Chart_GetHomePageMonthlyAccessStatistics',
		getHazardsTotal:'Map_Chart_GetHazardsTotal',	//地图-隐患总体统计(重大隐患及整改情况)
		getHazardsExamType:'Map_Chart_GetHazardsExamType',		//地图-隐患检查分类(消防检查发现隐患)
		getHazardsBldgLack:'Map_Chart_GetHazardsBldgLack',		/*地图-隐患设施缺失(建筑消防设施缺失)*/
		//地图-隐患行政区划统计(支队辖区隐患及处理情况)
		getHazardsTotalByDistrict:"Map_Chart_GetHazardsTotalByDistrict",
		//地图-隐患按月统计(全年隐患及处理趋势)
		getHazardsTotalByMonth:"Map_Chart_GetHazardsTotalByMonth",
		getHazardsPercent:'Map_Chart_GetHazardsPercent'		//地图-隐患百分比统计(重大隐患变化对比)
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
				Charts._peiOne(chartsData,'建筑性质', 'chart1');
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
		//对象分布-------------数据面板-----------监管覆盖实施进展情况
		_getHomePageMonthlyAccessStatistics: function() {
			var api = mapDate.apis['getHomePageMonthlyAccessStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var reg = data[0].Datas;
				var supervise = data[1].Datas;
				var infoArr = [];
				for(var a=0; a<reg.length; a++) {
					var theInfo = {
						m: reg[a].DateIndex,
						reg: reg[a].Number,
						supervise: supervise[a].Number,
					}
					infoArr.push(theInfo);
				}
				Charts._barTwo(infoArr, 'chart4');
			}, api,2);
		},
		//隐患统计（隐患分析）------------数据面板-----------重大隐患及整改情况 
		_getHazardsTotal: function() {
			var api = mapDate.apis['getHazardsTotal'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {OrganiseUnitID: organiseUnitID};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				if(data.length > 0) {
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
//						completeRate = Math.floor(parseInt(complete)/parseInt(total)*10000)/100+'%';
						completeRate = parseInt(complete)/parseInt(total);
						completeRate = (completeRate*100).toFixed(2)+'%';
					}
					
					$('.zgComplete').html(complete);
					$('.zgTotal').html(total);
					$('.zgOverdueComplete').html(overdueComplete);
					$('.zgOverdueIncomplete').html(overdueIncomplete);
					$('.zgCompleteRate').html(completeRate);
				}
			}, api);	
		},
		//隐患统计（隐患分析）------------数据面板-----------消防检查发现隐患 
		_getHazardsExamType: function() {
			var api = mapDate.apis['getHazardsExamType'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID,
				StartDate:'',
				EndDate:''
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
					if(data.length > 0) {
						var peiData = [];
						for (var a=0; a<data.length; a++) {
							var theInfo = data[a];
							var name = theInfo.ModelItemName;
							var value = theInfo.Abnormal;
							peiData.push({
								name:name,
								value:value
							});
						}
						Charts._peiThree(peiData, 'chart5');
					}
			}, api);	
		},
		//隐患统计（隐患分析）------------数据面板-----------建筑消防设施缺失 
		_getHazardsBldgLack: function() {
			var api = mapDate.apis['getHazardsBldgLack'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var chartsData = [];
				var arrVal = data[0].Datas[0];
				var arrName = data[1].Datas[0];
				for(var key in arrVal) {
					if(key == 'ID'){
						continue;
					}
					var theData = {
						name:arrName[key],
						value:arrVal[key]
					};
					chartsData.push(theData);
				}
				Charts._peiOne(chartsData,'建筑消防设施缺失', 'chart6');
//				}
			}, api,2);	
		},
		//隐患统计（隐患分析）------------数据面板-----------支队辖区隐患及处理情况 
		_getHazardsTotalByDistrict: function() {
			var api = mapDate.apis['getHazardsTotalByDistrict'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				Charts._barThree(data,'chart7');
			}, api);	
		},
		//隐患统计（隐患分析）------------数据面板-----------全年隐患及处理趋势 
		_getHazardsTotalByMonth:function() {
			var api = mapDate.apis['getHazardsTotalByMonth'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				Charts._categoryOne(data,'chart8');
			}, api);	
		},
		//隐患统计（隐患分析）------------数据面板-----------重大隐患整体变化对比 
		_getHazardsPercent: function() {
			var api = mapDate.apis['getHazardsPercent'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var NowResult = data[0].Datas[0];
				var LastMontResult = data[1].Datas[0];
				var LastYearResult = data[2].Datas[0];
				
				$('.danger-total .building-change-item-num').html(NowResult.total);
				$('.danger-complete .building-change-item-num').html(NowResult.complete);
				$('.danger-overdueIncomplete .building-change-item-num').html(NowResult.overdueIncomplete);
				$('.danger-overdueComplete .building-change-item-num').html(NowResult.overdueComplete);
				
				var arr = [];
				for(var s in NowResult) {
					if(s == 'ID') {
						continue;
					}
					var info = [
						NowResult[s],
						LastMontResult[s],
						LastYearResult[s],
						s
					]
					arr.push(info);
				}
				
				function compare(arr) {
					var name = 'danger-'+arr[arr.length-1];
					var nowRes = arr[0];
					var lastMout = arr[1];
					var lastYear = arr[2];
					if(!nowRes) {
						nowRes = 0;
					}
					var hb = '';
					var hbExp = ''
					if(!lastMout || lastMout == '0') {
						hb = '——';
					} else {
						var ratio = ((Number(nowRes)-Number(lastMout))/Number(lastMout)*100).toFixed(2);
						if(ratio == 0) {
							hb = '持平';
						} else if(hb > 0) {
							hb = '+'+ratio+'%';
							hbExp = 'up';
						} else {
							hbExp = 'down';
							hb = ratio+'%';
						}
					}
					$('.'+name).find('.building-change-percentage').eq(1).html(hb);
					$('.'+name).find('.building-change-percentage').eq(1).addClass(hbExp);
					
					var tb = '';
					var tbExp = '';
					if(!lastYear || lastYear == '0') {
						tb = '——';
					} else {
						var ratio1 = ((Number(nowRes)-Number(lastYear))/Number(lastYear)*100).toFixed(2);
						if(ratio1 == 0) {
							tb = '持平';
						} else if(ratio1 > 0) {
							tbExp = 'up';
							tb = '+'+ratio1+'%';
						} else {
							tbExp = 'down';
							tb = ratio1+'%';
						}
					}
					$('.'+name).find('.building-change-percentage').eq(0).html(tb);
					$('.'+name).find('.building-change-percentage').eq(0).addClass(tbExp);
				}
				
				arr.forEach(function(item,index){
					compare(item);
				});
				
			}, api,3);
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
