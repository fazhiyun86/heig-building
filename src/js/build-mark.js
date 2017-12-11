/**
 * 地图地图标注页面
 */
(function(BUILD) {

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	var mark = {};

	/*--------------获取地址中的参数---------start--------------------------------*/
	//	location.href = 'http://localhost/heig-building/build-mark.html?host=http://114.115.144.251:8001/&organi=111';

	//接口服务器地址
	var host = GetQueryString("host");
	//	host = 'http://114.115.144.251:8001/';
	//组织机构
	var organi = GetQueryString("organi");
	/*--------------获取地址中的参数----------end--------------------------*/

	/**
	 * 页面接口
	 */
	var url = {
		area: host + 'WebApi/DataExchange/GetData/CMDS_District_List?dataKey=00-00-00-00',
		buildList: host + 'WebApi/DataExchange/GetData/CMDS_Bldg_List?dataKey=00-00-00-00',
		latAndLon: host + 'WebApi/DataExchange/SendData/CMDS_Bldg_BindLatitudeAndLongitude?datakey=00-00-00-00'
	};
	/**
	 * 页面当中的请求
	 */
	var get = {
		//地区
		area: function(params, callback) {
			$.ajax({
				url: url.area,
				data: {
					ParentDistrictID: params
				},
				success: function(info) {
					info = info['DataSource']['Tables'][0]['Datas'];
					callback && callback(info);
				}
			})
		},
		//搜索
		buildList: function(params, callback) {
			$.ajax({
				url: url.buildList,
				data: params,
				success: function(info) {
					info = info['DataSource']['Tables'][0]['Datas'];
					callback && callback(info);
				}
			})
		},
		//提交
		latAndLon: function(params, callback) {
			$.ajax({
				type: 'post',
				url: url.latAndLon,
				contentType: 'application/json',
				data: JSON.stringify(params),
				success: function(info) {
					callback && callback(info);
				}
			});
		}
	};

	var templateHtml = {
		area: function(data, opt) {
			if(!data) return ''
			opt = opt || {}
			var name = opt.name || 'name',
				id = opt.id || 'id';

			var html = '';

			for(var i = 0; i < data.length; i++) {
				var item = data[i];

				html += '\
					<li class="building-tree-li" data-areaid="' + item['DistrictID'] + '" data-district="' + item['DistrictCode'] + '">\
						<i class="building-tree-icon building-icon-right"></i>\
						<p class="building-tree-title">' + item[name] + '</p>\
						<ul class="building-tree-ul"></ul>\
					</li>';
			}

			html += '';
			return html;
		},
		buildingList: function(data, opt) {
			if(!data) return '';
			var html = '';
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var Latitude = item.Latitude;
				var Longitude = item.Longitude;
				
				html += '\
					<tr>\
						<td class="building-search-name" data-buildid="' + item['BldgID'] + '" datasrc="'+Latitude+'_'+Longitude+'">' + item['BldgName'] + '</td>\
						<td>' + item['ManageUnit'] + '</td>\
						<td style="text-algin: center;">' + isMark(item) + '</td>\
					</tr>'
			}
			if(data.length === 0) {
				html += '<td class="building-center" colspan="3">暂无数据</td>';
			}

			function isMark(item) {
				var html = '';
				if(item.Latitude) {
					html += '<img src="src/images/builing-mark.png" alt="">'
				}
				return html;
			}
			$('.building-table tbody').html(html)
		}
	}

	mark.init = function() {
		this.setShowMarkTable()
		this.setAreaData()
		this.baiduMap()
	}

	//控制标注列表
	mark.setShowMarkTable = function() {

		var one = new BUILD.setSlider('#oneSlider')
		console.log("one", one)
		$(".building-mark-wrap").on('click', function() {
			one.toggle(function() {
				// console.log("显示")
			}, function() {
				// console.log('隐藏')
			})
		})
	}
	// 区域请求数据的方法
	mark.setAreaData = function() {
		var $buildingTree = $('.building-tree-ul');

		var params = '00000000-0000-0000-0000-000000000000';

		get.area(params, function(info) {
			var html = templateHtml.area(info, {
				name: 'Districtname',
				id: 'DistrictID'
			})

			$buildingTree.html(html);
		})

		$buildingTree.on('click', '.building-tree-icon', function(e) {
			var $this = $(this);
			var $thisParent = $this.parent('li');

			var params = $thisParent.attr('data-areaid');
			var districtId = $thisParent.attr('data-district');
			var $wrap = $this.siblings('ul');

			if($this.data('first')) {
				if(!$this.data('nodata')) {
					$wrap.slideToggle('fast');
					$this.toggleClass('building-icon-right');
				}
			} else {
				$this.removeClass('building-icon-right').addClass('building-icon-loding');
				get.area(params, function(info) {
					var html = templateHtml.area(info, {
						name: 'Districtname',
						id: 'DistrictID'
					})
					if(info.length === 0) {
						$this.removeClass('building-icon-loding').data('nodata', true)
					} else {
						$this.removeClass('building-icon-loding').addClass('building-icon-bottom')
					}

					$wrap.html(html)
				})
				$this.data('first', true);
			}

			// 请求列表
			get.buildList({
				DistrictLevel: '',
				BldgName: '',
				ManageUnit: '',
			}, function(info) {
				templateHtml.buildingList(info)
			})
		})

		// 点击查询的时候
		$('.building-search-btn').on('click', function() {
			var buildingName = $("#buildingName").val(),
				manageName = $("#manageName").val();

			get.buildList({
				DistrictLevel: '',
				BldgName: buildingName,
				ManageUnit: manageName,
			}, function(info) {
				templateHtml.buildingList(info)
			})
		})

	}

	// 地图的
	mark.baiduMap = function() {
		var bldgID, bldgName, nowPoint; //建筑物ID

		var map = new BMap.Map("container");
		var point = new BMap.Point(116.404, 39.915);
		map.centerAndZoom(point, 18);
		map.addControl(new BMap.NavigationControl());
		map.enableScrollWheelZoom();
		map.addEventListener("click", function(e) {
			if($('.building-table').find('.active').length > 0) {
				setMarkerClick(e);
			}
		});
		
		function creatIco(Point) {
			var vectorMarker = new BMap.Marker(new BMap.Point(Point.lat,Point.lng), {
			  // 指定Marker的icon属性为Symbol
			  icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
			    scale: 2,//图标缩放大小
			    fillColor: "blue",//填充颜色
			    fillOpacity: 0.5//填充透明度
			  })
			});
			map.addOverlay(vectorMarker);      

//			var pt = new BMap.Point(Point.lat,Point.lng);		
//			var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
//			var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
//			map.addOverlay(marker2);              // 将标注添加到地图中

			var point = new BMap.Point(Point.lat,Point.lng);
			map.centerAndZoom(point, 18);
		}

		function searchFn(searchVal,Point) {
			this.Point = Point;
			if(!searchVal) return false;
			
			map.clearOverlays();
			var local = new BMap.LocalSearch(map, {
				renderOptions: {
					map: map
				},
				onSearchComplete: function(results) {
					// 搜索结果
					console.log("results", results);
//					if(results.wr == '[]' || results.wr == '') {
//						map.clearOverlays();
//					}
				},
			});

			local.search(searchVal);
			local.setMarkersSetCallback(function(pois) {
				for(var i = 0; i < pois.length; i++) {

					var item = pois[i];
					var longitudeValue = item.point.lng; // 经度值
					var latitudeValue = item.point.lat; // 纬度值
					var marker = item.marker; // marker 
					var txt = pois[i].address;

					marker.addEventListener("click", function() {
						//屏蔽点击标记时提示重新设置标记
						event.stopPropagation();
					});
				}
				creatIco(Point);
			})
		}

		function setMarkerClick(info) {
			nowPoint = info.point;

			var $promptWrap = $('.building-prompt');
			$promptWrap.find('.building-prompt-main-txt').text('将此位置点保存为' + bldgName + '地图位置？');
			$promptWrap.removeClass('building-hide');
		}

		//-----------
		$('.building-table').on('click', '.building-search-name', function(e) {
			$('.building-table').find('.active').removeClass('active');
			var $this = $(this);
			$this.addClass('active');
			
			var searchVal = $this.text();
			
			bldgName = searchVal;
			bldgID = $this.attr('data-buildid');

			
			var zb = $this.attr('datasrc');
			if(zb){
				var zbArr = zb.split('_');
				var Point = {
					'lng':zbArr[0],
					'lat':zbArr[1]
				}
			} else {
				Point = '';
			}
			searchFn(searchVal,Point);
		})

		// 
		$('.building-prompt').on('click', '.building-prompt-cancle', function(e) {
			$('.building-prompt').addClass('building-hide');
		}).on('click', '.building-prompt-sure', function(e) {
			var params = {
				BldgID: bldgID,
				Longitude: nowPoint.lng,
				Latitude: nowPoint.lat,
				ModifiedBy: ''
			}

			get.latAndLon(params, function(info) {
				BUILD.alert(info.Summary.Message);

				$('.building-prompt').addClass('building-hide');
			})
		})

		//判断浏览区是否支持canvas
		function isSupportCanvas() {
			var elem = document.createElement('canvas');
			return !!(elem.getContext && elem.getContext('2d'));
		}
	}

	mark.init();
})(BUILD)