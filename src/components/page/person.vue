<template>
    <div>
        <div  style="background-color: rgb(244, 246, 249); padding: 20px;">
            <section >
                <div  style="background-color: rgb(255, 255, 255); padding: 15px;">
                    <div  style="margin-top: 2px; margin-bottom: 15px;">

                        <div style="display: inline-block;margin-left: 10px;" class=" el-input--medium">
                            <el-input
                                    placeholder="请输入账号查询"
                                    v-model="inputId">
                            </el-input>
                        </div>
                        <el-button style="margin-right: 10px" @click="forcustom" type="button" class="el-button el-button--default el-button--medium"><i class="el-icon-search"></i></el-button>
                        <button @click="dialogMulDelVisible = true" type="button" class="el-button  el-button--primary el-button--medium is-plain " v-if="checkedCities.length>0">批量删除</button>
                        <button  type="button" class="el-button el-button--primary el-button--medium is-plain" @click="exportExcel">导出Excel</button>
                        <span class="el-pagination__total" style="font-size: 15px;color: #999999;margin-left: 600px;">共 {{tableData.length}} 条</span>
                    </div>

                    <el-table
                            id="out-table"
                            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            style="width: 100%"
                            height="400"
                            stripe
                            :cell-style="{'text-align':'center'}"
                            :header-cell-style="{'text-align':'center','font-size':'15px',color:'#606266'}">
                        <el-table-column width="50px">
                            <template slot="header" slot-scope="scope">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">&nbsp;</el-checkbox>
                            </template>
                            <template slot-scope="scope">
                                <el-checkbox   v-model="checkedCities" :label="tableData[scope.$index+pagesize*(currentPage-1)]" :key="scope.$index+pagesize*(currentPage-1)" @change="handleCheckedCitiesChange">&nbsp;</el-checkbox>
                            </template>
                        </el-table-column >

                        <el-table-column
                                label="id"
                                prop="id">
                        </el-table-column>
                        <el-table-column
                                width="100px"
                                label="姓名"
                                prop="name">
                        </el-table-column>
                        <el-table-column
                                width="70px"
                                label="管理员"
                                prop="admin">
                        </el-table-column>
                        <el-table-column
                                width="100px"
                                label="头像"
                                prop="picture">
                            <template slot-scope="scope">
                                <img :src="require('../../assets/img/head/'+tableData[scope.$index].picture)" style="width: 50px;height: 50px" alt />
                            </template>
                        </el-table-column>

                        <el-table-column
                                width="70px"
                                label="性别"
                                prop="sex">
                        </el-table-column>
                        <el-table-column
                                width="70px"
                                label="学历"
                                prop="education"
                                :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column
                                label="身份"
                                prop="identity">
                        </el-table-column>
                        <el-table-column
                                label="电话"
                                prop="phone">
                        </el-table-column>
                        <el-table-column
                                width="200px"
                                label="邮箱"
                                prop="mail">
                        </el-table-column>
                        <el-table-column
                                label="关键字"
                                prop="wordKey">
                        </el-table-column>

                        <el-table-column width="230px">
                            label="操作"
                            <template slot-scope="scope">
                                <el-button @click="handleEdit(scope.$index+pagesize*(currentPage-1))" type="primary" round v-if="tableData[scope.$index+pagesize*(currentPage-1)].admin==='否'">升级</el-button>
                                <el-button @click="handleEdit(scope.$index+pagesize*(currentPage-1))" type="warning" round v-else>降级</el-button>
                                <el-button @click="handleDel(scope.$index+pagesize*(currentPage-1))" type="danger" round>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                    <!--批量删除-->
                    <el-dialog    :visible.sync="dialogMulDelVisible" width="20%" center>
                        <i class="el-icon-warning" style="color: red"></i>
                        是否确认删除{{checkedCities.length}}位用户
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogMulDelVisible = false">取 消</el-button>
                            <el-button type="primary" @click="checkMulDel">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!--删除-->
                    <el-dialog    :visible.sync="dialogDelVisible"  width="20%" center>
                        <i class="el-icon-warning" style="color: red"></i>
                        是否确认删除该用户
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogDelVisible = false">取 消</el-button>
                            <el-button type="primary" @click="checkDel(index)">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!--升级-->
                    <el-dialog    :visible.sync="dialogEditVisible"  width="20%" center>
                        <i class="el-icon-warning" style="color: red"></i>
                        是否确认更新该用户
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogEditVisible = false">取 消</el-button>
                            <el-button type="primary" @click="checkEdit(index)">确 定</el-button>
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
        inject:['reload'],
        data() {
            return {

                dialogMulDelVisible:false,
                dialogEditVisible:false,
                dialogDelVisible:false,
                inputId:'',
                total:1000,//默认数据总数
                pagesize:10,//每页的数据条数
                currentPage:1,//默认开始页面
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true,
                index:'1',
                tableData: [],
            };
        },
        //初始化
        created:function(){
            $axios.getUserInfo().then(res => {
                this.tableData=res.data
            });
            this.total=this.tableData.length;
        },

        //监听tabke表刷新
        watch: {
            tableData: {
                handler(newVal, oldVal) {
                    this.total=this.tableData.length;
                    this.$forceUpdate()
                },
                deep: true //对象内部属性的监听，关键。
            }
        },

        methods: {
            //确认更新用户
            checkEdit(index) {
                $axios.updateAdmin(this.tableData[index].id).then(res => {
                    console.log(res.data);
                    this.$message.success("更新成功");
                    this.dialogEditVisible=false;
                });
                this.reload();
            },

            //更新用户
            handleEdit(index) {
                this.dialogEditVisible = true;
                this.index=index;
            },

            //确认删除用户
            checkDel(index) {
                $axios.deleteUserInfoById(this.tableData[index].id).then(res => {
                    console.log(res.data);
                    this.$message.success("删除成功");
                    this.dialogDelVisible=false;
                    this.$delete(this.tableData, index);
                });
            },

            //删除用户
            handleDel(index) {
                this.dialogDelVisible = true;
                this.index=index;
            },

            //批量删除用户
            checkMulDel(){
                for(let i=0;i<this.checkedCities.length;i++)
                {
                    console.log(this.checkedCities[i]);
                    $axios.deleteUserInfoById(this.checkedCities[i].id).then(res => {
                        console.log(res.data);
                        this.$message.success("删除成功");
                        this.dialogDelVisible=false;
                        this.$delete(this.tableData, index);
                    });
                }
                this.$message.success('删除'+this.checkedCities.length+'条规则成功！');
                this.checkedCities=[];
                this.dialogMulDelVisible = false;
                $axios.getUserInfo().then(res => {
                    this.tableData=res.data
                });
                this.total=this.tableData.length;
            },

            //筛选账号
            forcustom() {
                $axios.getUserInfo().then(res => {
                    this.tableData=res.data;
                    this.total=this.tableData.length;
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].id.toString().indexOf(this.inputId) === -1) {
                            this.$delete(this.tableData, i);
                            i--;
                        }
                    }
                    if (this.tableData.length === 0)
                    {
                        this.$message.error('未查询到此规则，请检查是否存在多余符号或空格');
                        this.inputId='';
                    }
                    else
                        this.$message.success('查询成功！');
                });
            },

            //换页
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },

            //全部选中
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.tableData : [];
                console.log(this.checkedCities)
                this.isIndeterminate = false;
            },

            //多选框
            handleCheckedCitiesChange() {
                console.log(this.checkedCities)
                let checkedCount = this.checkedCities.length;
                this.checkAll = checkedCount === this.tableData.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData.length;
            },

            //导出excel
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