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
		fontSize:10,
		//建筑性质所用图表
		_peiOne: function(data, showDomId, option) {
			this.color = ['#ed7d31', '#ffc000', '#70ad47', '#9e480e', '#997300', '#43682b', '#f1975a', '#ffcd33', '#8cc168', '#d26012', '#cc9a00'];
			
			var legendData = [];
			
			if(data.length <= this.color.length) {
				for(var a = 0; a < data.length; a++) {
					var theObj = data[a];
					theObj.itemStyle = {
						normal: {
							color: this.color[a]
						}
					};
					legendData.push(theObj.name);
				}
			}

			this.option = {
				//提示框组件
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				//图例
				legend: {
					show: true,
			        type: 'scroll',
			        orient: 'vertical',
			        right: 10,
			        top: 14,
			        bottom: 10,
			        itemHeight: 10,
					itemWidth: 10,
					itemGap: 8,
			        textStyle: {
			        	color: '#fff',
			        	fontSize: this.fontSize
			        },
			        pageIconSize: this.fontSize,
			        pageIconColor: '#fff',
			        pageIconInactiveColor: '#aaa',
			        pageTextStyle: {
			        	color: '#fff',
			        	fontSize: this.fontSize
			        },
			        data: legendData
			    },
				series: {
					name: '建筑性质',
					type: 'pie',
					radius: '80%',
					center: ['35%', '50%'],
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
							show: false,
//							color: '#fff',
//							formatter: '{b} {c}\n{d}%',
//							fontSize: this.fontSize
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
				//图例
				legend: {
					show: true,
			        type: 'scroll',
			        orient: 'vertical',
			        right: -10,
			        top: 14,
			        bottom: 10,
			        itemHeight: 10,
					itemWidth: 10,
					itemGap: 8,
			        textStyle: {
			        	color: '#fff',
			        	fontSize: this.fontSize
			        },
			        pageIconSize: this.fontSize,
			        pageIconColor: '#fff',
			        pageIconInactiveColor: '#aaa',
			        pageTextStyle: {
			        	color: '#fff',
			        	fontSize: this.fontSize
			        },
			        data: legendData
			    },
//				legend: {
//					bottom: 0,
//					left: 'center',
//					//					data: ['西凉', '益州','兖州','荆州','幽州','其它'],
//					data: legendData,
//					itemHeight: 8,
//					itemWidth: 8,
//					itemGap: 4,
//					//					borderWidth: 1,
//					//					shadowColor: '#fff',
//					textStyle: {
//						color: '#fff',
//						fontSize: this.fontSize
//					},
//				},
				series: {
					name: '建筑结构',
					type: 'pie',
					radius: '80%',
					center: ['35%', '50%'],
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
							show: false,
//							color: '#fff',
//							formatter: '{b} {c}\n{d}%',
//							fontSize: this.fontSize
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
		//环形图，用于：消防检查发现隐患
		_peiThree: function(data, showDomId, option) {
			this.option = {
				//提示框组件
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				//图例
				legend: {
					show: true,
			        type: 'scroll',
			        orient: 'vertical',
			        right: 10,
//			        top: 14,
//			        bottom: 10,
			        itemHeight: 10,
					itemWidth: 10,
					itemGap: 8,
					y:'center',
			        textStyle: {
			        	color: '#fff',
			        	fontSize: this.fontSize
			        },
			        pageIconSize: this.fontSize,
			        pageIconColor: '#fff',
			        pageIconInactiveColor: '#aaa',
			        pageTextStyle: {
			        	color: '#fff',
			        	fontSize: this.fontSize
			        },
			        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			    },
				series: {
					name: '消防检查发现隐患',
					type: 'pie',
					radius: ['40%', '80%'],
					center: ['35%', '50%'],
					avoidLabelOverlap: false,
					data: data,
					minAngle: 2,
					labelLine: {
		                normal: {
		                    show: false
		                }
		            },
					label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '14',
		                        fontWeight: 'bold'
		                    }
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
					},
					barMinHeight:2
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
						barWidth: '30%',
						barMinHeight:2
					},
					{
						name: '纳入监管',
						type: 'bar',
//						yAxisIndex: 1,
						data: superviseArr,
						barWidth: '30%',
						barMinHeight:2
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
	
	var data4 = [{m:1,reg:2000,supervise:1888},{m:2,reg:1568,supervise:1238},{m:3,reg:315,supervise:86},{m:4,reg:2055,supervise:1888},{m:5,reg:960,supervise:520},{m:6,reg:683,supervise:258},{m:7,reg:1555,supervise:1550},{m:8,reg:183,supervise:183},{m:9,reg:666,supervise:650},{m:10,reg:1888,supervise:1660},{m:11,reg:777,supervise:666},{m:12,reg:888,supervise:886}];
	Charts._barTwo(data4, 'chart4');
	
	var data5 = [{value:335, name:'直接访问'}, {value:310, name:'邮件营销'},{value:234, name:'联盟广告'},{value:135, name:'视频广告'},{value:1548, name:'搜索引擎'}];
	Charts._peiThree(data5, 'chart5');
});
/*模拟数据然后调用END
 *------------------------------------------------------------------------------
 * */