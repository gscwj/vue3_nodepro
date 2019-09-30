<template>
    <div>
        <el-form
                :label-position="labelPosition"
                ref="login_form"
                label-width="80px"
                :rules="login_rules"
                :model="loginForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm['name']"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passwd">
                <el-input type="password" v-model="loginForm['passwd']"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="vertify_str">
                <el-input v-model="loginForm['vertify_str']"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button size="mini" type="primary" @click="login_event('login_form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        name: "loginForm",
        data(){
            var validate_login_name = (rule, value, callback) => {
                let value_tmp = value.trim();
                let len_value = value_tmp.length;
                if (value_tmp === '') {
                    callback(new Error('请输入用户名'));
                }
                else if(len_value>40){
                    callback(new Error('长度限制: 1-40个字符'));
                }
                else {
                    callback();
                }
            };
            var validate_login_passwd = (rule, value, callback) => {
                let value_tmp = value;
                let len_value = value_tmp.length;
                if (value_tmp === '') {
                    callback(new Error('请输入密码'));
                }
                else if(len_value>18){
                    callback(new Error('长度限制: 最大18个字符'));
                }
                else {
                    callback();
                }
            };
            var validate_login_vertify = (rule, value, callback) => {
                let value_tmp = value;
                let len_value = value_tmp.length;
                if (value_tmp === '') {
                    callback(new Error('请输入验证码'));
                }
                else if(len_value!==4){
                    callback(new Error('长度限制: 仅能4个字符'));
                }
                else {
                    callback();
                }
            };
            return {
                labelPosition: 'left',
                loginForm: {
                    name: '',
                    passwd: '',
                    vertify_str: '',
                },
                login_rules:{
                    name: [
                        {required: true, validator: validate_login_name, trigger: ['blur','change']}
                    ],
                    passwd: [
                        {required: true, validator: validate_login_passwd, trigger: ['blur','change']}
                    ],
                    vertify_str: [
                        {required: true, validator: validate_login_vertify, trigger: ['blur','change']}
                    ],
                }
            }
        },
        methods:{
            login_event(form_ref) {
                this.$refs[form_ref].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/users/logind',{
                            userName: this.loginForm.name,
                            passWord: this.loginForm.passwd,
                            city: this.loginForm.vertify_str
                        })
                            .then(res => {
                                console.log("res =", res);
                                if(res['data']['success']){
                                    this.go_login();
                                }
                                this.$alert(`${res.data.msg}`);
                                this.close_login_form();
                            })
                            .catch(err => {
                                console.log("err =", err);
                            })

                    } else {
                        return false;
                    }
                });

            },
            ...mapMutations({
                go_login: 'do_login',
                close_login_form: 'close_login_form',
            })
        }
    }
</script>

<style scoped>

</style>