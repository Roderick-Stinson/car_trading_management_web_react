import axios from 'axios'
import storage from "sweet-storage";
import {message} from 'antd'
import {history} from "../utils/history";
import {isLogin} from "./login";

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
        const status = response.data.code
        if (status === 401) {
            // 未登录去重定向登录页面
            console.log('401 not login')
            // history.push('/CarManagement');
            console.log(history)
        }
        if (status === 403) {
            console.log('403 Have no permission!')
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
