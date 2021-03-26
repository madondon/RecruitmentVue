<template>
    <div>
        <el-dialog   title="修改基本信息" :visible.sync="dialogInfoVisible" width="30%" center>
            <el-form :model="form">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="name">
                    <el-input v-model="form.identity" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="resource">
                    <el-radio-group v-model="form.sex" style="width:80%">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="学历" prop="region">
                    <el-select v-model="form.education" placeholder="请选择活动区域" style="width:80%">
                        <el-option label="高中以下" value="高中以下"></el-option>
                        <el-option label="高中" value="高中"></el-option>
                        <el-option label="大学" value="大学"></el-option>
                        <el-option label="硕士" value="硕士"></el-option>
                        <el-option label="博士" value="博士"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker
                            v-model="form.birthday"
                            type="date"
                            value-format=" yyyy-MM-dd HH:mm"
                            placeholder="选择日期"
                            style="width:80%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  label="电话" prop="name">
                    <el-input v-model="form.phone" autocomplete="off" placeholder="新号码"  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" maxlength="11" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="邮件" prop="name">
                    <el-input v-model="form.mail" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop="type">
                    <el-select v-model="key1" placeholder="期望区域" style="width:25%">
                        <el-option label="北京" value="北京"></el-option>
                        <el-option label="上海" value="上海"></el-option>
                        <el-option label="广州" value="广州"></el-option>
                        <el-option label="深圳" value="深圳"></el-option>
                        <el-option label="杭州" value="杭州"></el-option>
                        <el-option label="宁波" value="宁波"></el-option>
                    </el-select>&nbsp
                    <el-select v-model="key2" placeholder="期望薪资" style="width:25%">
                        <el-option label="2k以下" value="2k以下"></el-option>
                        <el-option label="2k-4k" value="2k-4k"></el-option>
                        <el-option label="4k-6k" value="4k-6k"></el-option>
                        <el-option label="6k-8k" value="6k-8k"></el-option>
                        <el-option label="8k-10k" value="8k-10k"></el-option>
                        <el-option label="10k以上" value="10k以上"></el-option>
                    </el-select>&nbsp
                    <el-select v-model="key3" placeholder="期望岗位" style="width:25%">
                        <el-option label="Java" value="Java"></el-option>
                        <el-option label="Python" value="Python"></el-option>
                        <el-option label="前端" value="前端"></el-option>
                        <el-option label="数据分析" value="数据分析"></el-option>
                        <el-option label="PHP" value="PHP"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogInfoVisible = false">取 消</el-button>
                <el-button type="primary" @click="cInfo">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog   title="修改密码" :visible.sync="dialogPwdVisible" width="30%" center>
            <el-form :model="form">
                <el-form-item  >
                    <el-input type="password" v-model="form.pwd" autocomplete="off" placeholder="请输入密码" maxlength="11"></el-input>
                    <br><br>
                    <el-input type="password" v-model="form.pwd1" autocomplete="off" placeholder="请再次输入密码" maxlength="11"></el-input>
                    <h4 style="color: darkgray">*密码大于6位小于11位</h4>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPwdVisible = false">取 消</el-button>
                <el-button type="primary" @click="cpwd">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog   title="修改头像" :visible.sync="dialogPicVisible" width="13%" center>
            <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8080/upload"
                    list-type="picture-card"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus"></i>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPicVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--个人信息显示卡片-->
        <el-card shadow="hover" style="height:800px;">
            <div slot="header" class="clearfix">
                <h3 class="font" style="margin-top: 20px">个人中心</h3>
                <el-button  @click="dialogPicVisible = true" type="primary">修改头像</el-button>
                <el-button  @click="dialogPwdVisible = true"  type="primary">修改密码</el-button>
                <el-button  @click="dialogInfoVisible = true"  type="primary">修改信息</el-button>
            </div>
            <div>
                <span >用户名</span>
                <div class="font">{{userInfo.name}}</div>
                <el-divider ><i class="el-icon-picture-outline-round"></i></el-divider>
            </div>

            <div >
                <span>生日</span>
                <div class="font">{{userInfo.birthday}}</div>
                <el-divider ><i class="el-icon-date"></i></el-divider>
            </div>
            <div >
                <span>学历</span>
                <div class="font">{{userInfo.education}}</div>
                <el-divider ><i class="el-icon-user"></i></el-divider>
            </div>
            <div >
                <span>当前状态</span>
                <div class="font">{{userInfo.identity}}</div>
                <el-divider ><i class="el-icon-eleme"></i></el-divider>
            </div>
            <div >
                <span>电话</span>
                <div class="font">{{userInfo.phone}}</div>
                <el-divider ><i class="el-icon-mobile-phone"></i></el-divider>
            </div>
            <div>
                <span>邮箱</span>
                <div class="font">{{userInfo.mail}}</div>
                <el-divider ><i class="el-icon-message"></i></el-divider>
            </div>
            <div >
                <span>求职关键字</span>
                <div class="font">
                    {{userInfo.wordKey}}</div>
                <el-divider ><i class="el-icon-key"></i></el-divider>
            </div>
        </el-card>

    </div>
