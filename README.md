React Native Starter Kit [![Build Status](https://travis-ci.org/reactnativecn/react-native-starter-kit.svg)](https://travis-ci.org/reactnativecn/react-native-starter-kit) 
===========

## 使用说明

点击`Download ZIP`下载压缩包，并在自己工程下解压（建议解压到新git repo的根目录）。

运行`npm install` 安装所有依赖。

_可能需要手动删除以下文件_：  

`node_modules/redux-actions/.babelrc`  
`node_modules/flux-standard-action/.babelrc`  
`node_modules/reduce-reducers/.babelrc`
 
## 语法规范说明

语法规范参考[airbnb的JavaScript代码规范](https://github.com/airbnb/javascript)，除了不再禁用console.log以外。

运行npm test可以进行代码规范检查。

## 代码结构说明

#### /index.ios.js & /index.android.js

仅作为入口，不要在里面编写任何代码

#### /src

存放所有的JavaScript源代码

#### /src/app.js

公共入口文件，在这里提供React-redux的Provider和基础的Navigator

#### /src/components

存放本项目中用到的一些组件封装或主题，例如统一的主题化组件、NavigationBar等

#### /src/pages

存放“页面”级的组件。一个“页面”定义为将会直接被导航器加载的组件。

#### /src/redux/store.js

在这里创建store并引入需要的中间件。默认引入redux-thunk。

#### /src/redux/reducer.js

reducer主函数，在这里从ducks模块引入对应的reducer并进行combine

#### /src/redux/modules/

此文件夹下放置以ducks标准（参见后文）编写的业务模块。

## redux模块(ducks)结构说明

Ducks来源：[Ducks Modular Redux](https://github.com/erikras/ducks-modular-redux)

我们加入了redux-actions和redux-thunk的使用，参考[我们的样例](src/redux/modules/session.js)。

规则如下：

1. *必须*要把Action Type常量定义为'app/子模块名/动作名'，常量名全大写并用下划线分隔。
2. *必须*要定义一个初始状态。
3. *必须*要使用handleActions处理不同的动作，将返回值命名为reducer并用export default导出。
4. *必须*为要使用的Action Type使用createAction创建动作生成器（createAction的返回值为一个函数）并用export导出。
这类动作生成器仅有一个参数(payload)。
5. *可以*以返回 `async(dispatch,getState) => {}` 形式函数的方式创建异步的动作生成器。这类动作生成器可以有多个参数。
6. *可以*导出Action Type本身。
7. *可以*从其它模块import得到Action Type并用于handleActions，但不应直接用于其它地方。
8. *可以*从其它模块import得到同步的actionCreator并在异步动作中使用。但不能对异步actionCreator这样做。

