module.exports = {
    runtimeCompiler: true,
    devServer: {
        disableHostCheck: true
    },
    // keep class names doesn't work, so remove for now
    configureWebpack: {
        optimization: {
            minimize: false
        }
    }
}