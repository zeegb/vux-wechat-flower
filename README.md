#基于vue.js花艺电商webapp [线上访问地址](http://api.flower.wx.wurim.com/wx)

###安装

项目地址：（`git clone`）

```shell
git clone https://github.com/wangze1994/vux-wechat-flower.git
```

通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```

启动服务(http://localhost:3000)

```
npm run dev
```

发布代码
```
npm run build
```

###开发

###目录结构
<pre>
.
├── README.md           
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── libs     		// 各种工具
│   ├── styles         // css文件
│   ├── views          // 各种页面
│   ├── vuex           // vuex状态管理器
│   ├── router.js     	// 路由信息
│   └── main.js        // Webpack 预编译入口
</pre>
