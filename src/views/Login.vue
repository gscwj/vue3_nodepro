<template>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script>
    import loginForm from '../components/loginForm'
    export default {
        name: "Login",
        components: {
            loginForm
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36em;
    }
</style>