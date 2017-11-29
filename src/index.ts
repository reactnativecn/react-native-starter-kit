import {
  View,
  AppRegistry,
} from 'react-native';

function bar(clz: any) {

}

@bar
class Foo {

}

AppRegistry.registerComponent('App', () => View);
