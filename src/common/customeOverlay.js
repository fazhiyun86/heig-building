  // 自定义基类
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
  BaseCustomeOverlay.prototype.handleEvent = function(dom, type, callback) {
    // 覆盖物点击事件
    dom.addEventListener(type, callback, false);
  }


  // 自定义火灾分析地图覆盖物
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

  


  // 自定义对象分布地图覆盖物
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
    var buildingNameDom = div.querySelector('.building-name');
    this.handleEvent(buildingNameDom, 'click', function(e){
      var parent = buildingNameDom.parentElement;
      console.log(parent.classList)
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