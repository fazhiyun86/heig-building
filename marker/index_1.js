var map = new BMap.Map('map', {
      mapType: BMAP_SATELLITE_MAP
    }),
    center = new BMap.Point(116.65, 39.76),
    zoom = 10;
map.centerAndZoom(center, zoom);

var marker = new BMap.Marker(center);        // 创建标注    
map.addOverlay(marker);


var buildingInfos = [
  {
    name: '华丽大厦',
    lng: 115.8,
    lat: 40
  },
  {
    name: '华丽大厦2',
    lng: 117,
    lat: 40
  }
]
for (var i = 0; i < buildingInfos.length; i++) {
  var point = new BMap.Point(buildingInfos[i].lng, buildingInfos[i].lat);
  var buildingOverlay = new RegionalDistributionOverlay(point, buildingInfos[i]);
  map.addOverlay(buildingOverlay);
}
