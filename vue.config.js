'use strict'
const path = require('path')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const sassLoader = require.resolve('sass-loader')

function resolve(dir) {
  return path.join(__dirname, dir)
}

process.env.VUE_APP_ENV = 'uat'
let target = 'https://sso.tongxincaijin.cn'
// let target = 'http://192.168.110.34:9080'
let port = ''
let https = true
let analysis = false
let params
if (process.env.npm_config_argv) {
  params = JSON.parse(process.env.npm_config_argv || '{}').cooked || []
} else {
  params = Object.keys(process.env).filter(name => /^npm_config_/.test(name))
}
params.map((x) => {
  if (/[_-]+https$/i.test(x)) {
    // 是否开启https，定位使用
    process.env.https = !!x
  } else if (/[_-]+no-user/i.test(x)) {
    process.env.VUE_APP_NO_USER = '1'
  } else if (/^-+f/i.test(x)) {
    analysis = true
  } else if (/[_-]+server\d+$/i.test(x)) {
    https = false
    const ip = x.match(/server(.*)/)[1]
    console.log(ip)
    if (ip) {
      target = `192.168.110.${ip}`
      port = port || 8082
    }
  } else if (/[_-]+port/i.test(x)) {
    const num = x.match(/port(.*)/)[1]
    port = num || port
  } else if (/[_-]+prod/i.test(x)) {
    console.log('uat')
    process.env.VUE_APP_ENV = 'prod'
  } else if (/[_-]+f$/i.test(x)) {
    analysis = true
  }
})
if (port) {
  target = `http${https && 's' || ''}://${target}:${port}`
}

console.log('OSS环境', process.env.VUE_APP_ENV)
console.log('NODE环境', process.env.NODE_ENV)
console.log('代理地址', target)
const CompressionPlugin = require('compression-webpack-plugin')
const name = '统一权限认证系统' // 网页标题
let plugins = [new HotModuleReplacementPlugin()],
  optimization = {}
if (process.env.NODE_ENV === 'production') {
  optimization = {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果
    minimize: true
  }
  plugins = [
    // 打包结果
    new CompressionWebpackPlugin({
      minRatio: 0.8,
      filename: '[path].gz',
      test: /\.(css|js|html|ttf|map|svg)/i,
      threshold: 8092
    })
  ]
  if (analysis) {
    plugins.push(new BundleAnalyzerPlugin({ port: 9999 }))
  }
}
// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: process.env.port || process.env.npm_config_port || 8082, // 端口,
    open: true,
    https,
    proxy: {
      // [process.env.VUE_APP_BASE_API + '/sso']: {
      //   target: `https://sso.tongxincaijin.cn`,
      //   // 绪豪后台
      //   // target: 'http://192.168.110.69:8080',
      //   // 郭老师后台
      //   // target: 'http://192.168.110.167:8081',
      //   // target: 'http://192.168.110.226:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API + '/sso']: process.env.VUE_APP_BASE_API
      //   }
      // },
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `https://bidapi.tongxincaijin.cn`,
      //   // 绪豪后台
      //   // target: 'http://192.168.110.69:8080',
      //   // 郭老师后台
      //   // target: 'http://192.168.110.167:8081',
      //   // target: 'http://192.168.110.226:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: ''
      //   }
      // }
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target,
        //         target: `https://uatadmin.tongxincaijin.cn`,
        // target: `https://luatapi.tongxincaijin.cn/`,
        // target: 'http://192.168.110.74:8080',
        // target: 'http://192.168.110.201:8080',
        // changeOrigin: true,
        pathRewrite: {
          // ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: 'expanded' }
      }
    }
  },
  configureWebpack: (config) => {
    config.module.rules
      .filter((rule) => {
        return rule.test.toString().indexOf('scss') !== -1
      })
      .forEach((rule) => {
        rule.oneOf.forEach((oneOfRule) => {
          const sassLoaderIndex = oneOfRule.use.findIndex((item) => item.loader === sassLoader)
          oneOfRule.use.splice(sassLoaderIndex, 0, {
            loader: require.resolve('css-unicode-loader')
          })
        })
      })
    return {
      mode: process.env.NODE_ENV,
      devtool: (process.env.NODE_ENV === 'production' && 'cheap-module-source-map') || 'cheap-source-map',
      name,
      optimization,
      externals: {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        echarts: 'echarts'
      },
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      plugins,
      output: {
        // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
        chunkFilename: `static/js/[name][hash:8].js`,
        filename: `static/js/[name][hash:8].js`
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              // elementUI: {
              //   name: 'chunk-elementUI', // split elementUI into a single package
              //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              // },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 1, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single'),
            {
              from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
              to: './' //到根目录下
            }
        }
      )
  }
}
