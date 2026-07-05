import Vue from "vue";
import Router from "vue-router";
import LoginVue from './components/Login.vue'
import Home from "./components/Home.vue";

Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path:'/',
            redirect: '/login'

        },
        {
            path: '/login',
            component: LoginVue       
        },
        {
            path: '/home',
            component: Home
        }
]
})

//路由守卫
router.beforeEach((to, from, next) => {
    if(to.path === '/login') return next()

    const tokenStr = window.sessionStorage.getItem('token')

    //TODO: 后端需要做一下token鉴权

    if(!tokenStr) return next('/login')

    next()

})

export default router