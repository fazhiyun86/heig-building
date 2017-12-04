(function ($) {

  var jQueryAddon = {
    /**
      按钮触发该函数。
      点击按钮展示/隐藏效果。
      鼠标移出，隐藏下拉框。
      example: $('[data-toggle="dropdown"]')._dropdown();
    */
    _dropdown: function () {
      var _btn = this;
      var $dropdown = $(_btn).parent();
      var $dropdownList = $(_btn).next();

      $(_btn).on('click', function () {
        $dropdown.toggleClass('active');
      });

      $dropdownList.on('mouseleave', function (e) {
        $dropdown.removeClass('active');
      });
    },
    /**
      按钮触发该函数。
      点击按钮，切换滑出效果。
      example：$('[data-toggle="slide"]')._slide();
    */
    _slide: function () {
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
    },
    /*
      导航切换
      导航栏父元素触发该事件。
    */
    _toggleItem: function (callback) {
      var _root = this;
      $(_root).on('click', function (evt) {
        var _src = evt.target;
        $(_root).children().removeClass('active');
        $(_src).addClass('active');
        evt.preventDefault();
      });
    }
  }

  $.extend($.fn, jQueryAddon);

  /*项目*/
  var fireSupervisorPlatform = {
    init: function () {

    },
    features: ['distribution', 'hiddenDanger', 'inspection', 'fireDisaster']
  }

})($);