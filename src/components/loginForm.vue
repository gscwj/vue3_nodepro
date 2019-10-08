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
<!--                <el-button size="mini" type="primary" @click="reset_form">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import {validate_login_vertify,validate_login_passwd,validate_login_name} from '../common-utils/rule_api'
    export default {
        name: "loginForm",
        data(){
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
        mounted(){
            console.log("进入到loginForm的mounted");
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
                                if(res.data.hasOwnProperty('msg')){
                                    // this.$alert(`${res.data.msg}`);
                                    let alert_obj = {
                                        title: '警告',
                                        msg: res.data.msg,
                                        style_obj: {
                                            style: 'color: red; font-size: 12px'
                                        },
                                        confirm_btn: {
                                            show: false,
                                            text: '确定'
                                        },
                                        cancel_btn: {
                                            show: false,
                                            text: '取消'
                                        },

                                    };
                                    this.MyAlert2(alert_obj);
                                }
                                if(res.data.hasOwnProperty('success')){
                                    if(res.data.success){
                                        console.log("用户登陆成功：",res.data.res_data);
                                        this.go_login();
                                        this.close_login_form();
                                    }
                                }
                            })
                            .catch(err => {
                                console.log("err =", err);
                            })

                    } else {
                        return false;
                    }
                });

            },
            reset_form(){
                this.$refs['login_form'].resetFields();
            },
            MyAlert2(alert_obj){
                const h = this.$createElement;
                let title = alert_obj.title;
                let msg = alert_obj.msg;
                let confirm = alert_obj.confirm_btn;
                let cancel = alert_obj.cancel_btn;
                let style_obj = alert_obj.style_obj;
                let ret_obj =  this.$msgbox({
                    title: title,
                    message: h('p', null, [
                        h('span', style_obj, msg)
                    ]),
                    closeOnClickModal: false,/*是否点击关闭遮罩*/
                    showConfirmButton: confirm.show,
                    confirmButtonText: confirm.text,
                    showCancelButton: cancel.show,
                    cancelButtonText: cancel.text,
                    beforeClose: (action, instance, done) => {
                        done();
                        /*if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }*/
                    }
                }).then(action => {
                    /*this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });*/
                }).catch(err=>{
                    console.log("err: ",err);
                });
                return ret_obj;

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