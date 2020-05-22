// const {
//     override,
//     fixBabelImports,
//     addLessLoader,
//     addDecoratorsLegacy,
// } = require('customize-cra')
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: { '@primary-color': '#1DA57A' },
          javascriptEnabled: true,
        },
      },
    },
    
  ],
};
// const modifyVars=require('./theme')
// module.exports=override(
//     //babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理）
//     fixBabelImports('antd',{
//         libraryDirectory:'es',
//         style:true
//     }),
//     addLessLoader({
//         lessOptions:{
//             javascriptEnabled:true,
//             modifyVars
//         }
//     }),
//     addDecoratorsLegacy()
// )