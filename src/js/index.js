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

  function dropdown () {
    /**
      下拉框触发按钮执行该函数。
      点击按钮切换展示/隐藏效果。
      鼠标移出，隐藏下拉框。
    */
    var _self = this;
    var $dropdown = $(_self).parent();
    var $dropdownList = $(_self).next();

    $(_self).on('click', function () {
      $dropdown.toggleClass('active');
    });

    $dropdownList.on('mouseleave', function (e) {
      $dropdown.removeClass('active');
    });
  }
  $.fn.dropdown = dropdown;
  $('[data-toggle="dropdown"]').dropdown();

  /**
    数据面板&查询条件的点击事件
  */
  function slide () {
    var _callers = this;

    for (var i = 0; i < _callers.length; i++) {
      var _self = _callers[i];
      var _selectorPrefix = '.building-slider-';
      var _direction = $(_self).attr('data-direct');

      (function(_direction){

        $(_self).on('click', function(){
          var _selector = _selectorPrefix + _direction;
          $(_selector).toggleClass('active');
          if(_direction === 'left') {
            $(_selectorPrefix + 'bottom').toggleClass('active');
          }
        });

      }(_direction));
      
    }
  }
  $.fn.slide = slide;
  $('[data-toggle="slide"]').slide();












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