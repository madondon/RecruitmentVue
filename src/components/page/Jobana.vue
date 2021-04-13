<template>
    <div class="box"  >
        <el-card   style="margin-left: 30px;margin-top: 30px">
        <div id="id1" class="box1"></div>
        </el-card>
        <el-card   style="margin-left: 30px;margin-top: 30px">
        <div id="id2" class="box1"></div>
        </el-card>
        <el-card   style="margin-left: 30px;margin-top: 30px">
        <div id="id3" class="box1"></div>
        </el-card>
        <el-card   style="margin-left: 30px;margin-top: 30px">
            <div id="id4" class="box1"></div>
        </el-card>
        <el-card   style="margin-left: 30px;margin-top: 30px">
            <div id="id5" class="box1"></div>
        </el-card>
        <el-card   style="margin-left: 30px;margin-top: 30px">
        <div id="id6" class="box1">
            <div style="color:#4F4F4F;font-size:11px;font-weight:700;">需求度词云</div>
            <wordcloud
                    :data="defaultWords"
                    nameKey="name"
                    valueKey="value"
                    color="Accent">
            </wordcloud>
        </div>
    </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import 'echarts-gl';
    import wordcloud from 'vue-wordcloud'
    import $axios from "../../api/index"
    var data = 
       [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,1],[0,5,0],[0,6,0],
        [1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,1],[1,5,0],[1,6,0],
        [2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,1],[2,5,0],[2,6,0],
        [3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,1],[3,5,0],[3,6,0],
        [4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,1],[4,5,0],[4,6,0]];

    export default {
        name: "Home",
        components: {
            wordcloud
        },
        data() {
            return {
                option:{
                    title: {
                        text: '学历-薪资关系图',
                        textStyle:{
                            //文字颜色
                            color:'#4F4F4F',
                            fontSize:10
                        }
                    },
                    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00','#FF6347'],
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['中专','高中', '专科', '本科', '硕士']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(128, 255, 165)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(67, 205, 236)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        },
                        {
                            name: '',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0, 221, 255)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(77, 119, 255)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        },
                        {
                            name: '',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(55, 162, 255)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(116, 21, 219)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        },
                        {
                            name: '',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 0, 135)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(135, 0, 157)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        },
                        {
                            name: '',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            label: {
                                show: true,
                                position: 'top'
                            },
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 191, 0)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(224, 62, 76)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        },
                           {
                            name: '',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            label: {
                                show: true,
                                position: 'top'
                            },
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 99, 71)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255,99,71)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        }
                    ]
                },
                option1:{
                    title: {
                        text: '学历-经验-薪资关系图',
                        textStyle:{
                            //文字颜色
                            color:'#4F4F4F',
                            fontSize:10
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {show: true}
                        }
                    },
                    tooltip: {},
                    visualMap: {
                        max: 20,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        }
                    },
                    xAxis3D: {
                        type: 'category',
                        data:['0年', '1年', '2年',
                            '3-4年', '5-7年', '8-9年','10年以上'] 
                    },
                    yAxis3D: {
                        type: 'category',
                        data:  ['高中','专科','本科','硕士','博士']
                    },
                    zAxis3D: {
                        type: 'value'
                    },
                    grid3D: {
                        boxWidth: 200,
                        boxDepth: 80,
                        viewControl: {
                            // projection: 'orthographic'
                        },
                        light: {
                            main: {
                                intensity: 1.2,
                                shadow: true
                            },
                            ambient: {
                                intensity: 0.3
                            }
                        }
                    },
                    series: [{
                        type: 'bar3D',
                        data: data.map(function (item) {
                            return {
                                value: [item[1], item[0], item[2]],
                            }
                        }),
                        shading: 'lambert',

                        label: {
                            fontSize: 16,
                            borderWidth: 1
                        },

                        emphasis: {
                            label: {
                                fontSize: 20,
                                color: '#900'
                            },
                            itemStyle: {
                                color: '#900'
                            }
                        }
                    }]
                },
                option2:{
                    title: {
                        text: '经验占比图',
                        textStyle:{
                            //文字颜色
                            color:'#4F4F4F',
                            fontSize:10
                        },
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {show: true}
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 1048, name: '无需经验'},
                                {value: 735, name: '一年以下'},
                                {value: 580, name: '一到三年'},
                                {value: 484, name: '三到五年'},
                                {value: 300, name: '五年以上'}
                            ]
                        }
                    ]
                },
                option3:{
                    title: {
                        text: '学历占比图',
                        textStyle:{
                            //文字颜色
                            color:'#4F4F4F',
                            fontSize:10
                        },
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {show: true}
                        }
                    },
                    tooltip: {},
                    // legend: {
                    //     data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                    // },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '中专', max: 100},
                            { name: '高中', max: 100},
                            { name: '专科', max: 5000},
                            { name: '本科', max: 5000},
                            { name: '硕士', max: 500}
                        ]
                    },
                    series: [{
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [],
                                name: ''
                            },
                            {
                                value: [],
                                name: ''
                            },
                            {
                                value: [],
                                name: ''
                            },
                            {
                                value: [],
                                name: ''
                            },
                            {
                                value: [],
                                name: ''
                            },
                            {
                                value: [],
                                name: ''
                            }
                        ]
                    }]
                },
                option4: {
                    title: {
                        text: '低均高-薪资图',
                        textStyle:{
                            //文字颜色
                            color:'#4F4F4F',
                            fontSize:10
                        },
                    },
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: ['product', '最小', '平均', '最高'],
                        source: [
                            {product: '1', '最小':0, '平均':0 , '最高':0 },
                            {product: '1', '最小':0, '平均':0 , '最高':0 },
                            {product: '1', '最小':0, '平均':0 , '最高':0 },
                            {product: '1', '最小':0, '平均':0 , '最高':0 },
                            {product: '1', '最小':0, '平均':0 , '最高':0 },
                            {product: '1', '最小':0, '平均':0 , '最高':0 }
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                },
                defaultWords: []
            }
        },
        mounted(){
             $axios.getAna1().then(res => {
                for(var i=0;i<res.data.length;i++)
                if(i==0)
                {
                    this.option.series[0].name=res.data[i].name
                    this.option.series[0].data.push(res.data[i].money)
                }
                else
                { 
                    this.option.series[parseInt(i/5)].name=res.data[i].name
                    this.option.series[parseInt(i/5)].data.push(res.data[i].money)
                }
                    this.initChart();
            });
             $axios.getAna2().then(res => {
                 for(var i=0;i<res.data.length;i++)
                 {
                     data[i].splice(data[i].length-1,1,res.data[i].money);
                 }
                 this.option1.series[0].data=data.map(function (item) {
                            return {value: [item[1], item[0], item[2]]}
                        }),
                 this.initChart1();
            });
             $axios.getAna3().then(res => {
                 this.option2.series[0].data=res.data
                 this.initChart2();
            });
             $axios.getAna4().then(res => {
                for(var i=0;i<res.data.length;i++)
                {
                if(i==0)
                {
                    this.option3.series[0].data[0].name=res.data[i].name
                    this.option3.series[0].data[0].value.push(res.data[i].count)
                }
                else
                { 
                    this.option3.series[0].data[parseInt(i/5)].name=res.data[i].name
                    this.option3.series[0].data[parseInt(i/5)].value.push(res.data[i].count)
                }
                }
                    this.initChart3();
            });
             $axios.getAna5().then(res => {
               for(var i=0;i<res.data.length;i++)
               {
                   this.option4.dataset.source[i].product=res.data[i].name;
                   this.option4.dataset.source[i].最小=res.data[i].min;
                   this.option4.dataset.source[i].平均=res.data[i].avg;
                   this.option4.dataset.source[i].最高=res.data[i].max;
                }
                this.initChart4();
            });
             $axios.getAna6().then(res => {
                this.defaultWords=res.data
            });
        },
        methods: {
            initChart() { // 通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
                this.chart = echarts.init(document.getElementById('id1'));
                this.chart.setOption(this.option);
                this.chart.resize();
            },
            initChart1() { // 通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
                this.chart = echarts.init(document.getElementById('id2'));
                this.chart.setOption(this.option1);
                this.chart.resize();
            },
            initChart2() { // 通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
                this.chart = echarts.init(document.getElementById('id3'));
                this.chart.setOption(this.option2);
                this.chart.resize();
            },
            initChart3() { // 通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
                this.chart = echarts.init(document.getElementById('id4'));
                this.chart.setOption(this.option3);
                this.chart.resize();
            },
            initChart4() { // 通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
                this.chart = echarts.init(document.getElementById('id5'));
                this.chart.setOption(this.option4);
                this.chart.resize();
            },
        },
    }
</script>

<style>
    .box{
        background: url("../../assets/img/bg.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
        display: flex;
        flex-wrap:wrap;
    }
    .box1{
        width:340px ;
        height:290px;
        display: inline-block
    }
</style>
