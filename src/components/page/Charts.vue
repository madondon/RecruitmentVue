<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div id="id1" style=" width:450px ;height:350px;" ></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  require('echarts/lib/chart/pie')

  export default {
    name: "Charts",
    props: ['len'],
    data() {
      return {
        len:this.len,
        chartType:'bar',
        MCtitle:'数据图',
        MCdata:[          // 数据数组，name 为数据项名称，value 为数据项值
          {id:1, name:'商品1',Sales:10,inventory:110},
          {id:2, name:'商品2',Sales:20,inventory:98},
          {id:3, name:'商品3',Sales:30,inventory:112},
          {id:4, name:'商品4',Sales:25,inventory:103},
          {id:5, name:'商品5',Sales:17,inventory:110},
          {id:6, name:'商品6',Sales:22,inventory:108}
        ],
        MCdatacopy:[          // 数据数组，name 为数据项名称，value 为数据项值
          {id:1, name:'商品1',Sales:10,inventory:110},
          {id:2, name:'商品2',Sales:20,inventory:98},
          {id:3, name:'商品3',Sales:30,inventory:112},
          {id:4, name:'商品4',Sales:25,inventory:103},
          {id:5, name:'商品5',Sales:18,inventory:110},
          {id:6, name:'商品6',Sales:22,inventory:108}
        ],
        cusname:'',
        x:[1],
        sort:"",
        // 指定图表的配置项和数据
        option: {
          title: {
            text:'', //标题文本内容
            x:'left',
            y:'top',

          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'vertical',
            x:'center',
          },
          toolbox: { // 工具箱
            show: true,
            itemSize:30,
            feature: {
              dataView: { //数据视图
                show: true,
                readOnly:true,
              },
              saveAsImage: {//保存图片
                show: true
              },
              restore: {
                show: true
              },
            }
          },
          series: []
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        for (let i = 0; i < this.MCdata.length ; i++) {
          this.option.xAxis.data[i]=this.MCdata[i].name
        }
      })
    },
    watch: {
      len:{
        handler(newVal, oldVal) {
          setTimeout(() => {
            // this.chart.onresize();
          console.log("test")
            this.initChart()
          },100)

        }
      },
      //观察option的变化
      echarts_option: {
        handler(newVal, oldVal) {
          if (this.chart) {
            if (newVal) {
              this.chart.setOption(newVal);
            } else {
              this.chart.setOption(oldVal);
            }
          } else {
            this.init();
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    methods: {
      MCsort(){
        let  temp=this.MCdata[0].Sales
        for (let i = 0; i < this.MCdata.length; i++) {
          for (let j = 0; j < this.MCdata.length - i -1; j++) {
            if (this.MCdata[j].Sales > this.MCdata[j + 1].Sales) {
               temp = this.MCdata[j];
              this.MCdata[j] = this.MCdata[j+1];
              this.MCdata[j+1] = temp;
            }
          }
        }
      },
      MCsort1(){
        let  temp=this.MCdata[0].inventory
        for (let i = 0; i < this.MCdata.length ; i++) {
          for (let j = 0; j < this.MCdata.length - i -1; j++) {   // 这里说明为什么需要-1
            if (this.MCdata[j].inventory > this.MCdata[j + 1].inventory) {
              temp = this.MCdata[j];
              this.MCdata[j] = this.MCdata[j+1];
              this.MCdata[j+1] = temp;
            }
          }
        }
      },
      polarxy(){
        this.option.title.text=this.MCtitle;
        this.delattributes();
        console.log("polar")
        let a = new Array(this.MCdata.length);
        for (let i = 0; i < this.MCdata.length; i++) {
          a[i]=this.MCdata[i].name
        }
        this.$set(this.option, 'angleAxis', {});
        this.$set(this.option, 'radiusAxis', {
          type: 'category',
          data: a,
        });
        this.$set(this.option, 'polar', {});
        if(this.x.indexOf("0")!=-1) {
        this.option.series.push({
          name: '销量',
          type: "bar",
          data:[this.MCdata[0].Sales,this.MCdata[1].Sales,this.MCdata[2].Sales, this.MCdata[3].Sales, this.MCdata[4].Sales,this.MCdata[5].Sales],
          coordinateSystem: 'polar',
        })
        }
        if(this.x.indexOf("1")!=-1) {
          this.option.series.push({
            name: '库存量',
            type: "bar",
            data:[this.MCdata[0].inventory,this.MCdata[1].inventory,this.MCdata[2].inventory, this.MCdata[3].inventory, this.MCdata[4].inventory,this.MCdata[5].inventory],
            coordinateSystem: 'polar',
          })
        }
        if(this.x.indexOf("2")!=-1) {
          this.option.series.push({
            name: this.cusname,
            type: "bar",
            data:[this.MCdata[0].cus,this.MCdata[1].cus,this.MCdata[2].cus, this.MCdata[3].cus, this.MCdata[4].cus,this.MCdata[5].cus],
            coordinateSystem: 'polar',
          })
        }
      },
      piexy(){
        this.option.title.text=this.MCtitle;
        console.log("piexy")
        this.delattributes()
        if(this.x.indexOf("0")!=-1) {
          this.option.series.push({
            name: '销量',
            type: 'pie',
            data:[{value:this.MCdata[0].Sales,name:this.MCdata[0].name},
              {value:this.MCdata[1].Sales,name:this.MCdata[1].name},
              {value:this.MCdata[2].Sales,name:this.MCdata[2].name},
              {value:this.MCdata[3].Sales,name:this.MCdata[3].name},
              {value:this.MCdata[4].Sales,name:this.MCdata[4].name},
              {value:this.MCdata[5].Sales,name:this.MCdata[5].name}],
          })
        }
        else  if(this.x.indexOf("1")!=-1){
          this.option.series.push({
            name: '库存量',
            type: 'pie',
            data:[{value:this.MCdata[0].inventory,name:this.MCdata[0].name},
              {value:this.MCdata[1].inventory,name:this.MCdata[1].name},
              {value:this.MCdata[2].inventory,name:this.MCdata[2].name},
              {value:this.MCdata[3].inventory,name:this.MCdata[3].name},
              {value:this.MCdata[4].inventory,name:this.MCdata[4].name},
              {value:this.MCdata[5].inventory,name:this.MCdata[5].name}],
          });
        }
        else  if(this.x.indexOf("2")!=-1){
          this.option.series.push({
            name: this.cusname,
            type: 'pie',
            data:[{value:this.MCdata[0].cus,name:this.MCdata[0].name},
              {value:this.MCdata[1].cus,name:this.MCdata[1].name},
              {value:this.MCdata[2].cus,name:this.MCdata[2].name},
              {value:this.MCdata[3].cus,name:this.MCdata[3].name},
              {value:this.MCdata[4].cus,name:this.MCdata[4].name},
              {value:this.MCdata[5].cus,name:this.MCdata[5].name}],
          });
        }
      },
      scatterxy(){
        this.option.title.text=this.MCtitle;
        this.delattributes();
        console.log("scatterxy")
        this.$set(this.option, 'xAxis', {
          data: []
        });
        this.$set(this.option, 'yAxis', {});
        for (let i = 0; i < this.MCdata.length - 1; i++) {
          this.option.xAxis.data[i]=this.MCdata[i].name
        }
        if(this.x.indexOf("0")!=-1) {
          this.option.series.push({
            name: '销量',
            type: "scatter",
            data:[this.MCdata[0].Sales,this.MCdata[1].Sales,this.MCdata[2].Sales, this.MCdata[3].Sales, this.MCdata[4].Sales,this.MCdata[5].Sales],
          })
        }
        if(this.x.indexOf("1")!=-1) {
          this.option.series.push({
            name: '库存量',
            type: "scatter",
            data:[this.MCdata[0].inventory,this.MCdata[1].inventory,this.MCdata[2].inventory, this.MCdata[3].inventory, this.MCdata[4].inventory,this.MCdata[5].inventory],
          })
        }
        if(this.x.indexOf("2")!=-1) {
          this.option.series.push({
            name: this.cusname,
            type: "scatter",
            data:[this.MCdata[0].cus,this.MCdata[1].cus,this.MCdata[2].cus, this.MCdata[3].cus, this.MCdata[4].cus,this.MCdata[5].cus],
          })
        }
      },
      radarxy(){
        this.option.title.text=this.MCtitle;
        console.log("radar")
        this.delattributes()
        this.$set(this.option, 'radar',  {
          indicator: [
            { name: this.MCdata[0].name, max: 100},
            { name: this.MCdata[1].name, max: 100},
            { name: this.MCdata[2].name, max: 100},
            { name: this.MCdata[3].name, max: 100},
            { name: this.MCdata[4].name, max: 100},
            { name: this.MCdata[5].name, max: 100}
          ]
        },);
        if(this.x.indexOf("0")!=-1) {
          this.option.series.push({
            name: '销量',
            type: 'radar',
            data:[{value:[this.MCdata[0].Sales,this.MCdata[1].Sales,this.MCdata[2].Sales, this.MCdata[3].Sales, this.MCdata[4].Sales,this.MCdata[5].Sales],name:"销量"}]
          })
        }
        if(this.x.indexOf("1")!=-1){
          this.option.series.push({
            name: '库存量',
            type: 'radar',
            data:[{value:[this.MCdata[0].inventory,this.MCdata[1].inventory,this.MCdata[2].inventory, this.MCdata[3].inventory, this.MCdata[4].inventory,this.MCdata[5].inventory],name:"库存量"}]
          });
        }
        if(this.x.indexOf("2")!=-1){
          this.option.series.push({
            name: this.cusname,
            type: 'radar',
            data:[{value:[this.MCdata[0].cus,this.MCdata[1].cus,this.MCdata[2].cus, this.MCdata[3].cus, this.MCdata[4].cus,this.MCdata[5].cus],name:this.cusname}]
          });
        }

      },
      funnelxy(){
        this.option.title.text=this.MCtitle;
        console.log("funnel")
        this.delattributes()
        if(this.x.indexOf("0")!=-1) {
          this.option.series.push({
            name: '销量',
            type: 'funnel',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data:[{value:this.MCdata[0].Sales,name:this.MCdata[0].name},
              {value:this.MCdata[1].Sales,name:this.MCdata[1].name},
              {value:this.MCdata[2].Sales,name:this.MCdata[2].name},
              {value:this.MCdata[3].Sales,name:this.MCdata[3].name},
              {value:this.MCdata[4].Sales,name:this.MCdata[4].name},
              {value:this.MCdata[5].Sales,name:this.MCdata[5].name}],
          })
        }
        if(this.x.indexOf("1")!=-1){
          this.option.series.push({
            name: '库存量',
            type: 'funnel',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },

            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data:[{value:this.MCdata[0].inventory,name:this.MCdata[0].name},
              {value:this.MCdata[1].inventory,name:this.MCdata[1].name},
              {value:this.MCdata[2].inventory,name:this.MCdata[2].name},
              {value:this.MCdata[3].inventory,name:this.MCdata[3].name},
              {value:this.MCdata[4].inventory,name:this.MCdata[4].name},
              {value:this.MCdata[5].inventory,name:this.MCdata[5].name}],
          });
        }
        if(this.x.indexOf("3")!=-1){
          this.option.series.push({
            name: this.cusname,
            type: 'funnel',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },

            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data:[{value:this.MCdata[0].cus,name:this.MCdata[0].name},
              {value:this.MCdata[1].cus,name:this.MCdata[1].name},
              {value:this.MCdata[2].cus,name:this.MCdata[2].name},
              {value:this.MCdata[3].cus,name:this.MCdata[3].name},
              {value:this.MCdata[4].cus,name:this.MCdata[4].name},
              {value:this.MCdata[5].cus,name:this.MCdata[5].name}],
          });
        }
      },
      heatmapxy(){
        this.delattributes()
        let hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
          '7a', '8a', '9a','10a','11a',
          '12p', '1p', '2p', '3p', '4p', '5p',
          '6p', '7p', '8p', '9p', '10p', '11p'];
        let days = ['Saturday', 'Friday', 'Thursday',
          'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
        let data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
        data = data.map(function (item) {
          return [item[1], item[0], item[2] || '-'];
        });
        this.$set(this.option, 'grid', {
          height: '50%',
          top: '10%'
        });
        this.$set(this.option, 'xAxis', {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          }
        });
        this.$set(this.option, 'yAxis', {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          }
        });
        this.$set(this.option, 'visualMap', {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        });
        this.option.series.push({
          name: 'Punch Card',
          type: 'heatmap',
          data: data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        })
      },
      sunburstxy(){
        let colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
        let bgColor = '#2E2733';

        let itemStyle = {
          star5: {
            color: colors[0]
          },
          star4: {
            color: colors[1]
          },
          star3: {
            color: colors[2]
          },
          star2: {
            color: colors[3]
          }
        };

        let data = [{
          name: '虚构',
          itemStyle: {
            color: colors[1]
          },
          children: [{
            name: '小说',
            children: [{
              name: '5☆',
              children: [{
                name: '疼'
              }, {
                name: '慈悲'
              }, {
                name: '楼下的房客'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '虚无的十字架'
              }, {
                name: '无声告白'
              }, {
                name: '童年的终结'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '疯癫老人日记'
              }]
            }]
          }, {
            name: '其他',
            children: [{
              name: '5☆',
              children: [{
                name: '纳博科夫短篇小说全集'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '安魂曲'
              }, {
                name: '人生拼图版'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '比起爱你，我更需要你'
              }]
            }]
          }]
        }, {
          name: '非虚构',
          itemStyle: {
            color: colors[2]
          },
          children: [{
            name: '设计',
            children: [{
              name: '5☆',
              children: [{
                name: '无界面交互'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '数字绘图的光照与渲染技术'
              }, {
                name: '日本建筑解剖书'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '奇幻世界艺术\n&RPG地图绘制讲座'
              }]
            }]
          }, {
            name: '社科',
            children: [{
              name: '5☆',
              children: [{
                name: '痛点'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '卓有成效的管理者'
              }, {
                name: '进化'
              }, {
                name: '后物欲时代的来临',
              }]
            }, {
              name: '3☆',
              children: [{
                name: '疯癫与文明'
              }]
            }]
          }, {
            name: '心理',
            children: [{
              name: '5☆',
              children: [{
                name: '我们时代的神经症人格'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '皮格马利翁效应'
              }, {
                name: '受伤的人'
              }]
            }, {
              name: '3☆',
            }, {
              name: '2☆',
              children: [{
                name: '迷恋'
              }]
            }]
          }, {
            name: '居家',
            children: [{
              name: '4☆',
              children: [{
                name: '把房子住成家'
              }, {
                name: '只过必要生活'
              }, {
                name: '北欧简约风格'
              }]
            }]
          }, {
            name: '绘本',
            children: [{
              name: '5☆',
              children: [{
                name: '设计诗'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '假如生活糊弄了你'
              }, {
                name: '博物学家的神秘动物图鉴'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '方向'
              }]
            }]
          }, {
            name: '哲学',
            children: [{
              name: '4☆',
              children: [{
                name: '人生的智慧'
              }]
            }]
          }, {
            name: '技术',
            children: [{
              name: '5☆',
              children: [{
                name: '代码整洁之道'
              }]
            }, {
              name: '4☆',
              children: [{
                name: 'Three.js 开发指南'
              }]
            }]
          }]
        }];

        for (let j = 0; j < data.length; ++j) {
          let level1 = data[j].children;
          for (let i = 0; i < level1.length; ++i) {
            let block = level1[i].children;
            let bookScore = [];
            let bookScoreId;
            for (let star = 0; star < block.length; ++star) {
              let style = (function (name) {
                switch (name) {
                  case '5☆':
                    bookScoreId = 0;
                    return itemStyle.star5;
                  case '4☆':
                    bookScoreId = 1;
                    return itemStyle.star4;
                  case '3☆':
                    bookScoreId = 2;
                    return itemStyle.star3;
                  case '2☆':
                    bookScoreId = 3;
                    return itemStyle.star2;
                }
              })(block[star].name);

              block[star].label = {
                color: style.color,
                downplay: {
                  opacity: 0.5
                }
              };

              if (block[star].children) {
                style = {
                  opacity: 1,
                  color: style.color
                };
                block[star].children.forEach(function (book) {
                  book.value = 1;
                  book.itemStyle = style;

                  book.label = {
                    color: style.color
                  };

                  var value = 1;
                  if (bookScoreId === 0 || bookScoreId === 3) {
                    value = 5;
                  }

                  if (bookScore[bookScoreId]) {
                    bookScore[bookScoreId].value += value;
                  }
                  else {
                    bookScore[bookScoreId] = {
                      color: colors[bookScoreId],
                      value: value
                    };
                  }
                });
              }
            }

            level1[i].itemStyle = {
              color: data[j].itemStyle.color
            };
          }
        }
        this.$set(this.option, 'color',colors);
        this.option.series.push({
          type: 'sunburst',
          center: ['50%', '48%'],
          data: data,
          sort: function (a, b) {
            if (a.depth === 1) {
              return b.getValue() - a.getValue();
            }
            else {
              return a.dataIndex - b.dataIndex;
            }
          },
          label: {
            rotate: 'radial',
            color: bgColor
          },
          itemStyle: {
            borderColor: bgColor,
            borderWidth: 2
          },
          levels: [{}, {
            r0: 0,
            r: 40,
            label: {
              rotate: 0
            }
          }, {
            r0: 40,
            r: 105
          }, {
            r0: 115,
            r: 140,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: colors[2],
              color: 'transparent'
            },
            label: {
              rotate: 'tangential',
              fontSize: 10,
              color: colors[0]
            }
          }, {
            r0: 140,
            r: 145,
            itemStyle: {
              shadowBlur: 80,
              shadowColor: colors[0]
            },
            label: {
              position: 'outside',
              textShadowBlur: 5,
              textShadowColor: '#333',
            },
            downplay: {
              label: {
                opacity: 0.5
              }
            }
          }]
        })
      },
      parentHandleclick(e1,e2,e3,e4,e5) {
        this.x=[];
        this.delattributes();
        this.option.series=[];
        console.log("this.option.series");
        console.log(this.option.series);
        for(let p=0;p<e1.length;p++)
          this.x[p]=e1[p].value
        this.sort=e2;
        this.MCtitle=e3;
        if(e2==true)
        {
          if(e5==3)
            this.MCsort();
          if(e5==6)
            this.MCsort1();
        }
        else
          this.MCdata=JSON.parse(JSON.stringify(this.MCdatacopy));
        this.option.title.text=this.MCtitle;
        if (e4==0)
        this.chartType="bar";
        if (e4==1)
          this.chartType="line";
        if(e4==2)
        {
          this.polarxy();
          this.initChart()
          return
        }
        if(e4==3)
        {
          this.piexy()
          this.initChart()
          return
        }
        if(e4==4)
        {
          this.scatterxy()
          this.initChart()
          return
        }
        if(e4==5)
        {
          this.radarxy()
          this.initChart()
          return
        }
        if(e4==6)
        {
          this.funnelxy()
          this.initChart()
          return
        }
        if(e4==7)
        {
          this.heatmapxy()
          this.initChart()
          return
        }
        if(e4==8)
        {
          this.sunburstxy()
          this.initChart()
          return
        }
        this.$set(this.option, 'xAxis', {
          data: []
        });
        this.$set(this.option, 'yAxis', {});
        for (let i = 0; i < this.MCdata.length ; i++) {
          this.option.xAxis.data[i]=this.MCdata[i].name
        }
        if(this.x.indexOf("0")!=-1) {
          this.option.series.push({
            name: '销量',
            type: this.chartType,
            data:[this.MCdata[0].Sales,this.MCdata[1].Sales,this.MCdata[2].Sales, this.MCdata[3].Sales, this.MCdata[4].Sales,this.MCdata[5].Sales],
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          })
          this.initChart()
        }
        if(this.x.indexOf("1")!=-1) {
         this.option.series.push({
            name: '库存量',
            type: this.chartType,
            data:[this.MCdata[0].inventory,this.MCdata[1].inventory,this.MCdata[2].inventory, this.MCdata[3].inventory, this.MCdata[4].inventory,this.MCdata[5].inventory],
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          })
          this.initChart()
        }
        if(this.x.indexOf("2")!=-1) {
          this.option.series.push({
            name: this.cusname,
            type: this.chartType,
            data:[this.MCdata[0].cus,this.MCdata[1].cus,this.MCdata[2].cus, this.MCdata[3].cus, this.MCdata[4].cus,this.MCdata[5].cus],
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          })
          this.initChart()
        }
      },
      forcustom1(e1,e2){
        this.cusname=e1;
        let c = new Array(this.MCdata.length);
        let a=e2.split('');
        for (let i=0;i<this.MCdata.length;i++) {
          let b="";
          for (let j = 0; j < a.length; j++) {
            if (a[j] == "x"){
              a[j] = this.MCdata[i].Sales
            }
            if (a[j] == "y"){
              a[j] = this.MCdata[i].inventory
            }
            b=b+a[j];
          }
          eval("b="+b);
          c[i]=b;
          a=e2.split('');
          this.$set(this.MCdata[i], 'cus', b);
          this.$set(this.MCdatacopy[i], 'cus', b);
        }
        console.log(this.MCdata)
      },
      delattributes(){
        this.$delete(this.option, 'xAxis')
        this.$delete(this.option, 'yAxis')
        this.$delete(this.option, 'angleAxis');
        this.$delete(this.option, 'radiusAxis');
        this.$delete(this.option, 'polar');
        this.$delete(this.option, 'radar')
        this.$delete(this.option, 'grid')
        this.$delete(this.option, 'visualMap');
      },
      initChart() { // 通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
        this.chart = echarts.init(this.$el);
        // this.chart = echarts.init(this.$el)、
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(this.option);
        this.chart.resize();
        console.log("111")
      },
      MCforecast(){
        this.option.title.text=this.MCtitle;
        this.$set(this.option.series[0], 'name', "预测表");
        this.$set(this.option.series[0], 'data', [this.MCdata[0].inventory-this.MCdata[0].Sales,this.MCdata[1].inventory-this.MCdata[1].Sales,this.MCdata[2].inventory-this.MCdata[2].Sales, this.MCdata[3].inventory-this.MCdata[3].Sales, this.MCdata[4].inventory-this.MCdata[4].Sales,this.MCdata[5].inventory-this.MCdata[5].Sales])

        this.initChart()
      },
    }
  }
</script>
