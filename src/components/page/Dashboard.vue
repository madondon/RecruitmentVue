<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <!--用户信息卡片-->
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="require('../../assets/img/head/'+userInfo.picture)" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{userInfo.name}}</div>
                            <div style="margin-top: 20px">{{identity}}</div>
                        </div>
                    </div>
                    <div style="margin-left: 40px">

                        <div class="user-info-list">
                            本次登录地点：
                            <span>{{location}}</span>
                        </div>
                    </div>
                </el-card>
                <!--收藏数投递数-->
                <el-row :gutter="20" class="mgb20" style="margin-top: 30px">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" >
                            <div class="grid-content grid-con-1" @click="toCol()">
                                <i class="el-icon-star-on grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num" style="margin-left: 10px">{{colNum}}</div>
                                    <h3 style="margin-left: 15px">收藏数</h3>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" >
                            <div class="grid-content grid-con-2" @click="toDel()">
                                <i class="el-icon-s-claim grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num" style="margin-left: 20px">{{delNum}}</div>
                                    <h3 style="margin-left: 15px">投递数</h3>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!--轮播图-->
                <div class="block" style="margin-top: 30px" >
                    <el-carousel height="220px">
                        <el-carousel-item v-for="item,index in img" >
                            <el-image :src="item.src" @click="goPage(index)"/>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
            <!--职场新闻-->
            <el-col :span="16">

                <el-card shadow="hover" style="height:635px;">
                    <div slot="header" class="clearfix">
                        <h3>职场新闻</h3>
                    </div>
                    <el-table :show-header="false" :data="news" @row-click="clickData"  height="550" style="width:100%;" >

                        <el-table-column>   <template slot-scope="scope">
                            <el-card shadow="hover" :body-style="{padding: '0px'}" >
                                <div class="grid-content grid-con-1">

                                    <el-image :src="scope.row.src" />
                                    <div style="flex: 1;margin-left: 20px">
                                        <h3 >{{scope.row.title}}</h3>
                                        <div style=" text-align:left;color:#999;font-size: 10px ">&nbsp&nbsp&nbsp&nbsp&nbsp{{scope.row.content}}</div>
                                    </div>
                                </div>
                            </el-card> </template>
                        </el-table-column>

                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import $axios from "../../api/index"
    export default {
        name: 'dashboard',
        data() {
            return {
                colNum:0,
                delNum:0,
                location:JSON.parse(localStorage.getItem('location')),
                userInfo: JSON.parse(localStorage.getItem('userInfo')),
                identity:'',
                news: [
                    {
                        title:'2020宝洁暑期实习研发部门面经',
                        href: 'https://wenku.51job.com/article435296/',
                        src:require("../../assets/img/news/1.jpg"),
                        content:'2020宝洁暑期实习研发R&D面经已收到实习offer call，来论坛回馈小伙伴们~希望对大家有所帮助！去年就申了暑期实习，因为毫无准备连笔试都没过；今年过了冷却期后重整旗鼓，成功拿到... ',

                    },
                    {
                        title:'面试失败的几大信号',
                        href: 'https://wenku.51job.com/article430453/',
                        src:require("../../assets/img/news/2.jpg"),
                        content:'精心准备了一场面试，过程中和面试官从诗词歌赋聊到人生哲学。你以为稳操胜券offer到手，其实然后就没有然后了。其实很多时候，你的面试在进场前三分钟就已经结束了。怎么判断你的面...',
                    },
                    {
                        title:'今年还能回家过年吗？',
                        href: 'https://wenku.51job.com/article444543/',
                        src:require("../../assets/img/news/3.jpg"),
                        content:'年的脚步越来越近了，部分地区的疫情也有愈发严重的趋势。身在外地的职场人，此刻最关心的问题就是：今年还能回家过年吗？针对目前的情况，很多省区市也提出了“就地过年”的倡议，包... ',
                    },
                    {
                        title:'携程、德勤、普华永道群面案例分析+TIPS',
                        href: 'https://wenku.51job.com/article444525/',
                        src:require("../../assets/img/news/4.jpg"),
                        content:'流程介绍: 12人一组, 3mins小组自我介绍 – 2mins 读case – 25mins无领导小组讨论 – 2mins一人presentation小组构成: 12人中包括 (研究生10人, 本科2人) / （hr专业9人, 楼主商科但非hr, 一人... ',
                    },
                    {
                        title:'吸引员工回流的老东家，都具备哪些特征？',
                        href: 'https://wenku.51job.com/article444542/',
                        src:require("../../assets/img/news/5.jpg"),
                        content:'最近，我的朋友小王重新回到了三年前离职的公司。这三年间他换过三家公司，虽然薪资待遇一直在上涨，但是加班严重，工作内容和原来的也越差越远。综合比较，他觉得还是原来的公司比... ',
                    },
                    {
                        title:'找工作时，你觉得学历和能力哪个更重要？',
                        href: 'https://wenku.51job.com/article444522/',
                        src:require("../../assets/img/news/6.jpg"),
                        content:'关于这个问题，在不同的时间段会有不同的答案。刚毕业求职那几年，学历成了一道无形的墙，堵住了很多人的前进道路，而等毕业几年后，再跳槽换工作的时候，HR则更多看中的是工作经验... ',
                    }
                ],
                img: [
                    {
                        href: 'https://sxh.zhaopin.com/',
                        src:require("../../assets/img/carousel/1.jpg")
                    },
                    {
                        href: 'https://i.zhaopin.com/order/resume-optimization/?pageSource=resume_PCbanner',
                        src:require("../../assets/img/carousel/2.jpg")
                    },
                    {
                        href: 'https://xjh.zhaopin.com/show/3450',
                        src:require("../../assets/img/carousel/3.jpg")
                    },
                    {
                        href: 'https://render.alipay.com/p/c/xiaozhao',
                        src:require("../../assets/img/carousel/4.jpg")
                    },
                ],
            };
        },

        mounted(){
            this.countIdentity();
            $axios.getColNum(this.userInfo.id).then(res => {
                this.colNum=res.data;
            });
            $axios.getDelNum(this.userInfo.id).then(res => {
                this.delNum=res.data;
            });
        },
        methods: {
            toCol(){
                this.$router.push('/Collection');
            },
            toDel(){
                this.$router.push('/delivery');
            },
            countIdentity(){
                var returnAge;
                var strBirthdayArr=this.userInfo.birthday.split("-");
                var birthYear = strBirthdayArr[0];
                var birthMonth = strBirthdayArr[1];
                var birthDay = strBirthdayArr[2];

                var d = new Date();
                var nowYear = d.getFullYear();
                var nowMonth = d.getMonth() + 1;
                var nowDay = d.getDate();

                if(nowYear == birthYear){
                    returnAge = 0;//同年 则为0岁
                }
                else{
                    var ageDiff = nowYear - birthYear ; //年之差
                    if(ageDiff > 0){
                        if(nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay;//日之差
                            if(dayDiff < 0)
                            {
                                returnAge = ageDiff - 1;
                            }
                            else
                            {
                                returnAge = ageDiff ;
                            }
                        }
                        else
                        {
                            var monthDiff = nowMonth - birthMonth;//月之差
                            if(monthDiff < 0)
                            {
                                returnAge = ageDiff - 1;
                            }
                            else
                            {
                                returnAge = ageDiff ;
                            }
                        }
                    }
                    else
                    {
                        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                this.identity=returnAge+"岁 | "+this.userInfo.identity+" | "+this.userInfo.education;
            },
            clickData(row) {
                window.open(row.href)
            },
            goPage(index){
                window.open(this.img[index].href)
            }

        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }
    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 50px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
        margin-top: ;
    }

    .todo-item {
        font-size: 14px;
    }


</style>
