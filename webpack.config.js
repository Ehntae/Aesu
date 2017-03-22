let clean   = require("clean-webpack-plugin");
let webcopy = require("copy-webpack-plugin");


let plugins = [
    // new clean("./dist/public/**/*"),

    new webcopy([
        {from: "./development/public/resources/", to: "resources"},
        {from: "./development/public/./index.html"},
    ])
]


module.exports = {
    context: __dirname,
    entry: "./development/public/src/main.ts",
    
    output: {
        path: "./dist/public/",        
        filename: "bundle.js"
    },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            }
        ]
    },
    
    resolve: {
        extensions: [".ts", ".js"],
    },
    
    devtool: "inline-source-map",
    plugins: plugins
    
}

