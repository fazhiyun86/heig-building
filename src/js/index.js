var baiduMap = null;
(function () {

  baiduMap = {
    // 地图实例
    map: null,
    ak: 'RLvdRgMOx0gTOrWKTiABzwm2jGEB40y8',
    // 加载地图
    /*loadScript: function () {
      var script = document.createElement('script');
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak='+ this.ak +'&callback=baiduMap.initialize';
      document.body.append(script);
    },*/
    // 初始化地图
    initialize: function () {
      this.map = new BMap.Map('map', {
        mapType: BMAP_SATELLITE_MAP
      });
      var center = new BMap.Point(116.65, 39.76),
        zoom = 10;
      this.map.centerAndZoom(center, zoom);

      this.addBuildingOvarlay('161e95db-4700-11e5-a618-64006a4cb35a');
    },
    // 在地图上添加 对象分布 遮盖物
    addBuildingOvarlay: function (organiseUnitID) {
      var self = this;
      var url = Build.getDataUrl('Map_Chart_GetBldgListForOrganiseUnit');
      $.ajax({
        type: 'GET',
        url: url,
        data: {
          organiseUnitID: organiseUnitID
        },
        dataType: 'json',
        success: function (response, status, xhr) {
          var data = response.DataSource.Tables[0].Datas;
          for (var i = 0; i < data.length; i++) {
            var bldgInfo = data[i];
            var point = new BMap.Point(bldgInfo.Longitude, bldgInfo.Latitude);
            var buildingOverlay = new RegionalDistributionOverlay(point, bldgInfo);
            self.map.addOverlay(buildingOverlay);
          }
        },
        error: function (xhr, msg, error) {
          alert(msg);
        }
      })
      /*var point = new BMap.Point();
      var buildingOverlay = new RegionalDistributionOverlay(point, buildingInfos[i]);
      this.map.addOverlay(buildingOverlay);*/
    }
  };

  var Build = {};

  Build.getDataUrl = function (api) {
    return 'http://114.115.144.251:8001/WebApi/DataExchange/GetData/' + api + '?dataKey=00-00-00-00';
  }
  
  Build.init = function () {
    this.initiate(); // 初始化默认加载的数据和方法
    this.selectArea(); // 区域选择
    this.clickBuilding(); //点击建筑物的操作
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
    baiduMap.initialize();
    

    // 数据面板
    $('[data-toggle="slide"]')._slide();
    // 切换点击
    $('[data-toggle="toggleItem"]')._toggleItem();

    // 初始化echarts
    var myChart = echarts.init(document.getElementById('chart1'));
    var option = getCharsOptions.pieOptions();
    myChart.setOption(option);

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
   * 点击对象分布操作
   */
  Build.clickObject = function () {
    
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
    
  }

  Build.init();
})()