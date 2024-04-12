const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        'admin' : path.resolve(__dirname, './scripts/admin.js'),
        'user' : path.resolve(__dirname, './scripts/user.js'),
        'login' : path.resolve(__dirname, './scripts/login.js'),
        'register' : path.resolve(__dirname, './scripts/register.js')
    },
  
    mode: 'development',
  
    output: {
        path: path.resolve(__dirname, '../server/public'),
        filename: 'scripts/[name]-bundle.js'
    },
  
    plugins: [
        
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'html/admin.html'),
            filename: path.resolve(__dirname, '../server/public', 'admin.html'),
            chunks: ['admin'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'html/user.html'),
            filename: path.resolve(__dirname, '../server/public', 'user.html'),
            chunks: ['user'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'html/login.html'),
            filename: path.resolve(__dirname, '../server/public', 'login.html'),
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'html/register.html'),
            filename: path.resolve(__dirname, '../server/public', 'register.html'),
            chunks: ['register'],
        }),
        new CopyPlugin({
            patterns: [
            { from: path.resolve(__dirname, 'style'), to: path.resolve(__dirname, '../server/public/style') },
            ]
        })
    ]



  };