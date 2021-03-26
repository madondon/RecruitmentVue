<template>
  <div>
    <child ref="mychild" :len="id.length"></child>
    <el-dialog  :visible.sync="dialogFormVisible">
      <button @click="total" class="button">计算总销售量</button>
      <br><br><br>
      <div>销售总量为：{{this.sum}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ensure">确 定</el-button>
      </div>
    </el-dialog>
    <div style="position:relative;left: 30%">
      <el-button type="primary" @click="dialog = true" icon="el-icon-edit" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" @click="dele" circle></el-button>
    </div>
    <el-drawer
            title="图表属性"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
            size="25%"
    >
      <div class="demo-drawer__content">



        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <h4 style="margin-left: 10px">各大公司学历要求</h4><i class="header-icon el-icon-info"></i>
            </template>
            <el-button @click="MCforecast" type="primary" >生成图表</el-button>
          </el-collapse-item>
          <el-collapse-item >
            <template slot="title">
              <h4 style="margin-left: 10px">总和</h4><i class="header-icon el-icon-info"></i>
            </template>
            <button @click="select()" class="button">总和</button>
          </el-collapse-item>
          <el-collapse-item >
            <template slot="title">
              <h4 style="margin-left: 10px">自定义图表</h4><i class="header-icon el-icon-info"></i>
            </template>
            <el-form :model="form">

              <el-form-item label="图表名称:" :label-width="formLabelWidth">
                <el-col :span="15">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item   label-width="15px">
                <el-button style="margin-left:110px;" @click="addDomain">新增维度</el-button>
                <el-form-item
                        v-for="(domain, index) in form.domains"
                        :label="'维度' + index+'  : '"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                >
                  <el-col :span="15">
                    <el-form-item>
                      <el-select v-model="domain.value" placeholder="请选择所需维度" display="flex" style="width: 160px">
                        <el-option label="销量" value="0"></el-option>
                        <el-option label="库存量" value="1"></el-option>
                        <el-option label="自定义公式" value="2" ></el-option>
                      </el-select>
                      <div v-if="domain.value==2">
                        <el-input v-model="cusname" autocomplete="off" placeholder="请输入维度名称"></el-input>
                        <el-tooltip class="item" effect="dark" content="x代表销量,y代表库存" placement="top">
                          <el-input v-model="custom" autocomplete="off" placeholder="请输入自定义公式" @blur.prevent="forcustom"></el-input>
                        </el-tooltip>
                      </div>
                      <el-button @click.prevent="removeDomain(domain)" style="float:right;" type="danger">删除</el-button>
                    </el-form-item>

                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item label="是否排序:" :label-width="formLabelWidth" style="margin-top: -30px">
                <el-switch
                        v-model="form.desc"
                        active-color="#13ce66"
                        inactive-color="#999999">
                </el-switch>
                <div v-if="form.desc==true">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">销量</el-radio>
                    <el-radio :label="6">库存量</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>

              <el-form-item label="图表类型:" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择图表类型">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer" style="margin-left: 130px">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="clickParent" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>
  </div>
</template>

<script>
    import Child from './Charts/Charts';
    export default {
        props: ['item','id'],
        name: "parent",
        components: {
            child: Child
        },
        data(){
            return {
                radio: 3,
                options: [{
                    value: '0',
                    label: '柱状图'
                }, {
                    value: '1',
                    label: '折线图',
                }, {
                    value: '2',
                    label: '极坐标图'
                }, {
                    value: '3',
                    label: '饼图',
                    disabled: false
                }, {
                    value: '4',
                    label: '散点图'
                },{
                    value: '5',
                    label: '雷达图'
                },{
                    value: '6',
                    label: '漏斗图',
                    disabled: false
                },{
                    value: '7',
                    label: '热力图'
                },{
                    value: '8',
                    label: '旭日图'
                },
                ],
                id1:this.item,
                len:this.id.length,
                cusname:'',
                activeName:'',
                custom:'',
                value:true,
                dialog: false,
                loading: false,
                form: {
                    name: '未知数据表',
                    domains: [{
                        value: ''
                    }],
                    checkList: [],
                    type:'',
                    x:'',
                    desc: false
                },
                formLabelWidth: '80px',
                timer: null,
                sum:0,
                x:1,
                sort:0,
                dialogFormVisible: false,
            }
        },
        watch: {
            item: function (newData, oldData) {
                this.id1 = newData;
            },
        },
        methods: {
            removeDomain(item) {
                if(this.form.domains.length<3)
                {
                    this.$set(this.options[3], "disabled", false);
                    this.$set(this.options[6], "disabled", false);
                }
                var index = this.form.domains.indexOf(item)
                if (index !== -1) {
                    this.form.domains.splice(index, 1)
                }
            },
            addDomain() {
                if(this.form.domains.length>0)
                {
                    this.$set(this.options[3], "disabled", true);
                    this.$set(this.options[6], "disabled", true);
                }
                this.form.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            ensure(){
                this.dialogFormVisible = false
            },
            select:function(){
                this.dialogFormVisible = true
            },
            clickParent() {
                this.$refs.drawer.closeDrawer();
                this.$refs.mychild.parentHandleclick(this.form.domains,this.form.desc,this.form.name,this.form.type,this.radio);
            },
            MCforecast() {
                this.$refs.mychild.MCforecast();
            },
            forcustom() {
                if(this.custom.indexOf('x')==-1&&this.custom.indexOf('y')==-1) {
                    this.$message({
                        type: 'error',
                        message: '请输入正确的表达式'
                    });
                }
                let a=this.custom.split('');
                for (let j = 0; j < a.length; j++) {
                    if(!(a[j]=='x'||a[j]=='y'||a[j]=='+'||a[j]=='-'||a[j]=='*'||a[j]=='/'||a[j]=='('||a[j]==')'||a[j]=='.'||a[j]=='0'||a[j]=='1'||a[j]=='2'||a[j]=='3'||a[j]=='4'||a[j]=='5'||a[j]=='6'||a[j]=='7'||a[j]=='8'||a[j]=='9'))
                    {
                        this.$message({
                            type: 'error',
                            message: '请输入正确的表达式'
                        });
                        return
                    }
                }
                this.$refs.mychild.forcustom(this.cusname,this.custom);
            },
            forcustom1() {
                if(this.custom.indexOf('x')==-1&&this.custom.indexOf('y')==-1) {
                    this.$message({
                        type: 'error',
                        message: '请输入正确的表达式'
                    });
                }
                let a=this.custom.split('');
                for (let j = 0; j < a.length; j++) {
                    if(!(a[j]=='x'||a[j]=='y'||a[j]=='+'||a[j]=='-'||a[j]=='*'||a[j]=='/'||a[j]=='('||a[j]==')'||a[j]=='.'||a[j]=='0'||a[j]=='1'||a[j]=='2'||a[j]=='3'||a[j]=='4'||a[j]=='5'||a[j]=='6'||a[j]=='7'||a[j]=='8'||a[j]=='9'))
                    {
                        this.$message({
                            type: 'error',
                            message: '请输入正确的表达式'
                        });
                        return
                    }
                }
                this.$refs.mychild.forcustom1(this.cusname,this.custom);
            },
            total () {
                let t=this.$refs.mychild.MCdata;
                this.sum=t[0].Sales+t[1].Sales+t[2].Sales+t[3].Sales+t[4].Sales+t[5].Sales
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }

                this.loading = true;
                this.timer = setTimeout(() => {
                    done();
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                        this.loading = false;
                    }, 40);
                }, 200);
            },
            dele() {
                this.$emit('func',this.id1)
                console.log(this.id1)
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
            }
        }
    }
</script>
<style scoped>
  .button {
    background-color: #66CCFF ; /* Green */
    border: none;
    color: white;
    padding: 7px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
  }

</style>


