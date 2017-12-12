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
		fontSize: 8,
		//建筑性质所用图表
		_peiOne: function(data, showDomId, option) {
			this.color = ['#ed7d31', '#ffc000', '#70ad47', '#9e480e', '#997300', '#43682b', '#f1975a', '#ffcd33', '#8cc168', '#d26012', '#cc9a00'];
			if(data.length <= this.color.length) {
				for(var a = 0; a < data.length; a++) {
					var theObj = data[a];
					theObj.itemStyle = {
						normal: {
							color: this.color[a]
						}
					};
				}
			}

			this.option = {
				tooltip: {
					trigger: 'item',
					formatter: "{b} : {c} ({d}%)"
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
					//					labelLine: {
					//						normal: {
					//							show:false
					//						}
					//					},
					//					hoverAnimation: false,	/*鼠标滑过不放大*/
					itemStyle: {
						normal: {
							borderWidth: 1,
							borderColor: '#dbd9d4'
						}
					},
					label: {
						normal: {
							color: '#fff',
							formatter: '{b}{c}\n{d}%',
							fontSize: this.fontSize
						}
					}
				}
			};
			this.creat = function() {
				var option = this.option;
				var creatChart = new CreatChart(showDomId, option);
				creatChart.creat();
			};
			this.creat();
		},
		//建筑结构所用图表
		_peiTwo: function(data, showDomId, option) {
			//自定义图表颜色
			this.color = ['#4c78c6', '#ed7d31', '#a5a5a5', '#ffc000', '#5b9bd5', '#70ad47'];

			//如果数据数量不大于自定义图表颜色
			if(data.length <= this.color.length) {
				for(var a = 0; a < data.length; a++) {
					var theObj = data[a];
					theObj.itemStyle = {
						normal: {
							color: this.color[a]
						}
					};
				}
			}

			var legendData = [];
			for(var b = 0; b < data.length; b++) {
				legendData.push(data[b].name);
			}

			this.option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					bottom: 0,
					left: 'center',
					//					data: ['西凉', '益州','兖州','荆州','幽州','其它'],
					data: legendData,
					itemHeight: 8,
					itemWidth: 8,
					itemGap: 4,
					//					borderWidth: 1,
					//					shadowColor: '#fff',
					textStyle: {
						color: '#fff',
						fontSize: this.fontSize
					},
				},
				series: {
					name: '建筑性质',
					type: 'pie',
					radius: '52%',
					center: ['50%', '38%'],
					data: data,
					labelLine: {
						normal: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
					//					labelLine: {
					//						normal: {
					//							show:false
					//						}
					//					},
					//					hoverAnimation: false,	/*鼠标滑过不放大*/
					itemStyle: {
						normal: {
							borderWidth: 1,
							borderColor: '#dbd9d4'
						}
					},
					label: {
						normal: {
							color: '#fff',
							formatter: '{b}{c}\n{d}%',
							fontSize: this.fontSize
						}
					}
				}
			};
			this.creat = function() {
				var option = this.option;
				var creatChart = new CreatChart(showDomId, option);
				creatChart.creat();
			};
			this.creat();
		},
		//各支队辖区建筑数量分布
		_barOne: function(data, showDomId, option) {
			this.option = {
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['朝阳', '丰台', '门头沟', '石景山', '房山', '通州', '顺义','昌平','大兴','怀柔','东城','西城','海淀','亦庄','天安门','西客站'],
					axisTick: {
						alignWithLabel: true
					}
				},
				yAxis: {
					type: 'value'
				},
				series: {
					name: '各支队辖区建筑数量分布',
					type: 'bar',
					barWidth: '50%',
					data: [10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220,20,41,79]
				}
			};
			this.creat = function() {
				var option = this.option;
				var creatChart = new CreatChart(showDomId, option);
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
		name: '住宅'
	}, {
		value: 310,
		name: '商场'
	}, {
		value: 234,
		name: '商住楼'
	}, {
		value: 135,
		name: '综合楼'
	}, {
		value: 548,
		name: '办公科研楼'
	}, {
		value: 310,
		name: '宾馆旅馆'
	}, {
		value: 234,
		name: '医院'
	}, {
		value: 135,
		name: '教学楼'
	}, {
		value: 548,
		name: '工业建筑'
	}, {
		value: 548,
		name: '仓库'
	}, {
		value: 548,
		name: '其它'
	}];
	//调用饼图1(建筑性质)
	Charts._peiOne(data1, 'chart1');

	var data2 = [{
		value: 335,
		name: '木结构'
	}, {
		value: 310,
		name: '砖木结构'
	}, {
		value: 234,
		name: '砖混结构'
	}, {
		value: 135,
		name: '钢筋混凝土'
	}, {
		value: 548,
		name: '钢结构'
	}, {
		value: 310,
		name: '其它结构'
	}];
	//调用饼图2（建筑结构）
	Charts._peiTwo(data2, 'chart2');
	
	var data3 = '';
	Charts._barOne(data3, 'chart3');

});
/*模拟数据然后调用END
 *------------------------------------------------------------------------------
 * */