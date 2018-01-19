import { delay } from 'redux-saga';
import { putInWidget } from '../../store/widgetState';
import { increment } from './actions';

export default function* homeSaga() {
  for (;;) {
    yield putInWidget(increment());
    yield delay(1000);
  }
}
