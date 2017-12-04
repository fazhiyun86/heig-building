function loadScript() {
  var script = document.createElement('script');
  script.src = 'http://api.map.baidu.com/api?v=2.0&ak=RLvdRgMOx0gTOrWKTiABzwm2jGEB40y8&callback=initialize';
  document.body.appendChild(script);
}
// 初始化地图
function initialize() {
  var map = new BMap.Map('map', {
      mapType: BMAP_SATELLITE_MAP
    }),
    center = new BMap.Point(116.65, 39.76),
    zoom = 10;
  map.centerAndZoom(center, zoom);
}

(function(){
  document.onselectstart = function() {
    return false;
  }

  $('[data-toggle="dropdown"]')._dropdown();
  $('[data-toggle="slide"]')._slide();
  $('[data-toggle="toggleItem"]')._toggleItem();












  // 初始化echarts
  var myChart = echarts.init(document.getElementById('chart1'));
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ],
        label: {
          normal: {
            align: 'left',
            verticalAlign: 'top',
            lineHeight: 30
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);


  loadScript()
}());