<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">招聘信息分析系统</div>
            <router-link to="/Mlogin" ><el-link type="primary" style="margin-top: 5px;margin-left: 220px ;">短信验证码登录</el-link></router-link>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content" style="margin-top: -20px">
                <el-form-item prop="id">
                    <el-input v-model="param.id" placeholder="请输入账号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()" >登录</el-button>
                </div>
                <div class="login-btn">
                    <router-link to="/register" ><el-button>注册</el-button></router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import $axios from "../../api/index"
    export default {
    data: function() {
        return {
            param: {
                id: '',
                password: '',
            },
            rules: {
                id: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            $axios.getUserInfoById(this.param.id).then(res => {
                console.log(res.data);
                if (res!==1) {
                    if(this.param.password===res.data.password)
                    {
                        this.$message.success("登陆成功");
                        localStorage.setItem('userInfo', JSON.stringify(res.data));
                        $axios.getLocation().then(res1 => {
                            localStorage.setItem('location', JSON.stringify(res1.data));
                        });
                        this.$router.push('/');
                    }else{
                        this.$message.error('密码错误');
                    }

                } else {
                    this.$message.error('请检查账号');
                    console.log('error submit!!');
                    return false;
                }
            })
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
    top: 50%;
    width: 350px;
    margin: -160px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>