<template>
    <div class="">

        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`已投递(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column width="150">
                            <template slot-scope="scope">
                                <span style="font-size: 10px">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="150">
                            <template slot-scope="scope">
                                <span style="font-size: 10px">{{scope.row.coname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span style="font-size: 10px">{{scope.row.money}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span style="font-size: 10px">{{scope.row.workarea}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span style="font-size: 10px">{{scope.row.updatedate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="200">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status===1">
                                    <el-button size="small" type="primary" @click="handleUpdate(scope.$index) ">再次发送</el-button>
                                    <el-button size="small" type="danger" @click="handleRead(scope.$index)">暂时回收</el-button>
                                </div>
                                <div v-else  >
                                    <el-tooltip class="item" effect="dark" content="该招聘信息已删除" placement="top">
                                        <el-button size="small" type="primary" @click="handleUpdate(scope.$index) " disabled>再次发送</el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="该招聘信息已删除,建议删除或存至回收站" placement="top">
                                        <el-button size="small" type="danger" @click="handleRead(scope.$index)" >暂时回收</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="warning" @click="MulRecycle()">回收全部</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column width="150">
                                <template slot-scope="scope">
                                    <span style="font-size: 10px">{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="150">
                                <template slot-scope="scope">
                                    <span style="font-size: 10px">{{scope.row.coname}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span style="font-size: 10px">{{scope.row.money}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span style="font-size: 10px">{{scope.row.workarea}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span style="font-size: 10px">{{scope.row.updatedate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="200">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.status===1">
                                    <el-button type="primary" @click="handleCancel(scope.$index)">取消回收</el-button>
                                    <el-button type="danger" @click="handleDel(scope.$index)">不再联系</el-button>
                                    </div>
                                    <div v-else>
                                        <el-tooltip class="item" effect="dark" content="该招聘信息已删除" placement="top">
                                            <el-button type="primary" @click="handleCancel(scope.$index)" disabled>取消回收</el-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="该招聘信息已删除,建议删除" placement="top">
                                            <el-button type="danger" @click="handleDel(scope.$index)">不再联系</el-button>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="MulDel()">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import $axios from "../../api/index"
    export default {
        name: 'tabs',
        inject:['reload'],
        data() {
            return {
                userInfo:JSON.parse(localStorage.getItem('userInfo')),
                message: 'first',
                showHeader: false,
                unread: [],
                read: [],

            }
        },

        created:function(){
            $axios.getDelByUserId(this.userInfo.id).then(res => {
                let i;
               for(i=0;i<res.data.length;i++){
                   if(res.data[i].recycle===0)
                       this.unread.push(res.data[i]);
                   else
                       this.read.push(res.data[i]);
               }
            });

        },


        methods: {
            handleRead(index) {
                $axios.updateRecycle(this.unread[index].jobid,this.userInfo.id).then(res => {
                    console.log(res.data);
                    const item = this.unread.splice(index, 1);
                    this.read = item.concat(this.read);
                    this.$message.success("回收成功");
                })
            },

            handleCancel(index) {
                $axios.updateRecycle(this.read[index].jobid,this.userInfo.id).then(res => {
                    console.log(res.data);
                    const item = this.read.splice(index, 1);
                    this.unread = item.concat(this.unread);
                    this.$message.success("更新成功");
                })
            },

            handleDel(index) {
                $axios.deleteDelById(this.read[index].jobid,this.userInfo.id).then(res => {
                    console.log(res.data);
                    this.read.splice(index, 1);
                    this.$message.success("删除成功");
                })
            },

            handleUpdate(index){
                $axios.updateDelTime(this.unread[index].jobid,this.userInfo.id).then(res => {
                    console.log(res.data);
                    this.$message.success("发送成功");
                    this.reload();
                    location.href='mailto:info@sina.com'
                })
            },

            MulDel() {
                for(let i=0;i<this.read.length;i++) {
                    $axios.deleteDelById(this.read[i].jobid,this.userInfo.id).then(res => {
                    console.log(res.data);
                    this.read.splice(i, 1);
                    })
                }   this.$message.success("删除成功");
            },

            MulRecycle() {
                for(let i=0;i<this.unread.length;i++) {
                    $axios.updateRecycle(this.unread[i].jobid, this.userInfo.id).then(res => {
                        console.log(res.data);
                        const item = this.unread.splice(i, 1);
                        this.read = item.concat(this.read);
                    })
                }
                this.$message.success("回收成功");
            },
        },
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

