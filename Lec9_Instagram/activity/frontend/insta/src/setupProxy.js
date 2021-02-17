const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://instagram-pep.herokuapp.com/',
      changeOrigin: true,
    })
  );
};