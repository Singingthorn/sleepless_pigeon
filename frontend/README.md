### React + typescript + webpack4

#### Start
```
npm install 
// 终端1
npm run watch   // 启动webpack编译文件资源

// 终端2
npm start  // 启动服务端
```

#### 项目结构
- frontend 
  - config    // webpack 配置文件夹
    - webpack.base.js  //
    - webpack.dev.js  //
    - webpack.pro.js  //
  - server    // 服务端代码
  - src       // 前端代码
    - components  // 展示型组件文件夹
    - contains    // 容器型文件夹
    - ui          // 公共组件
    - router.tsx   // 路由文件
    - index.html   // html 模版
    - index.tsx    // 启动文件
  - static    // webpack 打包后资源输出目录
    - js      // js打包文件夹
    - images  // 图片
    - index.html // 启动html文件


#### 项目目标
- 前端工程化
  - [√]webpack4 + typescript + eslint
  - [×]加入antd

- 功能
