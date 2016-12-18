React Native Starter Kit [![Build Status](https://travis-ci.org/reactnativecn/react-native-starter-kit.svg)](https://travis-ci.org/reactnativecn/react-native-starter-kit) 
===========

## 使用说明

点击`Download ZIP`下载压缩包,并在自己工程下解压(建议解压到新git repo的根目录)。

运行`npm install` 安装所有依赖

## V3 更新说明

1. 最重要的: 使用了[mobx](https://mobxjs.github.io/mobx/),取代之前的redux或emitter + subscribe方案。subscribe仍在少数地方使用。
2. 增加了在route或component中指定sceneConfig的用法,这样你就不必每次都在route里指定sceneConfig。
3. form不再使用单独的组件,改为mobx实现。
4. 将一些整块功能挪到了单独的包中,如react-subscribe, mobx-form-validation,以便于bug修复和更新。
5. npm test现在用于单元测试,而npm run eslint则用于代码质量检查。

## 代码规范说明

语法规范参考[airbnb的JavaScript代码规范](https://github.com/airbnb/javascript),适应react-native做了一些调整。

运行npm run eslint可以进行代码规范检查。

## 逻辑模块

* 逻辑模块基于mobx开发,应按功能进行划分。

* 全局性的状态(如登录状态等)应作为单例使用,其它的则应该尽可能在页面或者适当的生命周期内部保存和使用。

* 不要将observable对象保存在组件的state中,应作为成员属性直接使用。

* 逻辑模块不应过度面向对象, 只有数据(和对数据的操作)应作为class的形式体现。

## 页面

* 在pages下放置页面组件. 如果页面数量较多,可以在pages下组织子文件夹,参考`页面子路由`

* 每个页面使用routerDecorator来定义自己的path(通常不应/开头)

* 在src/pages/index.js里import并加入对应的组件.

## 子路由

* 如多个页面具有较强关联性,可组织成子路由

* 在上级路由(如`src/pages`)中建立子文件夹,如user

* 在子文件夹下建立index.js, 内容如下:

```javascript
import Login from './Login';

export default {
  path: 'user',
  childRoutes: [
    Login,
  ].map(v => v.routeConfig || v),
};
```

* 建立对应的Login组件,并通过routerDecorator指定地址,譬如`@router('login')`

* 在其上一层路由,譬如`src/pages/index`中,导入并使用该路由

```
/**
 * Created by tdzl2003 on 6/28/16.
 */

import Splash from './Splash';
import Home from './Home';
import User from './user';     // 添加这一行,引入子路由

export const routeConfig = {
  path: '/',
  childRoutes: [
    Splash,
    Home,
    User,       // 添加这一行,使用子路由
  ].map(v => v.routeConfig || v),
};

```

* 最后访问login页面时,地址是包含了每一级路由的,如`location: '/user/login'`.

## 事件订阅

请参考[react-subscribe](https://www.npmjs.com/package/react-subscribe)的文档和示例代码。

现在只应该用事件订阅去订阅系统事件等内容,逻辑层应尽可能使用mobx绑定。但少数需要的时刻(如token失效后返回登录页) 依然可以使用Subscribe.

## 表单

请参考[mobx-form-validate](https://www.npmjs.com/package/mobx-form-validate)的文档和示例代码。

## 样式-主题

* 不再推荐使用任何的全局样式

* 一个样式如果在多个页面中被使用(如按钮,表单输入框等),应考虑封装成组件,在组件内部包含对应的样式,以避免样式重复定义

* 所有重复定义的样式都应当至少被思考一遍,是否要抽象成组件.

* 较小的组件不应配套`.style.js`文件,但如果文件过长,还是考虑将样式放入配套的`.style.js`文件

## 文件组织

* 组件所使用的图片资源和子组件建议代码的组织一律遵循"就近"原则。图片等资源应当放在组件同级目录下的assets文件夹中,子组件也建议就近放置。

* 可被复用的组件(尤其是被多个不在一个目录下的页面引用的组件)应考虑放置在公共的components文件夹中。

## 对话框

* 使用Navigator来实现对话框。

* 对话框类均应包含正确的sceneConfig静态成员。

## 异步错误捕获

异步请求在逻辑层处理过程应尽可能保证信息无丢失,错误体应被透传至最外层而不经任何修改。

最后在视图层捕获错误并决定对应的显示。

严禁直接在逻辑层弹出Alert或Toast。

## TabBar的实现

TabBar采用react-router直接实现,不依赖第三方组件。

## 导航条控制

导航条自动在每个界面都被包含,导航条如果出现的页面并非路由栈底部,将会自动出现返回按钮。

你可以通过在页面的routeConfig(或通过页面静态成员)的一些属性来控制导航条:

* `hideNavBar`: 在此界面下将隐藏导航条
* `title`: 控制导航条的标题显示
* `leftNavTitle`: 导航条左侧显示的标题,如"返回"等
* `rightNavTitle`: 导航条右侧显示的标题,如"筛选"等
* 更多属性添加中。。

你可以在组件里实现以下两个方法来获取导航条的相关通知:

* `onLeftPressed` 当导航条返回按钮或左侧标题被点击的时候调用
* `onRightPressed` 当导航条右侧标题被点击的时候调用

## 加载更多列表

使用`PageList`作为对应的observable,很容易就可以实现加载更多的列表:

可以修改PageList以适应你的前后端接口方式(包括对isOver的判定)

```javascript
@route('home')
@observer
export default class Home extends Component {
  @observable
  articleList = new PageList('/article/list');
  
  fetchMore = () => {
    this.articleList.fetch();
  };
  
  renderRow = row => {
    return (
      <ArticleItem data={row} key={row.id} />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.articleList.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.fetchMore}
        />
      </View>
    );
  }
}

```
