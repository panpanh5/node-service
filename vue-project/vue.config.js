module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://192.168.0.185:7777",
                // target:'localhost:7777',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};
