/**
 * 地图中各数据的交互处理
 */
(function() {
	//地图中各项数据的处理
	var mapDate = {};
	//数据请求接口
	mapDate.apis = {
		getBranchAndStreetList: 'Map_Chart_GetChildrenOrganiseUnitList', //地图-获取消防子组织结构列表
		getHomePageHRBDStatistics: 'Map_Chart_GetHomePageHRBDStatistics', //地图-首页高层统计
		getHomePageBldgTypeStatistics: 'Map_Chart_GetHomePageBldgTypeStatistics', //地图-首页建筑类型统计
		getHomePageBldgNatureStatistics: 'Map_Chart_GetHomePageBldgNatureStatistics', //地图-首页建筑性质统计
		getHomePageStructureStatistics: 'Map_Chart_GetHomePageStructureStatistics', //地图-首页建筑结构统计
		getBldgNature: 'Map_Chart_GetBldgNature', //各支队辖区建筑数量分布--筛选条件：建筑性质
		getBldgStructure: 'Map_Chart_GetBldgStructure', //各支队辖区建筑数量分布--筛选条件：建筑结构
		//各支队辖区建筑数量分布	统计查询
		getHomePageNatureAndStructureStatistics: 'Map_Chart_GetHomePageNatureAndStructureStatistics',
		//监管覆盖实施进展情况
		getHomePageMonthlyAccessStatistics: 'Map_Chart_GetHomePageMonthlyAccessStatistics',
		getHazardsTotal: 'Map_Chart_GetHazardsTotal', //地图-隐患总体统计(重大隐患及整改情况)
		getHazardsExamType: 'Map_Chart_GetHazardsExamType', //地图-隐患检查分类(消防检查发现隐患)
		getHazardsBldgLack: 'Map_Chart_GetHazardsBldgLack',
		/*地图-隐患设施缺失(建筑消防设施缺失)*/
		//地图-隐患行政区划统计(支队辖区隐患及处理情况)
		getHazardsTotalByDistrict: "Map_Chart_GetHazardsTotalByDistrict",
		//地图-隐患按月统计(全年隐患及处理趋势)
		getHazardsTotalByMonth: "Map_Chart_GetHazardsTotalByMonth",
		getHazardsPercent: 'Map_Chart_GetHazardsPercent', //地图-隐患百分比统计(重大隐患变化对比)
		map_Chart_GetHRBDInfo: 'Map_Chart_GetHRBDInfo', // 获取高层-建筑档案详情
		map_Chart_GetHRBDTaskList: 'Map_Chart_GetHRBDTaskList',	//地图-获取高层建筑检查记录任务列表
		map_Chart_GetHRBDRegionList: 'Map_Chart_GetHRBDRegionList',	//地图-获取高层建筑区域列表
		map_Chart_GetHRBDModelList: 'Map_Chart_GetHRBDModelList'	//地图-获取高层建筑检查模型列表
	};
	//组织结构ID
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
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				mapDate.mapHtml._getChildrenOrganiseUnitList(data, function(html) {
					parNode.html(html);
					parNode.find('.building-region-list-item').on('click', function() {
						$(this).parent().find('.building-region-list-item').removeClass('active');
						$(this).addClass('active');

						//搜索区域
						var searchKey = $(this).html().split('消防')[0];
						if(!document.getElementById('searchMapVal')) {
							var inp = document.createElement('input');
							inp.type = 'hidden';
							inp.id = 'searchMapVal';
							inp.value = searchKey;
							$(document.body).append(inp);
						} else {
							document.getElementById('searchMapVal').value = searchKey;
						}
						fpcMap.searchArea(searchKey, 15);
						$('#xfsel').val($(this).html())
						$('.building-region-rel').html($(this).html());

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
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				mapDate.mapHtml._getChildrenOrganiseUnitList(data, function(html) {
					parNode.html(html + parNode.html());
					parNode.find('.building-region-sub-detail').eq(0)._upRight(parNode.find('.building-region-sub-detail').eq(1));

					parNode.find('.building-region-list-item').on('click', function() {
						$(this).parent().find('.building-region-list-item').removeClass('active');
						$(this).addClass('active');
						//搜索区域
						var searchKey = $(this).html().split('消防')[0];
						fpcMap.searchArea(document.getElementById('searchMapVal').value + searchKey, 18);
						$('.building-region-rel').html($('#xfsel').val() + $(this).html());
					});

				}, true);
			}, api);
		},
		//对象分布-------------数据面板---高层建筑物总计
		_getHomePageHRBDStatistics: function() {
			var api = mapDate.apis['getHomePageHRBDStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
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
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var info1 = data[0].Datas;
				var info2 = data[1].Datas;
				info1.splice(2, 0, info2[0]);
				info1.push(info2[1]);
				var text = '';
				for(var x = 0; x < info1.length; x++) {
					var theInfo = info1[x];
					text += '<div class="building-card-content-col-4">\
	                  <div class="building-yellow-num">' + theInfo.Numner + '</div>\
	                  <p class="building-card-content-desc">' + theInfo.Name + '</p>\
	                </div>';
				}
				$('.typeCount').html(text);
			}, api, 2);
		},
		//对象分布-------------数据面板---建筑性质统计
		_getHomePageBldgNatureStatistics: function() {
			var api = mapDate.apis['getHomePageBldgNatureStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
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
				Charts._peiOne(chartsData, '建筑性质', 'chart1');
			}, api);
		},
		//对象分布-------------数据面板---建筑结构统计
		_getHomePageStructureStatistics: function() {
			var api = mapDate.apis['getHomePageStructureStatistics'];
			var organiseUnitID = mapDate.organiseUnitID[1];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
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
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var parNode = $('#bldgNature');
				//				$('#bldgNature').find('option').remove();
				parNode.html('<option value="" selected="selected">全部</option>')
				if(data.length > 0) {
					for(var a = 0; a < data.length; a++) {
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
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var parNode = $('#bldgStructure');
				//				parNode.find('option').remove();
				parNode.html('<option value="" selected="selected">全部</option>')
				if(data.length > 0) {
					for(var a = 0; a < data.length; a++) {
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
		_getHomePageNatureAndStructureStatistics: function(autoRun) {
			$('#searchBldg').on('click', function() {
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
						for(var a = 0; a < data.length; a++) {
							var theInfo = data[a];
							var name = theInfo.DistrictName;
							var value = theInfo.Numner;
							barData.push({
								name: name,
								value: value
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
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var reg = data[0].Datas;
				var supervise = data[1].Datas;
				var infoArr = [];
				for(var a = 0; a < reg.length; a++) {
					var theInfo = {
						m: reg[a].DateIndex,
						reg: reg[a].Number,
						supervise: supervise[a].Number,
					}
					infoArr.push(theInfo);
				}
				Charts._barTwo(infoArr, 'chart4');
			}, api, 2);
		},
		//隐患统计（隐患分析）------------数据面板-----------重大隐患及整改情况 
		_getHazardsTotal: function() {
			var api = mapDate.apis['getHazardsTotal'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				if(data.length > 0) {
					data = data[0];
					var total = data.total; //全部
					var overdueIncomplete = data.overdueIncomplete; //逾期未完成
					var overdueComplete = data.overdueComplete; //逾期完成
					var complete = data.complete; //完成

					var completeRate = '';
					if(total <= 0) {
						completeRate = '—';
					} else {
						//	完成率：complete/total
						//						completeRate = Math.floor(parseInt(complete)/parseInt(total)*10000)/100+'%';
						completeRate = parseInt(complete) / parseInt(total);
						completeRate = (completeRate * 100).toFixed(2) + '%';
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
				StartDate: '',
				EndDate: ''
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				if(data.length > 0) {
					var peiData = [];
					for(var a = 0; a < data.length; a++) {
						var theInfo = data[a];
						var name = theInfo.ModelItemName;
						var value = theInfo.Abnormal;
						peiData.push({
							name: name,
							value: value
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
					if(key == 'ID') {
						continue;
					}
					var theData = {
						name: arrName[key],
						value: arrVal[key]
					};
					chartsData.push(theData);
				}
				Charts._peiOne(chartsData, '建筑消防设施缺失', 'chart6');
				//				}
			}, api, 2);
		},
		//隐患统计（隐患分析）------------数据面板-----------支队辖区隐患及处理情况 
		_getHazardsTotalByDistrict: function() {
			var api = mapDate.apis['getHazardsTotalByDistrict'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				Charts._barThree(data, 'chart7');
			}, api);
		},
		//隐患统计（隐患分析）------------数据面板-----------全年隐患及处理趋势 
		_getHazardsTotalByMonth: function() {
			var api = mapDate.apis['getHazardsTotalByMonth'];
			var organiseUnitID = mapDate.organiseUnitID[2];
			var req = {
				OrganiseUnitID: organiseUnitID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				Charts._categoryOne(data, 'chart8');
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
					var name = 'danger-' + arr[arr.length - 1];
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
						var ratio = ((Number(nowRes) - Number(lastMout)) / Number(lastMout) * 100).toFixed(2);
						if(ratio == 0) {
							hb = '持平';
						} else if(hb > 0) {
							hb = '+' + ratio + '%';
							hbExp = 'up';
						} else {
							hbExp = 'down';
							hb = ratio + '%';
						}
					}
					$('.' + name).find('.building-change-percentage').eq(1).html(hb);
					$('.' + name).find('.building-change-percentage').eq(1).addClass(hbExp);

					var tb = '';
					var tbExp = '';
					if(!lastYear || lastYear == '0') {
						tb = '——';
					} else {
						var ratio1 = ((Number(nowRes) - Number(lastYear)) / Number(lastYear) * 100).toFixed(2);
						if(ratio1 == 0) {
							tb = '持平';
						} else if(ratio1 > 0) {
							tbExp = 'up';
							tb = '+' + ratio1 + '%';
						} else {
							tbExp = 'down';
							tb = ratio1 + '%';
						}
					}
					$('.' + name).find('.building-change-percentage').eq(0).html(tb);
					$('.' + name).find('.building-change-percentage').eq(0).addClass(tbExp);
				}

				arr.forEach(function(item, index) {
					compare(item);
				});

			}, api, 3);
		},
		//获取高层建筑档案详情
		_map_Chart_GetHRBDInfo: function(BldgID) {
			var api = mapDate.apis['map_Chart_GetHRBDInfo'];
			var req = {
				BldgID: BldgID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				var arr = [
					'BldgName', //建筑名称
					'DistrictName', //行政区划
					'Company', //所属单位
					'BldgAddress', //建筑地址
					'ManageUnitName', //物业管理公司
					'CompletionTime', //竣工时间
					'Responsible', //消防安全责任人
					'ResponsiblePhone', //消防安全责任人电话
					'Manager', //消防安全管理人
					'ManagerPhone', //消防安全管理人电话
					'ResidentialManager', //居住建筑楼长
					'PublicBldg', //公共消防安全职业经理
					'BldgNature', //建筑性质
					'Structure', //建筑结构
					'Material', //外墙保温材料
					'IsFireStation', //微型消防站建设		0 无 1 有
					'FirePhone', //联系电话
					'FireFighterCount', //消防人员数量
					'FireEquipCount', //消防装备(套)
					'FloorUpperCount', //地上层数
					'FloorBelowCount', //地下层数
					'FloorHeight', //高度(M)
					'ControlRoom', //消防控制室位置
					'ElevatorCount', //消防电梯数量
					'StairsCount', //疏散楼梯数
					'EXITCount', //安全出口数量
					'FireLaneCount', //消防车道数量
					'FireLaneAddress', //消防车道位置
					'RefugeCount', //避难层(间)
					'Acreage', //面积(㎡)
					'RefugeRoomCount', //避难层
					'SeatDescribe', //避难间位置描述
					'FireMonitorSystem', //电器火灾监控系统		0 无 1 有
					'RemoteMonitoring', //物联网远程监管系统		0 无 1 有
					'HearthAutoFire', //灶台自动灭火系统		0 无 1 有
					'AutoFireAlarm', //火灾自动报警系统		0 无 1 有
					'AutoWaterSpray', //自动喷水灭火系统		0 无 1 有
					'FireHydrant', //消火栓系统				0 无 1 有
					'ExhaustSmoke', //防、排烟系统			0 无 1 有
					'FirePump', //消防水泵				0 无 1 有
					'OtherSystem', //其它灭火系统			0 无 1 有
					'BldgType', //建筑类别
					'Density', //人员密集场所		0 否 1 是
					'ImportantSite', //重要场所			0 否 1 是
					'PublicSite', //公共娱乐场所		0 否 1 是
					'FireEngine' //消防车登高操作场地	0 无 1 有
				];
				for(var a = 0; a < arr.length; a++) {
					var theKey = arr[a];
					var theVal = data[0][theKey];

					if(theKey == 'IsFireStation' || theKey == 'FireMonitorSystem' || theKey == 'RemoteMonitoring' || theKey == 'HearthAutoFire' || theKey == 'AutoFireAlarm' || theKey == 'AutoWaterSpray' || theKey == 'FireHydrant' || theKey == 'ExhaustSmoke' || theKey == 'FirePump' || theKey == 'OtherSystem' || theKey == 'FireEngine') {
						if(theVal == 0) {
							theVal = '无';
						} else if(theVal == 1) {
							theVal = '有';
						}
					}
					if(theKey == 'Density' || theKey == 'ImportantSite' || theKey == 'PublicSite') {
						if(theVal == 0) {
							theVal = '否';
						} else if(theVal == 1) {
							theVal = '是';
						}
					}
					$('.building-record-item').find('.' + theKey).html(theVal);
				}

				$('.building-record-window').fadeToggle();
			}, api);
		},
		//获取高层建筑检查记录任务列表
		_map_Chart_GetHRBDTaskList: function(BldgID,PageIndex) {
			
			
			//------------------------------------------------------------------------------------
			/*测试数据，以后需要删除*/
			var BldgID = '46690f3f-0468-49c6-a152-67da6217aff2';	
			//------------------------------------------------------------------------------------
			
			$_this = this;
			var api = mapDate.apis['map_Chart_GetHRBDTaskList'];
			var req = {
				PageSize: 10,
				PageIndex: PageIndex,
				BldgID: BldgID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				if(document.getElementById('inspection-month-page')) {
					document.getElementById('inspection-month-page').value = PageIndex;
				} else {
					var inp = document.createElement('input');
					inp.type = 'hidden';
					inp.value = PageIndex;
					inp.id = 'inspection-month-page';
					$(document.body).append(inp);
				}
				
				if(data.length > 0) {
					var text = '';
					for(var a=0; a<data.length; a++) {
						var theInfo = data[a];
						var BldgID = theInfo.BldgID;
						var TaskID = theInfo.TaskID;
						
						/*
						 *测试数据，以后需要删除
						 * ----------------------------------------------------------------------------
						 * */
						BldgID = '74796f40-7465-4002-8101-dbefd65f20c2';
						TaskID = 'c9ab5850-b3a9-11e7-814d-fa163e4635ff';
						/*
						 *测试数据，以后需要删除
						 * ----------------------------------------------------------------------------
						 * */
						
						
						
                        text += '<li class="building-inspection-month">';
                        text += '\
	                        <h5 class="building-inspection-period" onclick="$_this._map_Chart_GetHRBDRegionList(\''+BldgID+'\',\''+TaskID+'\',this)">消防月安全检查（'+theInfo.Taskdate+'）</h5>\
		                        <div class="building-inspection-summary">\
		                        <div class="building-inspection-time">'+theInfo.Taskdate+'</div>\
		                        <div class="building-inspection-record">'+theInfo.ExamItemCount+'/'+theInfo.TotalItemCount+'</div>\
	                        </div>\
                        ';
                        text += '</li>';
					}
					
					isEnd = true;
					if(PageIndex == 0) {
						$('.building-inspection-list').html(text);
						//绑定滚动条事件，滚动条滚动到底部时加载更多数据
						var scrollBang = function(dom) {
							var scrollDom = dom.parent();
							scrollDom.on('scroll',function(){
								var domHei = dom.height();
								var parHei = dom.parent().height();
								var scrollTop = $(this).scrollTop();
								if((parHei + scrollTop) >= domHei && isEnd) {
									isEnd = false;
									var nowPage = $('#inspection-month-page').val()+1;
									$_this._map_Chart_GetHRBDTaskList(BldgID,nowPage);
								}
							});
						}($('.building-inspection-list'));
					} else {
						$('.building-inspection-list').html($('.building-inspection-list').html()+text);
					}
					$('.building-inspection-list').find('.building-inspection-period').eq(0).click();
				} else {
					if(PageIndex == 0) {
						var text = '<li style="padding-left:10px;">暂无数据</li>';
						$('.building-inspection-list').html(text);
					} else {
						var text = '<li style="padding-left:10px;">没有更多数据了</li>';
						$('.building-inspection-list').html($('.building-inspection-list').html()+text);
					}
				}
				$('.building-inspection-window').show();
			}, api);
		},
		//地图-获取高层建筑区域列表(单元和楼层的列表)
		_map_Chart_GetHRBDRegionList: function(BldgID,TaskID,obj) {
			if($(obj).attr('class').indexOf('active') != -1) {
				return false;
			}
			$(obj).parent().parent().find('.active').removeClass('active');
			$(obj).addClass('active');
			
			var api = mapDate.apis['map_Chart_GetHRBDRegionList'];
			var req = {
				BldgID: BldgID,
				TaskID:TaskID
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				$('.building-inspection-floors').html('');
				if(data.length > 0) {
					var text = '';
					for(var a=0; a<data.length; a++) {
						var theInfo = data[a];
						var name = theInfo.RegionName;
						var LevelCode = theInfo.LevelCode;
						var RegionID = theInfo.RegionID;
						var TaskID = theInfo.TaskID;
						var BldgID = theInfo.BldgID;
						text += '<li datacode="'+LevelCode+'" dataregion="'+RegionID+'" datatask="'+TaskID+'" databldg="'+BldgID+'" onclick="$_this._map_Chart_GetHRBDModelList(this)">'+name+'</li>';
					}
					$('.building-inspection-floors').html(text);
					$('.building-inspection-floors').find('li').eq(0).click();
				}
			}, api);
		},
		//获取高层建筑检查模型列表
		_map_Chart_GetHRBDModelList: function(obj) {
			if($(obj).hasClass('active')) {
				return false;
			}
			$(obj).parent().find('.active').removeClass('active');
			$(obj).addClass('active');
			
			var api = mapDate.apis['map_Chart_GetHRBDModelList'];
			var BldgID = $(obj).attr('databldg');
			var TaskID = $(obj).attr('datatask');
			var RegionLevelCode = $(obj).attr('datacode');
			
			/*
			 *测试数据，以后需要删除
			 * ----------------------------------------------------------------------------
			 * */
			BldgID = '46690f3f-0468-49c6-a152-67da6217aff2';
			TaskID = 'f5281aef-e916-11e7-814d-fa163e4635ff';
			RegionLevelCode = '10001002';
			/*
			 *测试数据，以后需要删除
			 * ----------------------------------------------------------------------------
			 * */
			
			
			var req = {
				BldgID: BldgID,
				TaskID:TaskID,
				RegionLevelCode:RegionLevelCode
			};
			mapDate.mapAjax._getDataFromOrganiseUnitId(req, function(data) {
				if(data.length > 0) {
					var rowNum = 2;
					var listNum = data.length/rowNum;
					var text = '<div class="building-inspection-inner-cons-li">';
					for(var a=1; a<=listNum; a++) {
						text += '\
								<div class="building-inspection-group">';
						for(var b=a*rowNum-rowNum; b<a*rowNum; b++) {
							var theInfo = data[b];
							
							text += '\
					            <div class="building-inspection-item two-col">\
					                <label class="building-inspection-label">\
					                	<img src="src/images/building-tree.png">\
					                </label>\
					                <div class="building-inspection-item-content">'+theInfo.ModelItemName+'</div>\
					            </div>\
							';
						}
						text += '</div>';
					}
					text += '</div>';
					$('.building-inspection-inner-cons').html($('.building-inspection-inner-cons').html()+text);
					$('.building-inspection-inner-cons').find('.building-inspection-inner-cons-li').eq(0)._upLeft();
				}
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
		}
	};

	window.mapDate = mapDate;
})();