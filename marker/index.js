function loadScript() {
  var script = document.createElement('script');
  script.src = 'http://api.map.baidu.com/api?v=2.0&ak=RLvdRgMOx0gTOrWKTiABzwm2jGEB40y8&callback=initialize';
  document.body.appendChild(script);
}
// 初始化地图
function initialize() {
  // 初始化
  var map = new BMap.Map('map', {
      mapType: BMAP_SATELLITE_MAP
    }),
    center = new BMap.Point(116.65, 39.76),
    zoom = 10;
  map.centerAndZoom(center, zoom);

  var fireInfos = [{
    num: 1,
    time: '2017-11-14',
    location: '新地批发市场1',
    area: 400,
    effect: 1,
    lng: 115,
    lat: 40
  }, {
    num: 2,
    time: '2017-11-14',
    location: '新地批发市场2',
    area: 400,
    effect: 2,
    lng: 116,
    lat: 40
  }, {
    num: 3,
    time: '2017-11-14',
    location: '新地批发市场3',
    area: 400,
    effect: 3,
    lng: 117,
    lat: 40
  }]

  for (var i = 0; i < fireInfos.length; i++) {
    var point = new BMap.Point(fireInfos[i].lng, fireInfos[i].lat);

    var marker = new BMap.Marker(point);        // 创建标注    
    map.addOverlay(marker);
    
    var myFireInfoWindow = new FireInfoWindow(point, fireInfos[i]);
    map.addOverlay(myFireInfoWindow);

  }
}

window.onload = initialize;