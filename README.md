React Native Starter Kit [![Build Status](https://travis-ci.org/reactnativecn/react-native-starter-kit.svg)](https://travis-ci.org/reactnativecn/react-native-starter-kit) 
===========

## 使用说明

点击`Download ZIP`下载压缩包,并在自己工程下解压(建议解压到新git repo的根目录)。

运行`npm install` 安装所有依赖

## V3 更新说明

1. 最重要的: 使用了mobx,取代之前的redux或emitter + subscribe方案。subscribe仍在少数地方使用。
2. 增加了在route或component中指定sceneConfig的用法,这样你就不必每次都在route里指定sceneConfig。
3. form不再使用单独的组件,改为mobx实现。
4. 将一些整块功能挪到了单独的包中,如react-subscribe, mobx-form-validation,以便于bug修复和更新。
5. npm test现在用于单元测试,而npm run eslint则用于代码质量检查。

## 语法规范说明

语法规范参考[airbnb的JavaScript代码规范](https://github.com/airbnb/javascript),适应react-native做了一些调整。

运行npm test可以进行代码规范检查。

## 逻辑模块

逻辑模块基于mobx开发,应按功能进行划分。

全局性的状态(如登录状态等)应作为单例使用,其它的则应该尽可能在页面内部保存和使用。不要将observable对象保存在组件的state中,应作为成员属性直接使用。

逻辑模块不应过度OO, 只有数据(和对数据的操作)应作为class的形式体现。

表单对应的逻辑类,可以将submit写成箭头函数,这样许多时候就不用在组件里再定义一个onSubmit了。

## 路由组织

采用`react-router`来进行路由组织

## 代码组织

除了逻辑模块和视图模块的拆分外,建议代码的组织一律遵循"就近"原则。图片等资源应当放在组件同级目录下的assets文件夹中,子组件也建议就近放置。

可被复用的组件则应放置在公共的components文件夹中。
