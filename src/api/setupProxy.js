const {createProxyMiddleware} = require('http-proxy-middleware');
const Dev_URL=process.env.REACT_APP_API_URL
const Auth_URL=process.env.REACT_APP_AUTH_URL
module.exports = function (app){
    app.use("/signin",createProxyMiddleware({target:`${Auth_URL}`, changeOrigin:true}));
    app.use("/api",createProxyMiddleware({target:`${Dev_URL}`, changeOrigin:true}))
}