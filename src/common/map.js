(function () {
  /**
    * 自定义  覆盖物基类
    */
  function BaseCustomeOverlay(center) {
    this._center = center;
    this._div = null;
    this._map = null;
  }
  BaseCustomeOverlay.prototype = new BMap.Overlay();

  BaseCustomeOverlay.prototype.show = function() {
    (this._div) && (this._div.style.display = '');
  }

  BaseCustomeOverlay.prototype.hide = function() {
    (this._div) && (this._div.style.display = 'none');
  }
  // 覆盖物点击事件
  BaseCustomeOverlay.prototype.handleEvent = function(dom, type, callback) {
    dom.addEventListener(type, callback, false);
  }


  /**
    * 火灾分析地图覆盖物
    */
  function FireInfoWindow(center, fireInfo) {
    BaseCustomeOverlay.call(this, center);
    this._fireInfo = fireInfo;
  }
  FireInfoWindow.prototype = new BaseCustomeOverlay();

  FireInfoWindow._iconSize = 18;
  FireInfoWindow.prototype.initialize = function(map) {
    this._map = map;
    // 覆盖物容器
    var div = document.createElement('div');
    div.className = 'fire-info-window';
    // 覆盖物内容
    var fireInfo = this._fireInfo;
    (typeof fireInfo === 'string') && (fireInfo = JSON.parse(fireInfo));
    var html = '\
          <div class="fire-info">\
            <span class="fire-num">' + fireInfo.num + '</span>\
            <p class="fire-time">' + fireInfo.time + '</p>\
            <p class="fire-location">' + fireInfo.location + '</p>\
          </div>\
          <div class="fire-info-extra clear">\
            <p class="fire-area">' + fireInfo.area + '㎡</p>\
            <p class="fire-effect"><span></span>' + fireInfo.effect + '</p>\
          </div>\
        '
    div.innerHTML = html;

    // 将div添加到覆盖物容器中
    map.getPanes().floatPane.appendChild(div);
    this._div = div;

    // 添加事件
    this.handleEvent(div, 'click', function() {
      alert(JSON.stringify(fireInfo))
    })
    return div;
  }

  FireInfoWindow.prototype.draw = function() {
    var pos = this._map.pointToOverlayPixel(this._center);

    this._div.style.left = pos.x - FireInfoWindow._iconSize/2 + 'px';
    this._div.style.top = pos.y - FireInfoWindow._iconSize/2 -10 + 'px'; // -10: icon距离覆盖物容器顶部的距离
  }

  /**
    * 对象分布地图覆盖物
    */  
  function RegionalDistributionOverlay (center, buildingInfo) {
    BaseCustomeOverlay.call(this, center);
    this._buildingInfo = buildingInfo;
  }
  RegionalDistributionOverlay.prototype = new BaseCustomeOverlay();

  RegionalDistributionOverlay.prototype.initialize = function (map) {
    this._map = map;

    var buildingInfo = this._buildingInfo;
    var div = document.createElement('div');
    div.className = 'building-info-overlay';
    var html = '\
      <div class="building-marker yellow">\
        <div class="building-name">'+ buildingInfo.BldgName +'</div>\
      </div>\
      <div class="building-comment">消防自管</div>\
      <div class="building-info-window">\
        <div class="building-info-menu menu-top-center">建筑档案</div>\
        <div class="building-info-menu menu-315-left">检查记录</div>\
        <div class="building-info-menu menu-middle-left">隐患整改</div>\
        <div class="building-info-menu menu-225-left">统计数据</div>\
        <div class="building-info-menu menu-bottom-center">BIM模型</div>\
        <div class="center-circle"></div>\
        <div class="decoration-circle"></div>\
      </div>\
    ';
    div.innerHTML = html;
    map.getPanes().floatPane.appendChild(div);
    // 在窗口区域双击
    this.handleEvent(div, 'dblclick', function(e){
      e.stopPropagation();
    })

    /**
     * 建筑物名称点击事件
     *  -1.建筑物名称高亮显示
     *  -2.建筑物菜单显示
     */
    var buildingNameDom = div.querySelector('.building-name');
    this.handleEvent(buildingNameDom, 'click', function(e){
      // 先隐藏当前显示的任意窗口
      var activeWindows = document.querySelectorAll('.building-info-window.active');
      if (!(activeWindows.length == 1 && activeWindows[0].parentElement.querySelector('.building-name') == buildingNameDom)) {
        for (var aw = 0, len = activeWindows.length; aw < len; aw++) {
          activeWindows[aw].classList.remove('active');
          activeWindows[aw].parentElement.querySelector('.building-marker').classList.remove('active');
        }
      }
      // 切换显示效果
      var parent = buildingNameDom.parentElement;
      parent.classList.contains('active') ? parent.classList.remove('active') : parent.classList.add('active');

      var sibling = parent.parentElement.querySelector('.building-info-window');
      sibling.classList.contains('active') ? sibling.classList.remove('active') : sibling.classList.add('active');
    })

    var buildingInfoMenuDom = div.querySelector('.building-info-menu');
    this.handleEvent(buildingInfoMenuDom, 'click', function(e){
      alert(buildingInfo.BldgID);
    })

    this._div = div;
    return div;
  }
  RegionalDistributionOverlay._size = 200;
  RegionalDistributionOverlay.prototype.draw = function(){
    var pos = this._map.pointToOverlayPixel(this._center);

    this._div.style.top = pos.y - RegionalDistributionOverlay._size / 2 + 'px';
    this._div.style.left = pos.x - RegionalDistributionOverlay._size /2 + 'px';
  }


  var fpcMap = {
    // 地图实例
    map: null,
    ak: 'RLvdRgMOx0gTOrWKTiABzwm2jGEB40y8',
    /**
      * currOverlay: 控制标识类型
      *   ---building:<<对象分布>>标识，需根据缩放级别显示热力图/圆点/名称。
      *       --非budilding值时，暂不需zoomend事件响应
      */
    currOverlay: 'building',
    /**
     * showBldgDetail：控制建筑物标识显示 圆点 / 名称+菜单
     */
    showBldgDetail: false,
    /**
      * mapLevel：地图不同级别
      *   ---<<对象分布>>模块，级别不同，标注物显示不同形式
      */ 
    mapLevel: {
      min: 8,
      init: 10,
      city: 10,
      district: 14,
      street: 18
    },
    /**
      * 初始化地图
      */
    initialize: function () {
      this.map = new BMap.Map('map', {
        mapType: BMAP_SATELLITE_MAP,
        minZoom: this.mapLevel.init,
        enableMapClick: false
      });

      var center = new BMap.Point(116.55, 39.36);
      this.map.centerAndZoom(center, this.mapLevel.city);
      this.map.enableScrollWheelZoom(true);

      /**
       * 添加<<地图类型>>控件
       */
      var mapTypeControl = new BMap.MapTypeControl({
        mapTypes:[BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]
      });
      this.map.addControl(mapTypeControl); 

      var fpcMap = this;
      this.map.addEventListener('zoomstart', function() {
        fpcMap.zoomstartListener();
      });
      this.map.addEventListener('zoomend', function() {
        fpcMap.zoomendListener();
      });
    },
    /**
     * bldgHeatmapPoints 保存建筑物坐标(热力图使用)
     * @type {Array}
     */
    bldgHeatmapPoints: [],
    /**
     * bldgOverlaysArr 保存所有的建筑物覆盖物
     * @type {Array}
     */
    bldgOverlaysArr: [],
    /**
     * 根据OrganiseUnitID获取建筑物信息
     * @param  {String}
     * @return {undefined}
     */
    getBldgInfo: function (organiseUnitID) {
      var fpcMap = this;
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
          for (var i = 0; i < data.length; i++) {
            var bldgInfo = data[i];

            // 保存建筑物坐标，显示热力图
            fpcMap.bldgHeatmapPoints.push({
              'lng': bldgInfo.Longitude,
              'lat': bldgInfo.Latitude,
              'count': 300
            });

            // 保存所有的建筑物覆盖物
            var point = new BMap.Point(bldgInfo.Longitude, bldgInfo.Latitude);
            var buildingOverlay = new RegionalDistributionOverlay(point, bldgInfo);
            fpcMap.bldgOverlaysArr.push(buildingOverlay);
          }

          // 设置建筑物初始化显示样式
          fpcMap.showBldgInfoByZoomLevel(fpcMap.mapLevel.init);
        },
        error: function (xhr, msg, error) {
          alert(msg);
        }
      })
    },
    /**
      * createHeatmap 创建热力图
      */
    createBldgHeatmap: function () {
      if (!util.isSupportCanvas()) {
        alert('您使用的浏览器不支持热力图功能~');
      }

      var heatmapOverlay = new BMapLib.HeatmapOverlay({'radius': 20});
      this.map.addOverlay(heatmapOverlay);

      var points = this.bldgHeatmapPoints;
      heatmapOverlay.setDataSet({
        data: points,
        max: 1000
      });

      return heatmapOverlay;
    },
    /**
     * @return {none}
     */
    createBldgOverlays: function () {
      for (var i = 0, len = this.bldgOverlaysArr.length; i < len; i++) {
        this.map.addOverlay(this.bldgOverlaysArr[i]);
      }
    },
    /**
     * toggleBldgInfo 区只显示圆点，街道显示建筑物名称+点击菜单
     * @return {undefined}
     */
    toggleBldgInfo: function () {
      // debugger;
      var displayVal = this.showBldgDetail ? 'block' : 'none';
      var markerScale = this.showBldgDetail ? 'scale(1,1)' : 'scale(0.7, 0.7)';

      var doms = document.querySelectorAll('.building-info-overlay');

      for (var i = 0, len = doms.length; i < len; i++) {
        var dom = doms[i];
        var name = doms[i].querySelector('.building-name');
        var marker = doms[i].querySelector('.building-marker');
        name.style.display = displayVal;
        marker.style.transform = markerScale;
      }
    },
    /**
     * @param  {Number}
     * @return {none}
     */
    showBldgInfoByZoomLevel: function (zoomLevel) {
      /**
       *  zoomLevel < district : 热力图
       *  zoomLevel < streetLevel : 圆点
       *  zoomLevel >= streetLevel : 名称+弹框
       */
      var cityLevel = this.mapLevel.city;
      var districtLevel = this.mapLevel.district;
      var streetLevel = this.mapLevel.street;

      if(zoomLevel < districtLevel) {
        this.map.clearOverlays();
        this.createBldgHeatmap().show();
      }else{
        if( zoomLevel < this.startZoom &&  this.startZoom < streetLevel && !this.showBldgDetail) {
          return;
        }

        if ( zoomLevel > this.startZoom &&  this.startZoom >= streetLevel && this.showBldgDetail) {
          return;
        }

        this.map.clearOverlays();
        this.createBldgOverlays();
        if (zoomLevel < streetLevel && zoomLevel >= districtLevel) {
          this.showBldgDetail = false;  
        }else {
          this.showBldgDetail = true;
        }

        this.toggleBldgInfo();
      }
    },
    /**
     * localSearch： 创建位置检索  -- 选择地区时，可使用该方法平移至指定位置
     * @return {[type]} [description]
     */
    localSearch: function () {
      var fpcMap = this;
      var local = new BMap.LocalSearch(fpcMap.map, {
        renderOptions: {
          map: fpcMap.map
        },
        onSearchComplete: function (res) {
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            // fpcMap.map.clearOverlays();

            var poi = res.getPoi(0);
            var point = poi.point;

            // 设置地图中心点
            fpcMap.map.setViewport({
              center: point,
              zoom: fpcMap.mapLevel.districtLevel
            });
            
            // 设置window滚动偏移，让地图中心点居中显示（map的区域比屏幕大）
            // TODO：暂时不滚动屏幕 --  不删
            
            /*var pixel = fpcMap.map.pointToPixel(point);
            var viewHeight = window.innerHeight;

            var scrollHeight = 0;
            if (pixel.y > viewHeight) {
              scrollHeight = pixel.y-viewHeight + viewHeight/2;
              
            }

            if (pixel.y > viewHeight/2) {
              scrollHeight = pixel.y - viewHeight/2;
            }

            window.scrollTo(0, scrollHeight);*/
          }
        },
        onMarkersSet: function (res) {
          for (var i = 0; i < res.length; i++) {
            res[i].marker.hide();
          }
        }
      });

      return local;
    },
    /**
     * 搜索指定区域
     */
    searchArea: function (keyword) {
      var local = this.localSearch();
      
      local.search(keyword);
    },
    /**
      * 火灾分析，添加标识物
      */
    addFireOverlay: function () {
      this.currOverlay = 'fireInfo';
      this.map.clearOverlays();
      var fireInfo = new Array(15).fill(0).map(function (value, index, item) {
        return {
          num: index,
          time: '2017-11-14',
          location: '新地批发市场' + index,
          area: 400 + index,
          effect: index,
          lng: 115 + index/10,
          lat: 40 + index/10
        }
      });
      /**
       * @todo ajax获取
       */
      /*var url = BUILD.getDataUrl('');
      $.ajax({
        type: 'GET',
        url: url,
        data: {

        },
        dataType: 'json',
        success: function (response) {

        },
        error: function (xhr, msg, error) {
          alert(msg);
        }
      })*/
      for (var i = 0, len = fireInfo.length; i < len; i++) {
        var fire = fireInfo[i];

        var point = new BMap.Point(fire.lng, fire.lat);
        var myFireInfoWindow = new FireInfoWindow(point, fire);
        this.map.addOverlay(myFireInfoWindow);
      }
    },
    // 地图添加缩放监听事件
    zoomstartListener: function () {
      this.startZoom = this.map.getZoom();
    },
    zoomendListener: function () {
      var type = this.currOverlay;
      //建筑物标记，根据缩放级别，决定是否显示建筑物名称及其他操作
      if (type !== 'building') {
        return;
      }
      var zoom = this.map.getZoom();

      this.showBldgInfoByZoomLevel(zoom);
    }
  };


  /**
   * [util 工具类]
   * @type {Object}
   */
  var util = {}
  util.isSupportCanvas = function () {
    var canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  }

  window.fpcMap = fpcMap;

}());