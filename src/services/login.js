import $http from "./http_util";

export const LoginToServer = (username, password) => {
    return $http.post('/api/login', null, {
        params: {
            username: username,
            password: password
        }
    })
}