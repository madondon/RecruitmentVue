<template>
    <div>
        <div  style="background-color: rgb(244, 246, 249); padding: 20px;">
            <section >
                <div  style="background-color: rgb(255, 255, 255); padding: 15px;">
                    <div  style="margin-top: 2px; margin-bottom: 15px;">
                        <el-collapse accordion>
                            <el-collapse-item>
                                <template slot="title">
                                    <h4 style="margin-left: 450px">展开选项（公司性质、公司规模、工作年限等）</h4><i class="header-icon el-icon-info"></i>
                                </template>
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-form-item label="工作地点：" label-width="100px">
                                        <el-radio-group v-model="form.workarea">
                                            <el-radio border label="">全部</el-radio>
                                            <el-radio border label="北京">北京</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="月薪范围：" label-width="100px">
                                        <el-radio-group v-model="form.money">
                                            <el-radio border label="">全部</el-radio>
                                            <el-radio border label="0.2">2千以上</el-radio>
                                            <el-radio border label="0.4">4千以上</el-radio>
                                            <el-radio border label="0.8">8千以上</el-radio>
                                            <el-radio border label="1">1万以上</el-radio>
                                            <el-radio border label="1.5">1.5万以上</el-radio>
                                            <el-radio border label="2">2万以上</el-radio>
                                            <el-radio border label="4">4万以上</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="工作年限：" label-width="100px">
                                        <el-radio-group v-model="form.experience">
                                            <el-radio border label="">全部</el-radio>
                                            <el-radio border label="无需经验">无需经验</el-radio>
                                            <el-radio border label="1年">1-2年</el-radio>
                                            <el-radio border label="2">2-3年</el-radio>
                                            <el-radio border label="3">3-4年</el-radio>
                                            <el-radio border label="5">5年以上</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="学历要求：" label-width="100px">
                                        <el-radio-group v-model="form.degreefrom">
                                            <el-radio border label="">全部</el-radio>
                                            <el-radio border label="初中">初中</el-radio>
                                            <el-radio border label="高中">高中</el-radio>
                                            <el-radio border label="大专 ">大专</el-radio>
                                            <el-radio border label="本科">本科</el-radio>
                                            <el-radio border label="硕士 ">硕士</el-radio>
                                            <el-radio border label="博士">博士</el-radio>

                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="公司性质：" label-width="100px">
                                        <el-radio-group v-model="form.cotype">
                                            <el-radio border label="">全部</el-radio>
                                            <el-radio border label="国企">国企</el-radio>
                                            <el-radio border label="外资">外资</el-radio>
                                            <el-radio border label="上市公司">上市公司</el-radio>
                                            <el-radio border label="合资">合资</el-radio>
                                            <el-radio border label="民营公司">民营公司</el-radio>
                                            <el-radio border label="事业单位">事业单位</el-radio>
                                            <el-radio border label="创业公司">创业公司</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="公司规模：" label-width="100px">
                                        <el-radio-group v-model="form.cosize">
                                            <el-radio border label="">全部</el-radio>
                                            <el-radio border label="少于">少于50人</el-radio>
                                            <el-radio border label="50-1">50-150人</el-radio>
                                            <el-radio border label="150-">150-500人</el-radio>
                                            <el-radio border label="500-">500-1000人</el-radio>
                                            <el-radio border label="1000-">1000-5000人</el-radio>
                                            <el-radio border label="5000-">5000-10000人</el-radio>
                                            <el-radio border label="10000人以上">10000人以上</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-form>
                            </el-collapse-item>

                        </el-collapse><br>
                        <div style="display: inline-block;margin-left: 10px;" class=" el-input--medium">
                            <el-input
                                    placeholder="请输入岗位名称查询"
                                    v-model="inputname">
                            </el-input>
                        </div>
                        <el-button style="margin-right: 10px" @click="forcustom" type="button" class="el-button el-button--default el-button--medium"><i class="el-icon-search"></i></el-button>
                        <button  type="button" class="el-button el-button--primary el-button--medium is-plain" @click="exportExcel">导出Excel</button>
                        <span class="el-pagination__total" style="font-size: 15px;color: #999999;margin-left: 850px;">共 {{tableData.length}} 条</span>
                    </div>

                    <el-table
                            id="out-table"
                            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            style="width: 100%"
                            height="400"
                            stripe
                            :cell-style="{'text-align':'center'}"
                            :header-cell-style="{'text-align':'center','font-size':'15px',color:'#606266'}">

                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="职位信息">
                                        <span>{{ props.row.content }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="300px"
                                label="岗位名称"
                                prop="name">
                        </el-table-column>
                        <el-table-column
                                width="100px"
                                label="工作地点"
                                prop="workarea">
                        </el-table-column>
                        <el-table-column
                                width="100px"
                                label="月薪"
                                prop="money"
                                sortable>
                        </el-table-column>
                        <el-table-column
                                width="100px"
                                label="工作年限"
                                prop="experience">
                        </el-table-column>
                        <el-table-column
                                width="100px"
                                label="学历要求"
                                prop="degreefrom">
                        </el-table-column>
                        <el-table-column
                                label="公司性质"
                                prop="cotype"
                                >
                        </el-table-column>
                        <el-table-column
                                label="公司规模"
                                prop="cosize"
                                :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column width="230px">
                            label="操作"
                            <template slot-scope="scope">
                                <el-button @click="collection(scope.$index+pagesize*(currentPage-1))" type="warning" round v-if="tableData[scope.$index+pagesize*(currentPage-1)].coled===1">已收藏</el-button>
                                <el-button @click="collection(scope.$index+pagesize*(currentPage-1))" type="primary" round v-else>收&nbsp&nbsp&nbsp藏</el-button>
                                <el-button @click="handleDelivery(scope.$index+pagesize*(currentPage-1))" type="info" round v-if="tableData[scope.$index+pagesize*(currentPage-1)].deled===1" disabled>已投递</el-button>
                                <el-button @click="handleDelivery(scope.$index+pagesize*(currentPage-1))" type="success"  round v-else>投&nbsp&nbsp&nbsp递</el-button>

                            </template>
                        </el-table-column>
                    </el-table>

                    <!--投递-->
                    <el-dialog    :visible.sync="dialogDeliveryVisible" width="20%" center>
                        <i class="el-icon-warning" style="color: green"></i>
                        是否确认投递信息
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogDeliveryVisible = false">取 消</el-button>
                            <el-button type="primary" @click="delivery">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!--批量删除规则-->
                    <el-dialog    :visible.sync="dialogMulDelVisible" width="20%" center>
                        <i class="el-icon-warning" style="color: red"></i>
                        是否确认删除{{checkedCities.length}}条规则
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogMulDelVisible = false">取 消</el-button>
                            <el-button type="primary" @click="checkMulDel">确 定</el-button>
                        </div>
                    </el-dialog>



                    <!--分页-->
                    <div class="footer">
                        <el-pagination class="fy"
                                       layout="prev, pager, next"
                                       @current-change="current_change"
                                       :page-size="pagesize"
                                       :total="total"
                                       background>
                        </el-pagination>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import $axios from "../../api/index"
    export default {
        name: 'Info',

        data() {
            return {
                form: {
                    money: '',
                    workarea: '',
                    cotype: '',
                    cosize: '',
                    experience:'',
                    degreefrom:''
                },
                location:JSON.parse(localStorage.getItem('location')),
                userInfo: JSON.parse(localStorage.getItem('userInfo')),
                dialogMulDelVisible:false,
                dialogDeliveryVisible:false,
                inputname:'',
                total:1000,//默认数据总数
                pagesize:10,//每页的数据条数
                currentPage:1,//默认开始页面
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true,
                index:'1',
                props: { multiple: true },
                tableData: [],
            };
        },
        created:function(){
            $axios.reset();
            $axios.initCol(this.userInfo.id);
            $axios.initDel(this.userInfo.id);
            $axios.queryJobInfo().then(res => {
                this.tableData=res.data
            });

            this.total=this.tableData.length;
        },
        watch: {
            form: {
                handler(newVal, oldVal) {
                    console.log(this.form.money,this.form.workarea,this.form.cotype,this.form.cosize,this.form.experience,this.form.degreefrom);
                    $axios.selectInfo(this.form.money,this.form.workarea,this.form.cotype,this.form.cosize,this.form.experience,this.form.degreefrom).then(res => {
                        this.tableData=res.data
                    });
                },
                deep: true //对象内部属性的监听，关键。
            },
            tableData: {
                handler(newVal, oldVal) {
                    this.total=this.tableData.length;
                    this.$forceUpdate()
                },
                deep: true //对象内部属性的监听，关键。
            }
        },
        methods: {
            collection(index){
                this.index=index;
                if(this.tableData[index].coled===1)
                {
                    $axios.deleteColById(this.tableData[this.index].jobid,this.userInfo.id).then(res => {
                        console.log(res.data);
                        this.$message.success("取消收藏成功");
                        this.tableData[this.index].coled=0;
                    });
                }
                else
                {
                    $axios.addColInfo(this.tableData[this.index].jobid,this.userInfo.id,this.tableData[this.index].coid,this.tableData[this.index].name,this.tableData[this.index].money,this.tableData[this.index].workarea,
                        this.tableData[this.index].coname,this.tableData[this.index].cotype,this.tableData[this.index].cosize,this.tableData[this.index].jobwelf,this.tableData[this.index].experience,this.tableData[this.index].degreefrom,
                        this.tableData[this.index].num,this.tableData[this.index].content).then(res => {
                    console.log(res.data);
                    this.$message.success("收藏成功");
                    this.tableData[this.index].coled=1;
                });
                }

            },

            handleDelivery(index){
                if(this.tableData[index].deled===1)
                {
                    this.$message.success('该岗位已投递');
                }
                else
                {
                    this.dialogDeliveryVisible = true;
                    this.index=index;
                }

            },

            delivery(){
                $axios.addDelInfo(this.tableData[this.index].jobid,this.userInfo.id,this.tableData[this.index].name,this.tableData[this.index].money,this.tableData[this.index].workarea,this.tableData[this.index].coname).then(res => {
                    console.log(res.data);
                    this.$message.success("投递成功");
                    this.dialogDeliveryVisible=false;
                    this.tableData[this.index].deled=1;
                });
            },
            checkMulDel(){
                let len=this.tableData.length;
                for(let i=0;i<this.checkedCities.length;i++)
                {
                    for(let j=0;j<len;j++)
                    {
                        if(this.checkedCities[i].id==this.tableData[j].id)
                        {
                            this.$delete(this.tableData, j);
                            j--;
                            len--;
                        }
                    }
                }
                this.$message.success('删除'+this.checkedCities.length+'条规则成功！');
                this.checkedCities=[];
                this.dialogMulDelVisible = false;
            },
            forcustom() {
                if(this.inputname!=="")
                {
                    $axios.selectJob(this.inputname).then(res => {
                        this.tableData=res.data;
                    });
                    if (this.tableData.length === 0)
                    {
                        this.$message.error('未查询到此招聘信息，请检查是否存在多余符号或空格');
                        this.inputname='';
                    }
                    else
                        this.$message.success('查询成功！');
                }
                else
                {
                    $axios.reset();
                    $axios.initCol(this.userInfo.id);
                    $axios.initDel(this.userInfo.id);
                    $axios.queryJobInfo().then(res => {
                        this.tableData=res.data
                    });
                }

            },
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.tableData : [];
                console.log(this.checkedCities)
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange() {
                console.log(this.checkedCities)
                let checkedCount = this.checkedCities.length;
                this.checkAll = checkedCount === this.tableData.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData.length;
            },
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '招聘信息.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
        }
    };

</script>

<style>
    .app-main {
        min-height: calc(100vh - 84px);
        position: relative;
    }
    .el-pagination
    {
        margin-left: 550px;
    }
    .footer{
        position: absolute;
        right: 580px;
        bottom: 30px;
    }
    .el-drawer{
        overflow: scroll;
    }
    el-table__row>td {
        border: none;
    }

    .el-table::before {
        height: 0px;
    }
</style>