</template>

<script>
    import $axios from "../../api/index"
    export default {
        name: "myInfo",
        inject:['reload'],
        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem('userInfo')),
                dialogInfoVisible: false,
                dialogPwdVisible: false,
                dialogPicVisible:false,
                form: {
                    birthday: '',
                    education: '',
                    id: '',
                    identity: '',
                    wordKey: '',
                    mail: '',
                    name: '',
                    phone: '',
                    sex: '',
                    pwd: '',
                    pwd1:''
                },
                key1:'',
                key2:'',
                key3:'',
                imageUrl: '',
            };
        },

        mounted(){
            this.keyTo()
        },

        methods: {
            //初始化用户信息以及修改的表单
            keyTo() {
                $axios.getUserInfoById(this.userInfo.id).then(res => {
                    localStorage.removeItem('userInfo');
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    this.userInfo= JSON.parse(localStorage.getItem('userInfo'))
                    let k=this.userInfo.wordKey.split("|");
                    this.key1=k[0];
                    this.key2=k[1];
                    this.key3=k[2];
                    this.form.birthday=this.userInfo.birthday;
                    this.form.education=this.userInfo.education;
                    this.form.id=this.userInfo.id;
                    this.form.identity=this.userInfo.identity;
                    this.form.wordKey=this.userInfo.wordKey;
                    this.form.mail=this.userInfo.mail;
                    this.form.name=this.userInfo.name;
                    this.form.phone=this.userInfo.phone;
                    this.form.sex=this.userInfo.sex;
                });
                },

            //修改基本信息
            cInfo() {
                if(this.form.name==='')
                {
                    this.$message.error('姓名不能为空！');
                    return;
                }
                if(this.form.identity==='')
                {
                    this.$message.error('身份不能为空！');
                    return;
                }
                let reg=/^1\d{10}$/;
                if(!(reg.test(this.form.phone)))
                {
                    this.$message.error('请输入正确格式的手机号码！');
                    return;
                }
                let emailReg=/^[\w\._]+\@([\w\._])+$/;
                if(!emailReg.test(this.form.mail)){
                    this.$message.error('请输入正确格式的邮箱！');
                    return;
                }
                this.form.wordKey=this.key1+"|"+this.key2+"|"+this.key3;
                $axios.updateUserInfoById(this.form.id,this.form.phone,this.form.sex,this.form.name,this.form.mail,this.form.wordKey,this.form.identity,this.form.education,this.form.birthday).then(res => {
                    if (res.data==='success') {
                        this.dialogInfoVisible = false;
                        this.$message.success('基本信息修改成功！');
                    } else {
                        this.$message.error('基本信息修改失败！后端错误！');
                        return false;
                    }
                });
                this.reload();
            },

            //修改密码
            cpwd() {
                if(this.form.pwd!=='')
                {
                    let pws=this.form.pwd;
                    if(pws.split('').length<6)
                    {
                        this.$message.error('用户密码长度不得小于六位！');
                        return;
                    }
                    if(pws.split('').length>11)
                    {
                        this.$message.error('用户密码长度不得大于十一位！');
                        return;
                    }
                    if(this.form.pwd1==='')
                    {
                        this.$message.error('请输入确认密码！');
                        return;
                    }
                    if(this.form.pwd!==this.form.pwd1)
                    {
                        this.$message.error('两次输入的新密码不一致！');
                        return;
                    }
                }
                $axios.updatePassword(this.userInfo.id,this.form.pwd1).then(res => {
                    console.log(res.data);
                    if (res.data==='success') {
                        this.dialogPwdVisible = false;
                        this.$message.success('密码修改成功！');
                    } else {
                        this.$message.error('密码修改失败！后端错误！');
                        console.log('error submit!!');
                        return false;
                    }
                })
            },

            //修改头像
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(this.userInfo.id,file.name)
                $axios.updatePicture(this.userInfo.id,file.name.toString()).then(res => {
                    console.log(res.data);
                    if (res.data==='success') {
                        this.dialogPicVisible = false;
                        this.$message.success('头像修改成功！');
                    } else {
                        this.$message.error('头像修改失败！后端错误！');
                        console.log('error submit!!');
                        return false;
                    }
                })
            },

            //判断头像格式
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
        }
    }
</script>

<style>
    .font{
        margin-top: -20px;
        text-align:center;
    }
</style>
