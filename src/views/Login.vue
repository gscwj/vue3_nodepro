<template>
    <el-row :gutter="0" class="login_kuang">
        <el-col :span="12" :offset="12">
            <div class="login_title">
<!--                <b id="title">奇码汇 - 拖拉拽编写EA平台</b>-->
            </div>
        </el-col>
        <el-col :span="8" :offset="14">
            <div class="grid-content bg-purple">
                <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="login_user">
                    <el-form-item label="用户名">
                        <el-input v-model="login_user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="login_user.passwd"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input v-model="login_user.vertiry_code"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right">
                        <el-button size="mini" type="primary" @click="login_form">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                labelPosition: 'left',
                login_user: {
                    name: '',
                    passwd: '',
                    vertiry_code: ''
                }
            }
        },
        methods: {
            login_form() {
                // this.$router.replace({
                //     path: '/home_door'
                // })
                this.$axios.post('/api/users/logind',{
                    userName: this.login_user.name.trim(),
                    passWord: this.login_user.passwd.trim(),
                    city: this.login_user.vertiry_code.trim()
                })
                .then(res => {
                    console.log("res: ",res);
                    if(res.data.hasOwnProperty('msg')){
                        // this.$alert(`${res.data.msg}`);
                    }
                    if(res.data.hasOwnProperty('success')){
                        if(res.data.success){
                            console.log("用户登陆成功：",res.data.res_data);
                        }
                    }
                })
                .catch(err => {
                    console.log("err =", err);
                })
            }
        }
    }
</script>

<style scoped>
    .login_kuang {
        box-sizing: border-box;
        height: 100% !important;
        background-image: url("../assets/imgs/loginbg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .grid-content {
        padding: 5em 2em 2em 0;
        border-radius: 4px;
        min-height: 15em;
        height: 100%;
    }
    .login_title{
        display: flex;
        margin: 2em 2em 0 0;
        min-height: 5em;
        background-color: rgba(179,234,104,0.2);
    }
    .login_title>b#title{
        color: white;
        font-size: 2rem;
        font-family: "微软雅黑 Light" ,serif;
        margin: auto;
    }
</style>
<style>
    .el-form-item__label {
        color: white;
    }
</style>