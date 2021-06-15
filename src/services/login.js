import $http from "./http_util";
import storage from "sweet-storage";

export const LoginToServer = (username, password) => {
    return $http.post('/api/login', null, {
        params: {
            username: username,
            password: password
        }
    })
}

export const isLogin = () => {
    return !!storage.get('Authorization');
}

export const getUsername = () => {
    return storage.get('Username')
}