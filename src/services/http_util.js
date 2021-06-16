import axios from 'axios'
import storage from "sweet-storage";
import {message} from 'antd'
import {isLogin} from "./login";
import {HashRouter} from "react-router-dom";
import {removeUsername} from "../reducer/UsernameReducer";
import {removeToken} from "../reducer/TokenReducer";

const router = new HashRouter()

const $http = axios.create({
    baseURL: '',
    timeout: 15000
});

// 添加请求拦截器
$http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (isLogin()) {
        config.headers['Authorization'] = storage.get('Authorization')
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$http.interceptors.response.use(
    response => {
        console.log('response', response)
        if (response.data['code'] === 401) {
            // 未登录去重定向登录页面
            message.error('401 not login')
            // history.push('/CarManagement');
            console.log('router', router)
        }
        if (response.data === '<403 FORBIDDEN Forbidden,[]>') {
            removeToken()
            removeUsername()
            message.error('403 Have no permission!')
            console.log('router', router)
            router.history.push('/login')
        }
        return response
    }
    // 对响应数据做点什么
    , error => {
        // 对响应错误做点什么
        if (error === undefined || error.code === 'ECONNABORTED') {
            message.warning('服务请求超时');
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default $http
