(function () {
  
  var Build = {};
  // 导出
  
  
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