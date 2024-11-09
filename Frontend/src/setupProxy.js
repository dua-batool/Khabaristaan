const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Backend server
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Remove `/api` prefix when forwarding
    })
  );
};
