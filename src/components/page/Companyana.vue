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
    import wordcloud from 'vue-wordcloud'
    import $axios from "../../api/index"
   
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
                    color: ['#FF6347','#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
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
                            name: '中专',
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
                                    color: 'rgba(255, 99, 71)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 99, 71)'
                                }])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        },
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
                            data: []
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
                            data: []
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
                            data: []
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
                            data: []
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
                            data: []
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
                                ['company','腾讯', '字节跳动', '京东', '华为', '中国移动', '网易','阿里巴巴','滴滴出行'],
                                ['中专'],
                                ['高中'],
                                ['专科'],
                                ['本科'],
                                ['硕士'],
                                ['博士']
                            ]
                        },
                        series: [{
                        name:'腾讯',
                            type: 'pie',
                            radius: '35%',
                            center: ['20%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '腾讯'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        }, {
                            name:'字节跳动',
                            type: 'pie',
                            radius: '35%',
                            center: ['40%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '字节跳动'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        }, {
                            name:'京东',
                            type: 'pie',
                            radius: '35%',
                            center: ['60%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '京东'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        }, {
                            name:'华为',
                            type: 'pie',
                            radius: '35%',
                            center: ['80%', '30%'],
                            encode: {
                                itemName: 'company',
                                value: '华为'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        },{
                            name:'中国移动',
                            type: 'pie',
                            radius: '35%',
                            center: ['20%', '75 %'],
                            encode: {
                                itemName: 'company',
                                value: '中国移动'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        }, {
                            name:'网易',
                            type: 'pie',
                            radius: '35%',
                            center: ['40%', '75%'],
                            encode: {
                                itemName: 'company',
                                value: '网易'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        }, {
                            name:'阿里巴巴',
                            type: 'pie',
                            radius: '35%',
                            center: ['60%', '75%'],
                            encode: {
                                itemName: 'company',
                                value: '阿里巴巴'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        }, {
                            name:'滴滴出行',
                            type: 'pie',
                            radius: '35%',
                            center: ['80%', '75%'],
                            encode: {
                                itemName: 'company',
                                value: '滴滴出行'
                            },
                            label: { 　　　　　　　　　　//去除饼图的指示折线label
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter:"{b}:{d}%"},
                            }
                        }]
                },
                defaultWords: [],
            }
        },
        mounted(){
              $axios.getAna7().then(res => {
                  for(var i=0;i<res.data.length;i++)
                 {
                     if(i==0)
                     {
                         this.option1.dataset.source[1].push(res.data[i].count)
                     }
                     else
                     { 
                         this.option1.dataset.source[parseInt(i/8)+1].push(res.data[i].count)
                     }
                 }
                this.initChart1();
                console.log(this.option1.dataset.source)
            });
              $axios.getAna8().then(res => {
                for(var i=0;i<res.data.length;i++)
                if(i==0)
                {
                    this.option.series[0].name=res.data[i].name
                    this.option.series[0].data.push(res.data[i].money)
                }
                else
                { 
                    this.option.series[parseInt(i/7)].name=res.data[i].name
                    this.option.series[parseInt(i/7)].data.push(res.data[i].money)
                }
                    this.initChart();
            });
              $axios.getAna9().then(res => {
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
