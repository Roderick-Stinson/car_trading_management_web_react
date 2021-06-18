const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/api', {
            // target: 'http://localhost:4567',
            // target: 'http://192.168.1.41:4567',
            target: 'http://124.70.3.195:4567',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    )
}