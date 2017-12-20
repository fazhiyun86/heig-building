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
		fontSize: 10,
		//建筑性质和建筑消防设施缺失所用图表
		_peiOne: function(data, title, showDomId) {
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

					var theName = theObj.name;
					legendData.push(theName);
				}
			}

			this.option = {
				//提示框组件
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)",
					confine: true
				},
				//图例
				legend: {
					show: true,
					type: 'scroll',
					orient: 'vertical',
					left: '65%',
					//			        align:'right',
					top: 14,
					bottom: 10,
					itemHeight: 10,
					itemWidth: 10,
					itemGap: 8,
					y: 'center',
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
					name: title,
					type: 'pie',
					radius: '80%',
					center: ['33%', '50%'],
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
		_peiTwo: function(data, showDomId) {
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
					formatter: "{a} <br/>{b} : {c} ({d}%)",
					confine: true
				},
				//图例
				legend: {
					show: true,
					type: 'scroll',
					orient: 'vertical',
					left: '65%',
					//			        top: 14,
					//			        bottom: 10,
					y: 'center',
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
					name: '建筑结构',
					type: 'pie',
					radius: '80%',
					center: ['33%', '50%'],
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
		_peiThree: function(data, showDomId) {
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
				//提示框组件
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)",
					confine: true
				},
				//图例
				legend: {
					show: true,
					type: 'scroll',
					orient: 'vertical',
					left: '65%',
					//			        top: 14,
					//			        bottom: 10,
					y: 'center',
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
					name: '消防检查发现隐患',
					type: 'pie',
					radius: ['45%', '80%'],
					center: ['33%', '50%'],
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
							show: false
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
		_barOne: function(data, showDomId) {
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
					barMinHeight: 2
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
		_barTwo: function(data, showDomId) {
			if(data.length < 0) {
				return false;
			} else {
				var mouthArr = [],
					regArr = [],
					superviseArr = [];

				for(var a = 0; a < data.length; a++) {
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
						show: false, //隐藏显示
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
						barMinHeight: 2
					},
					{
						name: '纳入监管',
						type: 'bar',
						//						yAxisIndex: 1,
						data: superviseArr,
						barWidth: '30%',
						barMinHeight: 2
					}
				]
			};
			this.creat = function() {
				var option = this.option;
				var creatChart = new CreatChart(showDomId, option);
				creatChart.creat();
			};
			this.creat();
		},
		//支队辖区隐患及处理情况所有图标
		_barThree: function(data, showDomId) {
			if(data.length < 0) {
				return false;
			} else {
				var xArr = [],
					lArr = [],
					rArr = [];

				for(var a = 0; a < data.length; a++) {
					var theInfo = data[a];
					//x轴
					var xInfo = theInfo.DistrictName;
					//左侧
					var lInfo = theInfo.total;
					//右侧
					var rInfo = theInfo.complete;

					xArr.push(xInfo);
					lArr.push(lInfo);
					rArr.push(rInfo);
				}
			}
			this.color = '#e5e5e5';
			var colors = ['#d26e2a', '#f1a78a'];
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
					top: '30%',
					left: '0',
					right: '3%',
					bottom: '3%',
					containLabel: true
				},
				legend: {
					data: ['重大隐患', '清除隐患'],
					textStyle: {
						color: this.color,
						fontSize: this.fontSize
					},
					itemHeight: 8,
					itemWidth: 8,
					itemGap: 15,
					top: 25
				},
				xAxis: [{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: xArr,
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
					name: '重大隐患',
					position: 'left',
					//轴线
					axisLine: {
						show:false,
					},
					nameTextStyle: {
						//和背景同色，隐藏显示
						color: '#454545'
					},
					//刻度标签
					axisLabel: {
						show: false
					},
					//刻度线条
					axisTick: {
						show: false
					}
				}],
				series: [{
						name: '重大隐患',
						type: 'bar',
						data: lArr,
						barWidth: '30%',
						barMinHeight: 2,
						barGap: 0
					},
					{
						name: '清除隐患',
						type: 'bar',
						//						yAxisIndex: 1,
						data: rArr,
						barWidth: '30%',
						barMinHeight: 2
					}
				]
			};
			this.creat = function() {
				var option = this.option;
				var creatChart = new CreatChart(showDomId, option);
				creatChart.creat();
			};
			this.creat();
		},
		//全年隐患及处理趋势所用图表
		_categoryOne: function(data, showDomId) {
			if(data.length < 1) {
				return false;
			} else {
				var xArr = [],
					tArr = [],
					bArr = [];
				for(var a=0; a<data.length; a++) {
					var theInfo = data[a];
					xArr.push(theInfo.Month+'月');
					tArr.push(theInfo.total);
					bArr.push(theInfo.complete);
				}
			}
			var colors = ['#4470c0', '#de7832'];
			
			this.option = {
				color: colors,
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['重大隐患', '消除隐患'],
					top: 25,
					textStyle: {
						color: this.color,
						fontSize: this.fontSize
					},
					itemHeight: 8,
//					itemWidth: 8,
					itemGap: 15,
				},
				grid: {
					left: '-2%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xArr,
					axisLabel: {
						fontSize: this.fontSize,
						color: this.color,
						margin: 5
					},
					axisTick: {
						alignWithLabel: true,
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: this.color
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show:false,
					},
					nameTextStyle: {
						//和背景同色，隐藏显示
						color: '#454545'
					},
					//刻度标签
					axisLabel: {
						show: false
					},
					//刻度线条
					axisTick: {
						show: false
					}
				},
				series: [{
						name: '重大隐患',
						type: 'line',
						data: tArr,
						label: {
							normal: {
								show: true,
								position:'top'
							}
						}
					},
					{
						name: '消除隐患',
						type: 'line',
						data: bArr,
						label: {
							normal: {
								show: true,
								position:'top'
							}
						}
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

