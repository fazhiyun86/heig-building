(function () {

  var baiduMap = {
    // 地图实例
    map: null,
    ak: 'RLvdRgMOx0gTOrWKTiABzwm2jGEB40y8',
    currOverlay: 'building', // 控制标识类别  是否显示建筑物详细
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
      this.showBldgDetail = false;
      this.map.centerAndZoom(center, zoom);
      this.map.enableScrollWheelZoom(true);

      var baiduMap = this;
      this.map.addEventListener('zoomstart', function() {
        baiduMap.zoomstartListener();
      });
      this.map.addEventListener('zoomend', function() {
        baiduMap.zoomendListener();
      })

      //添加标注
      this.addBuildingOvarlay('161e95db-4700-11e5-a618-64006a4cb35a');
      
      
    },
    // 在地图上添加 对象分布 遮盖物
    addBuildingOvarlay: function (organiseUnitID) {
      var baiduMap = this;
      var url = BUILD.getDataUrl('Map_Chart_GetBldgListForOrganiseUnit');
      $.ajax({
        type: 'GET',
        url: url,
        data: {
          organiseUnitID: organiseUnitID
        },
        dataType: 'json',
        success: function (response, status, xhr) {
          var data = response.DataSource.Tables[0].Datas;
          console.log('建筑物坐标', data);
          for (var i = 0; i < data.length; i++) {
            var bldgInfo = data[i];
            var point = new BMap.Point(bldgInfo.Longitude, bldgInfo.Latitude);
            var buildingOverlay = new RegionalDistributionOverlay(point, bldgInfo);
            baiduMap.map.addOverlay(buildingOverlay);
          }

          baiduMap.toggleBldgInfo();
        },
        error: function (xhr, msg, error) {
          alert(msg);
        }
      })
    },
    // 在地图上添加  火灾分析  遮盖物
    addFireOverlay: function () {},
    // 地图添加缩放监听事件
    zoomstartListener: function () {
      this.startZoom = this.map.getZoom();
    },
    zoomendListener: function () {
      var pointZoom = 10;
      var type = this.currOverlay;
      //建筑物标记，根据缩放级别，决定是否显示建筑物名称及其他操作
      if (type !== 'building') {
        return;
      }
      var zoom = this.map.getZoom();

      if (zoom <= pointZoom) {
        this.showBldgDetail = false;  
      }else {
        this.showBldgDetail = true;
      }

      if( this.startZoom > pointZoom && zoom > this.startZoom && this.showBldgDetail) {
        return;
      }

      /*if ( this.startZoom <= pointZoom && zoom <= this.startZoom && !this.showBldgDetail) {
        return;
      }*/

      if ( zoom < this.startZoom && zoom > pointZoom && this.showBldgDetail) {
        return;
      }

      /*if ( zoom > this.startZoom && zoom <= pointZoom && !this.showBldgDetail ) {
        return;
      }*/

      this.toggleBldgInfo();
    },
    toggleBldgInfo () {
      // debugger;
      var zoom = this.map.getZoom();
      var displayVal = this.showBldgDetail ? 'block' : 'none';
      var markerScale = this.showBldgDetail ? 'scale(1,1)' : 'scale('+ zoom/10 + ',' + zoom/10 +')';

      var doms = document.querySelectorAll('.building-info-overlay');

      for (var i = 0, len = doms.length; i < len; i++) {
        var dom = doms[i];
        var name = doms[i].querySelector('.building-name');
        var marker = doms[i].querySelector('.building-marker');
        name.style.display = displayVal;
        marker.style.transform = markerScale;
      }

    },
    addHotspot () {
      
    }
  };

  window.baiduMap = baiduMap;

}());