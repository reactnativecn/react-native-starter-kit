import { setJSExceptionHandler, getJSExceptionHandler } from 'react-native-exception-handler';
import { Alert, BackAndroid } from 'react-native';

const defaultHandler = getJSExceptionHandler();

setJSExceptionHandler((e, isFatal) => {
  Alert.alert(
    '呀，出错了',
    `错误情报：\n${e.name} ${e.message} ${e.stack && e.stack.replace('\n', ' ')}`,
    [{
      text: 'Close',
      onPress: () => {
        defaultHandler(e, isFatal);
      },
    }],
  );
});

