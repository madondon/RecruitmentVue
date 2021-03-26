<template>
    <div>
        <div  style="background-color: rgb(244, 246, 249); padding: 20px;">
            <section >
                <div  style="background-color: rgb(255, 255, 255); padding: 15px;">
                    <div  style="margin-top: 2px; margin-bottom: 15px;">

                        <div style="display: inline-block;margin-left: 10px;" class=" el-input--medium">
                            <el-input
                                    placeholder="请输入岗位名称查询"
                                    v-model="inputname">
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
                        <el-table-column width="120px">
                            label="操作"
                            <template slot-scope="scope" >
                                <el-button @click="handleDel(scope.$index+pagesize*(currentPage-1))" type="danger" round>删除信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--删除-->
                    <el-dialog    :visible.sync="dialogDelVisible" width="20%" center>
                        <i class="el-icon-warning" style="color: red"></i>
                        是否确认删除该招聘信息
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogMulDelVisible = false">取 消</el-button>
                            <el-button type="primary" @click="checkDel">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!--批量删除-->
                    <el-dialog    :visible.sync="dialogMulDelVisible" width="20%" center>
                        <i class="el-icon-warning" style="color: red"></i>
                        是否确认删除{{checkedCities.length}}条招聘信息
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
                dialogMulDelVisible:false,
                dialogDelVisible:false,
                inputname:'',
                total:1000,//默认数据总数
                pagesize:10,//每页的数据条数
                currentPage:1,//默认开始页面
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true,
                index:1,
                tableData: []
            };
        },

        created:function(){
            $axios.queryJobInfo().then(res => {
                this.tableData=res.data
            });
            this.total=this.tableData.length;
        },

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
            forcustom() {

                console.log(this.inputname);
                this.$message.success(this.inputname+'查询成功！');
            },

            handleDel(index){
                this.dialogDelVisible = true;
                this.index=index;
            },

            checkDel(){
                $axios.deleteJobInfoById(this.tableData[this.index].jobid).then(res => {
                    console.log(res.data);
                    this.$message.success("删除成功");
                    this.dialogDelVisible=false;
                    this.$delete(this.tableData, this.index);
                });
            },

            checkMulDel(){
                for(let i=0;i<this.checkedCities.length;i++)
                {
                    console.log(this.checkedCities[i]);
                    $axios.deleteJobInfoById(this.checkedCities[i].jobid).then(res => {
                        console.log(res.data);
                    });
                }
                this.$message.success('删除'+this.checkedCities.length+'条招聘信息成功！');
                this.checkedCities=[];
                this.dialogMulDelVisible = false;
                $axios.queryJobInfo().then(res => {
                    this.tableData=res.data
                });
                this.total=this.tableData.length;
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

    .footer{
        position: absolute;
        right: 580px;
        bottom: 30px;
    }
    el-table__row>td {
        border: none;
    }

    .el-table::before {
        height: 0px;
    }
</style>