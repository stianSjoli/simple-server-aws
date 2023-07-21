const path = require('path');

module.exports = {
    externals: {
        'react': 'React',
        'react-dom/client': 'ReactDOM',
        'd3-shape': 'd3-shape'
    },
    mode: 'production',
    entry: './src/index.jsx',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [],
    devServer: {
        compress: true,
        port: 9000,
        devMiddleware: {
            publicPath: '/',
        },
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true
    },
    performance: {
        hints: 'warning'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
