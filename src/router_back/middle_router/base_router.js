/*
* 路由对象基础类Base_router
* */
class Interceptor {
    constructor(router){
        this.router = router;
        router.beforeEach((to, from, next)=>{
            this.beforeEach(to, from ,next);
        });
        router.afterEach((to,from)=>{
            this.afterEach(to, from);
        })
    }
    beforeEach(to, from, next){
        next();
    }
    beforeRouteUpdate(to, from, next){
        /*
        * 在当前路由改变，但是该组件被复用时调用
        * 举例说明：对于一个带有动态参数的路径/foo/:id，在/foo/1和/foo/2之间跳转的时候，
        * 由于会渲染同样的Foo组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用，
        * 可以访问组件实例‘this’
        * */
        next();
    }
    beforeRouteLeave(to, from, next){
        /*
        * 导航离开该组件的对应路由时调用
        * 可以访问组件实例‘this’
        * */
        next();
    }
    beforeResolve(to, from, next){
        // next();
    }
    afterEach(to, from){

    }
}
export default Interceptor