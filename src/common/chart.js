/**
 * 自定义echart各配置项
 * 
 */
(function() {
	//创建一个创建图表的公用方法
	function CreatChart(showDomId, option) {
		this.showDomId = showDomId;
		this.option = option;
	}
	CreatChart.prototype.creat = function() {
		var myChart = echarts.init(document.getElementById(this.showDomId));
		myChart.setOption(this.option);
	};
	
	//各不同图表汇总
	var Charts = {
		//建筑性质所用图表
		_peiOne:function(data,showDomId,option) {
			this.color = ['#ed7d31','#ffc000','#70ad47','#9e480e','#997300','#43682b','#f1975a','#ffcd33','#8cc168','#d26012','#cc9a00'];
			if(data.length <= this.color.length){
				for(var a=0; a<data.length; a++) {
					var theObj = data[a];
					theObj.itemStyle = {normal: { color: this.color[a]}};
				}
			}
			
			this.option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				series: {
					name: '建筑性质',
					type: 'pie',
					radius: '65%',
					center: ['50%', '50%'],
					data: data,
					labelLine: {
						normal: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
//					hoverAnimation: false,	/*鼠标滑过不放大*/
					itemStyle: {
						normal: {
							borderWidth: 1,
							borderColor: '#dbd9d4'
						}
					},
					label: {
						normal: {
							color: '#fff'
						}
					}
				}
			};
			this.creat = function() {
				var option = this.option;
				var creatChart = new CreatChart(showDomId,option);
				creatChart.creat();
			};
			this.creat();
		}
	};
	window.Charts = Charts;
})();


/*模拟数据然后调用START
 *------------------------------------------------------------------------------
 * */
$(function() {
	var data1 = [{
			value: 335,
			name: '直接访问'
		},
		{
			value: 310,
			name: '邮件营销'
		},
		{
			value: 234,
			name: '联盟广告'
		},
		{
			value: 135,
			name: '视频广告'
		},
		{
			value: 548,
			name: '搜索引擎'
		},
		{
			value: 310,
			name: '邮件营销'
		},
		{
			value: 234,
			name: '联盟广告'
		},
		{
			value: 135,
			name: '视频广告'
		},
		{
			value: 548,
			name: '搜索引擎'
		},
		{
			value: 548,
			name: '搜索引擎'
		},
		{
			value: 548,
			name: '搜索引擎'
		}
	];
	//调用饼图1
	Charts._peiOne(data1,'chart1');
});
/*模拟数据然后调用END
 *------------------------------------------------------------------------------
 * */