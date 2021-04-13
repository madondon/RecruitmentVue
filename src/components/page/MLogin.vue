<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">招聘信息分析系统</div>
            <router-link to="/login" ><el-link type="primary" style="margin-top: 5px;margin-left: 235px ;" >账号密码登录</el-link></router-link>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content" style="margin-top: -20px">
                <el-form-item prop="param">
                    <el-input v-model="param.num" placeholder="请输入手机号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="param">

                    <div style="display: inline-block;width: 195px" class=" el-input--medium">
                        <el-input v-model="param.code" placeholder="请输入验证码">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </div>
                    <el-button class="button" :class="{disabled: !this.canClick}" @click="sendMessage">{{content}}</el-button>
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
            content: '发送验证码',
            totalTime: 9,
            canClick: true, //添加canClick
            code:'123123123123',
            param: {
                num: '',
                code: '',
            },
            rules: {
                num: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        sendMessage(){
            if(this.param.num!=="")
            {
            $axios.getMessage(this.param.num).then(res => {
                if (this.param.num !== "" || this) {
                    if (res.data !== 'fail') {
                        this.$message.success("发送成功，注意查收信息");
                        this.code = res.data.toString();
                        console.log(this.code);

                    } else {
                        this.$message.error('该号码不存在，请检查号码');
                        return false;
                    }
                }
            });
            }
                else this.$message.error('号码不能为空！');


            if (!this.canClick) return  //改动的是这两行代码
            this.canClick = false
            this.content = this.totalTime + ' 秒后重发'
            let clock = window.setInterval(() => {
                this.totalTime--
                this.content = this.totalTime + ' 秒后重发';
                if (this.totalTime < 0) {
                    window.clearInterval(clock)
                    this.content = '重发验证码'
                    this.totalTime = 10
                    this.canClick = true  //这里重新开启
                }
            },1000)

        },
        submitForm() {
            if(this.param.num!=="") {
                $axios.getUserByNumber(this.param.num).then(res => {
                    console.log(this.code);
                    console.log(this.param.code);
                    if (res.data !== "") {
                        if (this.param.code === this.code) {
                            this.$message.success("登陆成功");
                            localStorage.setItem('userInfo', JSON.stringify(res.data));
                            $axios.getLocation().then(res1 => {
                                localStorage.setItem('location', JSON.stringify(res1.data));
                            });
                            this.$router.push('/');
                        } else {
                            this.$message.error('验证码错误');
                        }

                    } else {
                        this.$message.error('请检查手机号');
                        return false;
                    }
                })
            }
            else this.$message.error('号码不能为空！');
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
.disabled{
    background-color: #ddd;
    border-color: #ddd;
    color:#57a3f3;
    cursor: not-allowed;
}
</style>