import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import Welcome from './components/Welcome'
import Users from './components/user/Users.vue'
import Rights from './components/power/Rights'
import Roles from './components/power/Roles'
import Cate from './components/goods/Cate.vue'
import Params from './components/goods/Params.vue'
import GoodsList from './components/goods/List.vue'
import Add from './components/goods/Add.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add }]
    }
  ]
})
// 挂载路由导航守卫来控制页面访问权限
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转二来
  // next 是一个函数，表示“放行”
  // next() 为放行； next('/login')为强制跳转
  if (to.path === '/login') return next() // 如果访问的是无权限页面，直接放行
  // 先获取token，根据是否有token决定是否跳转
  const tokenStr = window.sessionStorage.getItem(' token ')
  if (!tokenStr) return next('/login')
  next()
})
export default router
