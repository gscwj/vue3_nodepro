export default {
    state:{
        default_info: 'example',
    },
    getters:{
        default_info_new(state){
            return state.default_info;
        }
    },
    mutations:{
        set_default_info(state, new_info){
            state.default_info = new_info;
        }
    },
    actions:{
        /*switch_dialog2(context){/!*这里的context和我们使用的$store拥有相同的对象和方法*!/
            context.commit('switch_dialog2');
            console.log("这里是通过actions异步执行的方法");
        }*/
    }
}