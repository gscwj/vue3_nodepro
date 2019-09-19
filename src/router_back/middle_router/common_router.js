import BaseInterceptor from './base_router'

class CommonInterceptor extends BaseInterceptor{
    constructor(router){
        super(router);
    }
    beforeEach(to, from, next){
        /*
        * 可以添加任何的拦截路由处理
        * */
        next()
    }
}

export default {
    install(router){
        new CommonInterceptor(router);
    }
}