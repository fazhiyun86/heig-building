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
		window.onresize = function() {
			myChart.resize();
		}
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
					minAngle: 2,
					labelLine: {
						normal: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
					itemStyle: {
						normal: {
							borderWidth: 1,
							borderColor: '#dbd9d4'
						}
					},
					label: {
						normal: {
							color: '#fff',
							formatter: '{b} {c}\n{d}%',
							fontSize: this.fontSize,
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
					radius: '50%',
					center: ['50%', '42%'],
					minAngle: 2,
					data: data,
					labelLine: {
						normal: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
					itemStyle: {
						normal: {
							borderWidth: 1,
							borderColor: '#dbd9d4'
						}
					},
					label: {
						normal: {
							color: '#fff',
							formatter: '{b} {c}\n{d}%',
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
			if(data.length < 1) {
				return false;
			} else {
				var nameArr = [];
				var valArr = [];
				for(var a = 0; a < data.length; a++) {
					var theDate = data[a];
					var barName = theDate.name;
					var barVal = theDate.value;
					nameArr.push(barName);
					valArr.push(barVal);
				}
			}

			this.color = '#e5e5e5';
			this.option = {
				color: ['#ffc000'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					show: false,
					borderColor: this.color,
					top: '9%',
					left: '1%',
					right: '3%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: nameArr,
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: this.color
						}
					},
					axisLabel: {
						fontSize: this.fontSize,
						color: this.color,
						margin: 5
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: this.color,
							width: 0
						}
					},
					axisLabel: {
						fontSize: this.fontSize
					}
				},
				series: {
					name: '各支队辖区建筑数量分布',
					type: 'bar',
					barWidth: '50%',
					data: valArr,
					label: {
						normal: {
							show: true,
							position: 'top',
							fontSize: 9,
							color: this.color,
							distance: 2
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
		//监管覆盖实施进展情况
		_barTwo: function(data, showDomId, option) {
			if(data.length < 0) {
				return false;
			} else {
				var mouthArr = [],
					regArr = [],
					superviseArr = [];
					
				for(var a=0; a<data.length; a++) {
					var theInfo = data[a];
					var month = theInfo.m;
					var regInfo = theInfo.reg;
					var superviseInfo = theInfo.supervise;
					
					mouthArr.push(month);
					regArr.push(regInfo);
					superviseArr.push(superviseInfo);
				}
			}
			this.color = '#e5e5e5';
			var colors = ['#ffd184', '#e2aa00'];
			this.option = {
				color: colors,
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					show: false,
					borderColor: this.color,
					top: '18%',
					left: '1%',
					right: '3%',
					bottom: '3%',
					containLabel: true
				},
				legend: {
					data: ['注册建筑', '纳入监管'],
					textStyle: {
						color: this.color,
						fontSize: this.fontSize
					},
					itemHeight: 8,
					itemWidth: 8,
					itemGap: 15,
					top: 5
				},
				xAxis: [{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: mouthArr,
					axisTick: {
						alignWithLabel: true,
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: this.color
						}
					},
					axisLabel: {
						fontSize: this.fontSize,
						color: this.color,
						margin: 5
					}
				}],
				yAxis: [{
						type: 'value',
						name: '注册建筑',
						position: 'left',
						axisLine: {
							lineStyle: {
								color: this.color,
							}
						},
						nameTextStyle: {
								color: '#454545'
							},
							axisLabel: {
							fontSize: this.fontSize
						}
					},
					{
						type: 'value',
						show: false,		//隐藏显示
						name: '纳入监管',
						position: 'right',
						axisLine: {
							lineStyle: {
								color: colors[1],
							}
						},
						nameTextStyle: {
								color: '#454545'
							},
							axisLabel: {
							fontSize: this.fontSize
						}
					}
				],
				series: [{
						name: '注册建筑',
						type: 'bar',
						data: regArr,
						barWidth: '30%'
					},
					{
						name: '纳入监管',
						type: 'bar',
//						yAxisIndex: 1,
						data: superviseArr,
						barWidth: '30%'
					}
				]
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
	var data3 = [{
		name: '朝阳',
		value: 56
	}, {
		name: '丰台',
		value: 862
	}, {
		name: '门头沟',
		value: 3000
	}, {
		name: '石景山',
		value: 89
	}, {
		name: '房山',
		value: 77
	}, {
		name: '通州',
		value: 1580
	}, {
		name: '顺义',
		value: 180
	}, {
		name: '昌平',
		value: 33
	}, {
		name: '大兴',
		value: 68
	}, {
		name: '怀柔',
		value: 999
	}, {
		name: '东城',
		value: 1568
	}, {
		name: '西城',
		value: 2856
	}, {
		name: '海淀',
		value: 246
	}, {
		name: '亦庄',
		value: 687
	}, {
		name: '天安门',
		value: 556
	}, {
		name: '西客站',
		value: 996
	}];
	Charts._barOne(data3, 'chart3');
	
	var data4 = [{m:1,reg:2000,supervise:1888},{m:2,reg:1568,supervise:1238},{m:3,reg:315,supervise:86},{m:4,reg:2055,supervise:1888},{m:5,reg:960,supervise:520},{m:6,reg:683,supervise:258},{m:7,reg:1555,supervise:1550},{m:8,reg:183,supervise:183},{m:9,reg:666,supervise:650},{m:10,reg:1888,supervise:1660},{m:11,reg:777,supervise:666},{m:12,reg:888,supervise:886}];
	Charts._barTwo(data4, 'chart4');
});
/*模拟数据然后调用END
 *------------------------------------------------------------------------------
 * */