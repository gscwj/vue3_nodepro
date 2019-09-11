<template>
    <div>
        <h1>{{default_title}}</h1>
    </div>
</template>

<script>
    export default {
        name: "cat_test",
        data(){
            return{
                title: 'bosi',
            }
        },
        computed:{
            default_title:function () {
                return `cat_test_${this.title}_shop1`
            }
        }
    }
</script>

<style scoped>

</style>