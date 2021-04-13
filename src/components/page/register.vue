<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">招聘信息分析系统</div>
            <br>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
                <el-form-item label="账号" prop="id">
                    <el-input v-model="ruleForm.id" style="width:80%" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" style="width:80%" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="pwd">
                    <el-input v-model="ruleForm.pwd1" style="width:80%" placeholder="请再次输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" style="width:80%" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="identity">
                    <el-select v-model="ruleForm.identity" placeholder="请选择身份" style="width:80%">
                        <el-option label="在校生" value="在校生"></el-option>
                        <el-option label="应届生" value="应届生"></el-option>
                        <el-option label="海归" value="海归"></el-option>
                        <el-option label="在职人员" value="在职人员"></el-option>
                        <el-option label="离职人员" value="离职人员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex" style="width:80%">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="学历" prop="education">
                    <el-select v-model="ruleForm.education" placeholder="请选择学历" style="width:80%">
                        <el-option label="高中以下" value="高中以下"></el-option>
                        <el-option label="高中" value="高中"></el-option>
                        <el-option label="大学" value="大学"></el-option>
                        <el-option label="硕士" value="硕士"></el-option>
                        <el-option label="博士" value="博士"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker
                            v-model="ruleForm.birthday"
                            type="date"
                            value-format=" yyyy-MM-dd HH:mm"
                            placeholder="请选择生日"
                            style="width:80%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  label="电话" prop="phone">
                    <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入电话"  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" maxlength="11" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail" >
                    <el-input v-model="ruleForm.mail" style="width:80%" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-select v-model="key1" placeholder="区域" style="width:25%">
                        <el-option label="北京" value="北京"></el-option>
                        <el-option label="上海" value="上海"></el-option>
                        <el-option label="广州" value="广州"></el-option>
                        <el-option label="深圳" value="深圳"></el-option>
                        <el-option label="杭州" value="杭州"></el-option>
                        <el-option label="宁波" value="宁波"></el-option>
                    </el-select>&nbsp
                    <el-select v-model="key2" placeholder="薪资" style="width:25%">
                        <el-option label="2k以下" value="2k以下"></el-option>
                        <el-option label="2k-4k" value="2k-4k"></el-option>
                        <el-option label="4k-6k" value="4k-6k"></el-option>
                        <el-option label="6k-8k" value="6k-8k"></el-option>
                        <el-option label="8k-10k" value="8k-10k"></el-option>
                        <el-option label="10k以上" value="10k以上"></el-option>
                    </el-select>&nbsp
                    <el-select v-model="key3" placeholder="岗位" style="width:25%">
                        <el-option label="Java" value="Java"></el-option>
                        <el-option label="Python" value="Python"></el-option>
                        <el-option label="前端" value="前端"></el-option>
                        <el-option label="数据分析" value="数据分析"></el-option>
                        <el-option label="PHP" value="PHP"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="login-btn">
                <el-button  type="primary" @click="enroll">注册</el-button>
                <router-link to="/login" ><el-button>取消</el-button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import $axios from "../../api/index"
    export default {
        data: function() {
            return {
                ruleForm: {
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
                rules: {
                    id: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 0, max: 11, message: '最大11个字符', trigger: 'blur' }
                    ],
                    identity: [
                        { required: true, message: '请输入身份', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    education: [
                        { required: true, message: '请选择学历', trigger: 'blur' },
                    ],
                    birthday: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                    ],
                    mail: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            enroll() {
                if(this.ruleForm.id==='')
                {
                    this.$message.error('账号不能为空！');
                    return;
                }
                if(this.ruleForm.pwd!=='')
                {
                    let pws=this.ruleForm.pwd;
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
                    if(this.ruleForm.pwd1==='')
                    {
                        this.$message.error('请输入确认密码！');
                        return;
                    }
                    if(this.ruleForm.pwd!==this.ruleForm.pwd1)
                    {
                        this.$message.error('两次输入的新密码不一致！');
                        return;
                    }
                }

                if(this.ruleForm.name==='')
                {
                    this.$message.error('姓名不能为空！');
                    return;
                }
                if(this.ruleForm.identity==='')
                {
                    this.$message.error('身份不能为空！');
                    return;
                }
                if(this.ruleForm.phone==='')
                {
                    this.$message.error('手机号不能为空！');
                    return;
                }if(this.ruleForm.mail==='')
                {
                    this.$message.error('邮箱号不能为空！');
                    return;
                }
                let reg=/^1\d{10}$/;
                if(!(reg.test(this.ruleForm.phone)))
                {
                    this.$message.error('请输入正确格式的手机号码！');
                    return;
                }
                let emailReg=/^[\w\._]+\@([\w\._])+$/;
                if(!emailReg.test(this.ruleForm.mail)){
                    this.$message.error('请输入正确格式的邮箱！');
                    return;
                }
                this.ruleForm.wordKey=this.key1+"|"+this.key2+"|"+this.key3;
                console.log(this.ruleForm.birthday.toString());

                    $axios.addUserInfo(this.ruleForm.id,this.ruleForm.pwd,this.ruleForm.phone,this.ruleForm.sex,this.ruleForm.name,
                        this.ruleForm.mail,this.ruleForm.wordKey,this.ruleForm.identity,this.ruleForm.education,this.ruleForm.birthday.toString()).then(res => {
                    console.log(res.data);

                    if (res.data==='success') {
                        this.$message.success('注册成功！');
                        this.$router.push('/login');
                    } else {
                        this.$message.error('账号已存在！');
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: 	#fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 20%;
        width: 450px;
        margin: -160px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .login-btn {
        text-align: center;
        width: 80%;
        margin-left: 45px;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
</style>