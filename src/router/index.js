/*
 * @Author: feifan
 * @Date: 2020-11-24 13:54:41
 * @LastEditors: feifan
 * @LastEditTime: 2020-12-03 11:03:51
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import ViewUI from 'view-design';
import {  getToken,  setSession,getSession } from '@/libs/util'
const LOGIN_PAGE_NAME = 'index'
Vue.use(Router)
const router = new Router({
    routes,
    mode: 'hash'
    // history
})

router.beforeEach((to, access, next) => {
    
  
    if (to.meta.title) { //判断是否有标题
       
    }
    setSession("router_f", to.path.split("/")[1])
    const token = getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME&& to.name!="login_forget") {
        // 未登录且要跳转的页面不是登录页
    
        // next({
        //     name: LOGIN_PAGE_NAME // 跳转到登录页
        // })
        next()
        // console.log(token)
    } else if (!token && to.name === LOGIN_PAGE_NAME&& to.name!="login_forget") {
        // 未登陆且要跳转的页面是登录页
      
        next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页
        next({
            name: 'index' // 
        })
    } else {
        if (to.path == '/') {
            next({
                name: 'index' // 
            })
        } else {
            next()

        }
    }
  
})

router.afterEach(to => {
    ViewUI.LoadingBar.finish()
    window.scrollTo(0, 0)
})
export default router