/*
 * @Author: feifan
 * @Date: 2020-11-26 11:18:03
 * @LastEditors: feifan
 * @LastEditTime: 2020-12-03 15:12:31
 */
import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
const {
    title,
    cookieExpires,
    useI18n
} = config
export const TOKEN_KEY = 'Authorization'

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: cookieExpires || 1
    })
}
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}
// 
export const localSave = (key, value) => {
    localStorage.setItem(key, value)
}

export const localRead = (key) => {
    return localStorage.getItem(key) || false
}

export const setSession = (key, token) => {
    Cookies.set(key, token, {
        expires: cookieExpires || 1
    })
}
export const getSession = (val) => {
    const s = Cookies.get(val)
    if (s) return s
    else return false
}
/*
函数柯里化
*/


export const add = function () {
    let args = Array.prototype.slice.call(arguments);
    let inner = function () {
        args.push(...arguments)
        return inner
    }
    inner.toString = function () {
        return args.reduce(function (prev, cur) {
            return prev + cur;
        }, 0)
    }

    return inner
}
/*
    函数柯里化方式 判断addEventListener,attachEvent
*/
export const whichEvent = (function () {
    if (window.addEventListener) {
        return function (element, type, listener, useCapture) {
            element.addEventListener(type, function (ele) {
                listener.call(element, ele);
            }, useCapture);
        }
    } else if (window.attachEvent) {
        return function (element, type, handler) {
            element.attachEvent("on" + type, function (ele) {
                handler.call(element, ele);
            });
        }
    }
})()
// 获取当前时间
export const getTime = () => {
    let cu_time = ''
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf =
        new Date().getMinutes() < 10 ?
        "0" + new Date().getMinutes() :
        new Date().getMinutes();
    let ss =
        new Date().getSeconds() < 10 ?
        "0" + new Date().getSeconds() :
        new Date().getSeconds();
    cu_time = yy + "年" + mm + "月" + dd + "日" + hh + ":" + mf + ":" + ss;
    return cu_time
}
/* 
防抖（debounce）
 */

export const debounce = (func, delay, immediate)=>{
    let timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(timer) clearTimeout(timer);
        if(immediate){
            var doNow = !timer;
            timer = setTimeout(function(){
                timer = null;
            },delay);
            if(doNow){
                func.apply(context,args);
            }
        }else{
            timer = setTimeout(function(){
                func.apply(context,args);
            },delay);
        }
    }
}

/* 
    节流
*/

export const  throttle = (func, delay)=>{
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                func.apply(context, args);
                timer = null;
            },delay);
        }
    }

}

