/**
 * 地图地图标注页面
 */
(function (BUILD) {
	var mark = {}
	mark.init = function () {
		this.setShowMarkTable();
		this.baiduMap();
	}

	//控制标注列表
	mark.setShowMarkTable = function () {

		var one = new BUILD.setSlider('#oneSlider')
		console.log("one", one)
		$(".building-mark-wrap").on('click', function () {
			one.toggle(function () {
				console.log("显示")
			}, function () {
				console.log('隐藏')
			})
		})
	}

	// 地图的
	mark.baiduMap = function () {
		
		var map = new BMap.Map("container");
		var point = new BMap.Point(116.404, 39.915);
		map.centerAndZoom(point, 18);
		map.addControl(new BMap.NavigationControl());
		map.enableScrollWheelZoom();

		function searchFn() {
			var oInp = document.getElementById("searchInp");
			var searchVal = oInp.value

			if (!searchVal) return false;

			var local = new BMap.LocalSearch(map, {
				renderOptions:{map: map},    
				onSearchComplete: function(results){ 
					// 搜索结果
					// console.log("results", results)
  				},
			});

			local.search(searchVal);

			local.setMarkersSetCallback(function(pois){
				// console.log("pois", pois)
			    for(var i=0;i<pois.length;i++){

			       	var txt = pois[i].address;

					var longitudeValue = pois[i].point.lng; // 经度值
					var latitudeValue = pois[i].point.lat; // 纬度值

			       	pois[i].address = txt + "<br/>" + "经度：" + longitudeValue + "<br/>纬度：" + latitudeValue;

			        // pois[i].marker.addEventListener("infowindowopen", function(e){

			        // }) 
			    }
			})
		}


		// 点击地图的获取经纬度事件
		map.addEventListener("click",function(e){

			map.panTo(new BMap.Point(e.point.lng,e.point.lat)); // 设置成中心
			var longitudeValue = e.point.lng; // 经度值
			var latitudeValue = e.point.lat; // 纬度值

			alert("经度：" + longitudeValue + "\r纬度：" + latitudeValue);
		});
		
		// 在地图缩放的时候是否显示热力图
		map.addEventListener("zoomend", function(e){
			/*
			百度地图API一共分为19级，比例尺分别为：
			[1:20米（简称20米，后同），50米，100米，200米，500米，1公里，2公里，5公里，10公里，20公里，25公里，50公里，100公里，200公里，500公里，1000公里，2000公里，5000公里，10000公里]
			分别对应：
			[19级，18级，17级，16级，15级，14级，13级，12级，11级，10级，9级，8级，7级，6级，5级，4级，3级，2级，1级]
			 */
			var Level = this.getZoom();

			// 定义在什么高度显示和隐藏
			var openLevel = 15;

			if (openLevel >= Level) {
				openHeatmap()
			} else if (openLevel <= Level) {
				closeHeatmap()
			}
		});   

	// 热力图的一些配置 s
		// 热力图的坐标
		var points =[
		    {"lng":116.418261,"lat":39.921984,"count":50},
		    {"lng":116.423332,"lat":39.916532,"count":51},
		    {"lng":116.419787,"lat":39.930658,"count":15},
		    {"lng":116.418455,"lat":39.920921,"count":40},
		    {"lng":116.418843,"lat":39.915516,"count":100},
		    {"lng":116.42546,"lat":39.918503,"count":6},
		    {"lng":116.423289,"lat":39.919989,"count":18},
		    {"lng":116.418162,"lat":39.915051,"count":80},
		    {"lng":116.422039,"lat":39.91782,"count":11},
		    {"lng":116.41387,"lat":39.917253,"count":7},
		    {"lng":116.41773,"lat":39.919426,"count":42},
		    {"lng":116.421107,"lat":39.916445,"count":4},
		    {"lng":116.417521,"lat":39.917943,"count":27},
		    {"lng":116.419812,"lat":39.920836,"count":23},
		    {"lng":116.420682,"lat":39.91463,"count":60},
		    {"lng":116.415424,"lat":39.924675,"count":8},
		    {"lng":116.419242,"lat":39.914509,"count":15},
		    {"lng":116.422766,"lat":39.921408,"count":25},
		    {"lng":116.421674,"lat":39.924396,"count":21},
		    {"lng":116.427268,"lat":39.92267,"count":1},
		    {"lng":116.417721,"lat":39.920034,"count":51},
		    {"lng":116.412456,"lat":39.92667,"count":7},
		    {"lng":116.420432,"lat":39.919114,"count":11},
		    {"lng":116.425013,"lat":39.921611,"count":35},
		    {"lng":116.418733,"lat":39.931037,"count":22},
		    {"lng":116.419336,"lat":39.931134,"count":4},
		    {"lng":116.413557,"lat":39.923254,"count":5},
		    {"lng":116.418367,"lat":39.92943,"count":3},
		    {"lng":116.424312,"lat":39.919621,"count":100},
		    {"lng":116.423874,"lat":39.919447,"count":87},
		    {"lng":116.424225,"lat":39.923091,"count":32},
		    {"lng":116.417801,"lat":39.921854,"count":44},
		    {"lng":116.417129,"lat":39.928227,"count":21},
		    {"lng":116.426426,"lat":39.922286,"count":80},
		    {"lng":116.421597,"lat":39.91948,"count":32},
		    {"lng":116.423895,"lat":39.920787,"count":26},
		    {"lng":116.423563,"lat":39.921197,"count":17},
		    {"lng":116.417982,"lat":39.922547,"count":17},
		    {"lng":116.426126,"lat":39.921938,"count":25},
		    {"lng":116.42326,"lat":39.915782,"count":100},
		    {"lng":116.419239,"lat":39.916759,"count":39},
		    {"lng":116.417185,"lat":39.929123,"count":11},
		    {"lng":116.417237,"lat":39.927518,"count":9},
		    {"lng":116.417784,"lat":39.915754,"count":47},
		    {"lng":116.420193,"lat":39.917061,"count":52},
		    {"lng":116.422735,"lat":39.915619,"count":100},
		    {"lng":116.418495,"lat":39.915958,"count":46},
		    {"lng":116.416292,"lat":39.931166,"count":9},
		    {"lng":116.419916,"lat":39.924055,"count":8},
		    {"lng":116.42189,"lat":39.921308,"count":11},
		    {"lng":116.413765,"lat":39.929376,"count":3},
		    {"lng":116.418232,"lat":39.920348,"count":50},
		    {"lng":116.417554,"lat":39.930511,"count":15},
		    {"lng":116.418568,"lat":39.918161,"count":23},
		    {"lng":116.413461,"lat":39.926306,"count":3},
		    {"lng":116.42232,"lat":39.92161,"count":13},
		    {"lng":116.4174,"lat":39.928616,"count":6},
		    {"lng":116.424679,"lat":39.915499,"count":21},
		    {"lng":116.42171,"lat":39.915738,"count":29},
		    {"lng":116.417836,"lat":39.916998,"count":99},
		    {"lng":116.420755,"lat":39.928001,"count":10},
		    {"lng":116.414077,"lat":39.930655,"count":14},
		    {"lng":116.426092,"lat":39.922995,"count":16},
		    {"lng":116.41535,"lat":39.931054,"count":15},
		    {"lng":116.413022,"lat":39.921895,"count":13},
		    {"lng":116.415551,"lat":39.913373,"count":17},
		    {"lng":116.421191,"lat":39.926572,"count":1},
		    {"lng":116.419612,"lat":39.917119,"count":9},
		    {"lng":116.418237,"lat":39.921337,"count":54},
		    {"lng":116.423776,"lat":39.921919,"count":26},
		    {"lng":116.417694,"lat":39.92536,"count":17},
		    {"lng":116.415377,"lat":39.914137,"count":19},
		    {"lng":116.417434,"lat":39.914394,"count":43},
		    {"lng":116.42588,"lat":39.922622,"count":27},
		    {"lng":116.418345,"lat":39.919467,"count":8},
		    {"lng":116.426883,"lat":39.917171,"count":3},
		    {"lng":116.423877,"lat":39.916659,"count":34},
		    {"lng":116.415712,"lat":39.915613,"count":14},
		    {"lng":116.419869,"lat":39.931416,"count":12},
		    {"lng":116.416956,"lat":39.925377,"count":11},
		    {"lng":116.42066,"lat":39.925017,"count":38},
		    {"lng":116.416244,"lat":39.920215,"count":91},
		    {"lng":116.41929,"lat":39.915908,"count":54},
		    {"lng":116.422116,"lat":39.919658,"count":21},
		    {"lng":116.4183,"lat":39.925015,"count":15},
		    {"lng":116.421969,"lat":39.913527,"count":3},
		    {"lng":116.422936,"lat":39.921854,"count":24},
		    {"lng":116.41905,"lat":39.929217,"count":12},
		    {"lng":116.424579,"lat":39.914987,"count":57},
		    {"lng":116.42076,"lat":39.915251,"count":70},
		    {"lng":116.425867,"lat":39.918989,"count":8}
	    ];

	    if(!isSupportCanvas()){
	    	alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
	    }
		heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
		map.addOverlay(heatmapOverlay);
		heatmapOverlay.setDataSet({data:points,max:100});
		//是否显示热力图
	    function openHeatmap(){
	        heatmapOverlay.show();
	    }
		function closeHeatmap(){
	        heatmapOverlay.hide();
	    }
		closeHeatmap();
	    function setGradient(){

	     	var gradient = {};
	     	var colors = document.querySelectorAll("input[type='color']");
	     	colors = [].slice.call(colors,0);
	     	colors.forEach(function(ele){
				gradient[ele.getAttribute("data-key")] = ele.value; 
	     	});
	        heatmapOverlay.setOptions({"gradient":gradient});
	    }
		//判断浏览区是否支持canvas
	    function isSupportCanvas(){
	        var elem = document.createElement('canvas');
	        return !!(elem.getContext && elem.getContext('2d'));
	    }
	}


	mark.init();
})(BUILD)