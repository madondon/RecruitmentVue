<template>
    <div class="box">
        <el-card   style="margin-left: 30px;margin-top: 30px">
            <div id="id2" style="  width:1160px ;height:290px;"></div>
        </el-card>

        <el-card   style="margin-left: 30px;margin-top: 30px">
            <div id="id1"style="  width:750px ;height:290px;"></div>
        </el-card>
        <el-card   style="margin-left: 30px;margin-top: 30px">
            <div id="id6" class="box1">
                <div style="color:#4F4F4F;font-size:11px;font-weight:700;">福利待遇</div>
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
    var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

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
                    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    // legend: {
                    //     data: ['Java后端开发', 'Python工程师', 'Android工程师', '大数据工程师', '前端开发工程师'],
                    //     top:"6%",
                    // },
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
                            data: ['0-99人','100-499人', '500-999人', '1000-4999人', '5000-9999人', '10000以上']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '高中',
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
                                    color: 'rgba(1, 191, 236)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [140, 232, 101, 264, 90, 340, 250]
                        },
                        {
                            name: '专科',
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
                            data: [120, 282, 111, 234, 220, 340, 310]
                        },
                        {
                            name: '本科',
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
                            data: [320, 132, 201, 334, 190, 130, 220]
                        },
                        {
                            name: '硕士',
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
                            data: [220, 402, 231, 134, 190, 230, 120]
                        },
                        {
                            name: '博士',
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
                            data: [220, 302, 181, 234, 210, 290, 150]
                        }
                    ]
                },
                option1:{
                    title: {
                        text: '各大公司学历占比图',
                        textStyle:{
                            //文字颜色
                            color:'#4F4F4F',
                            fontSize:10
                        }
                    },
                        legend: {},
                        tooltip: {},
                        dataset: {
                            source: [
                                ['company','百度', '腾讯', '阿里', '华为', '搜狐', '滴滴出行'],
                                ['高中', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                                ['专科', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                                ['本科', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                                ['硕士', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                            ]
                        },
                        series: [{
                        name:'百度',
                            type: 'pie',
                            radius: '20%',
                            center: ['20%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '百度'
                            }
                        }, {
                            name:'腾讯',
                            type: 'pie',
                            radius: '20%',
                            center: ['40%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '腾讯'
                            }
                        }, {
                            name:'阿里',
                            type: 'pie',
                            radius: '20%',
                            center: ['60%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '阿里'
                            }
                        }, {
                            name:'华为',
                            type: 'pie',
                            radius: '20%',
                            center: ['80%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '华为'
                            }
                        },{
                            name:'百度',
                            type: 'pie',
                            radius: '20%',
                            center: ['20%', '75 %'],
                            encode: {
                                itemName: 'company',
                                value: '百度'
                            }
                        }, {
                            name:'腾讯',
                            type: 'pie',
                            radius: '20%',
                            center: ['40%', '75%'],
                            encode: {
                                itemName: 'company',
                                value: '腾讯'
                            }
                        }, {
                            name:'阿里',
                            type: 'pie',
                            radius: '20%',
                            center: ['60%', '75%'],
                            encode: {
                                itemName: 'company',
                                value: '阿里'
                            }
                        }, {
                            name:'华为',
                            type: 'pie',
                            radius: '20%',
                            center: ['80%', '75%'],
                            encode: {
                                itemName: 'company',
                                value: '华为'
                            }
                        }]
                },
                defaultWords: [
                    {
                        "name": "Java后端开发",
                        "value": 26
                    },
                    {
                        "name": "Python工程师",
                        "value": 19
                    },
                    {
                        "name": "Android工程师",
                        "value": 18
                    },
                    {
                        "name": "大数据工程师",
                        "value": 16
                    },{
                        "name": "前端工程师",
                        "value": 19
                    },
                    {
                        "name": "数据分析师",
                        "value": 18
                    },
                    {
                        "name": "运维工程师",
                        "value": 16
                    },{
                        "name": "Python工程师",
                        "value": 19
                    },
                    {
                        "name": "Android工程师",
                        "value": 18
                    },
                    {
                        "name": "大数据工程师",
                        "value": 16
                    },{
                        "name": "前端工程师",
                        "value": 19
                    },
                    {
                        "name": "数据分析师",
                        "value": 18
                    },
                    {
                        "name": "运维工程师",
                        "value": 16
                    },

                ],
            }
        },
        mounted(){
            this.initChart();
            this.initChart1();
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
        },
    }
</script>

<style>
    .box{
        display: flex;
        flex-wrap:wrap;
    }
    .box1{
        width:340px ;
        height:290px;
        display: inline-block
    }
</style>
